import React from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useSettings } from '../contexts/SettingsContext';

const Settings: React.FC = () => {
  const { textSize, setTextSize } = useSettings();

  return (
    <div className="space-y-6">
      <ThemeSwitcher />
      <div className="p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
        <h2 className="font-medium text-text-main-light dark:text-text-main-dark mb-3">Размер текста</h2>
        <div className="flex justify-between items-center bg-gray-200 dark:bg-card-dark/80 p-1 rounded-lg">
          <button 
            onClick={() => setTextSize('sm')}
            className={`w-1/3 text-center py-2 rounded-md font-semibold transition-colors text-sm ${textSize === 'sm' ? 'bg-white dark:bg-background-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
          >
            A
          </button>
          <button 
            onClick={() => setTextSize('base')}
            className={`w-1/3 text-center py-2 rounded-md font-semibold transition-colors text-base ${textSize === 'base' ? 'bg-white dark:bg-background-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
          >
            A
          </button>
          <button 
            onClick={() => setTextSize('lg')}
            className={`w-1/3 text-center py-2 rounded-md font-semibold transition-colors text-lg ${textSize === 'lg' ? 'bg-white dark:bg-background-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
          >
            A
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
