import React, { useState, useRef, useEffect, Touch } from 'react';
import { ImageUploader } from './ImageUploader';
import { AdvancedSettings } from './AdvancedSettings';
import { Suggestion, AdvancedSettings as Settings, Project } from '../types';
import { getSuggestions, editImage, translateSuggestions } from '../services/geminiService';
import { SparklesIcon, DownloadIcon, HomeIcon, ArchiveBoxIcon, EyeIcon, XMarkIcon } from './icons';

// A helper function to calculate distance between two points
const getDistance = (p1: Touch, p2: Touch) => {
  return Math.sqrt(Math.pow(p2.clientX - p1.clientX, 2) + Math.pow(p2.clientY - p1.clientY, 2));
};

// --- Image Preview Modal Component ---
const ImagePreviewModal = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const lastTouchDistance = useRef(0);
    const lastOffset = useRef({ x: 0, y: 0 });
    const isPanning = useRef(false);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            lastTouchDistance.current = getDistance(e.touches[0], e.touches[1]);
        } else if (e.touches.length === 1) {
            isPanning.current = true;
            lastOffset.current = { x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y };
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const newDistance = getDistance(e.touches[0], e.touches[1]);
            const newScale = scale * (newDistance / lastTouchDistance.current);
            setScale(Math.min(Math.max(newScale, 1), 5)); // Clamp scale between 1 and 5
            lastTouchDistance.current = newDistance;
        } else if (e.touches.length === 1 && isPanning.current) {
            const newX = e.touches[0].clientX - lastOffset.current.x;
            const newY = e.touches[0].clientY - lastOffset.current.y;
            setOffset({ x: newX, y: newY });
        }
    };

    const handleTouchEnd = () => {
        lastTouchDistance.current = 0;
        isPanning.current = false;
        if (scale <= 1) {
             setScale(1);
             setOffset({ x: 0, y: 0 });
        }
    };

    // Reset state on close
    useEffect(() => {
        return () => {
            setScale(1);
            setOffset({ x: 0, y: 0 });
        };
    }, [imageUrl]);


    return (
        <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10">
                <img src="https://img.icons8.com/color/96/delete-sign--v1.png" alt="Close" className="w-8 h-8" />
            </button>
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="معاينة"
                    className="max-w-full max-h-full transition-transform duration-100 ease-out"
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, touchAction: 'none' }}
                />
            </div>
        </div>
    );
};


type BackgroundStyle = 'original' | 'dramatic' | 'studio' | 'realistic';

const backgroundStyles: { key: BackgroundStyle, name: string, prompt: string }[] = [
    { key: 'original', name: 'الخلفية الأصلية', prompt: 'Keep the original background from the mockup image, but enhance it to match the lighting and style of the merged design.' },
    { key: 'dramatic', name: 'مشهد درامي', prompt: 'Place this entire scene within a new, photorealistic background featuring a dramatic and cinematic atmosphere. Use strong contrast, deep shadows, and a focused light source to create a powerful mood.' },
    { key: 'studio', name: 'استوديو احترافي', prompt: 'Place this entire scene within a new, photorealistic, clean, and modern studio background. Use professional softbox lighting to create even, flattering illumination with soft shadows, highlighting the product details.' },
    { key: 'realistic', name: 'بيئة واقعية', prompt: 'Place this entire scene within a new, hyper-realistic background that contextually matches the product. It could be an urban environment, a natural landscape, or a lifestyle interior. Ensure reflections, lighting, and textures are perfectly integrated.' }
];

interface MockupStudioProps {
  onBack: () => void;
}

const MOCKUP_STATE_KEY = 'mockupStudioState';
const PROJECTS_GALLERY_KEY = 'creativeStudioProjects';
const LOAD_PROJECT_ID_KEY = 'loadProjectId';


interface PersistentMockupState {
    mockupImage: string | null;
    designImage: string | null;
    englishSuggestions: Suggestion[];
    arabicSuggestions: Suggestion[];
    selectedMergePrompt: string;
    finalImage: string | null;
    report: string;
    displayLanguage: 'ar' | 'en';
    customPrompt: string;
    settings: Settings;
}

const initialPersistentState: PersistentMockupState = {
    mockupImage: null,
    designImage: null,
    englishSuggestions: [],
    arabicSuggestions: [],
    selectedMergePrompt: '',
    finalImage: null,
    report: '',
    displayLanguage: 'ar',
    customPrompt: '',
    settings: {
        photorealism: 100,
        preserveText: true,
        matchColors: true,
        wrapIntensity: 60,
        outputType: 'PNG',
    },
};

