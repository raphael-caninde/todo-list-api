import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/userApi';

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
        alert(error.response.data.message)
      };
    };
  };

  return (
    <div>
      <header>
        <div>
          <span
            className="login"
            onClick={ () => navigate('/login') }
          >
          ⇦ Login
          </span>
        </div>
        <h3>Faça seu cadastro</h3>
      </header>
      <div>
        <form>
          <div>
            <label htmlFor="name">NOME</label>
            <input
              id="name"
              type="text"
              name="name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
              required
              />
            <label htmlFor="lastName">SOBRENOME</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={ lastName }
              onChange={ ({ target }) => setLastName(target.value) }
              required
              />
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
              required
            />
            <label htmlFor="password">SENHA</label>
            <input
              id="password"
              type="password"
              name="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
              required
              />
          </div>
          <div className="container-btn">
            <button
              className="btn-register"
              type="submit"
              onClick={ (e) => handleRegister(e) }
            >
              CADASTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
