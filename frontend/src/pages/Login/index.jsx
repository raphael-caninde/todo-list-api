import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { requestLogin } from '../../services/userApi';
import useLocalStorage from '../../hooks/useLocalStorage';

function Login() {
  const { infoUser: { email, password }, handleChange } = useContext(AppContext);
  const [token, setToken] = useLocalStorage('token');
  const navigate = useNavigate();

  const checkLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email) && password.length >= 6;
  };

  const login = async (e) => {
    e.preventDefault();
    const { data }= await requestLogin({ email, password });
    setToken(data.token);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              className="input-email"
              name="email"
              value={ email }
              onChange={ handleChange }
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              className="input-password"
              name="password"
              value={ password }
              onChange={ handleChange }
              required
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={ !checkLogin() }
            onClick={ (e) => login(e) }
          >
            ENTRAR
          </button>
          <button
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

export default Login;
