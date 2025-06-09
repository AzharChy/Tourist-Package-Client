import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-10 text-green-600 font-bold">Loading...</div>;
  }

  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
