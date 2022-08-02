import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Private from './PrivateRoute';

function Router() {
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
