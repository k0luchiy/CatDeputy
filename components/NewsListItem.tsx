import React from 'react';
import type { NewsArticle } from '../types';

interface NewsListItemProps {
  article: NewsArticle;
}

const NewsListItem: React.FC<NewsListItemProps> = ({ article }) => (
    <div className="py-4">
        <h3 className="font-semibold text-accent-blue-light dark:text-accent-blue-dark mb-1">{article.title}</h3>
        <p className="text-sm text-text-main-light dark:text-text-main-dark mb-2">{article.summary}</p>
        <div className="flex items-center text-xs text-text-secondary-light dark:text-text-secondary-dark space-x-2">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.source}</span>
            <span>•</span>
            <span>{article.sourceType}</span>
        </div>
    </div>
);

export default NewsListItem;