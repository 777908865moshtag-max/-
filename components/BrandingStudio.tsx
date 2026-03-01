import React, { useState, useEffect, useRef, Touch } from 'react';
import { ImageUploader } from './ImageUploader';
import { generateBrandingImage, generateCompositeBrandingImage, generateMultiDesignBrandingImage, improveBrandingPrompt } from '../services/geminiService';
import { Project } from '../types';
import { 
    SparklesIcon, DownloadIcon, HomeIcon, TshirtIcon, MugIcon, CapIcon, BagIcon, HoodieIcon, BusinessCardIcon, BottleIcon, BoxIcon, BuildingIcon, StorefrontIcon, 
    DocumentTextIcon, BookOpenIcon, FolderIcon, CalendarIcon, IdentificationIcon, PhotoIcon, EnvelopeIcon, UserGroupIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, GlobeAltIcon, PlayCircleIcon, MegaphoneIcon, PresentationChartBarIcon, TagIcon, PencilIcon, KeyIcon, TruckIcon, FlagIcon, CreditCardIcon, MenuIcon, CropIcon,
    StampIcon, PouchIcon, CanIcon, FoodWrapperIcon, ApronIcon, FaceMaskIcon, SocksIcon, UsbDriveIcon, CoasterIcon, WristbandIcon, NapkinIcon, TableTentIcon, TapeRollIcon,
    LargeFormatPrinterIcon, OfficePrinterIcon, FabricPrinterIcon, HandheldPrinterIcon, LaserEngraverIcon,
    ArchiveBoxIcon, LanyardIcon, UmbrellaIcon, PowerBankIcon, PhoneGripIcon, ProductLabelsIcon, WrappingPaperIcon, MedicalScrubsIcon, SafetyVestIcon,
    EyeIcon, XMarkIcon, PlasticBagIcon, TshirtBagIcon
} from './icons';


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


type BrandingItemKey = string;
type GenerationMode = 'individual' | 'composite';

interface BrandingItem {
    key: BrandingItemKey;
    name: string;
    description: string;
    imageUrl: string;
}

interface BrandingCategory {
    name: string;
    items: BrandingItem[];
}

