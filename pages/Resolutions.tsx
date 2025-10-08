import React from 'react';
import { useData } from '../contexts/DataContext';

const Resolutions: React.FC = () => {
    const { resolutions } = useData();
    return (
        <div className="space-y-4">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {resolutions.map((resolution) => (
                        <div key={resolution.id} className="p-4">
                            <p className="font-semibold text-text-main-light dark:text-text-main-dark mb-2">{resolution.title}</p>
                            <div className="flex text-sm text-text-secondary-light dark:text-text-secondary-dark space-x-4">
                                <span>№ {resolution.number}</span>
                                <span>от {new Date(resolution.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resolutions;