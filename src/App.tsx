import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que renderiza HomePage */}
        <Route path="/" element={<HomePage />} />
        {/*Aqui van las otras páginas */}
      </Routes>
    </Router>
  );
};

export default App;
