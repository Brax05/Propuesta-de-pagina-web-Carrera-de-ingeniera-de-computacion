import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";

import { useAuth } from "@hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EsperandoAutorizacion() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };

  if (!user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            esperando autorizacion del administrador
          </p>
          <p className="text-gray-600 mb-8">
            Tu registro fue recibido. Cuando un administrador lo apruebe podrás
            acceder al resto de las secciones.
          </p>
          <button
            className="inline-block px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
            onClick={handleLogout}
          >
            Cerrar Sesion
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
