import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
      <span className="font-medium text-text-main-light dark:text-text-main-dark">Темная тема</span>
       <button 
        onClick={toggleTheme} 
        className={`relative inline-flex items-center h-7 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue-light dark:focus:ring-offset-card-dark ${theme === 'dark' ? 'bg-accent-blue-dark' : 'bg-gray-300'}`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
       >
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
    </div>
  );
};

export default ThemeSwitcher;
