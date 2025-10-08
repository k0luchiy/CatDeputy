import React, { useState, useMemo } from 'react';
import DashboardCard from '../components/DashboardCard';
import DashboardListItem from '../components/DashboardListItem';
import { dashboardItems } from '../data/mockData';
import { ViewGridIcon, ViewListIcon } from '../components/icons/CoreIcons';
import { useSettings } from '../contexts/SettingsContext';

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { textSize } = useSettings();

  const filteredItems = useMemo(() => {
    return dashboardItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const gridColsClass = useMemo(() => {
    switch (textSize) {
      case 'lg':
        return 'grid-cols-2';
      case 'sm':
        return 'grid-cols-4';
      case 'base':
      default:
        return 'grid-cols-3';
    }
  }, [textSize]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-grow">
            <input
            type="text"
            placeholder="Поиск по сервисам"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 bg-card-light dark:bg-card-dark border border-transparent rounded-lg focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-transparent outline-none transition"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
        
        <div className="flex items-center p-1 rounded-lg bg-gray-200 dark:bg-card-dark flex-shrink-0">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-background-dark shadow' : 'text-gray-500'}`}
            aria-label="Grid view"
          >
            <ViewGridIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-background-dark shadow' : 'text-gray-500'}`}
            aria-label="List view"
          >
            <ViewListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {filteredItems.length > 0 ? (
        viewMode === 'grid' ? (
          <div className={`grid ${gridColsClass} gap-4`}>
            {filteredItems.map(item => (
              <DashboardCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <DashboardListItem key={item.id} item={item} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-10 px-4">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Сервисы не найдены.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;