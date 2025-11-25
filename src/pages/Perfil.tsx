import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { User, Shield, Edit, Users } from "lucide-react";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { useAuth } from "@/hooks/AuthContext";
import { supabaseCliente } from "@/services/supabaseCliente";

type UserData = {
  email: string;
  nombres: string;
  apellidos: string;
  role: string;
  estado_estudiante: string;
};

const roleNames: Record<string, string> = {
  admin: "Administrador",
  editor: "Editor",
  student: "Estudiante",
  miembro: "Miembro",
};

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-800 border-red-300",
  editor: "bg-blue-100 text-blue-800 border-blue-300",
  student: "bg-green-100 text-green-800 border-green-300",
  miembro: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export default function Perfil() {
  const { loading, user, refreshSession } = useAuth();
  const [valorEditarPerfil, setEditarPerfil] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    nombres: "",
    apellidos: "",
    email: "",
    role: "",
    estado_estudiante: "",
  });
  const [minDelayDone, setMinDelayDone] = useState(false);

  const getRoleName = useCallback(
    (role: string) => roleNames[role] ?? "Usuario",
    []
  );

  const getRoleColor = useCallback(
    (role: string) => roleColors[role] ?? "bg-gray-100 text-gray-800 border-gray-300",
    []
  );

  const getUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabaseCliente
        .from("usuarios")
        .select("nombres, apellidos, correo_usuario, rol, estado_estudiante")
        .eq("id_usuario", user.id)
        .maybeSingle();

      if (error) {
        console.error("Problemas al cargar el usuario", error);
        return;
      }

      if (data) {
        setUserData({
          nombres: data.nombres ?? "",
          apellidos: data.apellidos ?? "",
          email: data.correo_usuario ?? "",
          role: data.rol ?? "student",
          estado_estudiante: data.estado_estudiante ?? "activo",
        });
      }
    } catch (error) {
      console.error("Problemas al cargar el usuario", error);
    }
  }, [user?.id]);

  const submitInfoUser = useCallback(async () => {
    if (!user?.id) {
      console.error("No hay usuario autenticado para actualizar.");
      return;
    }

    const basePayload = {
      nombres: userData.nombres,
      apellidos: userData.apellidos,
    };

    // Si es "miembro" lo promovemos a student; otros roles mantienen su rol actual
    const payload =
      userData.role === "miembro"
        ? { ...basePayload, rol: "student" }
        : { ...basePayload, rol: userData.role || "student" };

    try {
      const { data, error } = await supabaseCliente
        .from("usuarios")
        .update(payload)
        .eq("id_usuario", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error al intentar actualizar los datos del usuario", error);
        return;
      }

      if (!data) {
        console.warn("No se actualizó ningún registro (0 filas coinciden).");
        return;
      }

      setEditarPerfil(false);
      setUserData((prev) => ({
        ...prev,
        nombres: data.nombres ?? prev.nombres,
        apellidos: data.apellidos ?? prev.apellidos,
        role: data.rol ?? prev.role,
        estado_estudiante: data.estado_estudiante ?? prev.estado_estudiante,
      }));
      await refreshSession();
    } catch (e) {
      console.error("Problemas al intentar actualizar", e);
    }
  }, [user?.id, userData.nombres, userData.apellidos, userData.role, refreshSession]);

  useEffect(() => {
    if (!loading && user) {
      getUserData();
    }
  }, [loading, user, getUserData]);

  useEffect(() => {
    const timer = setTimeout(() => setMinDelayDone(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const isProfileComplete = useMemo(
    () => userData.nombres.trim() !== "" && userData.apellidos.trim() !== "",
    [userData.nombres, userData.apellidos]
  );

  if (loading || !minDelayDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-blue-100">
            Gestiona tu información y accede a tus funciones
          </p>
        </div>
      </div>

      <div className="flex-1 py-12">
        {user && userData.nombres === "" && userData.apellidos === "" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
              Completa tu nombre y apellidos para terminar tu perfil para poder
              acceder a otras funciones.
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
              Si utilizas nombres o sinonimos que no correspondan serás
              eliminado de la plataforma.
            </div>
          </div>
        )}
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
                    {userData.nombres} {userData.apellidos}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{userData.email}</p>

                  <div className="flex justify-center mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(
                        userData.role
                      )}`}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {getRoleName(userData.role)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      NOMBRES
                    </p>
                    {valorEditarPerfil ? (
                      <input
                        type="text"
                        id="nombres"
                        value={userData.nombres}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            nombres: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        placeholder="Miguel Alejandro"
                        required
                      />
                    ) : (
                      <p className="text-sm text-gray-900">
                        {userData.nombres}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      APELLIDOS
                    </p>
                    {valorEditarPerfil ? (
                      <input
                        type="text"
                        id="apellidos"
                        value={userData.apellidos}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            apellidos: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        placeholder="Urrutia Galvez"
                        required
                      />
                    ) : (
                      <p className="text-sm text-gray-900">
                        {userData.apellidos}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      CORREO ELECTRÓNICO
                    </p>
                    <p className="text-sm text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      ROL
                    </p>
                    <p className="text-sm text-gray-900">
                      {getRoleName(userData.role)}
                    </p>
                  </div>
                </div>

                <button
                  className="w-full mt-6 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition text-sm font-semibold"
                  onClick={() => setEditarPerfil(true)}
                >
                  Editar Perfil
                </button>
                {valorEditarPerfil && (
                  <button
                    className={`w-full mt-2 px-4 py-2 rounded-lg transition text-sm font-semibold ${
                      isProfileComplete
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isProfileComplete}
                    onClick={submitInfoUser}
                  >
                    Guardar
                  </button>
                )}
              </div>
            </div>

            {/* Columna Derecha - Dashboard */}
            <div className="lg:col-span-2">
              {userData.role === "admin" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Panel de Administración
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                      to="/dashboard/gestion-usuarios"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition">
                          <Users className="w-6 h-6 text-red-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Gestión de Usuarios
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Administra usuarios, roles y membresías CEC
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                    <Link
                      to="/dashboard/gestion-noticias"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                          <Edit className="w-6 h-6 text-blue-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Edición de Noticias
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Crea y edita noticias, marca destacadas
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                    <Link
                      to="/dashboard/gestion-estudiantes"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                          <User className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Edición de Estudiantes
                      </h3>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Panel de Editor
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                      to="/dashboard/gestion-noticias"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                          <Edit className="w-6 h-6 text-blue-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Edición de Noticias
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Crea y edita noticias, marca destacadas
                      </p>
                      <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                        Ir al módulo →
                      </span>
                    </Link>

                    <Link
                      to="/dashboard/gestion-estudiantes"
                      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                          <User className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Edición de Estudiantes
                      </h3>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Perfil de Estudiante
                  </h3>
                  <p className="text-gray-600">
                    Como estudiante, tu perfil te permite acceder a contenido
                    exclusivo del CEC y estar al tanto de las novedades de la
                    carrera.
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
