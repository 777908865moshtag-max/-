
import React from 'react';
import { AdvancedSettings as SettingsType } from '../types';
import { SettingsIcon } from './icons';

interface AdvancedSettingsProps {
  settings: SettingsType;
  onSettingsChange: (newSettings: SettingsType) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleToggle = (key: keyof SettingsType) => {
    onSettingsChange({ ...settings, [key]: !settings[key] });
  };

  const handleSlider = (key: keyof SettingsType, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };
  
  const handleSelect = (key: keyof SettingsType, value: string) => {
    onSettingsChange({ ...settings, [key]: value });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
      <div className="flex items-center gap-3">
        <img src="https://img.icons8.com/color/96/settings.png" alt="Settings" className="w-8 h-8 drop-shadow-md" />
        <h3 className="text-xl font-bold text-white">إعدادات متقدمة</h3>
      </div>
      
      {/* Photorealism Slider */}
      <div className="space-y-2">
        <label htmlFor="photorealism" className="block text-sm font-medium text-gray-300">
          الواقعية الفوتوغرافية: <span className="text-indigo-400 font-semibold">{settings.photorealism}%</span>
        </label>
        <input
          id="photorealism"
          type="range"
          min="0"
          max="100"
          value={settings.photorealism}
          onChange={(e) => handleSlider('photorealism', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      {/* Wrap Intensity Slider */}
      <div className="space-y-2">
        <label htmlFor="wrapIntensity" className="block text-sm font-medium text-gray-300">
          شدة الالتفاف: <span className="text-indigo-400 font-semibold">{settings.wrapIntensity}%</span>
        </label>
        <input
          id="wrapIntensity"
          type="range"
          min="0"
          max="100"
          value={settings.wrapIntensity}
          onChange={(e) => handleSlider('wrapIntensity', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
          <label htmlFor="preserveText" className="text-sm font-medium text-gray-200">حفظ النصوص</label>
          <button
            onClick={() => handleToggle('preserveText')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.preserveText ? 'bg-indigo-500' : 'bg-gray-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.preserveText ? '-translate-x-6' : '-translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
          <label htmlFor="matchColors" className="text-sm font-medium text-gray-200">تطابق الألوان</label>
          <button
            onClick={() => handleToggle('matchColors')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.matchColors ? 'bg-indigo-500' : 'bg-gray-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.matchColors ? '-translate-x-6' : '-translate-x-1'}`} />
          </button>
        </div>
      </div>
      
      {/* Output type */}
       <div>
        <label htmlFor="outputType" className="block text-sm font-medium text-gray-300 mb-2">نوع الإخراج</label>
        <select
          id="outputType"
          value={settings.outputType}
          onChange={(e) => handleSelect('outputType', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
        >
          <option value="PNG">PNG</option>
          <option value="JPEG">JPEG</option>
          <option value="PSD" disabled>PSD (قريباً)</option>
        </select>
      </div>

    </div>
  );
};
