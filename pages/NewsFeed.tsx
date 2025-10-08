import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { parties } from '../data/mockData';
import NewsListItem from '../components/NewsListItem';

const NewsFeed: React.FC = () => {
  const { newsArticles } = useData();
  const [activeTab, setActiveTab] = useState<'zs' | 'parties'>('zs');
  const [zsSearchTerm, setZsSearchTerm] = useState('');
  const [partiesSearchTerm, setPartiesSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState('all');

  const zsNews = useMemo(() => {
    return newsArticles.filter(article => 
      !article.party &&
      (article.title.toLowerCase().includes(zsSearchTerm.toLowerCase()) ||
       article.summary.toLowerCase().includes(zsSearchTerm.toLowerCase()))
    );
  }, [newsArticles, zsSearchTerm]);

  const partyNews = useMemo(() => {
    return newsArticles.filter(article => 
      article.party &&
      (selectedParty === 'all' || article.party === selectedParty) &&
      (article.title.toLowerCase().includes(partiesSearchTerm.toLowerCase()) ||
       article.summary.toLowerCase().includes(partiesSearchTerm.toLowerCase()))
    );
  }, [newsArticles, selectedParty, partiesSearchTerm]);

  const SearchInput: React.FC<{value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string}> = ({ value, onChange, placeholder }) => (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-10 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-accent-blue-light dark:focus:border-accent-blue-dark outline-none transition"
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-lg">
        <button onClick={() => setActiveTab('zs')} className={`w-1/2 text-center py-2 rounded-md font-semibold transition-colors ${activeTab === 'zs' ? 'bg-card-light dark:bg-card-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Новости ЗС</button>
        <button onClick={() => setActiveTab('parties')} className={`w-1/2 text-center py-2 rounded-md font-semibold transition-colors ${activeTab === 'parties' ? 'bg-card-light dark:bg-card-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Новости по фракциям</button>
      </div>

      {activeTab === 'zs' && (
        <div className="space-y-4">
          <SearchInput value={zsSearchTerm} onChange={(e) => setZsSearchTerm(e.target.value)} placeholder="Поиск по новостям ЗС..." />
          <div className="space-y-3">
            {zsNews.length > 0 ? zsNews.map(article => (
              <div key={article.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft px-4">
                <NewsListItem article={article} />
              </div>
            )) : <p className="text-center py-4 text-text-secondary-light dark:text-text-secondary-dark">Новости не найдены.</p>}
          </div>
        </div>
      )}

      {activeTab === 'parties' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchInput value={partiesSearchTerm} onChange={(e) => setPartiesSearchTerm(e.target.value)} placeholder="Поиск по новостям фракций..." />
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="p-3 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-accent-blue-light dark:focus:border-accent-blue-dark outline-none transition"
            >
              <option value="all">Все фракции</option>
              {parties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            {partyNews.length > 0 ? partyNews.map(article => (
              <div key={article.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft px-4">
                <NewsListItem article={article} />
              </div>
            )) : <p className="text-center py-4 text-text-secondary-light dark:text-text-secondary-dark">Новости не найдены.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;