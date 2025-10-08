import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { UserRole } from '../types';

// NOTE: This is a simulation. In a real app, passwords should be hashed.
interface StoredUser {
  email: string;
  password: string; // Plain text for simulation purposes
  name: string;
  title: string;
  avatar?: string;
}

interface User {
  email?: string;
  name?: string;
  title?: string;
  avatar?: string;
  role: Exclude<UserRole, null>;
}

interface AuthContextType {
  user: User | null;
  loginAsRole: (role: 'guest' | 'tester') => void;
  loginWithCredentials: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  updateUserProfile: (details: { name: string; title: string }) => Promise<void>;
  updateUserAvatar: (avatar: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_DB_KEY = 'usersDB';

const getUsersFromStorage = (): StoredUser[] => {
    try {
        const storedUsers = localStorage.getItem(USERS_DB_KEY);
        return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return [];
    }
}

const setUsersInStorage = (users: StoredUser[]) => {
    try {
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } catch (error) {
        console.error("Failed to save users to localStorage", error);
    }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Failed to save user to sessionStorage", error);
    }
  }, [user]);

  const loginAsRole = (role: 'guest' | 'tester') => {
    setUser({ role });
  };

  const loginWithCredentials = (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const users = getUsersFromStorage();
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!foundUser) {
            reject(new Error('Аккаунт не найден'));
            return;
        }
        if (foundUser.password !== pass) {
            reject(new Error('Неверный пароль'));
            return;
        }
        
        setUser({ email: foundUser.email, role: 'registered', name: foundUser.name, title: foundUser.title, avatar: foundUser.avatar });
        resolve();
    });
  };

  const register = (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const users = getUsersFromStorage();
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (existingUser) {
            reject(new Error('Пользователь с таким email уже существует'));
            return;
        }

        const newUser: StoredUser = { email, password: pass, name: '', title: '', avatar: '' };
        setUsersInStorage([...users, newUser]);
        
        setUser({ email: newUser.email, role: 'registered', name: newUser.name, title: newUser.title, avatar: newUser.avatar });
        resolve();
    });
  }

  const updateUserProfile = (details: { name: string; title: string }): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!user || !user.email) {
            reject(new Error("Пользователь не аутентифицирован."));
            return;
        }

        const users = getUsersFromStorage();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email?.toLowerCase());
        
        if (userIndex === -1) {
            reject(new Error("Не удалось найти пользователя для обновления."));
            return;
        }

        users[userIndex] = { ...users[userIndex], ...details };
        setUsersInStorage(users);
        setUser(prevUser => prevUser ? { ...prevUser, ...details } : null);
        resolve();
    });
  };

  const updateUserAvatar = (avatar: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!user || !user.email) {
            reject(new Error("Пользователь не аутентифицирован."));
            return;
        }

        const users = getUsersFromStorage();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email?.toLowerCase());
        
        if (userIndex === -1) {
            reject(new Error("Не удалось найти пользователя для обновления."));
            return;
        }

        users[userIndex].avatar = avatar;
        setUsersInStorage(users);
        setUser(prevUser => prevUser ? { ...prevUser, avatar } : null);
        resolve();
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsRole, loginWithCredentials, register, updateUserProfile, updateUserAvatar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};