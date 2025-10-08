import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is registered but has not set up their profile (name is missing),
  // redirect them to the setup page.
  if (user.role === 'registered' && !user.name && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }


  return children;
};

export default ProtectedRoute;