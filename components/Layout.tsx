import React, { useState } from 'react';
import { Outlet, useLocation, matchPath } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import FloatingActionButton from './FloatingActionButton';
import AddItemModal from './AddItemModal';
import { useData } from '../contexts/DataContext';
import type { ModalConfig } from '../types';
import { useAuth } from '../contexts/AuthContext';

const routeTitles: Record<string, string> = {
  '/': 'Законодательное собрание',
  '/contacts': 'Контакты',
  '/contacts-groups': 'Группы контактов',
  '/news': 'Новостная лента',
  '/news-parties': 'Новости по фракциям',
  '/news/filtered/:partyId': 'Новости фракции',
  '/analytics': 'Аналитика',
  '/analytics/report/salary-2025': 'Аналитический отчет',
  '/event-plan': 'План мероприятий',
  '/law-passport': 'Паспорт закона',
  '/decrees': 'Указы губернатора',
  '/resolutions': 'Постановления Правительства',
  '/budget': 'Исполнение бюджета',
  '/materials': 'Материалы КС',
  '/programs': 'Гос. программы',
  '/resources': 'Внешние ресурсы',
  '/settings': 'Настройки',
  '/profile': 'Профиль',
};

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const dataContext = useData();
  const { addEvent, addLaw, addDecree, addResolution, addBudget, addMaterial, addProgram, addResource, addContact } = dataContext;

  const getTitle = () => {
    const chatMatch = matchPath('/chat/:contactId', location.pathname);
    if (chatMatch) {
      const contact = dataContext.contacts.find(c => c.id === chatMatch.params.contactId);
      return contact ? contact.name : 'Чат';
    }
    for (const path in routeTitles) {
      if (matchPath(path, location.pathname)) {
        return routeTitles[path];
      }
    }
    return 'Законодательное собрание';
  };
  
  const title = getTitle();
  const showBackButton = location.pathname !== '/';
  const hideBottomNav = location.pathname.startsWith('/chat/');

  const fabPaths = [
    '/contacts',
    '/event-plan',
    '/law-passport',
    '/decrees',
    '/resolutions',
    '/budget',
    '/materials',
    '/programs',
    '/resources'
  ];

  const canShowFabForPath = fabPaths.includes(location.pathname);
  let showFab = false;
  if (user && canShowFabForPath) {
    if (user.role === 'tester') {
      showFab = true;
    } else if ((user.role === 'guest' || user.role === 'registered') && location.pathname === '/event-plan') {
      showFab = true;
    }
  }

  const handleFabClick = () => {
    const pathname = location.pathname;
    let config: ModalConfig | null = null;

    switch (pathname) {
      case '/contacts':
        config = {
          title: 'Добавить контакт',
          fields: [
            { name: 'name', label: 'Имя', type: 'text', required: true },
            { name: 'title', label: 'Должность', type: 'text', required: true },
          ],
          onSubmit: (data) => addContact(data),
        };
        break;
      case '/event-plan':
        config = {
          title: 'Добавить событие',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'date', label: 'Дата', type: 'date', required: true },
            { name: 'time', label: 'Время', type: 'time', required: true },
            { name: 'location', label: 'Место', type: 'text', required: true },
          ],
          onSubmit: (data) => addEvent(data),
        };
        break;
      case '/law-passport':
        config = {
          title: 'Добавить закон',
          fields: [
            { name: 'name', label: 'Название', type: 'text', required: true },
            { name: 'number', label: 'Номер', type: 'text', required: true },
            { name: 'date', label: 'Дата', type: 'date', required: true },
            { name: 'status', label: 'Статус', type: 'select', options: ['Принят', 'На рассмотрении', 'Отклонен'], required: true },
          ],
          onSubmit: (data) => addLaw(data as any),
        };
        break;
      case '/decrees':
        config = {
          title: 'Добавить указ',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'number', label: 'Номер', type: 'text', required: true },
            { name: 'date', label: 'Дата', type: 'date', required: true },
          ],
          onSubmit: (data) => addDecree(data),
        };
        break;
      case '/resolutions':
        config = {
          title: 'Добавить постановление',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'number', label: 'Номер', type: 'text', required: true },
            { name: 'date', label: 'Дата', type: 'date', required: true },
          ],
          onSubmit: (data) => addResolution(data),
        };
        break;
      case '/budget':
        config = {
          title: 'Добавить запись в бюджет',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'summary', label: 'Описание', type: 'textarea', required: true },
            { name: 'type', label: 'Тип', type: 'select', options: ['Документ', 'Статья'], required: true },
          ],
          onSubmit: (data) => addBudget(data as any),
        };
        break;
      case '/materials':
         config = {
          title: 'Добавить материал',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'committee', label: 'Комитет', type: 'text', required: true },
            { name: 'date', label: 'Дата', type: 'date', required: true },
          ],
          onSubmit: (data) => addMaterial(data),
        };
        break;
      case '/programs':
        config = {
          title: 'Добавить программу',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'period', label: 'Период', type: 'text', required: true, placeholder: '2025-2030' },
            { name: 'status', label: 'Статус', type: 'select', options: ['Действует', 'Завершена'], required: true },
          ],
          onSubmit: (data) => addProgram(data as any),
        };
        break;
      case '/resources':
        config = {
          title: 'Добавить ресурс',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true },
            { name: 'description', label: 'Описание (URL)', type: 'text', required: true },
            { name: 'url', label: 'Ссылка', type: 'text', required: true, placeholder: 'https://...' },
          ],
          onSubmit: (data) => addResource(data),
        };
        break;
      default:
        alert('Добавление нового элемента...');
        return;
    }
    setModalConfig(config);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalConfig(null);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-base text-text-main-light dark:text-text-main-dark">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col min-h-screen">
        <Header 
          title={title} 
          onMenuClick={() => setSidebarOpen(true)}
          showBackButton={showBackButton}
        />
        <main className={`flex-grow p-4 ${!hideBottomNav ? 'pb-20' : ''}`}>
          <Outlet />
        </main>
        {showFab && <FloatingActionButton onClick={handleFabClick} ariaLabel="Добавить новый элемент" />}
        <AddItemModal isOpen={isModalOpen} onClose={closeModal} config={modalConfig} userRole={user?.role} />
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;