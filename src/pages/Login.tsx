import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { supabaseCliente } from "@/services/supabaseCliente";

import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Opción que niega que un usuario ya logueado regrese al login
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      const { error } = await supabaseCliente.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Inicio de sesión exitoso");
      navigate("/");
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
