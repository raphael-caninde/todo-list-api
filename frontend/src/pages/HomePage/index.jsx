import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

function HomePage() {
  const { logout, user: { name } } = useContext(AppContext);

  return (
    <div>
      <h1>Welcome { name }!</h1>
      <button
        type="button"
        onClick={ logout }
      >
        SAIR
      </button>
    </div>
  )
}

export default HomePage;
