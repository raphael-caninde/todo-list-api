import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import FormTodoList from '../../components/FormTodoList';
import '../HomePage/homePage.css';

function HomePage() {
  const { logout, user: { name, lastName } } = useContext(AppContext);

  return (
    <div>
      <header className="header-home">
        <h1>Welcome { `${name} ${lastName} !` }</h1>
          <button
            type="button"
            onClick={ logout }
          >
            SAIR
          </button>
      </header>

      <FormTodoList />
    </div>
  )
}

export default HomePage;