const brandingData: Record<string, BrandingCategory> = {
    officeAndAdmin: {
        name: 'المطبوعات المكتبية',
        items: [
            { key: 'businessCard', name: 'بطاقة عمل', description: 'a stack of thick, high-quality business cards', imageUrl: 'https://img.icons8.com/color/96/business-contact.png' },
            { key: 'letterhead', name: 'ورق مراسلات', description: 'a professional letterhead paper on a wooden desk', imageUrl: 'https://img.icons8.com/color/96/document.png' },
            { key: 'envelope', name: 'مظروف', description: 'a branded business envelope', imageUrl: 'https://img.icons8.com/color/96/new-post.png' },
            { key: 'invoice', name: 'فاتورة', description: 'a professional invoice document template', imageUrl: 'https://img.icons8.com/color/96/invoice.png' },
            { key: 'receiptVoucher', name: 'سند قبض', description: 'a branded receipt or payment voucher', imageUrl: 'https://img.icons8.com/color/96/receipt.png' },
            { key: 'folder', name: 'مجلد', description: 'a corporate presentation folder on a meeting table', imageUrl: 'https://img.icons8.com/color/96/folder-invoices.png' },
            { key: 'stationerySet', name: 'طقم ورقيات', description: 'a full corporate identity stationery set including a letterhead, business card, and envelope, arranged neatly on a modern desk', imageUrl: 'https://img.icons8.com/color/96/stationery.png' },
            { key: 'brochure', name: 'كتيّب', description: 'a trifold brochure mockup, open to show the inside', imageUrl: 'https://img.icons8.com/color/96/magazine.png' },
            { key: 'companyProfile', name: 'ملف تعريفي', description: 'a professionally bound company profile book', imageUrl: 'https://img.icons8.com/color/96/company.png' },
            { key: 'notebook', name: 'دفتر ملاحظات', description: 'a branded spiral notebook with a pen', imageUrl: 'https://img.icons8.com/color/96/journal.png' },
            { key: 'calendar', name: 'تقويم', description: 'a branded desk calendar for the new year', imageUrl: 'https://img.icons8.com/color/96/calendar.png' },
            { key: 'idCard', name: 'بطاقة موظف', description: 'a corporate employee ID card with a lanyard', imageUrl: 'https://img.icons8.com/color/96/badge.png' },
            { key: 'poster', name: 'ملصق داخلي', description: 'a promotional poster on an office wall', imageUrl: 'https://img.icons8.com/color/96/poster.png' },
            { key: 'certificate', name: 'شهادة', description: 'a formal certificate of achievement or appreciation', imageUrl: 'https://img.icons8.com/color/96/certificate.png' },
            { key: 'stamp', name: 'ختم', description: 'a self-inking company stamp making an impression on paper', imageUrl: 'https://img.icons8.com/color/96/rubber-stamp.png' },
            { key: 'invitationCard', name: 'بطاقة دعوة', description: 'an elegant invitation card for a corporate event', imageUrl: 'https://img.icons8.com/color/96/invitation.png' },
        ],
    },
    digitalAndAds: {
        name: 'الهوية الرقمية',
        items: [
            { key: 'socialProfile', name: 'صور الحسابات', description: 'a social media profile picture and cover photo combination', imageUrl: 'https://img.icons8.com/color/96/test-account.png' },
            { key: 'socialPost', name: 'قالب منشورات', description: 'a template for a social media post on a phone screen', imageUrl: 'https://img.icons8.com/color/96/instagram-new.png' },
            { key: 'socialStory', name: 'قالب قصص', description: 'a template for an Instagram or Snapchat story', imageUrl: 'https://img.icons8.com/color/96/smartphone.png' },
            { key: 'emailSignature', name: 'توقيع بريد', description: 'a professional email signature displayed in an email client', imageUrl: 'https://img.icons8.com/color/96/email.png' },
            { key: 'wallpaper', name: 'خلفيات', description: 'branded wallpapers for desktop and mobile phones', imageUrl: 'https://img.icons8.com/color/96/image.png' },
            { key: 'websiteUI', name: 'واجهة موقع', description: 'the hero section of a modern website on a laptop screen', imageUrl: 'https://img.icons8.com/color/96/domain.png' },
            { key: 'videoIntro', name: 'مقدمة فيديو', description: 'a title screen for a corporate video intro', imageUrl: 'https://img.icons8.com/color/96/video.png' },
            { key: 'adDesign', name: 'تصميم إعلان', description: 'a digital ad banner for a social media campaign', imageUrl: 'https://img.icons8.com/color/96/megaphone.png' },
            { key: 'presentationTemplate', name: 'عرض تقديمي', description: 'a slide from a professional PowerPoint presentation template', imageUrl: 'https://img.icons8.com/color/96/presentation.png' },
            { key: 'webBanner', name: 'بانر ويب', description: 'a set of different-sized web banners for online advertising', imageUrl: 'https://img.icons8.com/color/96/flag.png' },
        ],
    },
    packagingAndProducts: {
        name: 'التغليف والمنتجات',
        items: [
            { key: 'productBox', name: 'علب المنتجات', description: 'a premium product packaging box', imageUrl: 'https://img.icons8.com/color/96/box.png' },
            { key: 'packagingBoxSet', name: 'مجموعة علب', description: 'a set of different sized product boxes for a full product line, arranged in a professional shot', imageUrl: 'https://img.icons8.com/color/96/package.png' },
            { key: 'spicePouch', name: 'كيس بهارات', description: 'a sealed, stand-up kraft paper pouch for spices or herbs, on a clean background', imageUrl: 'https://img.icons8.com/color/96/purse.png' },
            { key: 'stickers', name: 'ملصقات', description: 'a sheet of die-cut logo stickers', imageUrl: 'https://img.icons8.com/color/96/price-tag.png' },
            { key: 'productLabels', name: 'ملصقات منتجات', description: 'a branded label on a glass bottle of sauce or oil', imageUrl: 'https://img.icons8.com/color/96/price-tag.png' },
            { key: 'wrappingPaper', name: 'ورق تغليف', description: 'a roll of branded wrapping tissue paper with a repeating logo pattern', imageUrl: 'https://img.icons8.com/color/96/gift.png' },
            { key: 'paperCup', name: 'كوب ورقي', description: 'a branded paper coffee cup with a lid', imageUrl: 'https://img.icons8.com/color/96/coffee-to-go.png' },
            { key: 'productBottle', name: 'زجاجة منتج', description: 'a branded glass or plastic bottle for a drink product', imageUrl: 'https://img.icons8.com/color/96/water-bottle.png' },
            { key: 'can', name: 'علبة معدنية', description: 'an aluminum beverage can with a custom design', imageUrl: 'https://img.icons8.com/color/96/soda-can.png' },
            { key: 'foodWrapper', name: 'غلاف طعام', description: 'a branded food wrapper for a sandwich or burger', imageUrl: 'https://img.icons8.com/color/96/food.png' },
            { key: 'phoneCase', name: 'غطاء هاتف', description: 'a custom branded phone case on a smartphone', imageUrl: 'https://img.icons8.com/color/96/phone-case.png' },
        ],
    },
    bagsAndTotes: {
        name: 'أكياس وحقائب',
        items: [
            { key: 'shoppingBag', name: 'أكياس تسوق ورقية', description: 'a luxury paper shopping bag with rope handles', imageUrl: 'https://img.icons8.com/color/96/shopping-bag.png' },
            { key: 'toteBag', name: 'حقيبة قماشية', description: 'a canvas tote bag hanging against a neutral wall', imageUrl: 'https://img.icons8.com/color/96/shopping-bag.png' },
            { key: 'fabricBagDieCut', name: 'كيس قماشي (مقبض داخلي)', description: 'a die-cut handle fabric shopping bag with a clean design, laid flat', imageUrl: 'https://img.icons8.com/color/96/bag-front-view.png' },
            { key: 'nonWovenDieCutBag', name: 'كيس قماش (غير منسوج)', description: 'A photorealistic mockup of a die-cut handle non-woven fabric bag. The bag is presented on a clean, neutral studio background with soft, professional lighting to highlight its texture. The material must show the characteristic polypropylene non-woven texture, complete with subtle, realistic wrinkles, folds, and stitched seams. The provided design should be applied to the front of the bag as a high-quality screen print, ensuring the ink texture integrates naturally with the fabric\'s surface. Preserve the design\'s original colors and details perfectly. If the user\'s prompt specifies a bag color or a print color, adhere to it strictly.', imageUrl: 'https://img.icons8.com/color/96/plastic-bag.png' },
            { key: 'smallGiftBag', name: 'كيس هدايا', description: 'a small, elegant gift bag for cosmetic items', imageUrl: 'https://img.icons8.com/color/96/shopping-bag.png' },
            { key: 'plasticShoppingBag', name: 'كيس بلاستيك (مقبض داخلي)', description: 'a photorealistic die-cut handle plastic shopping bag, similar to a carrier bag for groceries or retail items. The bag is standing upright on a clean, neutral studio surface with soft, professional lighting. The material should have a subtle plastic sheen with realistic wrinkles and folds, showcasing the printed design clearly.', imageUrl: 'https://img.icons8.com/color/96/plastic-bag.png' },
            { key: 'tshirtPlasticBag', name: 'كيس بلاستيك شيال', description: 'A photorealistic t-shirt style plastic shopping bag with handles, typically used for takeaways or groceries. The bag is standing upright on a clean, neutral studio surface with soft, professional lighting. The material should have a subtle plastic sheen with realistic wrinkles, folds, and side gussets, showcasing the printed design clearly on its front face.', imageUrl: 'https://img.icons8.com/color/96/plastic-bag.png' },
        ],
    },
    apparelAndTextile: {
        name: 'ملابس وأقمشة',
        items: [
            { key: 'tshirt', name: 'تيشيرت', description: 'a plain t-shirt on a mannequin or flat lay', imageUrl: 'https://img.icons8.com/color/96/t-shirt.png' },
            { key: 'formalShirt', name: 'قميص رسمي', description: 'a formal dress shirt with an embroidered logo on the chest', imageUrl: 'https://img.icons8.com/color/96/shirt.png' },
            { key: 'cap', name: 'قبعة', description: 'a classic baseball cap on a plain surface', imageUrl: 'https://img.icons8.com/color/96/baseball-cap.png' },
            { key: 'apron', name: 'مريلة', description: 'a branded apron for a cafe or restaurant staff', imageUrl: 'https://img.icons8.com/color/96/apron.png' },
            { key: 'jacket', name: 'جاكيت', description: 'a branded jacket for employees or as merchandise', imageUrl: 'https://img.icons8.com/color/96/jacket.png' },
            { key: 'faceMask', name: 'كمامة', description: 'a reusable fabric face mask with a printed logo', imageUrl: 'https://img.icons8.com/color/96/protection-mask.png' },
            { key: 'socks', name: 'جوارب', description: 'a pair of custom branded athletic socks', imageUrl: 'https://img.icons8.com/color/96/socks.png' },
            { key: 'medicalScrubs', name: 'زي طبي', description: 'a set of medical scrubs (top and pants) for a hospital or clinic', imageUrl: 'https://img.icons8.com/color/96/hospital.png' },
            { key: 'safetyVest', name: 'سترة أمان', description: 'a high-visibility safety vest with a logo on the back', imageUrl: 'https://img.icons8.com/color/96/helmet.png' },
            { key: 'uniform', name: 'زي موحد', description: 'a complete employee uniform, such as a polo shirt and trousers', imageUrl: 'https://img.icons8.com/color/96/shirt.png' },
        ],
    },
    promotionalGifts: {
        name: 'هدايا ترويجية',
        items: [
            { key: 'pen', name: 'قلم', description: 'a premium branded ballpoint pen on a notebook', imageUrl: 'https://img.icons8.com/color/96/pen.png' },
            { key: 'keychain', name: 'ميدالية', description: 'a custom metal or leather keychain', imageUrl: 'https://img.icons8.com/color/96/key.png' },
            { key: 'usbDrive', name: 'فلاش ميموري', description: 'a branded USB flash drive', imageUrl: 'https://img.icons8.com/color/96/usb-memory-stick.png' },
            { key: 'mug', name: 'كوب', description: 'a white ceramic coffee mug on a clean table', imageUrl: 'https://img.icons8.com/color/96/cup.png' },
            { key: 'waterBottle', name: 'قارورة ماء', description: 'a reusable metal water bottle', imageUrl: 'https://img.icons8.com/color/96/water-bottle.png' },
            { key: 'coaster', name: 'قاعدة أكواب', description: 'a branded drink coaster made of wood or slate', imageUrl: 'https://img.icons8.com/color/96/record.png' },
            { key: 'mousePad', name: 'ماوس باد', description: 'a custom printed mouse pad next to a keyboard and mouse', imageUrl: 'https://img.icons8.com/color/96/mouse.png' },
            { key: 'wristband', name: 'سوار يد', description: 'a silicone wristband for an event or promotion', imageUrl: 'https://img.icons8.com/color/96/bracelet.png' },
            { key: 'lanyard', name: 'شريط تعليق', description: 'a branded lanyard for event ID cards', imageUrl: 'https://img.icons8.com/color/96/badge.png' },
            { key: 'umbrella', name: 'مظلة', description: 'a large, high-quality umbrella with a logo print', imageUrl: 'https://img.icons8.com/color/96/umbrella.png' },
            { key: 'powerBank', name: 'شاحن متنقل', description: 'a sleek, branded power bank charger', imageUrl: 'https://img.icons8.com/color/96/battery.png' },
            { key: 'phoneGrip', name: 'مسكة هاتف', description: 'a branded pop-out phone grip on the back of a smartphone', imageUrl: 'https://img.icons8.com/color/96/smartphone.png' },
            { key: 'plasticCard', name: 'بطاقة بلاستيكية', description: 'a branded plastic membership or gift card', imageUrl: 'https://img.icons8.com/color/96/bank-cards.png' },
        ],
    },
    interiorAndDisplay: {
        name: 'داخلي ومعارض',
        items: [
            { key: 'officeWall', name: 'جدار مكتب', description: 'a modern office reception area with a blank concrete wall for a logo', imageUrl: 'https://img.icons8.com/color/96/brick-wall.png' },
            { key: 'signage3d', name: 'شعار ثلاثي الأبعاد', description: 'a 3D version of the logo in brushed metal mounted on a concrete wall', imageUrl: 'https://img.icons8.com/color/96/box.png' },
            { key: 'buildingFacade', name: 'واجهة مبنى', description: 'a large logo on the glass facade of a modern corporate building', imageUrl: 'https://img.icons8.com/color/96/building.png' },
            { key: 'frostedGlassOffice', name: 'زجاج مكتبي', description: 'a logo printed on a frosted dark blue, semi-transparent glass wall of a meeting room, with blurred office silhouettes visible behind it', imageUrl: 'https://img.icons8.com/color/96/wine-glass.png' },
            { key: 'glassSticker', name: 'ملصق زجاج', description: 'a frosted logo sticker on a glass office door or window', imageUrl: 'https://img.icons8.com/color/96/price-tag.png' },
            { key: 'backdrop', name: 'خلفية تصوير', description: 'a press conference or event backdrop with a step-and-repeat logo pattern', imageUrl: 'https://img.icons8.com/color/96/theater.png' },
            { key: 'rollupBanner', name: 'بانر رول أب', description: 'a tall roll-up banner stand for a trade show or event', imageUrl: 'https://img.icons8.com/color/96/presentation.png' },
            { key: 'kiosk', name: 'كشك', description: 'a promotional kiosk or booth at a trade show', imageUrl: 'https://img.icons8.com/color/96/shop.png' },
            { key: 'lightSign', name: 'لافتة مضيئة', description: 'a glowing neon or lightbox sign with the logo', imageUrl: 'https://img.icons8.com/color/96/billboard.png' },
            { key: 'receptionDesk', name: 'مكتب استقبال', description: 'the front of a reception desk in a corporate lobby', imageUrl: 'https://img.icons8.com/color/96/desk.png' },
        ],
    },
    outdoorAndVehicles: {
        name: 'خارجي ومركبات',
        items: [
            { key: 'carWrap', name: 'تصميم سيارة', description: 'a full vinyl wrap branding on a modern car', imageUrl: 'https://img.icons8.com/color/96/car.png' },
            { key: 'truckBranding', name: 'شاحنة', description: 'branding on the side of a large delivery truck', imageUrl: 'https://img.icons8.com/color/96/truck.png' },
            { key: 'deliveryBike', name: 'دراجة توصيل', description: 'branding on the delivery box of a scooter or motorcycle', imageUrl: 'https://img.icons8.com/color/96/motorcycle.png' },
            { key: 'billboard', name: 'لوحة إعلانية', description: 'a large outdoor billboard advertisement on a highway', imageUrl: 'https://img.icons8.com/color/96/billboard.png' },
            { key: 'streetBanner', name: 'إعلان شارع', description: 'a banner hanging from a lamppost on a city street', imageUrl: 'https://img.icons8.com/color/96/flag.png' },
            { key: 'outdoorSign', name: 'لافتة خارجية', description: 'a sign outside a company building or store', imageUrl: 'https://img.icons8.com/color/96/billboard.png' },
            { key: 'storefrontSign', name: 'لافتة واجهة متجر', description: 'a main sign above the entrance of a modern storefront or shop', imageUrl: 'https://img.icons8.com/color/96/shop.png' },
            { key: 'bladeSign', name: 'لافتة جانبية', description: 'a modern blade sign projecting from a brick building wall on a city street', imageUrl: 'https://img.icons8.com/color/96/signpost.png' },
            { key: 'lightedBladeSign', name: 'لافتة جانبية ضوئية', description: 'a glowing, illuminated lightbox blade sign at dusk, projecting from the wall of a modern storefront', imageUrl: 'https://img.icons8.com/color/96/street-light.png' },
            { key: 'canopy', name: 'مظلة', description: 'an outdoor promotional tent or canopy at an event', imageUrl: 'https://img.icons8.com/color/96/tent.png' },
            { key: 'flag', name: 'علم', description: 'a large branded flag waving on a flagpole', imageUrl: 'https://img.icons8.com/color/96/flag.png' },
        ],
    },
    restaurantsAndCafes: {
        name: 'مطاعم ومقاهي',
        items: [
            { key: 'menu', name: 'قائمة طعام', description: 'a high-quality restaurant or cafe menu', imageUrl: 'https://img.icons8.com/color/96/restaurant-menu.png' },
            { key: 'takeawayBox', name: 'علب طعام', description: 'branded takeaway food boxes and containers', imageUrl: 'https://img.icons8.com/color/96/hamburger.png' },
            { key: 'napkin', name: 'منديل', description: 'a printed paper napkin with a logo', imageUrl: 'https://img.icons8.com/color/96/paper.png' },
            { key: 'cafeUniform', name: 'زي موحد', description: 'a uniform for cafe staff, like a polo shirt or apron', imageUrl: 'https://img.icons8.com/color/96/waiter.png' },
            { key: 'tableCard', name: 'كرت طاولة', description: 'a small promotional card or tent on a restaurant table', imageUrl: 'https://img.icons8.com/color/96/badge.png' },
            { key: 'loyaltyCard', name: 'بطاقة ولاء', description: 'a customer loyalty card for a coffee shop', imageUrl: 'https://img.icons8.com/color/96/loyalty-card.png' },
        ],
    },
    beautyAndCare: {
        name: 'عناية وتجميل',
        items: [
            { key: 'cosmeticJar', name: 'عبوة كريم', description: 'a cosmetic jar for cream or lotion', imageUrl: 'https://img.icons8.com/color/96/makeup.png' },
            { key: 'perfumeBottle', name: 'زجاجة عطر', description: 'a luxury perfume bottle with custom packaging', imageUrl: 'https://img.icons8.com/color/96/perfume-bottle.png' },
            { key: 'shampooBottle', name: 'عبوة شامبو', description: 'a bottle for shampoo or conditioner', imageUrl: 'https://img.icons8.com/color/96/shampoo.png' },
            { key: 'giftBox', name: 'صندوق هدايا', description: 'a gift box set for beauty products', imageUrl: 'https://img.icons8.com/color/96/gift.png' },
            { key: 'sealTape', name: 'شريط لاصق', description: 'branded sealing tape for packaging', imageUrl: 'https://img.icons8.com/color/96/scotch-tape.png' },
        ],
    },
    printers: {
        name: 'الطابعات',
        items: [
            { key: 'largeFormatPrinter', name: 'طابعة لوحات إعلانية', description: 'A photorealistic scene of a wide-format industrial roll-to-roll printer in a modern print shop. The printer is actively printing the provided design onto a large vinyl banner. A small portion of the top of the design is still inside the printer mechanism, while the majority of the banner, showcasing the crisp and vibrant printed design, is flowing out onto a collection tray. The lighting should be professional and highlight the details of the printer and the high-quality print.', imageUrl: 'https://img.icons8.com/color/96/print.png' },
            { key: 'officePrinter', name: 'طابعة ورقية', description: 'A photorealistic scene of a high-end office laser printer on a desk. The printer has just finished printing the provided design onto an A4 paper sheet. The paper is emerging from the output tray, with the top edge still inside the printer and most of the printed design clearly visible. The scene should have realistic office lighting and textures.', imageUrl: 'https://img.icons8.com/color/96/print.png' },
            { key: 'fabricPrinter', name: 'طابعة قماشية', description: 'A photorealistic scene of a direct-to-garment (DTG) or textile printer. The printer is in the process of printing the provided design onto a piece of white fabric (like cotton for a t-shirt) that is stretched on the printing platen. The print head is visible over the fabric, and the design is partially printed, with the unprinted part still clear. The scene should show the texture of the fabric and the vibrant ink being applied.', imageUrl: 'https://img.icons8.com/color/96/print.png' },
            { key: 'handheldPrinter', name: 'طابعة يدوية', description: 'A photorealistic, close-up action shot of a person\'s hand holding a modern handheld inkjet printer. The printer is gliding across a surface (like a cardboard box or a wooden plank) and printing the provided design directly onto it. The print head is mid-way through the design, showing part of it already printed flawlessly and the other part yet to be printed. The scene should be dynamic with a slight motion blur on the background to emphasize the printing action.', imageUrl: 'https://img.icons8.com/color/96/barcode-scanner.png' },
            { key: 'laserEngraver', name: 'طابعة ليزر (حفر)', description: 'A photorealistic, detailed top-down or angled view of a CNC laser engraver machine in a workshop. The laser beam is actively etching the provided design onto a flat piece of light-colored wood (like birch plywood). The design is partially engraved, with the laser head positioned over the un-engraved part, and a subtle wisp of smoke is visible. The engraved area should show realistic depth and texture. The lighting should highlight the contrast between the engraved and raw wood.', imageUrl: 'https://img.icons8.com/color/96/laser-beam.png' },
        ],
    },
};

