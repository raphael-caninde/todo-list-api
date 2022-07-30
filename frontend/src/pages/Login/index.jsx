import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function Login() {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password)
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
              onChange={ ({ target }) => setEmail(target.value) }
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
              onChange={ ({ target }) => setPassword(target.value) }
              required
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            onClick={ (e) => handleSubmit(e) }
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
