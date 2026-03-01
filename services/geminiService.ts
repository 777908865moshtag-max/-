import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Suggestion } from '../types';

const getAiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};


const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType
    },
  };
};

/**
 * Applies a watermark to a given image using a second AI call.
 * @param mainImage The base64 string of the main image.
 * @param watermarkImage The base64 string of the watermark image.
 * @returns The base64 string of the watermarked image.
 */
const applyWatermark = async (
    mainImage: string, 
    watermarkImage: string
): Promise<string> => {
    try {
        const ai = getAiClient();
        const mainImageMimeType = mainImage.match(/data:(.*);base64,/)?.[1] ?? 'image/jpeg';
        const watermarkMimeType = watermarkImage.match(/data:(.*);base64,/)?.[1] ?? 'image/png';

        const mainImagePart = fileToGenerativePart(mainImage, mainImageMimeType);
        const watermarkPart = fileToGenerativePart(watermarkImage, watermarkMimeType);
        
        const prompt = `
        Task: Apply the watermark image onto the main image.

        Instructions:
        1.  Place the watermark in the bottom-right corner of the main image.
        2.  The watermark should be small and subtle, not obscuring important details of the main image.
        3.  CRITICAL: Do NOT change the shape, text, or any elements of the watermark logo. Preserve it perfectly.
        4.  Subtly adjust the color tone and transparency of the watermark to blend naturally with the lighting and colors of the main image, but ensure it remains legible.
        5.  The final output must be only the watermarked image.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    mainImagePart,
                    watermarkPart,
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                return `data:${mimeType};base64,${base64ImageBytes}`;
            }
        }
        
        // If watermark application fails, return the original image to avoid breaking the flow.
        console.warn("Watermark application failed. Returning original image.");
        return mainImage;
    } catch (error) {
        console.error("Error applying watermark:", error);
        // Fallback to the original image in case of an error.
        return mainImage;
    }
};


export const translateSuggestions = async (suggestions: Suggestion[], targetLanguage: 'ar' | 'en'): Promise<Suggestion[]> => {
    if (suggestions.length === 0) return [];
    try {
      const ai = getAiClient();
      const prompt = `Translate the 'title' and 'description' fields for each object in the following JSON array into ${targetLanguage}. Maintain the exact JSON structure. Do not add any extra text or explanations outside of the JSON array.
  
      Input JSON:
      ${JSON.stringify(suggestions, null, 2)}
      `;
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [{ text: prompt }] },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ['title', 'description']
            }
          }
        }
      });
  
      const jsonText = response.text;
      return JSON.parse(jsonText);
    } catch (error) {
      console.error(`Error translating suggestions to ${targetLanguage}:`, error);
      // Fallback to original suggestions if translation fails
      return suggestions;
    }
  };

export const getSuggestions = async (mockupImage: string, designImage: string): Promise<Suggestion[]> => {
  try {
    const ai = getAiClient();
    const mockupMimeType = mockupImage.match(/data:(.*);base64,/)?.[1] ?? 'image/jpeg';
    const designMimeType = designImage.match(/data:(.*);base64,/)?.[1] ?? 'image/png';

    const mockupPart = fileToGenerativePart(mockupImage, mockupMimeType);
    const designPart = fileToGenerativePart(designImage, designMimeType);

    const prompt = `
    Analyze these two images. The first is a mockup scene, and the second is a logo/design.
    Your task is to provide three creative, photorealistic suggestions for merging the design onto the mockup.
    For each suggestion, provide a concise title and a detailed description that can be used as a prompt for an image generation model.
    The description should include details about placement, angle, lighting, shadows, and material interaction.
    Ensure your response is valid JSON and all text is in English.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [mockupPart, designPart, { text: prompt }] },
        config: {
            thinkingConfig: { thinkingBudget: 0 },
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: {
                            type: Type.STRING,
                            description: "A concise title for the suggestion."
                        },
                        description: {
                            type: Type.STRING,
                            description: "A detailed description for implementing the merge, usable as a prompt."
                        }
                    },
                    required: ['title', 'description']
                }
            }
        }
    });
    
    const jsonText = response.text;
    const suggestions = JSON.parse(jsonText);
    return suggestions;

  } catch (error) {
    console.error("Error getting suggestions:", error);
    throw new Error("فشل في الحصول على اقتراحات. يرجى المحاولة مرة أخرى.");
  }
};

