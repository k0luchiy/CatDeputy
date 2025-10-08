import React from 'react';
import { Link } from 'react-router-dom';
import type { DashboardItem } from '../types';

interface DashboardCardProps {
  item: DashboardItem;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  return (
    <Link to={item.path} className="group flex flex-col items-center justify-center p-2 text-center bg-card-light dark:bg-card-dark rounded-xl shadow-soft hover:shadow-icon-glow transition-shadow aspect-square">
      <div className="transition-transform group-hover:scale-110">
        <item.icon className="h-8 w-8 text-accent-blue-light dark:text-accent-blue-dark mb-2" />
      </div>
      <p className="text-xs font-medium text-text-main-light dark:text-text-main-dark leading-tight">{item.title}</p>
    </Link>
  );
};

export default DashboardCard;