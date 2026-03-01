import React from 'react';

export const UploadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const HomeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const EyeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
  
export const XMarkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- NEW ICONS START ---

export const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const FolderIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013.75 3h5.25a2.25 2.25 0 011.591.659l2.109 2.109A2.25 2.25 0 0015 6.75h3.75a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25m-16.5 0h16.5m-16.5 0v6.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V9.75" />
  </svg>
);

export const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
  </svg>
);

export const IdentificationIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm0 4.5a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
  </svg>
);


export const PhotoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const EnvelopeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const UserGroupIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.501-.054 1.023-.082 1.55-.082a9.095 9.095 0 015.223 1.603m-5.223-1.603a9.095 9.095 0 00-5.223 1.603m5.223-1.603c-.527.002-1.054.022-1.58.061m1.58-.061a9.043 9.043 0 01-1.58.061m6.746-3.423a9.095 9.095 0 00-5.223-1.603m-3.741 0a9.095 9.095 0 00-5.223 1.603m10.446 0a9.095 9.095 0 00-3.741-.479m-6.706 0a9.095 9.095 0 00-3.741-.479m6.706 0a9.095 9.095 0 013.741.479M4.5 19.5a9 9 0 1015 0" />
  </svg>
);

export const DevicePhoneMobileIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H5.25A2.25 2.25 0 003 3.75v16.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25V10.5M10.5 1.5L15 1.5m-4.5 0V5.625c0 .621.504 1.125 1.125 1.125h3.375c.621 0 1.125-.504 1.125-1.125V1.5m-4.5 0h4.5m-4.5 19.5h4.5" />
  </svg>
);

export const ComputerDesktopIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );

export const GlobeAltIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.916 17.916 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );

export const PlayCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
  );

export const MegaphoneIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.287 7.5 15.5 7.5c1.213 0 2.32-.439 3.334-1.136m-1.996 9.864a2.25 2.25 0 013.334 0l-1.162 1.682a2.25 2.25 0 01-3.334 0l-1.162-1.682z" />
    </svg>
  );

export const PresentationChartBarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M12 3v18m-3.75-9h7.5" />
    </svg>
  );

export const TagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
  
export const PencilIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);
  
export const KeyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);
  
export const TruckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" />
    </svg>
);
  
export const FlagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.75-.61a2.25 2.25 0 012.25 2.25M6 15V3.75m0 11.25l2.75-.61a2.25 2.25 0 012.25 2.25m0 0l2.75-.61a2.25 2.25 0 012.25 2.25m0 0l2.75-.61a2.25 2.25 0 012.25 2.25M9 15V3.75m0 11.25l2.75-.61a2.25 2.25 0 012.25 2.25M12 15V3.75m0 11.25l2.75-.61a2.25 2.25 0 012.25 2.25m0 0l2.75-.61a2.25 2.25 0 012.25 2.25M15 15V3.75" />
    </svg>
);
  
export const CreditCardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-3.75l3 1.5-3 1.5m-6-4.5l3 1.5-3 1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 003.75 3h-1.5A2.25 2.25 0 000 5.25v13.5A2.25 2.25 0 002.25 21h1.5zM16.5 21a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0016.5 3h-1.5A2.25 2.25 0 0012.75 5.25v13.5A2.25 2.25 0 0015 21h1.5z" />
    </svg>
);

export const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-1.5 5.25h16.5" />
    </svg>
);

export const CropIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h10M7 3h10a2 2 0 012 2v10" />
  </svg>
);

