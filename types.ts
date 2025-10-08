import React from 'react';

export type UserRole = 'guest' | 'tester' | 'registered' | null;

export interface DashboardItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  initials: string;
  color: string;
  groupId: string;
  phone?: string;
}

export interface ContactGroup {
    id: string;
    name: string;
    items?: ContactGroup[];
    isExpanded?: boolean;
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    date: string;
    source: string;
    sourceType: string;
    party?: 'ldpr' | 'kprf' | 'new-people';
}

export interface AnalyticsReport {
    id: string;
    title: string;
    category?: string;
    path: string;
}

export interface SalaryData {
    name: string;
    june2025: number;
    janJune2025: number;
    percentage: number;
}

export interface EventItem {
    id: string;
    date: string;
    time: string;
    title: string;
    location: string;
}

export interface Law {
    id: string;
    name: string;
    number: string;
    status: 'Принят' | 'На рассмотрении' | 'Отклонен';
    date: string;
}

export interface Decree {
    id: string;
    title: string;
    number: string;
    date: string;
}

export interface Resolution {
    id: string;
    title: string;
    number: string;
    date: string;
}

export interface BudgetItem {
    id: string;
    title: string;
    type: 'Документ' | 'Статья';
    summary: string;
}

export interface Material {
    id: string;
    title: string;
    date: string;
    committee: string;
}

export interface Program {
    id: string;
    title: string;
    period: string;
    status: 'Действует' | 'Завершена';
}

export interface ExternalResource {
    id: string;
    title: string;
    description: string;
    url: string;
}

export interface ModalField {
    name: string;
    label: string;
    type: 'text' | 'date' | 'time' | 'select' | 'textarea';
    required?: boolean;
    options?: string[];
    placeholder?: string;
}

export interface ModalConfig {
    title: string;
    fields: ModalField[];
    onSubmit: (data: any) => void;
}

export interface Message {
    id: string;
    senderId: 'user' | string;
    receiverId: 'user' | string;
    text: string;
    timestamp: string;
}