import React from 'react';
import { useData } from '../contexts/DataContext';

const Resources: React.FC = () => {
    const { resources } = useData();
    return (
        <div className="space-y-4">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {resources.map((item) => (
                         <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.id} className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <p className="font-semibold text-accent-blue-light dark:text-accent-blue-dark">{item.title}</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{item.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;