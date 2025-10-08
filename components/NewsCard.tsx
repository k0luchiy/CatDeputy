import React from 'react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="flex flex-col p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft hover:shadow-soft-diffused transition-shadow h-full">
      <h3 className="font-semibold text-accent-blue-light dark:text-accent-blue-dark mb-2 text-base">{article.title}</h3>
      <p className="text-sm text-text-main-light dark:text-text-main-dark mb-3 flex-grow">{article.summary}</p>
      <div className="flex items-center text-xs text-text-secondary-light dark:text-text-secondary-dark space-x-2 mt-auto">
        <span>{article.date}</span>
        <span>•</span>
        <span>{article.source}</span>
      </div>
    </div>
  );
};

export default NewsCard;