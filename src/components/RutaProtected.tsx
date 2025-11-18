import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

// Especificamos que recibe un tipo children ya que este envuelve otros componentes
export const RutaProtected = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  //Si esta cargando que muestre un spiner
  if (loading) {
    // Spinner generado por gpto
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Cargando... </p>
      </div>
    );
  }
  // Si es null retorna a login
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  // Si no lo es, retorna las rutas que son privadas
  return <>{children}</>;
};