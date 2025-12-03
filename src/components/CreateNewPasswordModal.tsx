import { useState } from "react";
import { supabaseCliente } from "@/services/supabaseCliente";
import Modal from "./Modal";

interface CreateNewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewPasswordModal({
  isOpen,
  onClose,
}: CreateNewPasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        setError("Hubo un error al actualizar la contraseña. Por favor intenta nuevamente.");
        console.error("Error:", error);
      } else {
        setMessage("Contraseña actualizada exitosamente");
        setNewPassword("");
        setConfirmPassword("");
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
      title="Crear Nueva Contraseña"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
        ¿Cambió de opinión?{" "}
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
