import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext";
import LogoNavbar from '@/assets/icons/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, loading, logout } = useAuth();
  const isAuthenticated = !!user;

  const userLabel = "Mi Perfil";

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="block">
              <img 
              src={LogoNavbar} 
              alt="Logo ULS" 
              className="h-[92px] w-auto object-contain flex-shrink-0" />
            </div>
          </Link>

          {/* Menú escritorio */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-700 hover:text-gray-900 transition">Inicio</Link>
            <Link to="/plan-estudios" className="text-sm text-gray-700 hover:text-gray-900 transition">Plan de Estudios</Link>
            <Link to="/noticias" className="text-sm text-gray-700 hover:text-gray-900 transition">Noticias</Link>
            <Link to="/estudiantes" className="text-sm text-gray-700 hover:text-gray-900 transition">Nuestros Estudiantes</Link>
            <Link to="/contacto" className="text-sm text-gray-700 hover:text-gray-900 transition">Contacto</Link>
            {isAuthenticated && (
              <Link to="/cec" className="text-sm text-gray-700 hover:text-gray-900 transition font-semibold">
                CEC
              </Link>
            )}
          </div>

          {/* Botones de autenticación */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <span className="text-sm text-gray-500">Verificando sesión…</span>
            ) : isAuthenticated ? (
              <>
                <Link
                  to="/dashboard/perfil"
                  className="text-sm text-gray-700 hover:text-gray-900 truncate max-w-[160px] transition underline"
                >
                  {userLabel}
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? "Cerrando…" : "Cerrar Sesión"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                >
                  Registro
                </Link>
              </>
            )}
          </div>

          {/* Menú Botón Móvil */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col items-end pt-4">
              <Link
                to="/"
                className="text-sm text-gray-700 hover:text-gray-900 py-2 text-right"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/plan-estudios"
                className="text-sm text-gray-700 hover:text-gray-900 py-2 text-right"
                onClick={() => setIsOpen(false)}
              >
                Plan de Estudios
              </Link>
              <Link
                to="/noticias"
                className="text-sm text-gray-700 hover:text-gray-900 py-2 text-right"
                onClick={() => setIsOpen(false)}
              >
                Noticias
              </Link>
              <Link
                to="/estudiantes"
                className="text-sm text-gray-700 hover:text-gray-900 py-2 text-right"
                onClick={() => setIsOpen(false)}
              >
                Nuestros Estudiantes
              </Link>
              <Link
                to="/contacto"
                className="text-sm text-gray-700 hover:text-gray-900 py-2 text-right"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              {isAuthenticated && (
                <Link
                  to="/cec"
                  className="text-sm text-gray-700 hover:text-gray-900 py-2 text-right font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  CEC
                </Link>
              )}
              <div className="border-t border-gray-200 pt-3 mt-3 w-full flex flex-col items-end">
                {loading ? (
                  <span className="text-sm text-gray-500">
                    Verificando sesión…
                  </span>
                ) : isAuthenticated ? (
                  <div className="flex flex-col items-end gap-2">
                    <Link
                      to="/dashboard/perfil"
                      className="text-sm text-gray-700 hover:text-gray-900 transition underline block mb-2 text-right"
                      onClick={() => setIsOpen(false)}
                    >
                      {userLabel}
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? "Cerrando…" : "Cerrar Sesión"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Registro
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}