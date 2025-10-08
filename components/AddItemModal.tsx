import React, { useState, useEffect } from 'react';
import type { ModalConfig, ModalField, UserRole } from '../types';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: ModalConfig | null;
    userRole?: Exclude<UserRole, null>;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, config, userRole }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (config) {
            const initialData = config.fields.reduce((acc, field) => {
                acc[field.name] = field.type === 'select' ? field.options?.[0] || '' : '';
                return acc;
            }, {} as Record<string, any>);
            setFormData(initialData);
        }
    }, [config]);

    if (!isOpen || !config) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        config.onSubmit(formData);
        onClose();
    };

    const renderField = (field: ModalField) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            value: formData[field.name] || '',
            onChange: handleInputChange,
            required: field.required,
            className: "w-full p-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-transparent outline-none transition",
            placeholder: field.placeholder || ''
        };

        switch (field.type) {
            case 'textarea':
                return <textarea {...commonProps} rows={3}></textarea>;
            case 'select':
                return (
                    <select {...commonProps}>
                        {field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                );
            default:
                return <input type={field.type} {...commonProps} />;
        }
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg w-11/12 max-w-md p-6"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 text-text-main-light dark:text-text-main-dark">{config.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {config.fields.map(field => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium mb-1 text-text-secondary-light dark:text-text-secondary-dark">
                                    {field.label}{field.required && <span className="text-red-500">*</span>}
                                </label>
                                {renderField(field)}
                            </div>
                        ))}
                    </div>

                    {userRole === 'tester' && (
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-6 text-center">
                            <strong>Примечание:</strong> В рабочей версии эта функция доступна пользователям с соответствующими правами доступа.
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-text-main-light dark:text-text-main-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                            Отмена
                        </button>
                        <button type="submit" className="text-white bg-accent-blue-light dark:bg-accent-blue-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;