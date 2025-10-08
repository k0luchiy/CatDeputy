import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background-light dark:bg-background-dark flex flex-col justify-center items-center z-50">
      <img src="assets/logo.png" alt="Логотип приложения" className="h-32 w-32 animate-pulse" />
      <p className="mt-4 text-lg font-semibold text-text-secondary-light dark:text-text-secondary-dark">
        Загрузка...
      </p>
    </div>
  );
};

export default SplashScreen;
