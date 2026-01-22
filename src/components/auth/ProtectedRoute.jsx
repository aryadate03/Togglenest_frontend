import React from 'react';
import { Navigate } from 'react-router-dom';  
import { useAuth } from '../../context/AuthContext';  
import Layout from '../layout/Layout';  

const ProtectedRoute = ({ children }) => {
const { isAuthenticated, loading } = useAuth();

if (loading) {
  return <div className="loading">Loading...</div>;
}

if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

return <Layout>{children}</Layout>;

};

export default ProtectedRoute;