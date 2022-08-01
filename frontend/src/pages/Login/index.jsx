import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './login.css';

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

export default Login;
