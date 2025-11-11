import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import Docentes from './pages/Docentes';
import PlanEstudios from './pages/PlanEstudios';
import Noticias from './pages/Noticias';
import Egresados from './pages/Egresados';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/academicos" element={<Docentes />} />
        <Route path="/plan-estudios" element={<PlanEstudios />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/egresados" element={<Egresados />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
};

export default App;
