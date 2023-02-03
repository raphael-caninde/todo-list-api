import React, { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [user, setUser] = useState({
    id: 0,
    name: '',
    lastName: '',
    email: '',
  });
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const data = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    setLoading,
    setToken,
    setUser,
  };

  return (
    <AppContext.Provider value={ data }>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;
