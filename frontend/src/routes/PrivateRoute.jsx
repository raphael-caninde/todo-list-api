import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

function PrivateRoute({ children }) {

  const Private = () => {
    const { isAuthenticated, loading } = useContext(AppContext);

    if (loading) {
      return <div>Carregando...</div>
    }

    if (!isAuthenticated) {
      return <Navigate  to="/login" />;
    }
    return children;
  };

  return Private();
};

export default PrivateRoute;
