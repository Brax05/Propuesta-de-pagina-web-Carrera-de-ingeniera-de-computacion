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

  // Función para crear usuario si no existe (para confirmación por email)
  const createUserIfNotExists = useCallback(
    async (userId: string, email: string) => {
      try {
        const { data: existingUser } = await supabaseCliente
          .from("usuarios")
          .select("id_usuario")
          .eq("id_usuario", userId)
          .maybeSingle();

        if (!existingUser) {
          const { error: insertError } = await supabaseCliente
            .from("usuarios")
            .insert({
              id_usuario: userId,
              nombres: "",
              apellidos: "",
              rol: "miembro",
              correo_usuario: email,
              estado_estudiante: "activo",
            });

          if (insertError) {
            console.error(
              "Error al crear usuario en confirmación de email:",
              insertError
            );
            return false;
          }
          console.log(
            "[AuthDebug] Usuario creado automáticamente en confirmación"
          );
          return true;
        }
        return true;
      } catch (error) {
        console.error("Error en createUserIfNotExists:", error);
        return false;
      }
    },
    []
  );

  // Función para obtener el rol desde la base de datos
  const fetchUserRole = useCallback(
    async (userId: string, email: string, attempt = 1) => {
      try {
        const { data } = await supabaseCliente
          .from("usuarios")
          .select("rol")
          .eq("id_usuario", userId)
          .maybeSingle();

        const fetchedRole = data?.rol || null;

        // Si no existe el usuario, crearlo (sucede en confirmación de email)
        if (!fetchedRole && attempt === 1) {
          const created = await createUserIfNotExists(userId, email);
          if (created) {
            // Reintentar obtener el rol después de crear
            return fetchUserRole(userId, email, attempt + 1);
          }
        }

        // Si aún no hay rol (por triggers o default), reintentar unas veces
        if (!fetchedRole && attempt < 4) {
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
          return fetchUserRole(userId, email, attempt + 1);
        }

        setRole(fetchedRole);
        setLoading(false);
        console.log("[AuthDebug] Rol cargado", {
          userId,
          rol: fetchedRole,
        });
      } catch (error) {
        console.error("Error al obtener rol:", error);
        setRole(null);
        setLoading(false);
      }
    },
    [createUserIfNotExists]
  );

  const refreshSession = useCallback(async (delayMs = 0) => {
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
        // Cargar el rol del usuario
        await fetchUserRole(session.user.id, session.user.email || "");
      } else {
        setRole(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al refrescar sesión:", error);
      setSession(null);
      setUser(null);
      setRole(null);
      setLoading(false);
    }
  }, [fetchUserRole]);

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
    refreshSession();
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
        setLoading(true);
        fetchUserRole(session.user.id, session.user.email || "");
      } else {
        setRole(null);
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [refreshSession, fetchUserRole]);

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
