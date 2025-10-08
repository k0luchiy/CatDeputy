import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, ariaLabel }) => (
    <button 
        onClick={() => onChange(!checked)} 
        className={`relative inline-flex items-center h-7 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue-light dark:focus:ring-offset-card-dark ${checked ? 'bg-accent-blue-light dark:bg-accent-blue-dark' : 'bg-gray-300 dark:bg-gray-600'}`}
        aria-label={ariaLabel}
        aria-checked={checked}
        role="switch"
    >
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

export default ToggleSwitch;