export const editImage = async (
  mockupImage: string, 
  designImage: string, 
  prompt: string
): Promise<{ finalImage: string, report: string }> => {
  try {
    const ai = getAiClient();
    const mockupMimeType = mockupImage.match(/data:(.*);base64,/)?.[1] ?? 'image/jpeg';
    const designMimeType = designImage.match(/data:(.*);base64,/)?.[1] ?? 'image/png';

    const mockupPart = fileToGenerativePart(mockupImage, mockupMimeType);
    const designPart = fileToGenerativePart(designImage, designMimeType);

    const editResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                mockupPart,
                designPart,
                { text: prompt },
            ],
        },
        config: {
            // Fix: The 'gemini-2.5-flash-image' model for editing expects only Modality.IMAGE.
            responseModalities: [Modality.IMAGE],
        },
    });

    let finalImage: string | null = null;
    for (const part of editResponse.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const mimeType = part.inlineData.mimeType;
            finalImage = `data:${mimeType};base64,${base64ImageBytes}`;
            break; 
        }
    }
    
    if (!finalImage) {
        throw new Error("لم يتم العثور على صورة في استجابة النموذج.");
    }

    // Generate report
    const reportPrompt = `Based on the following image generation prompt, create a very brief, one-paragraph report in Arabic summarizing the steps taken to create the final image. Prompt: "${prompt}"`;
    const reportResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: reportPrompt,
    });
    const report = reportResponse.text;

    return { finalImage, report };

  } catch (error) {
    console.error("Error editing image:", error);
    throw new Error("فشل في توليد الصورة. يرجى المحاولة مرة أخرى.");
  }
};


export const generateBrandingImage = async (
    logoImage: string,
    itemDescription: string,
    applicationPrompt: string,
    watermarkImage: string | null | undefined,
    sizingPrompt: string | null | undefined
): Promise<string> => {
    try {
        const ai = getAiClient();
        const logoMimeType = logoImage.match(/data:(.*);base64,/)?.[1] ?? 'image/png';
        const logoPart = fileToGenerativePart(logoImage, logoMimeType);

        const fullPrompt = `
        Task: Create a single, photorealistic, 4k, ultra-detailed mockup image based on this description: "${itemDescription}".
        This image must prominently feature the provided logo.
        
        Logo Application Instructions from user: "${applicationPrompt}".

        Critical Rules:
        1.  The logo (including all text and colors) must be preserved perfectly with zero distortion.
        2.  The application of the logo must be seamlessly integrated into the scene with realistic perspective, lighting, shadows, and material textures.
        3.  For products, use a neutral color palette that complements the logo.
        ${sizingPrompt ? `4. Image Dimensions: ${sizingPrompt}` : ''}
        5.  The final output must be ONLY the image, with no extra text, labels, or commentary.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    logoPart,
                    { text: fullPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        let generatedImage: string | null = null;
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                generatedImage = `data:${mimeType};base64,${base64ImageBytes}`;
                break;
            }
        }

        if (!generatedImage) {
            throw new Error("The model did not return an image for the branding item.");
        }

        if (watermarkImage) {
            return await applyWatermark(generatedImage, watermarkImage);
        }

        return generatedImage;

    } catch (error) {
        console.error(`Error generating branding image for "${itemDescription}":`, error);
        throw new Error(`فشل في توليد صورة لـ "${itemDescription}".`);
    }
};

export const generateMultiDesignBrandingImage = async (
    logoImages: string[],
    itemDescription: string,
    applicationPrompt: string,
    watermarkImage: string | null | undefined,
    sizingPrompt: string | null | undefined
): Promise<string> => {
    try {
        const ai = getAiClient();
        const logoParts = logoImages.map(logoImage => {
            const logoMimeType = logoImage.match(/data:(.*);base64,/)?.[1] ?? 'image/png';
            return fileToGenerativePart(logoImage, logoMimeType);
        });

        const fullPrompt = `
        Task: Create a single, photorealistic, 4k, ultra-detailed mockup image based on this description: "${itemDescription}".

        This image must feature ALL ${logoParts.length} of the provided designs/logos.
        
        Design Application Instructions from user: "${applicationPrompt}". Apply these instructions creatively to all designs.

        Scene Composition Instructions:
        - Arrange all the provided designs within the single generated image in a visually appealing and logical composition.
        - For items like business cards or flyers, show multiple items side-by-side, each with a different design to represent things like front/back or different variations.
        - For items like a wall, vehicle, or building, display the logos near each other as if they are part of a co-branded space or event.
        - The composition must look natural and professional.

        Critical Rules:
        1. The final output must be ONE SINGLE IMAGE containing all designs.
        2. ALL provided designs (including all text and colors) must be preserved perfectly with zero distortion or alteration.
        3. The application of the designs must be seamlessly integrated into the scene with realistic perspective, lighting, shadows, and material textures.
        ${sizingPrompt ? `4. Image Dimensions: ${sizingPrompt}` : ''}
        5. The final output must be ONLY the image, with no extra text, labels, or commentary.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    ...logoParts,
                    { text: fullPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        let generatedImage: string | null = null;
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                generatedImage = `data:${mimeType};base64,${base64ImageBytes}`;
                break;
            }
        }

        if (!generatedImage) {
            throw new Error("The model did not return an image for the multi-design branding item.");
        }
        
        if (watermarkImage) {
            return await applyWatermark(generatedImage, watermarkImage);
        }

        return generatedImage;

    } catch (error) {
        console.error(`Error generating multi-design branding image for "${itemDescription}":`, error);
        throw new Error(`فشل في توليد صورة مدمجة لـ "${itemDescription}".`);
    }
};


