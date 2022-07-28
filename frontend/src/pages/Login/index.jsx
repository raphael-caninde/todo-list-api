import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const checkLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email) && password.length > 6;
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">
            <input
              id="email"
              type="text"
              className="input-email"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              className="input-password"
              name="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={ !checkLogin() }
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
