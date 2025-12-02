import { useEffect, useState } from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Escuchamos los cambios de estado de autenticación
    const { data: authListener } = supabaseCliente.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Evento Auth:", event);

        // El evento PASSWORD_RECOVERY se dispara cuando el usuario entra con el link
        // O si ya hay una sesión válida (SIGNED_IN) también nos sirve para actualizar
        if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
          setIsSessionReady(true);
        }
      }
    );

    // Cleanup al desmontar
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar contraseña vacía por si acaso
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
    
    // Opcional: Cerrar sesión después de cambiarla para forzar login limpio
    // await supabaseCliente.auth.signOut(); 

    setTimeout(() => {
      navigate("/login"); // O al home '/' dependiendo de tu flujo
    }, 3000);
  };

  if (!isSessionReady) {
    // Puedes poner un spinner bonito aquí
    return <div style={{ padding: 20 }}>Verificando enlace de seguridad...</div>;
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

      {message && <p style={{ marginTop: 20, color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}
