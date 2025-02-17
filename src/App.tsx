import React from 'react';
import HomePage from './pages/home/homePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/user/userPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
