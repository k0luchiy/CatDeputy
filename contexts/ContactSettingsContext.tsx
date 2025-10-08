import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { contactGroups } from '../data/mockData';
import type { ContactGroup } from '../types';

type GroupSettings = Record<string, boolean>;

interface ContactSettingsContextType {
  groupSettings: GroupSettings;
  setGroupSettings: (settings: GroupSettings) => void;
}

const ContactSettingsContext = createContext<ContactSettingsContextType | undefined>(undefined);

const getDefaultSettings = (): GroupSettings => {
    const defaultState: GroupSettings = {};
    const populateState = (groups: ContactGroup[]) => {
        groups.forEach(group => {
            defaultState[group.id] = true;
            if (group.items) {
                populateState(group.items);
            }
        });
    };
    populateState(contactGroups);
    return defaultState;
};

export const ContactSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [groupSettings, setGroupSettings] = useState<GroupSettings>(() => {
    try {
      const storedSettings = localStorage.getItem('contactGroupSettings');
      if (storedSettings) {
        return JSON.parse(storedSettings);
      }
    } catch (e) {
      console.error('Failed to parse contact group settings from localStorage', e);
    }
    return getDefaultSettings();
  });

  useEffect(() => {
    try {
        localStorage.setItem('contactGroupSettings', JSON.stringify(groupSettings));
    } catch(e) {
        console.error('Failed to save contact group settings to localStorage', e);
    }
  }, [groupSettings]);

  return (
    <ContactSettingsContext.Provider value={{ groupSettings, setGroupSettings }}>
      {children}
    </ContactSettingsContext.Provider>
  );
};

export const useContactSettings = () => {
  const context = useContext(ContactSettingsContext);
  if (context === undefined) {
    throw new Error('useContactSettings must be used within a ContactSettingsProvider');
  }
  return context;
};