import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import localStg from '../utils/handleLocalStorage';
import { useNavigate } from 'react-router-dom';
import { api, requestLogin } from '../services/userApi';

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [infoRegister, setInfoRegister] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

   const handleChange = ({ target: { value, name } }) => {
    setInfoRegister({ ...infoRegister, [name]: value })
  };

  const login = async (email, password) => {
    try {
      const { data } = await requestLogin({ email, password });

      const loggedUser = data.user;
      const token = data.token

      api.defaults.headers.Authorization = `Bearer ${ data.token }`;

      localStg.set.user(loggedUser);
      localStg.set.token(token);

      setToken({ token });
      setUser(loggedUser);

      navigate('/home');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      }
    }
  };

  useEffect(() => {
    const token = localStg.get.token();

    if (token) {
      setToken({ token })
    }

    setLoading(false);
  }, []);

  const data = {
    user,
    isAuthenticated: !!token,
    infoRegister,
    login,
    handleChange,
    loading,
  };

  return (
    <AppContext.Provider value={ data }>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;
