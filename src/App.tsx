import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "@/pages/Homepage";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
import Noticias from "@/pages/Noticias";
import Estudiantes from "@/pages/Estudiantes";
import PlanEstudios from "@/pages/PlanEstudios";
import Contacto from "@/pages/Contacto";
import CEC from "@/pages/CEC";
import Perfil from "@/pages/Perfil";

// Módulos de Dashboard
import GestionUsuarios from "@/pages/dashboard/GestionUsuarios";
import GestionNoticias from "@/pages/dashboard/GestionNoticias";
import GestionEstudiantes from "@/pages/dashboard/GestionEstudiantes";

import { RutaProtected } from "./rutasProtected/RutaProtected";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

// Redirige a miembros a /perfil para impedir que naveguen a otras rutas
const MemberRedirect = () => {
  const { role, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  // Renderizamos Navigate directamente para evitar parpadeo en home antes del redirect
  if (role === "miembro" && !location.pathname.startsWith("/perfil")) {
    return <Navigate to="/perfil" replace />;
  }

  return null;
};

const AppContent = () => {
  const { loading, user } = useAuth();

  // Esperamos solo mientras se resuelve la sesión (loading + user).
  // Si el rol resulta null, dejamos avanzar para evitar quedarnos pegados.
  const mustWaitForRole = loading && !!user;

  if (mustWaitForRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    );
  }

  return (
    <>
      <MemberRedirect />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/plan-estudios" element={<PlanEstudios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cec" element={<CEC />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/dashboard/gestion-usuarios"
          element={<GestionUsuarios />}
        />
        <Route
          path="/dashboard/gestion-noticias"
          element={<GestionNoticias />}
        />
        <Route
          path="/dashboard/gestion-estudiantes"
          element={<GestionEstudiantes />}
        />

        <Route
          path="/editorpage"
          element={<RutaProtected>Aqui va la pagina del editor</RutaProtected>}
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