export const generateCompositeBrandingImage = async (
    logoImage: string,
    itemDescriptions: string[],
    applicationPrompt: string,
    watermarkImage: string | null | undefined,
    sizingPrompt: string | null | undefined
): Promise<string> => {
    try {
        const ai = getAiClient();
        const logoMimeType = logoImage.match(/data:(.*);base64,/)?.[1] ?? 'image/png';
        const logoPart = fileToGenerativePart(logoImage, logoMimeType);

        const itemList = itemDescriptions.map(desc => `- ${desc}`).join('\n');

        const fullPrompt = `
        Task: Create a single, unified, photorealistic, 4k, ultra-detailed mockup image showcasing a collection of branded products.

        Scene Description: Arrange the following items together in a visually appealing, professional composition on a clean, minimalist studio background with soft lighting:
        ${itemList}
        
        Logo: The provided image is the brand's logo.
        
        Logo Application Instructions from user: "${applicationPrompt}". Apply this instruction to EVERY item in the scene.

        Critical Rules:
        1. The final output must be ONE SINGLE IMAGE containing all the listed items.
        2. The logo (including all text and colors) must be preserved perfectly and applied to EACH item.
        3. The application of the logo must be seamlessly integrated into the scene with realistic perspective, lighting, shadows, and material textures for each item.
        4. The composition should be balanced and look like a professional brand identity showcase.
        ${sizingPrompt ? `5. Image Dimensions: ${sizingPrompt}` : ''}
        6. The final output must be ONLY the image, with no extra text, labels, or commentary.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    logoPart,
                    { text: fullPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        let generatedImage: string | null = null;
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                generatedImage = `data:${mimeType};base64,${base64ImageBytes}`;
                break;
            }
        }

        if (!generatedImage) {
            throw new Error("The model did not return an image for the composite branding scene.");
        }
        
        if (watermarkImage) {
            return await applyWatermark(generatedImage, watermarkImage);
        }

        return generatedImage;

    } catch (error) {
        console.error(`Error generating composite branding image:`, error);
        throw new Error(`فشل في توليد صورة مجمعة للهوية البصرية.`);
    }
};

export const improveBrandingPrompt = async (
    userPrompt: string,
    items: { name: string }[],
    mode: 'individual' | 'composite',
    combine: boolean
): Promise<string> => {
    try {
        const ai = getAiClient();
        const itemsList = items.map(i => `- ${i.name}`).join('\n');
        
        let modeDescription = '';
        if (mode === 'composite') {
            modeDescription = 'صورة مجمعة';
        } else {
            modeDescription = `صور فردية ${combine ? '(مع دمج كل التصاميم في كل صورة)' : ''}`;
        }

        let instructions = '';
        if (mode === 'composite') {
            instructions = `
- **الهدف**: إنشاء مشهد واحد مجمع ومتكامل.
- **التكوين**: صف مشهداً احترافياً يضم جميع المنتجات المحددة (${itemsList}) مرتبة بشكل جذاب في بيئة استوديو نظيفة بإضاءة ناعمة. يجب أن يبدو المشهد كعرض متكامل للهوية البصرية.
- **التوجيه المطلوب**: اكتب توجيهاً يصف هذا المشهد المجمع بالتفصيل.
  `;
        } else { // individual mode
            if (combine) {
                instructions = `
- **الهدف**: إنشاء صور فردية لكل منتج، مع دمج **كل التصاميم** المرفوعة في كل صورة.
- **التكوين**: لكل منتج على حدة، صف طريقة عرض احترافية. يجب أن يتضمن التوجيه تعليمات واضحة لدمج كل التصاميم المرفوعة بطريقة منطقية وجذابة (مثال: وجه وظهر لبطاقة العمل، أو شعارات متجاورة على جدار).
- **التوجيه المطلوب**: اكتب توجيهاً عالمياً يمكن تطبيقه على كل منتج على حدة، مع التأكيد على دمج جميع التصاميم.
    `;
            } else { // individual mode, single design per image
                instructions = `
- **الهدف**: إنشاء صور فردية لكل منتج محدد.
- **التوجيه المطلوب**: اكتب توجيهاً عالمياً ومفصلاً يمكن تطبيقه على كل منتج من المنتجات المحددة (${itemsList}) لتوليد صورة منفصلة وواقعية له. يجب أن يركز التوجيه على كيفية تطبيق التصميم الواحد بشكل احترافي.
    `;
            }
        }

        const fullPrompt = `
أنت خبير فائق في هندسة الأوامر لنماذج توليد الصور بالذكاء الاصطناعي. مهمتك هي تحويل طلب المستخدم ومجموعة اختياراته إلى أمر (prompt) احترافي ومفصل باللغة العربية.

**مدخلات المستخدم:**
1.  **الأمر الأساسي من المستخدم**: "${userPrompt}"
2.  **المنتجات المحددة**:
${itemsList}
3.  **وضع الإنشاء المحدد**: ${modeDescription}

**مهمتك:**
بناءً على المدخلات أعلاه، قم بإنشاء أمر واحد فقط. اتبع التعليمات التالية بدقة:

${instructions}

**قواعد صارمة يجب تضمينها في الأمر النهائي الذي ستنشئه:**
- يجب أن يأمر نموذج الصور دائمًا بالحفاظ التام على التصميم أو الشعار الأصلي (النصوص، الألوان، الأشكال) بدون أي تشويه أو تغيير.
- يجب أن يكون الدمج واقعيًا لأقصى درجة، مع محاكاة دقيقة للمواد، الإضاءة، الظلال، والانعكاسات.
- يجب أن تكون النتيجة النهائية صورة فوتوغرافية واقعية 100% وبدقة 4k فائقة التفاصيل.

**المخرج المطلوب:**
- النص النهائي للأمر المحسّن فقط، باللغة العربية.
- لا تقم بإضافة أي مقدمات، عناوين، أو شروحات إضافية. فقط نص الأمر الجاهز للاستخدام.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: fullPrompt,
        });

        return response.text.trim();

    } catch (error) {
        console.error("Error generating advanced branding prompt:", error);
        throw new Error("فشل في تحسين الموجه.");
    }
};