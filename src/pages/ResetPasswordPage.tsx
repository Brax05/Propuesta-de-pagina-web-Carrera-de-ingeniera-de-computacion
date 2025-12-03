import { useEffect, useState } from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Si la página se recarga manualmente, redirige al login para forzar flujo limpio
  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigationEntry?.type === "reload") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Supabase enviará un access_token en la URL.
  // Necesitamos dejar que Supabase lo capture.
  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("access_token")) {
      // Supabase automáticamente toma el token de la URL.
      // Espera un poco para que Supabase procese el token
      setTimeout(() => {
        setIsSessionReady(true);
      }, 100);
    } else {
      // Si no hay access_token en la URL, redirige a login
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    // Validaciones
    if (!newPassword || !confirmPassword) {
      setError("Por favor completa todos los campos");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabaseCliente.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError(
          "Hubo un error al actualizar la contraseña. Por favor intenta nuevamente."
        );
        console.error("Error:", error);
      } else {
        setMessage(
          "Contraseña actualizada exitosamente. Serás redirigido en breve."
        );
        setNewPassword("");
        setConfirmPassword("");
        // Hacer logout para limpiar la sesión temporal de reset
        await supabaseCliente.auth.signOut({ scope: "global" }).catch(() => {
          // Ignorar errores de logout
        });
        // Timer para que redirija después de que salga con éxito
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setError("Error inesperado. Por favor intenta más tarde.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSessionReady) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="text-center">
            <p className="text-gray-600">
              Cargando información de seguridad...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Crear Nueva Contraseña
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Ingresa tu nueva contraseña para acceder a tu cuenta.
            </p>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-4">
              ¿Necesitas ayuda?{" "}
              <a
                href="/login"
                className="text-blue-700 hover:text-blue-800 font-semibold transition"
              >
                Vuelve al login
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