export const ArchiveBoxIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.123 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5m-7.5 0l-1.299 1.299a1.125 1.125 0 00-1.591 0l-1.299-1.299m0 0l-1.299 1.299a1.125 1.125 0 000 1.591l1.299 1.299m0 0l1.299-1.299a1.125 1.125 0 000-1.591l-1.299-1.299M15 7.5l1.299 1.299a1.125 1.125 0 001.591 0l1.299-1.299m0 0l1.299 1.299a1.125 1.125 0 000 1.591l-1.299-1.299m0 0l-1.299-1.299a1.125 1.125 0 000-1.591l1.299-1.299M8.25 7.5h7.5v9a2.25 2.25 0 01-2.25 2.25h-3a2.25 2.25 0 01-2.25-2.25v-9z" />
  </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const LanyardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V5.25m0 0a3.75 3.75 0 10-7.5 0h7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3.75 3.75 0 11-7.5 0" />
    </svg>
);
export const UmbrellaIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75a8.25 8.25 0 1116.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 4.5z" />
    </svg>
);
export const PowerBankIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.375a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 17.25h16.5a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v9c0 .414.336.75.75.75zM15 12.75h3.75" />
    </svg>
);
export const PhoneGripIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21h3m-3-3v3M12 18v-2.25" />
    </svg>
);
export const ProductLabelsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3h4.5v3h-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21v-6.75a3.375 3.375 0 013.375-3.375h.75a3.375 3.375 0 013.375 3.375V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-6.75a3.375 3.375 0 013.375-3.375h.75M9.75 21H6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 21h3.75v-6.75a3.375 3.375 0 00-3.375-3.375h-.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25h6v2.25H9z" />
    </svg>
);
export const WrappingPaperIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.31-5.32a1.125 1.125 0 00-1.38 0L2.25 6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75l-9.31-5.32m18.62 5.32L12 12.75" />
    </svg>
);
export const MedicalScrubsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5l-2.25 2.25L9 9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 4.5l2.25 2.25L15 9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10.5m0 0l-3-3m3 3l3-3m-3-3h.008v.008H12V9zm-4.5 9.75h9a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-.75a2.25 2.25 0 012.25-2.25z" />
    </svg>
);
export const SafetyVestIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.375 21h11.25L12 3.75 6.375 21zM8.25 10.5h7.5M7.5 15h9" />
    </svg>
);

// --- BRANDING STUDIO - NEW CUSTOM ICONS START ---

export const StampIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 6v2.25m9 0H7.5m9 0l-1.5 6-1.5-6m6 6H4.5m12 0l-1.5 6-1.5-6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75h16.5M3.75 17.25h16.5" />
  </svg>
);

export const PouchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5v1.5h-7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6v12a2.25 2.25 0 002.25 2.25h6a2.25 2.25 0 002.25-2.25V6H6.75z" />
  </svg>
);

export const CanIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75h4.5v1.5h-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 20.25h9V5.25h-9v15z" />
  </svg>
);

export const FoodWrapperIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 17.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l-1.5 2.25m0 10.5l1.5 2.25M18.75 4.5l1.5 2.25m0 10.5l-1.5 2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75v10.5h13.5V6.75H5.25z" />
  </svg>
);

export const ApronIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75L4.5 6.75M16.5 3.75L19.5 6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9v6.75l-4.5 9-4.5-9V3.75z" />
  </svg>
);

export const FaceMaskIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75a7.5 7.5 0 0015 0v-2.25a.75.75 0 00-1.5 0v2.25a6 6 0 01-12 0v-2.25a.75.75 0 00-1.5 0v2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75H3V9.75a.75.75 0 011.5 0v3zm15 0h1.5V9.75a.75.75 0 00-1.5 0v3z" />
  </svg>
);

export const SocksIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 19.5V9.75a2.25 2.25 0 012.25-2.25h1.5c.57 0 1.11.2 1.55.55l3.45 2.95" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5l-.8-2.4a2.25 2.25 0 012.1-2.95h1.2a2.25 2.25 0 012.25 2.25v1.5" />
  </svg>
);

export const UsbDriveIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h6v4.5H9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25-2.25h-9a2.25 2.25 0 01-2.25-2.25v-7.5A2.25 2.25 0 017.5 8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 5.25h3" />
  </svg>
);

export const CoasterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 014.5 4.5z" />
  </svg>
);

export const WristbandIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 000-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 000-12 6 6 0 000 12z" />
  </svg>
);

export const NapkinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3h15v15l-7.5 3-7.5-3V3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3L12 9l7.5-6" />
  </svg>
);

export const TableTentIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5M5.25 19.5L12 6l6.75 13.5" />
  </svg>
);

export const TapeRollIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364L21 21" />
  </svg>
);

// --- BRANDING STUDIO - NEW CUSTOM ICONS END ---

// --- PRINTER ICONS START ---
export const LargeFormatPrinterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75V3h13.5v3.75m-13.5 0V21h13.5V6.75m0 0H5.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

export const OfficePrinterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18v6.75a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75V12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12V3.75a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 3.75V12M9 12h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h6v3H9z" />
    </svg>
);

