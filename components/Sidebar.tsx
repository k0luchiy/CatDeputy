import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GridIcon, CogIcon, ArrowLeftOnRectangleIcon, NewspaperIcon, UserIcon, SunIcon, MoonIcon, BookOpenIcon } from './icons/CoreIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
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

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-sidebar-light text-text-main-light dark:bg-sidebar-dark dark:text-text-main-dark shadow-lg z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-8">
            <Link to="/profile" onClick={onClose} className="flex items-center space-x-4 p-2 -ml-2 rounded-lg hover:bg-menu-active-light dark:hover:bg-menu-active-dark">
              <div className="h-12 w-12 rounded-full bg-card-light dark:bg-card-dark flex-shrink-0 flex items-center justify-center border border-gray-300 dark:border-gray-600 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Аватар" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-8 w-8 text-text-secondary-light dark:text-text-secondary-dark" />
                )}
              </div>
              <div>
                <p className="font-semibold text-lg truncate max-w-36">{userName}</p>
              </div>
            </Link>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-menu-active-light dark:hover:bg-menu-active-dark text-text-secondary-light dark:text-text-secondary-dark" aria-label="Toggle theme">
              {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
          </div>
          <nav className="space-y-2">
            <SidebarLink to="/" text="Сервисы" icon={GridIcon} onClick={onClose} />
            <SidebarLink to="/contacts" text="Контакты" icon={BookOpenIcon} onClick={onClose} />
            <SidebarLink to="/news" text="Новостная лента" icon={NewspaperIcon} onClick={onClose} />
            <SidebarLink to="/settings" text="Настройки" icon={CogIcon} onClick={onClose} />
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
           <button onClick={handleLogout} className="flex items-center space-x-4 p-3 rounded-lg w-full text-left hover:bg-menu-active-light dark:hover:bg-menu-active-dark">
              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0"/>
              <span className="text-lg font-medium">Выход</span>
           </button>
        </div>
      </div>
    </>
  );
};

interface SidebarLinkProps {
    to: string;
    text: string;
    icon: React.ComponentType<{className?: string}>;
    onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, text, icon: Icon, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        end={to === '/'}
        className={({ isActive }) => `flex items-center space-x-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-menu-active-light dark:bg-menu-active-dark text-accent-blue-light dark:text-white' : 'hover:bg-menu-active-light dark:hover:bg-menu-active-dark'}`}
    >
        <Icon className="h-6 w-6 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0"/>
        <span className="text-lg font-medium">{text}</span>
    </NavLink>
);


export default Sidebar;