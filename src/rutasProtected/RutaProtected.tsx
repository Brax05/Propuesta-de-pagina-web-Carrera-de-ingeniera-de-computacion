import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

// Especificamos que recibe un tipo children ya que este envuelve otros componentes
export const RutaProtected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // Si es null retorna a login
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  // Si no lo es, retorna las rutas que son privadas
  return <>{children}</>;
};
