import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import { useAuth } from './auth/AuthContext';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Detail from './components/Detail';



const PrivateRoute = (el: any) => {  
  const { isAuthentify } = useAuth();
  return isAuthentify ? el : <Navigate to="/login" />;
};

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={PrivateRoute(<Home/>) } />
        {/* <Route path="/furnitures" element={}  /> */}
        <Route path="/detail" element={PrivateRoute(<Detail/>) } />
      </Routes>
  );
};

export default App;
