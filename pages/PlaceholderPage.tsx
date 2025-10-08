import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
      <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-4">{title}</h1>
      <p className="text-text-secondary-light dark:text-text-secondary-dark">Этот раздел находится в разработке.</p>
      <p className="text-text-secondary-light dark:text-text-secondary-dark">Содержимое появится здесь в ближайшее время.</p>
    </div>
  );
};

export default PlaceholderPage;