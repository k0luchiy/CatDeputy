import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ContactSettingsProvider } from './contexts/ContactSettingsContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <ContactSettingsProvider>
          <DataProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </DataProvider>
        </ContactSettingsProvider>
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>
);