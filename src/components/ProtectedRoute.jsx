import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roleRequired }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but save where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    // Authenticated but wrong role -> send home
    return <Navigate to="/" replace />;
  }

  return children;
}
