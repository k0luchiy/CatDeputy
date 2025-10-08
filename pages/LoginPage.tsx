import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { loginWithCredentials, loginAsRole, register } = useAuth();
    
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLoginView) {
            try {
                await loginWithCredentials(email, password);
                navigate('/');
            } catch (err: any) {
                setError(err.message);
            }
        } else {
            if (password !== confirmPassword) {
                setError('Пароли не совпадают');
                return;
            }
            try {
                await register(email, password);
                navigate('/profile-setup');
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    const handleRoleLogin = (role: 'guest' | 'tester') => {
        loginAsRole(role);
        navigate('/');
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-8">
                    <img src="assets/logo.png" alt="Логотип приложения" className="h-20 w-20 mb-4"/>
                    <h1 className="text-2xl font-bold text-center text-text-main-light dark:text-text-main-dark">Цифровой кабинет депутата</h1>
                    <p className="text-sm text-center text-text-secondary-light dark:text-text-secondary-dark mt-1">Законодательное Собрание Свердловской области</p>
                </div>

                <div className="bg-card-light dark:bg-card-dark p-8 rounded-2xl shadow-soft-diffused">
                    <h2 className="text-xl font-semibold text-center mb-6 text-text-main-light dark:text-text-main-dark">{isLoginView ? 'Вход' : 'Регистрация'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-blue-light focus:border-accent-blue-light sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isLoginView ? "current-password" : "new-password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-blue-light focus:border-accent-blue-light sm:text-sm"
                            />
                        </div>
                        
                        {!isLoginView && (
                            <div>
                                <label htmlFor="confirm-password"className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Подтвердите пароль</label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-blue-light focus:border-accent-blue-light sm:text-sm"
                                />
                            </div>
                        )}
                        
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-blue-light hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue-dark dark:bg-accent-blue-dark"
                            >
                                {isLoginView ? 'Войти' : 'Зарегистрироваться'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        <button onClick={toggleView} className="font-medium text-accent-blue-light hover:underline dark:text-accent-blue-dark">
                            {isLoginView ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                        </button>
                    </p>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card-light dark:bg-card-dark text-text-secondary-light dark:text-text-secondary-dark">или</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                             <button
                                onClick={() => handleRoleLogin('guest')}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-card-light dark:bg-card-dark text-sm font-medium text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Войти как Гость
                            </button>
                             <button
                                onClick={() => handleRoleLogin('tester')}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-card-light dark:bg-card-dark text-sm font-medium text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Войти как Тестировщик
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;