import React, { createContext, useContext, useState, ReactNode } from 'react';
// FIX: import NewsArticle type
import type { EventItem, Law, Decree, Resolution, BudgetItem, Material, Program, ExternalResource, Contact, Message, NewsArticle } from '../types';
import { 
    eventPlanItems as initialEvents, 
    lawPassportItems as initialLaws, 
    decreeItems as initialDecrees,
    resolutionItems as initialResolutions,
    budgetItems as initialBudgetItems,
    materialsItems as initialMaterials,
    programItems as initialPrograms,
    resourceItems as initialResources,
    contacts as initialContacts,
    initialMessages,
    // FIX: import news articles from mock data
    newsArticles as initialNewsArticles
} from '../data/mockData';

interface DataContextType {
  events: EventItem[];
  laws: Law[];
  decrees: Decree[];
  resolutions: Resolution[];
  budgetItems: BudgetItem[];
  materials: Material[];
  programs: Program[];
  resources: ExternalResource[];
  contacts: Contact[];
  messages: Message[];
  // FIX: Add newsArticles to the context type
  newsArticles: NewsArticle[];
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  addLaw: (law: Omit<Law, 'id'>) => void;
  addDecree: (decree: Omit<Decree, 'id'>) => void;
  addResolution: (resolution: Omit<Resolution, 'id'>) => void;
  addBudget: (item: Omit<BudgetItem, 'id'>) => void;
  addMaterial: (item: Omit<Material, 'id'>) => void;
  addProgram: (item: Omit<Program, 'id'>) => void;
  addResource: (item: Omit<ExternalResource, 'id'>) => void;
  addContact: (item: Omit<Contact, 'id' | 'initials' | 'color' | 'groupId'>) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const colors = ['bg-cyan-500', 'bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-amber-600'];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<EventItem[]>(initialEvents);
    const [laws, setLaws] = useState<Law[]>(initialLaws);
    const [decrees, setDecrees] = useState<Decree[]>(initialDecrees);
    const [resolutions, setResolutions] = useState<Resolution[]>(initialResolutions);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
    const [materials, setMaterials] = useState<Material[]>(initialMaterials);
    const [programs, setPrograms] = useState<Program[]>(initialPrograms);
    const [resources, setResources] = useState<ExternalResource[]>(initialResources);
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    // FIX: Add state for news articles
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(initialNewsArticles);

    const addEvent = (event: Omit<EventItem, 'id'>) => {
        const newEvent: EventItem = { ...event, id: `evt-${Date.now()}` };
        setEvents(prev => [newEvent, ...prev]);
    };

    const addLaw = (law: Omit<Law, 'id'>) => {
        const newLaw: Law = { ...law, id: `law-${Date.now()}` };
        setLaws(prev => [newLaw, ...prev]);
        addEvent({
            title: `Закон: ${newLaw.name.substring(0, 30)}...`,
            date: newLaw.date,
            time: '09:00',
            location: 'Паспорт закона'
        });
    };

    const addDecree = (decree: Omit<Decree, 'id'>) => {
        const newDecree: Decree = { ...decree, id: `dec-${Date.now()}` };
        setDecrees(prev => [newDecree, ...prev]);
        addEvent({
            title: `Указ: ${newDecree.title.substring(0, 30)}...`,
            date: newDecree.date,
            time: '09:00',
            location: 'Указы губернатора'
        });
    };
    
    const addResolution = (resolution: Omit<Resolution, 'id'>) => {
        const newResolution: Resolution = { ...resolution, id: `res-${Date.now()}` };
        setResolutions(prev => [newResolution, ...prev]);
        addEvent({
            title: `Постановление: ${newResolution.title.substring(0, 25)}...`,
            date: newResolution.date,
            time: '09:00',
            location: 'Постановления Правительства'
        });
    };

    const addBudget = (item: Omit<BudgetItem, 'id'>) => {
        const newItem: BudgetItem = { ...item, id: `bud-${Date.now()}` };
        setBudgetItems(prev => [newItem, ...prev]);
    };
    
    const addMaterial = (item: Omit<Material, 'id'>) => {
        const newItem: Material = { ...item, id: `mat-${Date.now()}` };
        setMaterials(prev => [newItem, ...prev]);
        addEvent({
            title: `Материал КС: ${newItem.title.substring(0, 25)}...`,
            date: newItem.date,
            time: '09:00',
            location: 'Материалы КС'
        });
    };

    const addProgram = (item: Omit<Program, 'id'>) => {
        const newItem: Program = { ...item, id: `prg-${Date.now()}` };
        setPrograms(prev => [newItem, ...prev]);
    };
    
    const addResource = (item: Omit<ExternalResource, 'id'>) => {
        const newItem: ExternalResource = { ...item, id: `res-${Date.now()}` };
        setResources(prev => [newItem, ...prev]);
    };

    const addContact = (item: Omit<Contact, 'id' | 'initials' | 'color' | 'groupId'>) => {
        const initials = item.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newItem: Contact = { 
            ...item, 
            id: `con-${Date.now()}`,
            initials,
            color: randomColor,
            groupId: 'g1.3' // Default to Apparatus
        };
        setContacts(prev => [newItem, ...prev]);
    };

    const sendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
        const now = new Date();
        const newMessage: Message = { 
            ...message, 
            id: `msg-${now.getTime()}`, 
            timestamp: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
        };
        setMessages(prev => [...prev, newMessage]);

        // Simulate a reply
        setTimeout(() => {
            const replyNow = new Date();
            const replyMessage: Message = {
                id: `msg-${replyNow.getTime()}`,
                senderId: message.receiverId,
                receiverId: message.senderId,
                text: 'Хорошо, я вас понял. В ближайшее время вернусь с ответом.',
                timestamp: `${replyNow.getHours().toString().padStart(2, '0')}:${replyNow.getMinutes().toString().padStart(2, '0')}`
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };

    const value = {
        // FIX: Provide newsArticles in context value
        events, laws, decrees, resolutions, budgetItems, materials, programs, resources, contacts, messages, newsArticles,
        addEvent, addLaw, addDecree, addResolution, addBudget, addMaterial, addProgram, addResource, addContact, sendMessage
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
