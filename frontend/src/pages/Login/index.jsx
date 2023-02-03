import React, { useContext, useState } from 'react';
import { localStg } from '../../utils/handleLocalStorage';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../../services/userApi';
import AppContext from '../../context/AppContext';
import { api } from '../../services/axiosService';

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
    <div className="main-container">
      <form className="container-form">
        <div className="container-inputs">
          <label className="input-login" htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            className="input-email"
            name="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            required
            placeholder=" "
          />
          <label className="input-login" htmlFor="password">SENHA</label>
          <input
            id="password"
            type="password"
            className="input-password"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            required
            placeholder=" "
          />
          {error && <span>{error}</span>}
        </div>
        <div className="container-btns">
          <button
            className="btn-login"
            type="submit"
            onClick={ (e) => handleSubmit(e) }
          >
            ENTRAR
          </button>
          <button
            className="btn-register"
            type="submit"
            onClick={ () => navigate('/cadastro') }
          >
            CRIAR CONTA
          </button>
        </div>
      </form>
    </div>
  );
}
