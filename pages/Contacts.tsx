import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { Contact } from '../types';
import { useContactSettings } from '../contexts/ContactSettingsContext';
import { useData } from '../contexts/DataContext';
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, PhoneArrowUpRightIcon } from '../components/icons/CoreIcons';

const ContactListItem: React.FC<{ contact: Contact; isExpanded: boolean; onToggle: () => void; }> = ({ contact, isExpanded, onToggle }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <button onClick={onToggle} className="w-full flex items-center space-x-4 py-4 text-left" aria-expanded={isExpanded}>
                <div className={`w-12 h-12 rounded-full ${contact.color} flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{contact.initials}</span>
                </div>
                <div className="flex-grow min-w-0">
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark truncate">{contact.name}</p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate">{contact.title}</p>
                </div>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            {isExpanded && (
                 <div className="pb-4 pl-16 space-y-4">
                    {contact.phone && (
                        <div className="flex items-center text-sm space-x-3">
                            <PhoneIcon className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0"/>
                            <span className="text-text-main-light dark:text-text-main-dark">{contact.phone}</span>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2">
                         <a href={`tel:${contact.phone?.replace(/[^\d+]/g, '')}`} className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-accent-blue-light dark:text-accent-blue-dark bg-accent-blue-light/10 dark:bg-accent-blue-dark/20 rounded-lg hover:bg-accent-blue-light/20 dark:hover:bg-accent-blue-dark/30 transition-colors">
                            <PhoneIcon className="w-4 h-4 mr-2"/>
                            Позвонить
                        </a>
                        <Link to={`/chat/${contact.id}`} className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-accent-blue-light dark:text-accent-blue-dark bg-accent-blue-light/10 dark:bg-accent-blue-dark/20 rounded-lg hover:bg-accent-blue-light/20 dark:hover:bg-accent-blue-dark/30 transition-colors">
                            <ChatBubbleLeftEllipsisIcon className="w-4 h-4 mr-2"/>
                            Написать
                        </Link>
                        <button onClick={() => alert('Функция "Звонок в приложении" в разработке.')} className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-accent-blue-light dark:text-accent-blue-dark bg-accent-blue-light/10 dark:bg-accent-blue-dark/20 rounded-lg hover:bg-accent-blue-light/20 dark:hover:bg-accent-blue-dark/30 transition-colors">
                            <PhoneArrowUpRightIcon className="w-4 h-4 mr-2"/>
                            Вызов
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedContactId, setExpandedContactId] = useState<string | null>(null);
  const { groupSettings } = useContactSettings();
  const { contacts } = useData();

  const filteredContacts = contacts.filter(contact =>
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (groupSettings[contact.groupId] !== false)
  );

  const handleToggle = (contactId: string) => {
    setExpandedContactId(prevId => (prevId === contactId ? null : contactId));
  };


  return (
    <div className="space-y-4">
        <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-lg">
            <NavLink to="/contacts" end className={({isActive}) => `w-1/2 text-center py-2 rounded-md font-semibold transition-colors ${isActive ? 'bg-card-light dark:bg-card-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Контакты</NavLink>
            <NavLink to="/contacts-groups" className={({isActive}) => `w-1/2 text-center py-2 rounded-md font-semibold transition-colors ${isActive ? 'bg-card-light dark:bg-card-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Группы</NavLink>
        </div>
        <div className="relative">
            <input
            type="text"
            placeholder="Введите имя, должность, подразделение"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-accent-blue-light dark:focus:border-accent-blue-dark outline-none transition"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>

        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
            <h2 className="p-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase border-b border-gray-200 dark:border-gray-700">Законодательное собрание свердловской области</h2>
            <div className="px-4">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                        <ContactListItem 
                            key={contact.id} 
                            contact={contact} 
                            isExpanded={expandedContactId === contact.id}
                            onToggle={() => handleToggle(contact.id)}
                        />
                    ))
                ) : (
                    <p className="py-4 text-center text-text-secondary-light dark:text-text-secondary-dark">Контакты не найдены или скрыты настройками групп.</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default Contacts;