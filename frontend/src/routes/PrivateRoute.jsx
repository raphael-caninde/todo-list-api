import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { localStg } from '../utils/handleLocalStorage';
import { api } from '../services/taskApi';

export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading, setToken, setUser, setLoading } = useContext(AppContext);

  useEffect(() => {
    const user = localStg.get.user();
    const token = localStg.get.token();

    if (token && user) {
      setUser(user);
      setToken(token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);

  }, [setLoading, setToken, setUser]);

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!isAuthenticated) {
    return navigate('/login');
  }

  return children;
};
