import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { useAuth } from "@/hooks/AuthContext";
import { User, Shield, Edit, Users } from "lucide-react";

// ========================================
// DATOS SIMULADOS LOCALES
// ========================================
// Mapeo de usuarios con sus roles
const MOCK_USERS: Record<string, any> = {
  'donmiguelo@userena.cl': {
    email: 'donmiguelo@userena.cl',
    firstName: 'Miguel',
    lastName: 'Administrador',
    role: 'admin',
    isCECMember: false,
    cecPosition: ''
  },
  'benjamin.urbina@userena.cl': {
    email: 'benjamin.urbina@userena.cl',
    firstName: 'Benjamín',
    lastName: 'Urbina Editor',
    role: 'editor',
    isCECMember: true,
    cecPosition: 'Secretario'
  },
};

export default function Perfil() {
  const { user, loading } = useAuth();

  // Si no hay usuario autenticado, redirigir al login
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Obtener datos del usuario del mock o usar valores por defecto
  const userData = MOCK_USERS[user?.email || ''] || {
    email: user?.email || "usuario@userena.cl",
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || "Usuario",
    lastName: user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || "ULS",
    role: "student", // Por defecto todos son estudiantes
    isCECMember: false,
    cecPosition: ""
  };

  const getRoleName = (role: string) => {
    switch(role) {
      case "admin": return "Administrador";
      case "editor": return "Editor";
      case "student": return "Estudiante";
      default: return "Usuario";
    }
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case "admin": return "bg-red-100 text-red-800 border-red-300";
      case "editor": return "bg-blue-100 text-blue-800 border-blue-300";
      case "student": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-blue-100">Gestiona tu información y accede a tus funciones</p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda - Información del Usuario */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{userData.email}</p>
                  
                  <div className="flex justify-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(userData.role)}`}>
                      <Shield className="w-4 h-4 mr-2" />
                      {getRoleName(userData.role)}
                    </span>
                  </div>

                  {userData.isCECMember && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                      <p className="text-sm font-semibold text-yellow-800 mb-1">Miembro CEC</p>
                      <p className="text-xs text-yellow-700">{userData.cecPosition}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">NOMBRE</p>
                    <p className="text-sm text-gray-900">{userData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">APELLIDOS</p>
                    <p className="text-sm text-gray-900">{userData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">CORREO ELECTRÓNICO</p>
                    <p className="text-sm text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">ROL</p>
                    <p className="text-sm text-gray-900">{getRoleName(userData.role)}</p>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition text-sm font-semibold">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Columna Derecha - Dashboard */}
            <div className="lg:col-span-2">
              {userData.role === "admin" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel de Administración</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Gestión de Usuarios y Roles */}
                    <Link
                      to="/dashboard/gestion-usuarios"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition">
                          <Users className="w-6 h-6 text-red-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Gestión de Usuarios</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Administra usuarios, roles y membresías CEC
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                    {/* Edición de Noticias */}
                    <Link
                      to="/dashboard/gestion-noticias"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                          <Edit className="w-6 h-6 text-blue-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Edición de Noticias</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Crea y edita noticias, marca destacadas
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                    {/* Edición de Estudiantes */}
                    <Link
                      to="/dashboard/gestion-estudiantes"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                          <User className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Edición de Estudiantes</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Gestiona perfiles de estudiantes
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                  </div>
                </div>
              )}

              {userData.role === "editor" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel de Editor</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Edición de Noticias */}
                    <Link
                      to="/dashboard/gestion-noticias"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                          <Edit className="w-6 h-6 text-blue-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Edición de Noticias</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Crea y edita noticias, marca destacadas
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                    {/* Edición de Estudiantes */}
                    <Link
                      to="/dashboard/gestion-estudiantes"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                          <User className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Edición de Estudiantes</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Gestiona perfiles de estudiantes
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                  </div>
                </div>
              )}

              {userData.role === "student" && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Perfil de Estudiante</h3>
                  <p className="text-gray-600">
                    Como estudiante, tu perfil te permite acceder a contenido exclusivo del CEC y estar al tanto de las novedades de la carrera.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}