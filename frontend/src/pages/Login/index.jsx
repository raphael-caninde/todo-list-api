import React, { useContext, useState } from 'react';
import { localStg } from '../../utils/handleLocalStorage';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../../services/userApi';
import AppContext from '../../context/AppContext';
import { api } from '../../services/axiosService';
import caderno from '../../assets/images/caderno.png'

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setToken, setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { data } = await requestLogin({ email, password });

      const loggedUser = data.user;
      const token = data.user.token

      localStg.set.user(loggedUser);
      localStg.set.token(token);

      setToken(token);
      setUser(loggedUser);

      api.defaults.headers.Authorization = `Bearer ${data.user.token}`;

      navigate('/home');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password)
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:h-screen md:w-screen'>
      <div className='bg-indigo-900 flex flex-col items-center text-white text-7xl'>
        <img src={caderno} alt="imagem-caderno" />
        <h1>Lista de tarefas</h1>
      </div>
      <div className='flex justify-center items-center bg-zinc-100 p-5'>
        <div className="w-96 shadow-xl">
          <div class="relative h-48 rounded-md bg-indigo-900">
            <svg class="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#fff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              </path>
            </svg>
          </div>
          <form className="flex flex-col rounded-md px-3 bg-white">
            <h1 className="text-3xl text-center font-semibold mb-5">Faça seu login</h1>
            <div className='relative mb-6'>
              <input
                className='peer rounded-md w-full p-4 border border-zinc-400 text-lg text-zinc-700 outline-none placeholder:bg-transparent placeholder-transparent left-4 focus:bg-white focus:border-1 focus:border-indigo-500 bg-white'
                id="email"
                type="email"
                name="email"
                value={ email }
                onChange={ ({ target }) => setEmail(target.value) }
                required
                placeholder='Email'
              />
              <label
                className='absolute left-2 -top-2.5 px-1 text-sm transition-all text-zinc-500 bg-white peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-indigo-500'
                htmlFor="email">
                Email*
              </label>
            </div>
            <div className='relative mb-6'>
              <input
                className='peer rounded-md w-full p-4 border border-zinc-400 text-lg text-zinc-700 outline-none placeholder:bg-transparent placeholder-transparent focus:bg-white focus:border-1 focus:border-indigo-500 bg-white'
                id="password"
                type="password"
                name="password"
                value={ password }
                onChange={ ({ target }) => setPassword(target.value) }
                required
                placeholder='Senha'
              />
              <label
                className='absolute left-2 -top-2.5 px-1 text-sm transition-all text-zinc-500 bg-white peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-indigo-500'
                htmlFor="password">
                Senha*
              </label>
            </div>
            <div className='mb-6'>
              <button
                className="bg-green-500 w-full p-2 rounded-lg text-white text-lg font-semibold hover:bg-green-600"
                type="submit"
                onClick={ (e) => handleSubmit(e) }
              >
                ENTRAR
              </button>
            </div>
            <div className="relative mb-6">
              <a
                className='absolute right-4 -top-2 underline underline-offset-1 hover:text-red-500'
                href='/cadastro'
              >
                Crie sua conta!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
