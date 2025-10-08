import React from 'react';
import { Link } from 'react-router-dom';
import { parties } from '../data/mockData';

const NewsParties: React.FC = () => {
    return (
        <div className="space-y-4">
             <Link to="/news" className="block p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="font-semibold text-text-main-light dark:text-text-main-dark">Новости о Законодательном Собрании</span>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </Link>
            <div className="grid grid-cols-3 gap-3">
                {parties.map(party => (
                    <Link to={`/news/filtered/${party.id}`} key={party.id} className="flex flex-col items-center justify-center p-2 text-center bg-card-light dark:bg-card-dark rounded-xl shadow-soft hover:shadow-soft-diffused transition-shadow aspect-square">
                        <party.icon className="h-16 object-contain mb-2"/>
                        <p className="text-xs font-medium text-text-main-light dark:text-text-main-dark leading-tight mt-auto">{party.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsParties;