import { useState } from "react";
import { supabaseCliente } from "../services/supabaseCliente";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseCliente.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setMessage("Hubo un error. Intenta nuevamente.");
      return;
    }
    setMessage("Revisa tu correo para continuar con la recuperación.");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
