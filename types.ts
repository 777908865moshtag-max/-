
export interface Suggestion {
  title: string;
  description: string;
}

export interface AdvancedSettings {
  photorealism: number;
  preserveText: boolean;
  matchColors: boolean;
  wrapIntensity: number;
  outputType: 'PNG' | 'JPEG';
}

// Types for the new Project Gallery feature
export interface ProjectState {
  // This can be the state from either MockupStudio or BrandingStudio
  [key: string]: any; 
}

export interface Project {
  id: string;
  name: string;
  type: 'mockup' | 'branding';
  thumbnail: string; // base64 string
  timestamp: string; // ISO date string
  state: ProjectState;
}