export const FabricPrinterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h18M5.25 8.25V6a2.25 2.25 0 012.25-2.25h9A2.25 2.25 0 0121 6v2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 17.25h12v-9H6v9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 21h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75h6" />
    </svg>
);

export const HandheldPrinterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25v-3A2.25 2.25 0 019.75 3h4.5A2.25 2.25 0 0116.5 5.25v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.75h12v6a2.25 2.25 0 01-2.25 2.25H8.25A2.25 2.25 0 016 18.75v-6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25h3v4.5h-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15.75h12" />
    </svg>
);

export const LaserEngraverIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25h7.5v1.5h-7.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-1.5 1.5-1.5-1.5 1.5-1.5 1.5 1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 14.25l-1.5-1.5 1.5-1.5" />
    </svg>
);
// --- PRINTER ICONS END ---


// Branding Studio Icons
export const TshirtIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v3.75m6 0V4.5m-6 0h6.75c1.1 0 2.06.94 1.87 2.05l-1.25 7.5c-.17 1.02-.99 1.8-2.02 1.8H8.65c-1.03 0-1.85-.78-2.02-1.8l-1.25-7.5A2.06 2.06 0 017.25 4.5H9z" />
    </svg>
);

export const MugIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25H9.75a2.25 2.25 0 01-2.25-2.25V9a2.25 2.25 0 012.25-2.25h.75m6 0v-1.5a2.25 2.25 0 00-2.25-2.25H12a2.25 2.25 0 00-2.25 2.25v1.5m6 0h-6" />
    </svg>
);

export const CapIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 10.5a8 8 0 11-16 0 8 8 0 0116 0zM12 19.5c-3.14 0-6.1-1.32-8.2-3.48m16.4 0A12.02 12.02 0 0012 19.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25c-3.03 0-5.5-2.47-5.5-5.5S8.97 3.25 12 3.25s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z" transform="rotate(-30 12 8.75)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.8c0-1 .4-1.9 1-2.6" />
    </svg>
);

export const BagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H6.5c-.656 0-1.189-.585-1.119-1.243l1.263-12a1.125 1.125 0 011.12-1.007h8.484c.618 0 1.12.448 1.12 1.007z" />
    </svg>
);

export const HoodieIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 13.5l-1.5 6.75h18l-1.5-6.75M12 3v10.5M12 3c-2.485 0-4.5 2.015-4.5 4.5V12h9v-4.5c0-2.485-2.015-4.5-4.5-4.5zM8.25 13.5h7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5V12m6 1.5V12" />
    </svg>
  );

export const BusinessCardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-3.75l3 1.5-3 1.5m-6-4.5l3 1.5-3 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z" />
    </svg>
);

export const BottleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-3.75m0 0h7.5m-7.5 0a4.5 4.5 0 014.5-4.5h.75a4.5 4.5 0 014.5 4.5v3.75M8.25 21h7.5m-7.5 0H6v-3.75m1.5 3.75v-3.75m0 0h7.5m-7.5 0a4.5 4.5 0 014.5-4.5h.75a4.5 4.5 0 014.5 4.5v3.75m-15-3.75H6m1.5 0v-3.75m0 0h7.5m-7.5 0a4.5 4.5 0 014.5-4.5h.75a4.5 4.5 0 014.5 4.5v3.75m-15-3.75h.008v.008H6V12m0 0h12m-12 0a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v3H9z" />
    </svg>
);

export const BoxIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25-9 5.25M21 7.5v9l-9 5.25-9-5.25v-9M21 7.5L12 12.75 3 7.5M12 22.5V12.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l9-5.25 9 5.25" />
    </svg>
);

export const BuildingIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" />
    </svg>
);

export const StorefrontIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A.75.75 0 0114.25 12h.75c.414 0 .75.336.75.75v7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21V11.25a.75.75 0 01.75-.75H12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21V11.25a.75.75 0 00-.75-.75H12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.25h18M3 6.75h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.75V21M16.5 6.75V21" />
    </svg>
);

export const PlasticBagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75v6.75a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-6.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75L6 3.75h12l2.25 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5h6a1.5 1.5 0 000-3H9a1.5 1.5 0 000 3z" />
    </svg>
);

export const TshirtBagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 9.75L6.75 3.75h10.5l1.5 6v10.5a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V9.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75V7.5a3.75 3.75 0 107.5 0V3.75" />
    </svg>
);
