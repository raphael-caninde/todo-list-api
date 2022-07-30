import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

function Register() {
  const { infoRegister: { name, lastName, email, password }, handleChange } = useContext(AppContext);

  return (
    <div>
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
            />
          <label htmlFor="lastName">sobrenome</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={ lastName }
            onChange={ handleChange }
            />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={ password }
            onChange={ handleChange }
            />
        </div>
      </form>
    </div>
  );
};

export default Register;
