import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { localStg } from '../../utils/handleLocalStorage';
import { api } from '../../services/axiosService';
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
    <header className="flex w-full items-center justify-around h-20 bg-indigo-900">
      <div>
        <h1 className='text-white text-lg tracking-wide'>
          { `${name} ${lastName}` }
        </h1>
      </div>
      <div>
        <h1 className='text-white text-4xl'>
          Minhas Tarefas
        </h1>
      </div>
      <div>
        <button
          className='bg-red-600 hover:bg-red-700 ease-out duration-150 text-white text-lg font-semibold tracking-wide rounded-lg py-1 px-6'
          type="button"
          onClick={() => logout()}
        >
          SAIR
        </button>
      </div>
    </header>
  )
}
