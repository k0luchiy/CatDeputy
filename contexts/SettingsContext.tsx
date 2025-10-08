import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TextSize = 'sm' | 'base' | 'lg';

interface SettingsContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const sizeMap: { [key in TextSize]: string } = {
  sm: '13px',
  base: '16px',
  lg: '18px',
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>('base');

  useEffect(() => {
    const storedSize = localStorage.getItem('textSize') as TextSize | null;
    if (storedSize && sizeMap[storedSize]) {
      setTextSizeState(storedSize);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = sizeMap[textSize];
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
  };

  return (
    <SettingsContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};