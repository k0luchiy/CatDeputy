import React from 'react';
import { useData } from '../contexts/DataContext';

const Programs: React.FC = () => {
    const { programs } = useData();
    return (
        <div className="space-y-4">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {programs.map((item) => (
                        <div key={item.id} className="p-4">
                             <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-text-main-light dark:text-text-main-dark pr-4">{item.title}</p>
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${item.status === 'Действует' ? 'bg-success-light/20 text-success-light dark:bg-success-dark/20 dark:text-success-dark' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Период: {item.period}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Programs;