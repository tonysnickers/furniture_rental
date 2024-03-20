import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Detail from './components/Detail';
import { useAuth } from './hooks/use-auth';
import { Box } from '@mui/material';
import { MainLayout } from './components/MainLayout';
import { Home } from '@mui/icons-material';



const PrivateRoute = (el: any) => {  
  const { isAuthentify } = useAuth();
  console.log(isAuthentify);
  return isAuthentify ? el : <Navigate to="/login" />;
};




const App = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<MainLayout/> } >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/furnitures" element={<Home/> } />
          {/* <Route path="/furnitures" element={}  /> */}
          <Route path="/details" element={PrivateRoute(<Detail/>) } />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
