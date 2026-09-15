import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole, addToast } = useDemo();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Show polite warning toast
    const targetDashboard = userRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';
    return <Navigate to={targetDashboard} replace />;
  }

  return children;
};
