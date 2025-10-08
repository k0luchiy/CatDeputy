import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import ContactGroups from './pages/ContactGroups';
import NewsFeed from './pages/NewsFeed';
import Analytics from './pages/Analytics';
import ReportViewer from './pages/ReportViewer';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EventPlan from './pages/EventPlan';
import LawPassport from './pages/LawPassport';
import Decrees from './pages/Decrees';
import Resolutions from './pages/Resolutions';
import Budget from './pages/Budget';
import Materials from './pages/Materials';
import Programs from './pages/Programs';
import Resources from './pages/Resources';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileSetupPage from './pages/ProfileSetupPage';
import ChatPage from './pages/ChatPage';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading to show splash screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show splash for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts-groups" element={<ContactGroups />} />
          <Route path="chat/:contactId" element={<ChatPage />} />
          <Route path="news" element={<NewsFeed />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="analytics/report/salary-2025" element={<ReportViewer />} />
          <Route path="event-plan" element={<EventPlan />} />
          <Route path="law-passport" element={<LawPassport />} />
          <Route path="decrees" element={<Decrees />} />
          <Route path="resolutions" element={<Resolutions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="materials" element={<Materials />} />
          <Route path="programs" element={<Programs />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile-setup" element={<ProfileSetupPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;