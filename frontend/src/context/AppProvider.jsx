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
  const [infoRegister, setInfoRegister] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

   const handleChange = ({ target: { value, name } }) => {
    setInfoRegister({ ...infoRegister, [name]: value })
  };

  const data = {
    user,
    isAuthenticated: !!token,
    infoRegister,
    handleChange,
    loading,
    token,
    setInfoRegister,
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
