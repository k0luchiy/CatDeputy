import React from 'react';
import { PlusIcon } from './icons/CoreIcons';

interface FloatingActionButtonProps {
  onClick: () => void;
  ariaLabel: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed bottom-20 right-4 z-20 h-14 w-14 rounded-full bg-accent-blue-light dark:bg-accent-blue-dark text-white shadow-lg hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center"
    >
      <PlusIcon className="h-7 w-7" />
    </button>
  );
};

export default FloatingActionButton;