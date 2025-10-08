import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { parties } from '../data/mockData';
import { ViewGridIcon, ViewListIcon } from '../components/icons/CoreIcons';
import NewsCard from '../components/NewsCard';
import NewsListItem from '../components/NewsListItem';

const FilteredNewsFeed: React.FC = () => {
  const { partyId } = useParams<{ partyId: string }>();
  const { newsArticles } = useData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const party = parties.find(p => p.id === partyId);

  const filteredArticles = useMemo(() => {
    return newsArticles.filter(article =>
      article.party === partyId &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [newsArticles, partyId, searchTerm]);

  if (!party) {
    return <div className="text-center p-8">Фракция не найдена.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
        <party.icon className="h-12 w-12" />
        <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Новости фракции «{party.name}»</h1>
      </div>
      
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Поиск по новостям"
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
      
      {filteredArticles.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft divide-y divide-gray-200 dark:divide-gray-700 px-4">
            {filteredArticles.map(article => (
              <NewsListItem key={article.id} article={article} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-10 px-4">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Новости не найдены.</p>
        </div>
      )}
    </div>
  );
};

export default FilteredNewsFeed;