const allBrandingItems = Object.values(brandingData).flatMap(category => category.items);

const ASPECT_RATIOS: Record<string, string> = {
    "1:1": "مربع",
    "16:9": "أفقي (شاشة)",
    "9:16": "عمودي (ستوري)",
    "4:3": "أفقي (عرض)",
    "3:4": "عمودي (صورة)",
    "3:2": "أفقي (كاميرا)",
    "2:3": "عمودي (كاميرا)",
    "5:4": "أفقي (قصير)",
    "4:5": "عمودي (قصير)",
};

interface GeneratedImage {
    key: BrandingItemKey;
    name: string;
    url: string;
    sourceLogo: string;
}

interface BrandingStudioProps {
  onBack: () => void;
}

const BRANDING_STATE_KEY = 'brandingStudioState';
const PROJECTS_GALLERY_KEY = 'creativeStudioProjects';
const LOAD_PROJECT_ID_KEY = 'loadProjectId';

interface PersistentBrandingState {
    logoImages: string[];
    watermarkImage: string | null;
    selectedItems: Set<BrandingItemKey>;
    customPrompt: string;
    generatedImages: GeneratedImage[];
    generationMode: GenerationMode;
    combineDesigns: boolean;
    sizingMode: 'preset' | 'custom';
    presetAspectRatio: string;
    customWidth: string;
    customHeight: string;
}

