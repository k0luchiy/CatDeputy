import React from 'react';
import { useData } from '../contexts/DataContext';

const Budget: React.FC = () => {
    const { budgetItems } = useData();
    return (
        <div className="space-y-4">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {budgetItems.map((item) => (
                        <div key={item.id} className="p-4">
                            <div className="flex items-center mb-2">
                                <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${item.type === 'Документ' ? 'bg-info-light/20 text-info-light dark:bg-info-dark/20 dark:text-info-dark' : 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/20 dark:text-purple-400'}`}>{item.type}</span>
                                <h3 className="font-semibold text-text-main-light dark:text-text-main-dark">{item.title}</h3>
                            </div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{item.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Budget;