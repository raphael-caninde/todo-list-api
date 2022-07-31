import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { userRegister } from '../../services/userApi';

function Register() {
  const { infoRegister: { name, lastName, email, password }, handleChange, infoRegister } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { request } = await userRegister(infoRegister);

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
      <span
        onClick={ () => navigate('/login') }
      >
        Login
      </span>
      <h3>Faça seu cadastro</h3>
      <form>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            name="name"
            value={ name }
            onChange={ handleChange }
            required
            />
          <label htmlFor="lastName">sobrenome</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={ lastName }
            onChange={ handleChange }
            required
            />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={ email }
            onChange={ handleChange }
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={ password }
            onChange={ handleChange }
            required
            />
        </div>
        <button
          type="submit"
          onClick={ (e) => handleRegister(e) }
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
};

export default Register;
