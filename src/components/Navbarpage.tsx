import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
//import logoULS from '../public/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="Logo ULS" className="h-[95px] w-auto object-contain mt-4" />
            <div className="hidden sm:block whitespace-nowrap">
            </div>
          </Link>

          {/* Menú */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Inicio
            </Link>
            <Link to="/plan-estudios" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Plan de Estudios
            </Link>
            <Link to="/noticias" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Noticias
            </Link>
            <Link to="/estudiantes" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Nuestros Estudiantes
            </Link>
            <Link to="/contacto" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Contacto
            </Link>
          </div>

          {/* Botones de autenticación */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">{user?.name || 'Usuario'}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition"
                >
                  Cerrar Sesión
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

          {/* Menú Botón Mobile */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú Mobile */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/" className="text-sm text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
                Inicio
              </Link>
              <Link to="/plan-estudios" className="text-sm text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
                Plan de Estudios
              </Link>
              <Link to="/noticias" className="text-sm text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
                Noticias
              </Link>
              <Link to="/egresados" className="text-sm text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
                Nuestros Estudiantes
              </Link>
              <Link to="/contacto" className="text-sm text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
                Contacto
              </Link>
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block w-full px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full px-4 py-2 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition text-center"
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
