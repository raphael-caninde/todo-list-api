import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AppContext from '../context/AppContext';

function Router() {
  const Private = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AppContext);

    if (loading) {
      return <div>Carregando...</div>
    }

    if (!isAuthenticated) {
      return <Navigate  to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/cadastro" element={ <Register /> } />
      <Route exact path="/home" element={ <Private><HomePage /></Private> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default Router;
