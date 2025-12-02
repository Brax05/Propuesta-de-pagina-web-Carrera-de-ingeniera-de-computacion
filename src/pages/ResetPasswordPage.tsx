import { useEffect, useState } from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // FIX: Se eliminó el segundo argumento 'session' porque no se usaba
    // y causaba error de compilación. Solo necesitamos 'event'.
    const { data: authListener } = supabaseCliente.auth.onAuthStateChange(
      async (event) => {
        console.log("Evento Auth detectado:", event);

        // PASSWORD_RECOVERY: El usuario acaba de entrar con el link mágico
        // SIGNED_IN: El usuario ya tiene una sesión válida (por si recarga la página)
        if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
          setIsSessionReady(true);
        }
      }
    );

    // Limpieza al desmontar el componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) return;

    const { error } = await supabaseCliente.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error(error);
      setMessage("Error: " + error.message);
      return;
    }

    setMessage("Contraseña cambiada con éxito. Redirigiendo...");

    // Redirigir al login después de 3 segundos
    setTimeout(() => {
      navigate("/login"); 
    }, 3000);
  };

  if (!isSessionReady) {
    return <div style={{ padding: 20, textAlign: 'center' }}>Verificando enlace de seguridad...</div>;
  }

  return (
    <div style={{ minWidth: 400, margin: "50px auto", textAlign: 'center' }}>
      <h2>Crear nueva contraseña</h2>

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <input
          type="password"
          placeholder="Escribe tu nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ padding: 10 }}
        />

        <button type="submit" style={{ padding: 10, cursor: 'pointer' }}>
          Actualizar contraseña
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 20, color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
