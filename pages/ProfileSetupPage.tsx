import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SverdlovskOblastLogoIcon } from '../components/icons/CoreIcons';

const ProfileSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const { updateUserProfile } = useAuth();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !title) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            await updateUserProfile({ name, title });
            navigate('/');
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-8">
                    <SverdlovskOblastLogoIcon className="h-16 w-16 text-accent-red-light dark:text-accent-red-dark mb-4"/>
                    <h1 className="text-2xl font-bold text-center text-text-main-light dark:text-text-main-dark">Настройка профиля</h1>
                    <p className="text-sm text-center text-text-secondary-light dark:text-text-secondary-dark mt-1">Заполните информацию о себе</p>
                </div>

                <div className="bg-card-light dark:bg-card-dark p-8 rounded-2xl shadow-soft-diffused">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">ФИО</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-blue-light focus:border-accent-blue-light sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="title"className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Должность</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="organization-title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-blue-light focus:border-accent-blue-light sm:text-sm"
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-blue-light hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue-dark dark:bg-accent-blue-dark disabled:opacity-50"
                            >
                                {isLoading ? 'Сохранение...' : 'Сохранить и продолжить'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupPage;