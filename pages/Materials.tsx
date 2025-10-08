import React from 'react';
import { useData } from '../contexts/DataContext';

const Materials: React.FC = () => {
    const { materials } = useData();
    return (
        <div className="space-y-4">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {materials.map((item) => (
                        <div key={item.id} className="p-4">
                            <p className="font-semibold text-text-main-light dark:text-text-main-dark mb-2">{item.title}</p>
                             <div className="flex text-sm text-text-secondary-light dark:text-text-secondary-dark space-x-2">
                                <span>{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                                <span>•</span>
                                <span>{item.committee}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Materials;