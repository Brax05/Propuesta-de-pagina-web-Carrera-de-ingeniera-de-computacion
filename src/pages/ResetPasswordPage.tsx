import { useEffect, useState } from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import { useNavigate } from "react-router-dom";
export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Supabase enviará un access_token en la URL.
  // Necesitamos dejar que Supabase lo capture.
  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("access_token")) {
      // Supabase automáticamente toma el token de la URL.
      setIsSessionReady(true);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabaseCliente.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage("Hubo un error al actualizar la contraseña.");
      return;
    }

    setMessage("Contraseña cambiada con éxito. Ya puedes iniciar sesión.");
    // Timer para que rediriga dsp de que salga con exito
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (!isSessionReady) {
    return <p>Cargando información de seguridad...</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Crear nueva contraseña</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Actualizar contraseña</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
