import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/userApi';
import { ShowPassword } from '../../components/ShowPassword';

export function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [iconEye, inputType] = ShowPassword()

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const dataUser = {name, lastName, email, password};

    try {
      const { request } = await userRegister(dataUser);

      if (request.status === 201) {
        navigate('/login');
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      };
    };
  };

  return (
    <div className='flex flex-col items-center gap-14 p-2 h-screen w-screen bg-zinc-300'>
      <div className='flex justify-center mt-10'>
        <h3 className='text-4xl text-center font-semibold text-indigo-700'>
          CRIAR CONTA
        </h3>
      </div>
      <div className='flex justify-center w-80 md:w-96 rounded-lg bg-white'>
        <form className='flex flex-col gap-10 w-full shadow-lg shadow-indigo-200 p-4'>
          <div className='relative'>
            <input
              className='peer rounded-md w-full p-4 border border-zinc-400 text-lg text-zinc-700 outline-none placeholder:bg-transparent placeholder-transparent left-4 focus:bg-white focus:border-1 focus:border-indigo-500 bg-white'
              id="name"
              type="text"
              name="name"
              value={ name }
              onChange={({ target }) => setName(target.value)}
              required
              placeholder='Nome*'
              />
            <label
              className='absolute left-2 -top-2.5 px-1 text-sm transition-all text-zinc-500 bg-white peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-indigo-500'
              htmlFor="name">
              Nome*
            </label>
          </div>
          <div className='relative'>
            <input
              className='peer rounded-md w-full p-4 border border-zinc-400 text-lg text-zinc-700 outline-none placeholder:bg-transparent placeholder-transparent left-4 focus:bg-white focus:border-1 focus:border-indigo-500 bg-white'
              id="lastName"
              type="text"
              name="lastName"
              value={ lastName }
              onChange={({ target }) => setLastName(target.value)}
              required
              placeholder='Sobrenome*'
              />
            <label
              className='absolute left-2 -top-2.5 px-1 text-sm transition-all text-zinc-500 bg-white peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-indigo-500'
              htmlFor="lastName">
              Sobrenome*
            </label>
          </div>
          <div className='relative'>
            <input
              className='peer rounded-md w-full p-4 border border-zinc-400 text-lg text-zinc-700 outline-none placeholder:bg-transparent placeholder-transparent left-4 focus:bg-white focus:border-1 focus:border-indigo-500 bg-white'
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
              required
              placeholder='Email*'
            />
            <label
              className='absolute left-2 -top-2.5 px-1 text-sm transition-all text-zinc-500 bg-white peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-indigo-500'
              htmlFor="email">
              Email*
            </label>
          </div>
          <div className='relative'>
            <input
              className='peer rounded-md w-full p-4 border border-zinc-400 text-lg text-zinc-700 outline-none placeholder:bg-transparent placeholder-transparent left-4 focus:bg-white focus:border-1 focus:border-indigo-500 bg-white'
              id="password"
              type={ inputType }
              name="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
              required
              placeholder='Senha*'
              />
            <label
              className='absolute left-2 -top-2.5 px-1 text-sm transition-all text-zinc-500 bg-white peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-indigo-500'
              htmlFor="password">
              Senha*
            </label>
            <span>{ iconEye }</span>
          </div>
          {
            error &&
            <span
              className='text-red-500 text-center font-medium'
            >
              {error}
            </span>
          }
          <div className="flex justify-center gap-5 w-full">
            <button
              className='bg-zinc-400 hover:bg-zinc-500 text-white font-semibold py-2 px-7 rounded-lg hover:ease-in-out duration-300'
              type='button'
              onClick={() => navigate('/login')}
            >
              Voltar
            </button>
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-semibold tracking-wide py-2 px-10 rounded-lg hover:ease-in-out duration-300'
              type="submit"
              onClick={ (e) => handleRegister(e) }
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
