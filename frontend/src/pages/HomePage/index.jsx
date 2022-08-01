import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
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
    </div>
  )
}

export default HomePage;
