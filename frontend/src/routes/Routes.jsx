import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { PrivateRoute } from './PrivateRoute';

export function Router() {
  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/cadastro" element={ <Register /> } />
      <Route exact path="/home" element={ <PrivateRoute><HomePage /></PrivateRoute> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}
