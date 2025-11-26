import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

// Especificamos que recibe un tipo children ya que este envuelve otros componentes
export const RutaUsuariosLog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, role, loading } = useAuth();

  // Evitar redireccionar mientras se cargan sesión/rol
  if (loading || (user && !role)) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    role === "admin" ||
    role === "editor" ||
    role === "miembro" ||
    role === "student"
  ) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
};
