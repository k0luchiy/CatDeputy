import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const ChatPage: React.FC = () => {
    const { contactId } = useParams<{ contactId: string }>();
    const { contacts, messages, sendMessage } = useData();
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const contact = contacts.find(c => c.id === contactId);

    const chatMessages = messages.filter(
        msg => (msg.senderId === contactId && msg.receiverId === 'user') ||
               (msg.senderId === 'user' && msg.receiverId === contactId)
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    if (!contact) {
        return <Navigate to="/contacts" replace />;
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !contactId) return;
        sendMessage({
            senderId: 'user',
            receiverId: contactId,
            text: newMessage,
        });
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.senderId !== 'user' && (
                            <div className={`w-8 h-8 rounded-full ${contact.color} flex-shrink-0 flex items-center justify-center`}>
                                <span className="text-white font-bold text-sm">{contact.initials}</span>
                            </div>
                        )}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                            msg.senderId === 'user' 
                            ? 'bg-accent-blue-light dark:bg-accent-blue-dark text-white rounded-br-lg' 
                            : 'bg-card-light dark:bg-card-dark rounded-bl-lg'
                        }`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${
                                msg.senderId === 'user' ? 'text-blue-200' : 'text-text-secondary-light dark:text-text-secondary-dark'
                            } text-right`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Напишите сообщение..."
                        className="w-full p-3 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-accent-blue-light dark:focus:ring-accent-blue-dark focus:border-transparent outline-none transition pl-5"
                        autoComplete="off"
                    />
                    <button type="submit" className="h-12 w-12 flex-shrink-0 bg-accent-blue-light dark:bg-accent-blue-dark text-white rounded-full flex items-center justify-center disabled:opacity-50" disabled={!newMessage.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M3.105 3.105a.75.75 0 0 1 .814-.158l12.685 4.228a.75.75 0 0 1 0 1.348L3.92 12.953a.75.75 0 0 1-.986-1.226L15.337 8.5 3.105 4.455a.75.75 0 0 1 0-1.35Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
