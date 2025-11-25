import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  logout: () => Promise<void>;
  refreshSession: (delayMs?: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
  logout: async () => {},
  refreshSession: async () => {},
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
  const [role, setRole] = useState<string | null>(null);

  // Función para obtener el rol desde la base de datos
  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabaseCliente
        .from("usuarios")
        .select("rol")
        .eq("id_usuario", userId)
        .single();

      if (error) throw error;

      setRole(data?.rol || null);
      console.log("[AuthDebug] Rol cargado", {
        userId,
        rol: data?.rol || null,
      });
    } catch (error) {
      console.error("Error al obtener rol:", error);
      setRole(null);
    }
  }, []);

  useEffect(() => {
    // Loguear cambios de rol y usuario para debug
    console.log("[AuthDebug] Estado de rol actualizado", {
      autenticado: !!user,
      userId: user?.id,
      rol: role,
    });
  }, [user, role]);

  const refreshSession = useCallback(
    async (delayMs = 0) => {
      try {
        if (delayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }

        setLoading(true);
        const {
          data: { session },
          error,
        } = await supabaseCliente.auth.getSession();

        if (error) {
          throw error;
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Error al refrescar sesión:", error);
        setSession(null);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    },
    [fetchUserRole]
  );

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
    refreshSession(2000);
    // Escuchador de cambios de autenticación
    const {
      data: { subscription },
    } = supabaseCliente.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      console.log("[AuthDebug] Cambio de auth", {
        evento: event,
        autenticado: !!session?.user,
        userId: session?.user?.id,
      });

      // Cuando cambia la sesión, actualizar el rol
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setRole(null);
      }

      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [refreshSession]);

  const value = {
    user,
    session,
    loading,
    role,
    refreshSession,
    logout,
  };

  // AuthContext.Provider permite
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
