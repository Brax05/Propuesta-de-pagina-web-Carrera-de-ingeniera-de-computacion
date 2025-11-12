import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Homepage';
import Login from '@/pages/Login';
import Registro from '@/pages/Registro';
import Noticias from '@/pages/Noticias';
import Estudiantes from '@/pages/Estudiantes';
import PlanEstudios from '@/pages/PlanEstudios';
import Contacto from '@/pages/Contacto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/plan-estudios" element={<PlanEstudios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
