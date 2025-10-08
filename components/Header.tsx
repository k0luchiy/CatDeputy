import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, UserIcon, ChevronLeftIcon } from './icons/CoreIcons';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  showBackButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick, showBackButton }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isOnProfilePage = location.pathname === '/profile';

  const getUserName = () => {
    if (!user) return 'Гость';
    switch (user.role) {
      case 'tester':
        return 'Тестировщик';
      case 'registered':
        return user.name || user.email || 'Пользователь';
      case 'guest':
      default:
        return 'Гость';
    }
  };
  const userName = getUserName();

  const ProfileIconContent = () => (
    <>
      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark hidden sm:block truncate max-w-28">{userName}</span>
      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        {user?.avatar ? (
          <img src={user.avatar} alt="Аватар" className="h-full w-full object-cover" />
        ) : (
          <UserIcon className="h-5 w-5 text-text-secondary-light dark:text-text-secondary-dark" />
        )}
      </div>
    </>
  );

  const handleBackClick = () => {
    const { pathname } = location;

    if (pathname.startsWith('/analytics/report/')) {
      navigate('/analytics');
    } else if (pathname === '/contacts-groups') {
      navigate('/contacts');
    } else if (pathname === '/news-parties') {
      navigate('/news');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm sticky top-0 z-30 shadow-soft p-4">
      <div className="flex justify-between items-center">
        {showBackButton ? (
          <button onClick={handleBackClick} className="text-accent-blue-light dark:text-accent-blue-dark p-2 -ml-2" aria-label="Назад">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        ) : (
          <button onClick={onMenuClick} className="text-accent-blue-light dark:text-accent-blue-dark p-2 -ml-2" aria-label="Open menu">
            <MenuIcon className="h-6 w-6" />
          </button>
        )}
        
        <div className="absolute left-1/2 -translate-x-1/2">
            {title === 'Законодательное собрание' ? (
              <img src="assets/logo.png" alt="Логотип приложения" className="h-10"/>
            ) : (
              <h1 className="text-lg font-semibold text-text-main-light dark:text-text-main-dark whitespace-nowrap">{title}</h1>
            )}
        </div>
        
        {isOnProfilePage ? (
          <div className="flex items-center space-x-2">
            <ProfileIconContent />
          </div>
        ) : (
          <Link to="/profile" className="flex items-center space-x-2" aria-label="Open profile">
            <ProfileIconContent />
          </Link>
        )}
      </div>
      {title === 'Законодательное собрание' && (
         <h2 className="text-center text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mt-2 tracking-wide uppercase">
            Законодательное собрание свердловской области
        </h2>
      )}
    </header>
  );
};

export default Header;