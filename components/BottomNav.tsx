import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GridIcon, NewspaperIcon, BookOpenIcon } from './icons/CoreIcons';
import { ChartBarIcon } from './icons/FeatureIcons';

const navItems = [
  { path: '/', text: 'Сервисы', icon: GridIcon },
  { path: '/contacts', text: 'Контакты', icon: BookOpenIcon },
  { path: '/news', text: 'Новости', icon: NewspaperIcon },
  { path: '/analytics', text: 'Аналитика', icon: ChartBarIcon },
];

const BottomNav: React.FC = () => {
    const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex justify-around items-stretch h-16 shadow-soft-top">
            {navItems.map((item) => {
                const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center text-center w-1/4 pt-2 pb-1 transition-colors duration-200 ${
                            isActive
                            ? 'text-accent-blue-light dark:text-accent-blue-dark'
                            : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-accent-blue-light dark:hover:text-accent-blue-dark'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <item.icon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">{item.text}</span>
                    </NavLink>
                );
            })}
        </div>
    </div>
  );
};

export default BottomNav;