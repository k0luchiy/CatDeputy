import React, { useRef } from 'react';
import { UserIcon, CameraIcon } from '../components/icons/CoreIcons';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUserAvatar } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUserDetails = () => {
    if (!user) {
        return { name: 'Гость', description: 'Пользователь не авторизован', email: '-', title: '-' };
    }
    switch (user.role) {
      case 'tester':
        return { name: 'Тестировщик', description: 'Тестовый аккаунт', email: '-', title: 'Тестировщик ПО' };
      case 'registered':
        return { 
          name: user.name || user.email || 'Пользователь', 
          description: 'Авторизованный пользователь', 
          email: user.email || '-', 
          title: user.title || 'Должность не указана' 
        };
      case 'guest':
      default:
        return { name: 'Гость', description: 'Пользователь не авторизован', email: '-', title: '-' };
    }
  };

  const { name, description, email, title } = getUserDetails();

  const handleAvatarClick = () => {
    if (user?.role === 'registered') {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                  updateUserAvatar(reader.result);
              }
          };
          reader.readAsDataURL(file);
      }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center p-8 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
        <div className="relative">
          <button 
            onClick={handleAvatarClick} 
            className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue-light dark:focus:ring-offset-card-dark disabled:cursor-not-allowed" 
            aria-label="Сменить фото профиля"
            disabled={user?.role !== 'registered'}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Фото профиля" className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-16 w-16 text-text-secondary-light dark:text-text-secondary-dark" />
            )}
            {user?.role === 'registered' && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <CameraIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
          />
        </div>
        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark text-center break-words">{name}</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">{description}</p>
      </div>

      <div className="p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold mb-4 text-text-main-light dark:text-text-main-dark">Информация</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Имя</p>
            <p className="text-text-main-light dark:text-text-main-dark break-words">{name}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Должность</p>
            <p className="text-text-main-light dark:text-text-main-dark">{title}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Email</p>
            <p className="text-text-main-light dark:text-text-main-dark break-words">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;