import React from 'react';
import { Navigate } from 'react-router-dom';
import Demo from '../components/ui/demo';
import { useDemo } from '../context/DemoContext';

export const LoginPage = () => {
  const { isAuthenticated, userRole } = useDemo();

  if (isAuthenticated) {
    return <Navigate to={userRole === 'doctor' ? '/doctor-dashboard' : '/patient-intake'} replace />;
  }

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4 my-auto">
      <Demo />
    </div>
  );
};

export default LoginPage;
