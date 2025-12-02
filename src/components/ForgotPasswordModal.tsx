import { useState } from "react";
import { supabaseCliente } from "@/services/supabaseCliente";
import Modal from "./Modal";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabaseCliente.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError("Hubo un error. Por favor intenta nuevamente.");
        console.error("Error:", error);
      } else {
        setMessage(
          "Revisa tu correo electrónico para continuar con la recuperación."
        );
        setEmail("");
        // Cerrar el modal después de 3 segundos
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (err) {
      setError("Error inesperado. Por favor intenta más tarde.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Recuperar Contraseña"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reset-email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
            placeholder="tu@userena.cl"
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
          {isLoading ? "Enviando..." : "Enviar Enlace"}
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-4">
        ¿Ya tienes acceso?{" "}
        <button
          onClick={onClose}
          className="text-blue-700 hover:text-blue-800 font-semibold transition"
        >
          Vuelve al login
        </button>
      </p>
    </Modal>
  );
}