const initialPersistentState: Omit<PersistentBrandingState, 'selectedItems'> & { selectedItems: Set<BrandingItemKey> } = {
    logoImages: [],
    watermarkImage: null,
    selectedItems: new Set(),
    customPrompt: '',
    generatedImages: [],
    generationMode: 'individual',
    combineDesigns: false,
    sizingMode: 'preset',
    presetAspectRatio: '1:1',
    customWidth: '1080',
    customHeight: '1080',
};

export const BrandingStudio: React.FC<BrandingStudioProps> = ({ onBack }) => {
    const [state, setState] = useState<PersistentBrandingState>(() => {
        try {
            const projectIdToLoad = localStorage.getItem(LOAD_PROJECT_ID_KEY);
            if (projectIdToLoad) {
                localStorage.removeItem(LOAD_PROJECT_ID_KEY);
                const projects: Project[] = JSON.parse(localStorage.getItem(PROJECTS_GALLERY_KEY) || '[]');
                const projectToLoad = projects.find(p => p.id === projectIdToLoad);
                if (projectToLoad && projectToLoad.type === 'branding') {
                    const loadedState = projectToLoad.state as PersistentBrandingState;
                    loadedState.selectedItems = new Set(loadedState.selectedItems || []);
                    return loadedState;
                }
            }
            const storedState = localStorage.getItem(BRANDING_STATE_KEY);
            if (storedState) {
                const parsed = JSON.parse(storedState);
                return {
                    ...initialPersistentState,
                    ...parsed,
                    selectedItems: new Set(parsed.selectedItems || []),
                };
            }
        } catch (e) {
            console.error("Failed to parse branding state", e);
        }
        return initialPersistentState;
    });

    const { 
        logoImages, watermarkImage, selectedItems, customPrompt, 
        generatedImages, generationMode, combineDesigns,
        sizingMode, presetAspectRatio, customWidth, customHeight
    } = state;

    // Transient state
    const [isLoading, setIsLoading] = useState(false);
    const [isImprovingPrompt, setIsImprovingPrompt] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>(Object.keys(brandingData)[0]);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    useEffect(() => {
        try {
            const stateToSave = {
                ...state,
                selectedItems: Array.from(state.selectedItems), // Convert Set to Array for JSON compatibility
            };
            localStorage.setItem(BRANDING_STATE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error("Failed to save branding state", e);
        }
    }, [state]);

    const toggleItem = (key: BrandingItemKey) => {
        setState(prev => {
            const newSet = new Set(prev.selectedItems);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return { ...prev, selectedItems: newSet };
        });
    };

    const handleImprovePrompt = async () => {
        if (!customPrompt.trim()) {
            setError("يرجى كتابة وصف أساسي أولاً كنقطة انطلاق للتحسين.");
            return;
        }
        if (selectedItems.size === 0) {
            setError("يرجى تحديد منتج واحد على الأقل لتحسين الأمر له.");
            return;
        }
        setIsImprovingPrompt(true);
        setError(null);
        try {
            const itemsToImprove = allBrandingItems.filter(item => selectedItems.has(item.key));
            const improved = await improveBrandingPrompt(customPrompt, itemsToImprove, generationMode, combineDesigns);
            setState(s => ({ ...s, customPrompt: improved }));
        } catch (e: any) {
            setError(e.message || 'فشل في تحسين الموجه.');
        } finally {
            setIsImprovingPrompt(false);
        }
    };

    const handleGenerate = async () => {
        if (!logoImages || logoImages.length === 0) {
            setError("يرجى رفع صورة شعار واحدة على الأقل.");
            return;
        }
        if (selectedItems.size === 0) {
            setError("يرجى اختيار عنصر واحد على الأقل.");
            return;
        }
        if (!customPrompt.trim()) {
            setError("يرجى كتابة توجيه الدمج.");
            return;
        }
        if (generationMode === 'composite' && logoImages.length > 1) {
            setError("الوضع المجمع يدعم شعارًا واحدًا فقط. لطفًا، اختر صورة واحدة أو استخدم وضع 'الصور الفردية'.");
            return;
        }

        setError(null);
        setIsLoading(true);
        setState(s => ({ ...s, generatedImages: [] }));
        
        let sizingPrompt: string | null = null;
        if (sizingMode === 'preset' && presetAspectRatio) {
            sizingPrompt = `The final image must have a ${presetAspectRatio} aspect ratio.`;
        } else if (sizingMode === 'custom' && customWidth && customHeight) {
            sizingPrompt = `The final image must be exactly ${parseInt(customWidth)} pixels wide and ${parseInt(customHeight)} pixels high.`;
        }


        if (combineDesigns && logoImages.length > 1) {
            const promises = Array.from(selectedItems).map(key => {
                const item = allBrandingItems.find(i => i.key === key);
                if (item) {
                    return generateMultiDesignBrandingImage(logoImages, item.description, customPrompt, watermarkImage, sizingPrompt)
                        .then(url => ({ 
                            key, 
                            name: `مشهد مدمج لـ: ${item.name}`, 
                            url, 
                            sourceLogo: 'combined-designs'
                        }))
                        .catch(e => ({ 
                            key, 
                            name: item.name, 
                            url: null, 
                            error: e, 
                            sourceLogo: 'combined-designs'
                        }));
                }
                return Promise.resolve(null);
            });
            const results = await Promise.allSettled(promises);
            
            const successfulImages: GeneratedImage[] = [];
            results.forEach(result => {
                if (result.status === 'fulfilled' && result.value?.url) {
                    successfulImages.push(result.value as GeneratedImage);
                } else {
                     console.error("Failed to generate a combined image:", result);
                }
            });
            if (successfulImages.length < results.length) {
                 setError("فشل توليد بعض الصور المدمجة. يرجى المحاولة مرة أخرى.");
            }
            if (successfulImages.length === 0 && results.length > 0) {
                setError("فشل توليد جميع الصور المدمجة. يرجى المحاولة مرة أخرى.");
            }
            setState(s => ({ ...s, generatedImages: successfulImages }));

        } else if (generationMode === 'individual') {
            const promises = logoImages.flatMap(logo => 
                Array.from(selectedItems).map(key => {
                    const item = allBrandingItems.find(i => i.key === key);
                    if (item) {
                        return generateBrandingImage(logo, item.description, customPrompt, watermarkImage, sizingPrompt)
                            .then(url => ({ key, name: item.name, url, sourceLogo: logo }))
                            .catch(e => ({ key, name: item.name, url: null, error: e, sourceLogo: logo }));
                    }
                    return Promise.resolve(null);
                })
            );

            const results = await Promise.allSettled(promises);
            
            const successfulImages: GeneratedImage[] = [];
            results.forEach(result => {
                if (result.status === 'fulfilled' && result.value?.url) {
                    successfulImages.push(result.value as GeneratedImage);
                } else {
                     console.error("Failed to generate an image:", result);
                }
            });
            
            if (successfulImages.length < results.length) {
                 setError("فشل توليد بعض الصور. يرجى المحاولة مرة أخرى.");
            }
            if (successfulImages.length === 0 && results.length > 0) {
                setError("فشل توليد جميع الصور. يرجى المحاولة مرة أخرى.");
            }
            setState(s => ({ ...s, generatedImages: successfulImages }));
            
        } else { // Composite mode
            const logoImage = logoImages[0];
            const itemsToGenerate = allBrandingItems.filter(item => selectedItems.has(item.key));
            const itemDescriptions = itemsToGenerate.map(item => item.description);
            const itemNames = itemsToGenerate.map(item => item.name).join(', ');

            try {
              const imageUrl = await generateCompositeBrandingImage(logoImage, itemDescriptions, customPrompt, watermarkImage, sizingPrompt);
              setState(s => ({ ...s, generatedImages: [{ key: 'composite-image', name: `مشهد مجمع: ${itemNames.substring(0, 50)}...`, url: imageUrl, sourceLogo: logoImage }] }));
            } catch (e: any) {
              console.error("Failed to generate composite image:", e);
              setError(e.message || "فشل توليد الصورة المجمعة. يرجى المحاولة مرة أخرى.");
            }
        }

        setIsLoading(false);
    };
    
    const downloadImage = (url: string, name: string) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `branding-${name.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    const reset = () => {
        setState(initialPersistentState);
        setError(null);
        setIsLoading(false);
    }

    const handleSaveProject = () => {
        const projectName = window.prompt("الرجاء إدخال اسم للمشروع:");
        if (!projectName || !projectName.trim()) {
            return;
        }
        
        const thumbnail = generatedImages[0]?.url || logoImages[0];
        if (!thumbnail) {
            alert("لا يمكن حفظ المشروع بدون شعار مرفوع أو صورة مولّدة.");
            return;
        }

        const stateToSave = {
            ...state,
            selectedItems: Array.from(state.selectedItems),
        };

        const newProject: Project = {
            id: `proj_${Date.now()}`,
            name: projectName,
            type: 'branding',
            thumbnail,
            timestamp: new Date().toISOString(),
            state: stateToSave,
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


    const groupedImages = generatedImages.reduce<Record<string, GeneratedImage[]>>((acc, image) => {
        (acc[image.sourceLogo] = acc[image.sourceLogo] || []).push(image);
        return acc;
    }, {});


    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in">
             {previewImageUrl && <ImagePreviewModal imageUrl={previewImageUrl} onClose={() => setPreviewImageUrl(null)} />}
             <header className="relative text-center mb-8">
                <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors">
                    <img src="https://img.icons8.com/color/96/home.png" alt="Home" className="w-6 h-6" />
                </button>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
                    استوديو الهوية البصرية
                </h1>
                <p className="mt-4 text-lg text-gray-400">
                    قم ببناء هوية بصرية متكاملة لعلامتك التجارية.
                </p>
            </header>

            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                    <strong className="font-bold">خطأ! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel: Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                        <ImageUploader id="logo-uploader" title="1. ارفع الشعار أو التصاميم" onImageUpload={(files) => setState(s => ({ ...s, logoImages: files }))} multiple />
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                        <ImageUploader id="watermark-uploader" title="2. أضف علامة مائية (اختياري)" onImageUpload={(files) => setState(s => ({ ...s, watermarkImage: files[0] ?? null }))} />
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">3. اختر المنتجات</h3>
                        <div className="flex items-center justify-between mb-4 border-b border-gray-600">
                             <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                                {Object.entries(brandingData).map(([key, category]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`${
                                            activeTab === key
                                            ? 'border-green-400 text-green-400'
                                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-400'
                                        } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                                    >
                                    <img src={
                                        key === 'officeAndAdmin' ? 'https://img.icons8.com/color/96/stationery.png' :
                                        key === 'digitalAndAds' ? 'https://img.icons8.com/color/96/multiple-devices.png' :
                                        key === 'packagingAndProducts' ? 'https://img.icons8.com/color/96/box.png' :
                                        key === 'bagsAndTotes' ? 'https://img.icons8.com/color/96/shopping-bag.png' :
                                        key === 'apparelAndTextile' ? 'https://img.icons8.com/color/96/t-shirt.png' :
                                        key === 'promotionalGifts' ? 'https://img.icons8.com/color/96/gift.png' :
                                        key === 'interiorAndDisplay' ? 'https://img.icons8.com/color/96/signpost.png' :
                                        key === 'outdoorAndVehicles' ? 'https://img.icons8.com/color/96/car.png' :
                                        key === 'restaurantsAndCafes' ? 'https://img.icons8.com/color/96/restaurant.png' :
                                        key === 'beautyAndCare' ? 'https://img.icons8.com/color/96/makeup.png' :
                                        key === 'printers' ? 'https://img.icons8.com/color/96/print.png' :
                                        'https://img.icons8.com/color/96/category.png'
                                    } alt={category.name} className="w-4 h-4" />
                                    <span>{category.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="flex justify-end gap-2 mb-4">
                            <button
                                onClick={() => {
                                    const allKeys = brandingData[activeTab].items.map(i => i.key);
                                    setState(s => {
                                        const newSet = new Set(s.selectedItems);
                                        allKeys.forEach(k => newSet.add(k));
                                        return { ...s, selectedItems: newSet };
                                    });
                                }}
                                className="flex items-center gap-1 text-xs bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded transition-colors"
                            >
                                <img src="https://img.icons8.com/color/96/checked-checkbox.png" alt="Select All" className="w-4 h-4" />
                                <span>تحديد الكل</span>
                            </button>
                            <button
                                onClick={() => {
                                    const allKeys = brandingData[activeTab].items.map(i => i.key);
                                    setState(s => {
                                        const newSet = new Set(s.selectedItems);
                                        allKeys.forEach(k => newSet.delete(k));
                                        return { ...s, selectedItems: newSet };
                                    });
                                }}
                                className="flex items-center gap-1 text-xs bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded transition-colors"
                            >
                                <img src="https://img.icons8.com/color/96/unchecked-checkbox.png" alt="Deselect All" className="w-4 h-4" />
                                <span>إلغاء التحديد</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {brandingData[activeTab].items.map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => toggleItem(item.key)}
                                    className={`flex flex-col items-center justify-center gap-2 p-2 rounded-lg border-2 transition-all duration-200 aspect-square ${selectedItems.has(item.key) ? 'bg-green-500/20 border-green-500' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                                >
                                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md" />
                                    <span className="text-xs font-medium text-center">{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-200">4. صف كيفية الدمج</h3>
                            <button
                                onClick={handleImprovePrompt}
                                disabled={!customPrompt.trim() || selectedItems.size === 0 || isImprovingPrompt || isLoading}
                                className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-1 px-3 rounded-lg transition-all"
                            >
                                <img src="https://img.icons8.com/color/96/wizard.png" alt="Improve" className={`w-4 h-4 ${isImprovingPrompt ? 'animate-spin' : ''}`} />
                                <span>تحسين</span>
                            </button>
                         </div>
                          <textarea
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-green-500 focus:border-green-500 transition"
                            rows={4}
                            placeholder="مثال: طباعة عالية الجودة في المنتصف، أو شعار ثلاثي الأبعاد بارز من المعدن المصقول على الحائط."
                            value={customPrompt}
                            onChange={(e) => setState(s => ({ ...s, customPrompt: e.target.value }))}
                         />
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-200 mb-3">5. اختر مقاس الصورة</h3>
                        <div className="flex bg-gray-900 p-1 rounded-lg mb-4">
                            <button
                                onClick={() => setState(s => ({ ...s, sizingMode: 'preset' }))}
                                className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${sizingMode === 'preset' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <img src="https://img.icons8.com/color/96/resize.png" alt="Preset" className="w-4 h-4" />
                                <span>نسب جاهزة</span>
                            </button>
                            <button
                                onClick={() => setState(s => ({ ...s, sizingMode: 'custom' }))}
                                className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${sizingMode === 'custom' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <img src="https://img.icons8.com/color/96/resize-horizontal.png" alt="Custom" className="w-4 h-4" />
                                <span>مقاس مخصص</span>
                            </button>
                        </div>
                        
                        {sizingMode === 'preset' ? (
                            <div className="animate-fade-in">
                                <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">اختر النسبة</label>
                                <select
                                    id="aspectRatio"
                                    value={presetAspectRatio}
                                    onChange={(e) => setState(s => ({...s, presetAspectRatio: e.target.value}))}
                                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                                >
                                    {Object.entries(ASPECT_RATIOS).map(([value, name]) => (
                                        <option key={value} value={value}>{name} ({value})</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 animate-fade-in">
                                <div>
                                    <label htmlFor="customWidth" className="block text-sm font-medium text-gray-300 mb-2">العرض (px)</label>
                                    <input
                                        id="customWidth"
                                        type="number"
                                        value={customWidth}
                                        onChange={(e) => setState(s => ({...s, customWidth: e.target.value}))}
                                        className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="customHeight" className="block text-sm font-medium text-gray-300 mb-2">الطول (px)</label>
                                    <input
                                        id="customHeight"
                                        type="number"
                                        value={customHeight}
                                        onChange={(e) => setState(s => ({...s, customHeight: e.target.value}))}
                                        className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">6. اختر طريقة الإنشاء</h3>
                       {logoImages.length > 1 && (
                            <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg mb-3">
                                <label htmlFor="combineDesigns" className="text-sm font-medium text-gray-200">
                                    دمج التصاميم في صورة واحدة
                                    <p className="text-xs text-gray-400">يولد صورة لكل منتج تحتوي على كل التصاميم.</p>
                                </label>
                                <button
                                    onClick={() => setState(s => ({ ...s, combineDesigns: !s.combineDesigns }))}
                                    disabled={generationMode === 'composite'}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${combineDesigns ? 'bg-green-600' : 'bg-gray-600'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${combineDesigns ? '-translate-x-6' : '-translate-x-1'}`} />
                                </button>
                            </div>
                        )}
                      <div className="flex bg-gray-900 p-1 rounded-lg">
                        <button
                          onClick={() => setState(s => ({ ...s, generationMode: 'individual' }))}
                          className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${generationMode === 'individual' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                          <img src="https://img.icons8.com/color/96/gallery.png" alt="Individual" className="w-4 h-4" />
                          <span>صور فردية</span>
                        </button>
                        <button
                          onClick={() => {
                            setState(s => ({ ...s, generationMode: 'composite', combineDesigns: false }));
                          }}
                          className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${generationMode === 'composite' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                          <img src="https://img.icons8.com/color/96/collage.png" alt="Composite" className="w-4 h-4" />
                          <span>صورة مجمعة</span>
                        </button>
                      </div>
                       {generationMode === 'composite' && logoImages.length > 1 && (
                        <p className="text-xs text-yellow-400 mt-2">ملاحظة: الوضع المجمع يستخدم أول شعار تم رفعه فقط.</p>
                      )}
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || logoImages.length === 0 || selectedItems.size === 0 || !customPrompt.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all text-lg"
                        >
                            <img src="https://img.icons8.com/color/96/wizard.png" alt="Generate" className="w-6 h-6" />
                            <span>توليد الهوية البصرية ({selectedItems.size})</span>
                        </button>
                         <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleSaveProject}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                              >
                                <img src="https://img.icons8.com/color/96/save.png" alt="Save" className="w-5 h-5" />
                                <span>حفظ المشروع</span>
                              </button>
                            <button
                                onClick={reset}
                                className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                              >
                                <img src="https://img.icons8.com/color/96/clear-symbol.png" alt="Clear" className="w-5 h-5" />
                                <span>مسح الكل</span>
                              </button>
                        </div>
                    </div>
                </div>
                
                {/* Right Panel: Results */}
                <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl border border-gray-700 min-h-[500px] flex flex-col items-center justify-center">
                    {isLoading && (
                         <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto"></div>
                            <p className="mt-4 text-lg text-gray-300">يتم توليد مجموعة الهوية البصرية... قد يستغرق هذا بعض الوقت.</p>
                        </div>
                    )}
                    
                    {!isLoading && generatedImages.length > 0 && (
                        <div className="w-full h-full overflow-y-auto">
                            <h2 className="text-3xl font-bold mb-6 text-center">هويتك البصرية جاهزة</h2>
                            <div className="space-y-8">
                            {Object.entries(groupedImages).map(([sourceLogo, images]: [string, GeneratedImage[]]) => (
                                <div key={sourceLogo}>
                                    <div className="flex items-center gap-3 mb-4 p-2 bg-gray-900/50 rounded-lg">
                                       {sourceLogo === 'combined-designs' ? (
                                            <>
                                                <div className="flex -space-x-4">
                                                    {logoImages.slice(0, 3).map((logo, index) => (
                                                        <img 
                                                            key={index} 
                                                            src={logo} 
                                                            alt={`Source design ${index + 1}`} 
                                                            className="w-12 h-12 rounded-full border-2 border-gray-600 object-contain bg-white"
                                                        />
                                                    ))}
                                                    {logoImages.length > 3 && (
                                                        <div className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-700 flex items-center justify-center text-white font-bold">
                                                            +{logoImages.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-300">نتائج التصاميم المدمجة:</h3>
                                            </>
                                        ) : (
                                            <>
                                                <img src={sourceLogo} alt="Source design" className="w-12 h-12 rounded-md border-2 border-gray-600 object-contain bg-white"/>
                                                <h3 className="text-xl font-semibold text-gray-300">نتائج التصميم:</h3>
                                            </>
                                        )}
                                    </div>
                                    <div className={`grid gap-4 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                                        {images.map(image => (
                                            <div key={image.key + image.url} className="relative group rounded-lg overflow-hidden border border-gray-700">
                                                <img src={image.url} alt={`Generated ${image.name}`} className="w-full h-full object-cover aspect-square"/>
                                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                                    <h4 className="font-bold text-lg text-white text-center mb-4">{image.name}</h4>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => setPreviewImageUrl(image.url)} className="bg-gray-600 hover:bg-gray-500 p-3 rounded-full text-white">
                                                            <img src="https://img.icons8.com/color/96/visible.png" alt="Preview" className="w-6 h-6" />
                                                        </button>
                                                        <button onClick={() => downloadImage(image.url, `${image.key}-${images.indexOf(image)}`)} className="bg-green-600 hover:bg-green-700 p-3 rounded-full text-white">
                                                            <img src="https://img.icons8.com/color/96/download.png" alt="Download" className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             ))}
                             </div>
                        </div>
                    )}
                    
                    {!isLoading && generatedImages.length === 0 && (
                        <div className="text-center text-gray-500">
                            <img src="https://img.icons8.com/color/96/wizard.png" alt="Magic" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold">مستعد لبناء علامتك التجارية</h3>
                            <p>اتبع الخطوات على اليسار للبدء.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
