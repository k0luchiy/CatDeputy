import React from 'react';
import { Link } from 'react-router-dom';
import { analyticsReports } from '../data/mockData';
import type { AnalyticsReport } from '../types';

const AnalyticsListItem: React.FC<{ report: AnalyticsReport }> = ({ report }) => (
    <Link to={report.path} className="flex items-center space-x-4 py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-blue-light dark:text-accent-blue-dark flex-shrink-0">
             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m-1.5 0-3.75 3.75m14.25 0-3.75-3.75M3.75 12h16.5M12 3.75v16.5" />
        </svg>
        <p className="text-text-main-light dark:text-text-main-dark">{report.title}</p>
    </Link>
)

const Analytics: React.FC = () => {
    const categories: { [key: string]: AnalyticsReport[] } = {};
    analyticsReports.forEach(report => {
        const category = report.category || 'Общие материалы';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(report);
    });

    return (
        <div className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Поиск по отчетам"
                    className="w-full p-3 pl-10 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-accent-blue-light dark:focus:border-accent-blue-dark outline-none transition"
                />
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            
            <div className="space-y-4">
            {Object.entries(categories).map(([category, reports]) => (
                <div key={category} className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
                    {category !== 'Общие материалы' && <h2 className="px-4 py-2 text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-gray-800 ">{category}</h2>}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                         {reports.map(report => <AnalyticsListItem key={report.id} report={report} />)}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Analytics;