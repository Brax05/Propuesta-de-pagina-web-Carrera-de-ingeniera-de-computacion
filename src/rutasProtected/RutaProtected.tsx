import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

// Especificamos que recibe un tipo children ya que este envuelve otros componentes
export const RutaProtected = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading, confirmed_user } = useAuth();

  // Evitar redireccionar mientras se cargan sesión/rol
  if (loading || (user && !role)) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!confirmed_user) {
    return <Navigate to="/esperando-autorizacion" replace />;
  }

  if (role === "admin" || role === "editor") {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
};
