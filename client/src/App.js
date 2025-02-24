import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import ChangePassword from './components/ChangePassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;