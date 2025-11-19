import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { supabaseCliente } from "@/services/supabaseCliente";
import { registrarUsuario } from "@/services/authService";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Se agregó 'async' aquí
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const { data, error } = await supabaseCliente.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombres: firstName,
            apellidos: lastName,
            full_name: `${firstName} ${lastName}`.trim(),
            rol: "student",
          },
        },
      });

      if (error) throw error;
      if (!data.user) {
        throw new Error("No se pudo obtener el usuario creado");
      }
      await registrarUsuario({
        idAuth: data.user.id, // esto va a id_usuario
        nombre: firstName,
        apellido: lastName,
        correo: email,
        rol: "student",
      });

      console.log("Usuario registrado exitosamente");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Crear Cuenta
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Regístrate con tu correo institucional terminado en "@userena.cl" ó "@alumnosuls.cl.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="Nombres"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="Apellidos"
                />
              </div>

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
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
              >
                Crear Cuenta
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Inicia sesión aquí
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
