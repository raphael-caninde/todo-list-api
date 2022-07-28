import React, { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [infoUser, setInfoUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

   const handleChange = ({ target: { value, name } }) => {
    setInfoUser({ ...infoUser, [name]: value })
  };

  const data = {
    infoUser,
    setInfoUser,
    handleChange,
  };

  return (
    <AppContext.Provider value={ data }>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;
