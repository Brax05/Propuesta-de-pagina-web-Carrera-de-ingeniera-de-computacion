import { createContext, useContext, useEffect, useState } from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
  logout: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null); // <-- Aquí faltaba esto

  // Función para obtener el rol desde la base de datos
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabaseCliente
        .from("usuarios")
        .select("rol")
        .eq("id_usuario", userId)
        .single();

      if (error) throw error;

      setRole(data?.rol || null);
    } catch (error) {
      console.error("Error al obtener rol:", error);
      setRole(null);
    }
  };

  const logout = async () => {
    const { error } = await supabaseCliente.auth.signOut();
    if (error) {
      throw error;
    }
    setSession(null);
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    // Obtener sesión inicial
    supabaseCliente.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Si hay usuario, obtener su rol
      if (session?.user) {
        fetchUserRole(session.user.id);
      }

      setLoading(false);
    });

    // Escuchador de cambios de autenticación
    const {
      data: { subscription },
    } = supabaseCliente.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Cuando cambia la sesión, actualizar el rol
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    loading,
    role,
    logout,
  };

  // AuthContext.Provider es el que provee los datos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
