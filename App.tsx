
import React, { useState, useEffect } from 'react';
import { MockupStudio } from './components/MockupStudio';
import { BrandingStudio } from './components/BrandingStudio';
import { ArchiveBoxIcon, HomeIcon, TrashIcon, PencilIcon } from './components/icons';
import { Project } from './types';

type View = 'selector' | 'mockup' | 'branding' | 'gallery';

const APP_VIEW_KEY = 'appView';
const PROJECTS_GALLERY_KEY = 'creativeStudioProjects';
const LOAD_PROJECT_ID_KEY = 'loadProjectId';


// --- Gallery Component (defined in App.tsx to avoid creating new files) ---
const Gallery = ({ onBack, onLoadProject }: { onBack: () => void, onLoadProject: (view: 'mockup' | 'branding') => void }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        try {
            const storedProjects = localStorage.getItem(PROJECTS_GALLERY_KEY);
            if (storedProjects) {
                setProjects(JSON.parse(storedProjects).sort((a: Project, b: Project) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
            }
        } catch (e) {
            console.error("Failed to load projects from localStorage", e);
        }
    }, []);

    const handleDelete = (projectId: string) => {
        if (window.confirm("هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.")) {
            const updatedProjects = projects.filter(p => p.id !== projectId);
            setProjects(updatedProjects);
            localStorage.setItem(PROJECTS_GALLERY_KEY, JSON.stringify(updatedProjects));
        }
    };
    
    const handleOpen = (project: Project) => {
        localStorage.setItem(LOAD_PROJECT_ID_KEY, project.id);
        onLoadProject(project.type);
    };

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in">
            <header className="relative text-center mb-8">
                <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors">
                    <img src="https://img.icons8.com/color/96/home.png" alt="Home" className="w-6 h-6" />
                </button>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    معرض أعمالي
                </h1>
                <p className="mt-4 text-lg text-gray-400">
                    تصفح، افتح، أو احذف مشاريعك المحفوظة.
                </p>
            </header>
            
            {projects.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <img src="https://img.icons8.com/color/96/empty-box.png" alt="Empty" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-semibold">المعرض فارغ</h3>
                    <p>احفظ مشروعاً من أحد الاستوديوهات ليظهر هنا.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden flex flex-col group">
                            <div className="aspect-square w-full bg-gray-900 overflow-hidden">
                                <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-bold text-white text-lg flex-grow">{project.name}</h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    {project.type === 'branding' ? 'مشروع هوية بصرية' : 'مشروع نموذج'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(project.timestamp).toLocaleString('ar-SA')}
                                </p>
                            </div>
                             <div className="p-2 bg-gray-800 grid grid-cols-2 gap-2">
                                <button onClick={() => handleOpen(project)} className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                                    <img src="https://img.icons8.com/color/96/edit--v1.png" alt="Edit" className="w-4 h-4" />
                                    <span>فتح</span>
                                </button>
                                <button onClick={() => handleDelete(project.id)} className="flex items-center justify-center gap-2 w-full bg-red-600/80 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                                    <img src="https://img.icons8.com/color/96/trash--v1.png" alt="Delete" className="w-4 h-4" />
                                    <span>حذف</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const ViewSelector = ({ onSelect }: { onSelect: (view: View) => void }) => {
  return (
    <div className="max-w-6xl mx-auto text-center animate-fade-in">
       <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            أهلاً بك في مشتاق جرافكس
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            اختر الأداة التي تناسب احتياجك. سواء كنت تريد دمج تصميم معين في نموذج جاهز، أو بناء هوية بصرية متكاملة لعلامتك التجارية، أو العودة لمشاريعك المحفوظة.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mockup Studio Card */}
            <div onClick={() => onSelect('mockup')} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center">
                <img src="https://img.icons8.com/color/96/layers.png" alt="Mockup Studio" className="w-20 h-20 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl lg:text-3xl font-bold text-white">استوديو النماذج (Mockup)</h2>
                <p className="mt-4 text-gray-400">
                    ادمج تصميم في نموذج جاهز، ودع الذكاء الاصطناعي يقترح لك طرق دمج احترافية أو قم بتوجيهه بنفسك.
                </p>
                <div className="mt-6 text-indigo-400 group-hover:text-indigo-300 font-semibold flex items-center justify-center gap-2">
                    <span>ابدأ الآن</span>
                    <img src="https://img.icons8.com/color/96/circled-right-2.png" alt="Start" className="w-5 h-5 transform rotate-180" />
                </div>
            </div>

            {/* Branding Studio Card */}
            <div onClick={() => onSelect('branding')} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center">
                <img src="https://img.icons8.com/color/96/design.png" alt="Branding Studio" className="w-20 h-20 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl lg:text-3xl font-bold text-white">استوديو الهوية البصرية</h2>
                <p className="mt-4 text-gray-400">
                    ارفع شعارك، اختر المنتجات، وقم بتوليد مجموعة متكاملة من النماذج لعرض هويتك بأسلوب احترافي.
                </p>
                 <div className="mt-6 text-green-400 group-hover:text-green-300 font-semibold flex items-center justify-center gap-2">
                    <span>ابدأ الآن</span>
                    <img src="https://img.icons8.com/color/96/circled-right-2.png" alt="Start" className="w-5 h-5 transform rotate-180" />
                </div>
            </div>

             {/* Gallery Card */}
            <div onClick={() => onSelect('gallery')} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-yellow-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center">
                 <img src="https://img.icons8.com/color/96/gallery.png" alt="Gallery" className="w-20 h-20 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
                 <h2 className="text-2xl lg:text-3xl font-bold text-white">معرض أعمالي</h2>
                <p className="mt-4 text-gray-400">
                    تصفح، حمّل، أو أكمل العمل على مشاريعك الإبداعية التي قمت بحفظها مسبقًا.
                </p>
                 <div className="mt-6 text-yellow-400 group-hover:text-yellow-300 font-semibold flex items-center justify-center gap-2">
                    <span>افتح المعرض</span>
                    <img src="https://img.icons8.com/color/96/circled-right-2.png" alt="Open" className="w-5 h-5 transform rotate-180" />
                </div>
            </div>
        </div>
    </div>
  )
}


const App: React.FC = () => {
    const [view, setView] = useState<View>(() => {
        try {
            const storedView = localStorage.getItem(APP_VIEW_KEY) as View | null;
            return storedView && storedView !== 'gallery' ? storedView : 'selector'; // Don't start in gallery
        } catch {
            return 'selector';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(APP_VIEW_KEY, view);
        } catch (e) {
            console.error("Failed to save view to localStorage", e);
        }
    }, [view]);


    const renderView = () => {
        switch (view) {
            case 'mockup':
                return <MockupStudio onBack={() => setView('selector')} />;
            case 'branding':
                return <BrandingStudio onBack={() => setView('selector')} />;
            case 'gallery':
                return <Gallery onBack={() => setView('selector')} onLoadProject={(type) => setView(type)} />;
            case 'selector':
            default:
                return <ViewSelector onSelect={setView} />;
        }
    }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-8 font-sans flex items-center justify-center">
        {renderView()}
    </div>
  );
};

export default App;