export const MockupStudio: React.FC<MockupStudioProps> = ({ onBack }) => {
  const [state, setState] = useState<PersistentMockupState>(() => {
    try {
      const projectIdToLoad = localStorage.getItem(LOAD_PROJECT_ID_KEY);
      if (projectIdToLoad) {
        localStorage.removeItem(LOAD_PROJECT_ID_KEY); // Consume it
        const projects: Project[] = JSON.parse(localStorage.getItem(PROJECTS_GALLERY_KEY) || '[]');
        const projectToLoad = projects.find(p => p.id === projectIdToLoad);
        if (projectToLoad && projectToLoad.type === 'mockup') {
            return projectToLoad.state as PersistentMockupState;
        }
      }
      // Fallback to auto-resume state
      const storedState = localStorage.getItem(MOCKUP_STATE_KEY);
      if (storedState) {
          return JSON.parse(storedState);
      }
    } catch (e) {
        console.error("Failed to parse state from localStorage", e);
    }
    return initialPersistentState;
  });

  // UI State (transient, not persisted)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const loadingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    try {
        localStorage.setItem(MOCKUP_STATE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error("Failed to save state to localStorage", e);
    }
  }, [state]);

  const {
      mockupImage, designImage, englishSuggestions, arabicSuggestions,
      selectedMergePrompt, finalImage, report, displayLanguage,
      customPrompt, settings
  } = state;

  const hasImages = mockupImage && designImage;
  const currentSuggestions = displayLanguage === 'ar' ? arabicSuggestions : englishSuggestions;

  const handleAnalyzeSuggestions = async () => {
    if (!mockupImage || !designImage) {
      setError('يرجى رفع الصورتين أولاً.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setLoadingMessage('يتم تحليل الصور وابتكار أساليب الدمج...');
    resetState(true, false); // Keep images, clear suggestions

    try {
      const enSuggestions = await getSuggestions(mockupImage, designImage);
      const arSuggestions = await translateSuggestions(enSuggestions, 'ar');
      setState(s => ({
          ...s,
          englishSuggestions: enSuggestions,
          arabicSuggestions: arSuggestions
      }));
    } catch (e: any) {
      setError(e.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectMergeSuggestion = (suggestionIndex: number) => {
    const englishSuggestion = englishSuggestions[suggestionIndex];
    if (!englishSuggestion) return;
    
    setState(s => ({ ...s, selectedMergePrompt: englishSuggestion.description }));
  };

  const generateImageFromPrompt = async (prompt: string) => {
    if (!mockupImage || !designImage) {
        setError('الصور المصدر غير متوفرة.');
        return;
    }
    setError(null);
    setIsLoading(true);

    const messages = [
        'تهيئة محرك الذكاء الاصطناعي...',
        'دمج عناصر التصميم...',
        'تطبيق الإضاءة والظلال الواقعية...',
        'تحسين القوام والمواد...',
        'وضع اللمسات الأخيرة على الصورة عالية الدقة...'
    ];
    let messageIndex = 0;
    setLoadingMessage(messages[messageIndex]);
    
    loadingIntervalRef.current = window.setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingMessage(messages[messageIndex]);
    }, 3000);

    setState(s => ({ ...s, finalImage: null }));
    
    try {
      const { finalImage: resultImage, report: resultReport } = await editImage(mockupImage, designImage, prompt);
      setState(s => ({ ...s, finalImage: resultImage, report: resultReport }));
    } catch (e: any) {
      setError(e.message || 'حدث خطأ غير متوقع.');
    } finally {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      setIsLoading(false);
    }
  }
  
  const handleGenerateFromSuggestion = async (backgroundStyle: BackgroundStyle) => {
    const background = backgroundStyles.find(bs => bs.key === backgroundStyle);
    if (!background) {
        setError('نمط الخلفية المحدد غير صالح.');
        return;
    }

    const fullPrompt = `Task: Photorealistically merge the design image onto the mockup image.
Merge details: "${selectedMergePrompt}".
Background details: ${background.prompt}

Advanced Settings:
- Level of photorealism: ${settings.photorealism}%.
- Wrap intensity around surfaces: ${settings.wrapIntensity}%.
${settings.preserveText ? '- It is absolutely critical to preserve all text, branding, and logos from the design image perfectly without any distortion or changes.' : ''}
${settings.matchColors ? '- Match the color palette of the design with the ambient lighting of the scene.' : ''}

Final Output Instruction: Generate a single, final, high-resolution, 4k, crystal-clear, and ultra-detailed image.`;
    
    await generateImageFromPrompt(fullPrompt);
  };

  const handleGenerateWithCustomPrompt = async () => {
    if (!customPrompt.trim()) {
      setError('الرجاء كتابة موجه مخصص.');
      return;
    }

    const fullPrompt = `${customPrompt}

Advanced Settings:
- Level of photorealism: ${settings.photorealism}%.
- Wrap intensity around surfaces: ${settings.wrapIntensity}%.
${settings.preserveText ? '- It is absolutely critical to preserve all text, branding, and logos from the design image perfectly without any distortion or changes.' : ''}
${settings.matchColors ? '- Match the color palette of the design with the ambient lighting of the scene.' : ''}

Final Output Instruction: Generate a single, final, high-resolution, 4k, crystal-clear, and ultra-detailed image.`;
    
    await generateImageFromPrompt(fullPrompt);
  };

  const downloadImage = () => {
      if(finalImage){
          const link = document.createElement('a');
          link.href = finalImage;
          link.download = `generated-image.${settings.outputType.toLowerCase()}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }

  const resetState = (keepImages = false, keepSuggestions = false) => {
    setState(s => {
      const newState = { ...s };
      if (!keepImages) {
        newState.mockupImage = null;
        newState.designImage = null;
      }
      if (!keepSuggestions) {
        newState.englishSuggestions = [];
        newState.arabicSuggestions = [];
      }
      newState.selectedMergePrompt = '';
      newState.finalImage = null;
      newState.report = '';
      newState.customPrompt = '';
      return newState;
    });
    setError(null);
  };

  const startOver = () => {
    setState(initialPersistentState);
    setError(null);
  };
  
  const startNewProjectWithSameImages = () => resetState(true, false);
  
  const handleSaveProject = () => {
      const projectName = window.prompt("الرجاء إدخال اسم للمشروع:");
      if (!projectName || !projectName.trim()) {
          return;
      }
      
      const thumbnail = finalImage || mockupImage || designImage;
      if (!thumbnail) {
          alert("لا يمكن حفظ المشروع بدون صورة واحدة على الأقل (نموذج، تصميم، أو نتيجة نهائية).");
          return;
      }

      const newProject: Project = {
          id: `proj_${Date.now()}`,
          name: projectName,
          type: 'mockup',
          thumbnail,
          timestamp: new Date().toISOString(),
          state: state,
      };

      try {
          const existingProjects: Project[] = JSON.parse(localStorage.getItem(PROJECTS_GALLERY_KEY) || '[]');
          const updatedProjects = [...existingProjects, newProject];
          localStorage.setItem(PROJECTS_GALLERY_KEY, JSON.stringify(updatedProjects));
          alert(`تم حفظ المشروع "${projectName}" بنجاح!`);
      } catch (e) {
          console.error("Failed to save project", e);
          alert("حدث خطأ أثناء حفظ المشروع.");
      }
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
        {previewImageUrl && <ImagePreviewModal imageUrl={previewImageUrl} onClose={() => setPreviewImageUrl(null)} />}
        <header className="relative text-center mb-8">
            <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors">
                <img src="https://img.icons8.com/color/96/home.png" alt="Home" className="w-6 h-6" />
            </button>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                استوديو النماذج (Mockup)
            </h1>
            <p className="mt-4 text-lg text-gray-400">
                ادمج تصاميمك في نماذج واقعية بكل سهولة.
            </p>
        </header>

        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">خطأ! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-4">
              <ImageUploader id="mockup-uploader" title="1. النموذج / الموك أب" onImageUpload={(files) => setState(s => ({...s, mockupImage: files[0] ?? null}))} />
              <ImageUploader id="design-uploader" title="2. الشعار / التصميم" onImageUpload={(files) => setState(s => ({...s, designImage: files[0] ?? null}))} />
              <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={handleSaveProject}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-base"
                  >
                    <img src="https://img.icons8.com/color/96/save.png" alt="Save" className="w-5 h-5" />
                    <span>حفظ المشروع</span>
                  </button>
                <button
                  onClick={startOver}
                  className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-base"
                >
                  <img src="https://img.icons8.com/color/96/clear-symbol.png" alt="Clear" className="w-5 h-5" />
                  <span>مسح الكل</span>
                </button>
              </div>
            </div>
            <AdvancedSettings settings={settings} onSettingsChange={(newSettings) => setState(s => ({ ...s, settings: newSettings }))} />
          </div>

          <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl border border-gray-700 min-h-[500px] flex flex-col justify-center items-center">
            {isLoading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-300">{loadingMessage}</p>
              </div>
            )}
            
            {!isLoading && finalImage && (
              <div className="w-full text-center">
                <h2 className="text-3xl font-bold mb-4">النتيجة النهائية</h2>
                <div className="relative group w-full max-w-2xl mx-auto">
                    <img src={finalImage} alt="Generated result" className="rounded-lg shadow-2xl shadow-indigo-900/50 w-full" />
                </div>
                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={() => setPreviewImageUrl(finalImage)} className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        <img src="https://img.icons8.com/color/96/visible.png" alt="Preview" className="w-5 h-5" />
                        <span>معاينة</span>
                    </button>
                    <button onClick={downloadImage} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        <img src="https://img.icons8.com/color/96/download.png" alt="Download" className="w-5 h-5" />
                        <span>تحميل</span>
                    </button>
                </div>
                <div className="mt-6 text-start max-w-2xl mx-auto bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-bold text-lg mb-2">تقرير المعالجة</h4>
                    <p className="text-gray-300 text-sm">{report}</p>
                </div>
                <button
                  onClick={startNewProjectWithSameImages}
                  className="mt-6 flex items-center justify-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    <img src="https://img.icons8.com/color/96/add-image.png" alt="New Project" className="w-5 h-5" />
                    <span>مشروع جديد بنفس الصور</span>
                </button>
              </div>
            )}
            
            {!isLoading && !finalImage && !hasImages && (
                <div className="text-center text-gray-500">
                    <img src="https://img.icons8.com/color/96/wizard.png" alt="Magic" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold">مستعد للإبداع</h3>
                    <p>ارفع صورك لتبدأ.</p>
                </div>
            )}

            {!isLoading && !finalImage && hasImages && (
              <div className="w-full space-y-8">
                {/* --- AI Suggestions Flow --- */}
                <div className="space-y-4">
                   <h2 className="text-2xl font-bold text-center">الخيار 1: استخدم الاقتراحات الذكية</h2>
                   {englishSuggestions.length === 0 && (
                      <button onClick={handleAnalyzeSuggestions} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200">
                          <img src="https://img.icons8.com/color/96/idea.png" alt="Analyze" className="w-6 h-6" />
                          <span>تحليل واقتراح أساليب دمج</span>
                      </button>
                   )}
                   
                   {englishSuggestions.length > 0 && !selectedMergePrompt && (
                      <div className="w-full animate-fade-in">
                          <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-bold">اختر أسلوب الدمج</h3>
                              <button onClick={() => setState(s => ({ ...s, displayLanguage: s.displayLanguage === 'ar' ? 'en' : 'ar' }))} className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors flex items-center gap-2">
                                  <img src="https://img.icons8.com/color/96/translation.png" alt="Translate" className="w-4 h-4" />
                                  <span>{displayLanguage === 'ar' ? 'View in English' : 'عرض بالعربية'}</span>
                              </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentSuggestions.map((s, i) => (
                              <div key={i} className="bg-gray-800 p-4 rounded-lg border border-gray-600 flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-indigo-400">{s.title}</h4>
                                  <p className="text-sm text-gray-400 mt-2">{s.description}</p>
                                </div>
                                <button
                                  onClick={() => handleSelectMergeSuggestion(i)}
                                  className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                                >
                                  <img src="https://img.icons8.com/color/96/checked--v1.png" alt="Select" className="w-4 h-4" />
                                  <span>اختيار</span>
                                </button>
                              </div>
                            ))}
                          </div>
                      </div>
                   )}
                   
                   {selectedMergePrompt && (
                      <div className="w-full animate-fade-in">
                        <h3 className="text-xl font-bold mb-4">اختر نمط الخلفية</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {backgroundStyles.map(style => (
                                <button key={style.key} onClick={() => handleGenerateFromSuggestion(style.key)} className="bg-gray-700 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex flex-col items-center justify-center gap-2 text-center">
                                    <img src={
                                        style.key === 'original' ? 'https://img.icons8.com/color/96/image.png' :
                                        style.key === 'dramatic' ? 'https://img.icons8.com/color/96/theatre-mask.png' :
                                        style.key === 'studio' ? 'https://img.icons8.com/color/96/spotlight.png' :
                                        'https://img.icons8.com/color/96/city.png'
                                    } alt={style.name} className="w-8 h-8" />
                                    <span>{style.name}</span>
                                </button>
                            ))}
                        </div>
                      </div>
                   )}
                </div>

                {/* --- Separator --- */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-gray-800/50 px-3 text-lg font-medium text-gray-400">أو</span>
                  </div>
                </div>


                {/* --- Custom Prompt Flow --- */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center">الخيار 2: أدخل توجيهاً مخصصاً</h2>
                    <textarea
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                        rows={5}
                        placeholder="مثال: ادمج الشعار على القميص ليبدو كطبعة فينيل متشققة. الخلفية: استوديو تصوير عصري بإضاءة ناعمة."
                        value={customPrompt}
                        onChange={(e) => setState(s => ({ ...s, customPrompt: e.target.value }))}
                    />
                    <button
                        onClick={handleGenerateWithCustomPrompt}
                        disabled={!customPrompt.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all"
                    >
                        <img src="https://img.icons8.com/color/96/wizard.png" alt="Generate" className="w-6 h-6" />
                        <span>توليد بالموجه المخصص</span>
                    </button>
                </div>
              </div>
            )}
          </div>
        </main>
    </div>
  );
}