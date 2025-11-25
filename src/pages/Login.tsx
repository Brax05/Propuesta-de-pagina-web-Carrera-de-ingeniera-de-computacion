import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { supabaseCliente } from "@/services/supabaseCliente";

import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { User } from "@supabase/supabase-js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, role, loading, refreshSession } = useAuth();

  // Redirige si ya hay sesión; prioriza rol "miembro" a perfil
  useEffect(() => {
    if (!loading && user) {
      if (role === "miembro") navigate("/perfil", { replace: true });
      else if (role !== null) {
        navigate("/", { replace: true });
      }
    }
  }, [loading, user, role, navigate]);

  // Si hay usuario pero aún no hay rol, reintentar refrescar sesión sin bloquear la vista
  useEffect(() => {
    if (!loading && user && role === null) {
      refreshSession(400);
    }
  }, [loading, user, role, refreshSession]);

  const validateUser = async (usuario: User) => {
    try {
      // Query para saber si el usuario que usamos tiene tabla
      const { data: verificarUser, error: checkError } = await supabaseCliente
        .from("usuarios")
        .select("id_usuario")
        .eq("id_usuario", usuario.id)
        .maybeSingle();

      if (checkError) {
        console.error("Error al verificar usuario:", checkError);
        return false;
      }
      if (!verificarUser && usuario.email_confirmed_at) {
        //Si el usuario existe esta confirmado insertar al compare nuevo
        const { error: insertError } = await supabaseCliente
          .from("usuarios")
          .insert({
            id_usuario: usuario.id,
            nombres: "",
            apellidos: "",
            rol: "miembro",
            correo_usuario: usuario.email,
            estado_estudiante: "activo",
          });

        if (insertError) {
          console.error("Error al crear usuario:", insertError);
          setError(
            "Error al crear el perfil de usuario. Por favor contacta al soporte."
          );
          return false;
        }

        console.log("Usuario creado exitosamente");
        return true;
      }
      // Si el usuario esta insertado solo retornamos true para que pase al home
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      const { data, error } = await supabaseCliente.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        const esValido = await validateUser(data.user);
        if (!esValido) {
          return navigate("/register", { replace: true });
        }
        // Damos tiempo para que la base asigne el rol y refrescamos la sesión
        if (role == null && esValido) {
          await refreshSession();
        }
        return navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Accede con tu cuenta institucional de la Universidad de La Serena.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="tu@userena.cl"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
              >
                Iniciar Sesión
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
