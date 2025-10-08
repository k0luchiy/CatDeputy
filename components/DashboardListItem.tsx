import React from 'react';
import { Link } from 'react-router-dom';
import type { DashboardItem } from '../types';

interface DashboardListItemProps {
  item: DashboardItem;
}

const DashboardListItem: React.FC<DashboardListItemProps> = ({ item }) => {
  return (
    <Link to={item.path} className="flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="p-2 bg-accent-blue-light/10 dark:bg-accent-blue-dark/20 rounded-lg mr-4">
        <item.icon className="h-6 w-6 text-accent-blue-light dark:text-accent-blue-dark" />
      </div>
      <span className="font-semibold text-text-main-light dark:text-text-main-dark">{item.title}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
};

export default DashboardListItem;
