import React from 'react';
import type { Law } from '../types';
import { useData } from '../contexts/DataContext';

const getStatusClass = (status: Law['status']) => {
    switch (status) {
        case 'Принят': return 'bg-success-light/20 text-success-light dark:bg-success-dark/20 dark:text-success-dark';
        case 'На рассмотрении': return 'bg-warning-light/20 text-warning-light dark:bg-warning-dark/20 dark:text-warning-dark';
        case 'Отклонен': return 'bg-error-light/20 text-error-light dark:bg-error-dark/20 dark:text-error-dark';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const LawPassport: React.FC = () => {
    const { laws } = useData();
    return (
        <div className="space-y-4">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {laws.map((law) => (
                        <div key={law.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-text-main-light dark:text-text-main-dark pr-4">{law.name}</p>
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${getStatusClass(law.status)}`}>
                                    {law.status}
                                </span>
                            </div>
                            <div className="flex text-sm text-text-secondary-light dark:text-text-secondary-dark space-x-4">
                                <span>№ {law.number}</span>
                                <span>от {new Date(law.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LawPassport;