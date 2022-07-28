import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Router() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/cadastro" element={ <Register /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default Router;
