import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/userApi';

export function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        console.log(error.response)
      };
    };
  };

  return (
    <div>
      <div>
        <h3>Faça seu cadastro</h3>
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
            {error && error === 'O campo nome não pode ser vazio.' && <span>{error}</span>}
            <label htmlFor="lastName">SOBRENOME</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={ lastName }
              onChange={ ({ target }) => setLastName(target.value) }
              required
              />
            {error && error === 'O campo sobrenome não pode ser vazio.' && <span>{error}</span>}
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
              required
            />
            {error && error === 'O campo sobrenome não pode ser vazio.' && <span>{error}</span>}
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
              type="submit"
              onClick={ (e) => handleRegister(e) }
            >
              CADASTRAR
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
            >
              VOLTAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
