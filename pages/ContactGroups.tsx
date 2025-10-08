import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { contactGroups } from '../data/mockData';
import type { ContactGroup } from '../types';
import ToggleSwitch from '../components/ToggleSwitch';
import { useContactSettings } from '../contexts/ContactSettingsContext';

const getDescendantIds = (items: ContactGroup[]): string[] => {
    const ids: string[] = [];
    items.forEach(item => {
        ids.push(item.id);
        if (item.items) {
            ids.push(...getDescendantIds(item.items));
        }
    });
    return ids;
};

const GroupItem: React.FC<{ 
    group: ContactGroup; 
    level?: number;
    checkedState: Record<string, boolean>;
    onToggle: (id: string, checked: boolean) => void;
}> = ({ group, level = 0, checkedState, onToggle }) => {
    const [isExpanded, setIsExpanded] = useState(group.isExpanded || false);

    const hasChildren = !!group.items && group.items.length > 0;
    const isChecked = checkedState[group.id] ?? false;

    const toggleExpansion = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div>
            <div className="flex items-start justify-between py-3 min-h-24">
                <div
                    className="flex items-start flex-1 mr-4 min-w-0"
                    onClick={toggleExpansion}
                    style={{ cursor: hasChildren ? 'pointer' : 'default' }}
                    role={hasChildren ? "button" : "presentation"}
                    aria-expanded={isExpanded}
                    tabIndex={hasChildren ? 0 : -1}
                    onKeyDown={(e) => { if (hasChildren && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggleExpansion(); } }}
                >
                    <div 
                        className="flex-shrink-0"
                        style={{ paddingLeft: `${level * 1.5}rem` }}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-4 h-4 mt-1 mr-2 transition-transform text-text-secondary-light dark:text-text-secondary-dark ${isExpanded ? 'rotate-90' : 'rotate-0'} ${hasChildren ? 'opacity-100' : 'opacity-0'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    <span className={`text-text-main-light dark:text-text-main-dark pt-1 ${!isExpanded ? 'line-clamp-3' : ''}`}>{group.name}</span>
                </div>
                <div className="flex-shrink-0 pt-1">
                    <ToggleSwitch checked={isChecked} onChange={(newCheckedState) => onToggle(group.id, newCheckedState)} />
                </div>
            </div>
            {isExpanded && hasChildren && (
                <div>
                    {group.items.map(subGroup => <GroupItem key={subGroup.id} group={subGroup} level={level + 1} checkedState={checkedState} onToggle={onToggle} />)}
                </div>
            )}
        </div>
    )
}

const ContactGroups: React.FC = () => {
    const { groupSettings, setGroupSettings } = useContactSettings();
    const [draftState, setDraftState] = useState<Record<string, boolean>>(groupSettings);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setIsDirty(JSON.stringify(draftState) !== JSON.stringify(groupSettings));
    }, [draftState, groupSettings]);

    const handleToggleChange = useCallback((groupId: string, newCheckedState: boolean) => {
        setDraftState(prevState => {
            const newState = { ...prevState, [groupId]: newCheckedState };
            
            if (!newCheckedState) {
                const findGroup = (id: string, groups: ContactGroup[]): ContactGroup | undefined => {
                    for (const group of groups) {
                        if (group.id === id) return group;
                        if (group.items) {
                            const found = findGroup(id, group.items);
                            if (found) return found;
                        }
                    }
                    return undefined;
                };

                const groupToUpdate = findGroup(groupId, contactGroups);
                if (groupToUpdate && groupToUpdate.items) {
                    const descendantIds = getDescendantIds(groupToUpdate.items);
                    descendantIds.forEach(id => {
                        newState[id] = false;
                    });
                }
            }

            return newState;
        });
    }, []);

    const handleSave = () => {
        setGroupSettings(draftState);
    };

    return (
        <div className="space-y-4">
            <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-lg">
                <NavLink to="/contacts" className={({isActive}) => `w-1/2 text-center py-2 rounded-md font-semibold transition-colors ${isActive ? 'bg-card-light dark:bg-card-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Контакты</NavLink>
                <NavLink to="/contacts-groups" className={({isActive}) => `w-1/2 text-center py-2 rounded-md font-semibold transition-colors ${isActive ? 'bg-card-light dark:bg-card-dark shadow' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Группы</NavLink>
            </div>

            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft px-4 divide-y divide-gray-200 dark:divide-gray-700">
                {contactGroups.map(group => <GroupItem key={group.id} group={group} checkedState={draftState} onToggle={handleToggleChange} />)}
            </div>
             <div className="flex justify-end p-2">
                 <button 
                    onClick={handleSave}
                    disabled={!isDirty}
                    className="text-white bg-accent-blue-light dark:bg-accent-blue-dark font-semibold py-2 px-6 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Готово
                </button>
             </div>
        </div>
    )
};

export default ContactGroups;