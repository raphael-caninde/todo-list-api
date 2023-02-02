import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { localStg } from '../../utils/handleLocalStorage';
import { api } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user: { name, lastName }, setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStg.remove.token();
    localStg.remove.user();
    api.defaults.headers.Authorization = null;
    setUser(null);
    setToken(null);
    navigate('/login');
  }

  return (
    <header className="">
      <h1>Welcome { `${name} ${lastName} !` }</h1>
        <button
          type="button"
          onClick={ () => logout() }
        >
          SAIR
        </button>
    </header>
  )
}
