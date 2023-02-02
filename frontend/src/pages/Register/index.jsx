import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { userRegister } from '../../services/userApi';

export function Register() {
  const { infoRegister: { name, lastName, email, password }, handleChange, infoRegister, setInfoRegister } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { request } = await userRegister(infoRegister);

      setInfoRegister({ name: '', lastName:'',  email: '', password: ''})

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
    <div className="container-register">
      <header className="header">
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
      <div className="container-body">
        <form className="register-form">
          <div className="register-inputs">
            <label htmlFor="name">NOME</label>
            <input
              id="name"
              type="text"
              name="name"
              className=""
              value={ name }
              onChange={ handleChange }
              required
              />
            <label htmlFor="lastName">SOBRENOME</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={ lastName }
              onChange={ handleChange }
              required
              />
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ handleChange }
              required
            />
            <label htmlFor="password">SENHA</label>
            <input
              id="password"
              type="password"
              name="password"
              value={ password }
              onChange={ handleChange }
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
