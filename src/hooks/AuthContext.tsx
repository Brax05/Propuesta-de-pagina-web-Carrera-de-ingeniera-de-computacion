import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { supabaseCliente } from "../services/supabaseCliente";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean | false;
  role: string | null;
  confirmed_user: boolean | false;
  logout: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
  confirmed_user: false,
  logout: async () => {},
  refreshUserRole: async () => {},
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
  const [confirmed_user, setConfirmedUser] = useState(false);

  const isLoadingRole = useRef(false);
  const currentUserId = useRef<string | null>(null);

  const createUserIfNotExists = useCallback(
    async (userId: string, email: string, isConfirmed: boolean) => {
      try {
        const { data: existingUser } = await supabaseCliente
          .from("usuarios")
          .select("id_usuario, confirmed_user")
          .eq("id_usuario", userId)
          .maybeSingle();

        // Si el usuario NO existe, crearlo
        if (!existingUser) {
          console.log(
            "[AuthDebug] Usuario no existe, creando con rol miembro..."
          );
          const { error: insertError } = await supabaseCliente
            .from("usuarios")
            .insert({
              id_usuario: userId,
              nombres: "",
              apellidos: "",
              rol: "miembro",
              correo_usuario: email,
              estado_estudiante: "activo",
              confirmed_user: isConfirmed,
            });

          if (insertError) {
            console.error(
              "Error al crear usuario en confirmación de email:",
              insertError
            );
            return false;
          }
          console.log(
            "[AuthDebug] Usuario creado automáticamente con rol miembro"
          );
          return true;
        }

        // Usuario ya existe
        console.log("[AuthDebug] Usuario ya existe en tabla usuarios");
        return true;
      } catch (error) {
        console.error("Error en createUserIfNotExists:", error);
        return false;
      }
    },
    []
  );

  const fetchUserRole = useCallback(
    async (userId: string, email: string, isConfirmed = false, attempt = 1) => {
      if (isLoadingRole.current && currentUserId.current === userId) {
        console.log("[AuthDebug] Ya se está cargando el rol para este usuario");
        return;
      }

      isLoadingRole.current = true;
      currentUserId.current = userId;

      try {
        console.log(`[AuthDebug] Intentando obtener rol - Intento ${attempt}`, {
          userId,
          email,
        });

        const { data } = await supabaseCliente
          .from("usuarios")
          .select("rol, confirmed_user")
          .eq("id_usuario", userId)
          .maybeSingle();

        const fetchedRole = data?.rol || null;
        const fetchedConfirmed = data?.confirmed_user ?? false;

        console.log(`[AuthDebug] Resultado de query - Intento ${attempt}:`, {
          fetchedRole,
          data,
        });

        if (!fetchedRole && attempt === 1) {
          console.log(
            "[AuthDebug] Rol null en intento 1, asegurando que usuario existe..."
          );
          const result = await createUserIfNotExists(
            userId,
            email,
            isConfirmed
          );
          if (!result) {
            // Error al crear o verificar usuario
            console.error(
              "[AuthDebug] Error al crear/verificar usuario. Haciendo logout..."
            );
            setRole(null);
            setLoading(false);
            await logout();
            return;
          }
          // Usuario ahora debe existir con rol, reintentando...
          console.log(
            "[AuthDebug] Usuario verificado, reintentando obtener rol..."
          );
          isLoadingRole.current = false;
          return fetchUserRole(userId, email, isConfirmed, attempt + 1);
        }

        if (!fetchedRole && attempt < 2) {
          const delayMs = 300 * attempt;
          console.log(
            `[AuthDebug] Rol aún null, reintentando en ${delayMs}ms...`
          );
          isLoadingRole.current = false;
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          return fetchUserRole(userId, email, isConfirmed, attempt + 1);
        }

        if (!fetchedRole && attempt >= 2) {
          console.error(
            "[AuthDebug] No se pudo obtener el rol después de 2 intentos. Haciendo logout..."
          );
          setRole(null);
          setLoading(false);
          await logout();
          return;
        }

        setRole(fetchedRole);
        setConfirmedUser(fetchedConfirmed);
        setLoading(false);
        console.log("[AuthDebug] Rol cargado exitosamente", {
          userId,
          rol: fetchedRole,
          intento: attempt,
          confirmed_user: fetchedConfirmed,
        });
      } catch (error) {
        console.error("Error al obtener rol:", error);
        setRole(null);
        setLoading(false);
      } finally {
        isLoadingRole.current = false;
      }
    },
    [createUserIfNotExists]
  );

  const refreshUserRole = useCallback(async () => {
    if (!user?.id || !user?.email) {
      console.warn("[AuthDebug] No hay usuario para refrescar el rol");
      return;
    }

    console.log("[AuthDebug] Refrescando solo el rol del usuario actual");

    // Forzar la recarga ignorando el guard
    isLoadingRole.current = false;

    await fetchUserRole(
      user.id,
      user.email,
      !!user.email_confirmed_at || !!user.confirmed_at
    );
  }, [user, fetchUserRole]);

  const logout = async () => {
    console.log("[AuthDebug] Iniciando logout...");

    try {
      setLoading(true);

      try {
        await supabaseCliente.auth.signOut({ scope: "global" });
      } catch (globalError) {
        console.warn("[AuthDebug] Error con global scope:", globalError);
        try {
          await supabaseCliente.auth.signOut({ scope: "local" });
        } catch (localError) {
          console.warn("[AuthDebug] Error con local scope:", localError);
        }
      }
    } catch (error) {
      console.error("Error en signOut:", error);
    } finally {
      try {
        const localKeys = Object.keys(localStorage);
        localKeys.forEach((key) => {
          if (key.startsWith("sb-") || key.includes("supabase")) {
            localStorage.removeItem(key);
          }
        });

        const sessionKeys = Object.keys(sessionStorage);
        sessionKeys.forEach((key) => {
          if (key.startsWith("sb-") || key.includes("supabase")) {
            sessionStorage.removeItem(key);
          }
        });
      } catch (storageError) {
        console.error("Error limpiando storage:", storageError);
      }

      isLoadingRole.current = false;
      currentUserId.current = null;

      setSession(null);
      setUser(null);
      setRole(null);
      setLoading(false);
      setConfirmedUser(false);

      console.log("[AuthDebug] Logout completado totalmente");
    }
  };

  useEffect(() => {
    console.log("[AuthDebug] Montando AuthProvider");

    // No registrar listener en la página de reset
    const isOnResetPage = window.location.pathname === "/reset-password";
    if (isOnResetPage) {
      console.log(
        "[AuthDebug] En página de reset, no se registra listener de autenticación"
      );
      return;
    }

    const {
      data: { subscription },
    } = supabaseCliente.auth.onAuthStateChange((event, session) => {
      console.log("[AuthDebug] onAuthStateChange", {
        evento: event,
        autenticado: !!session?.user,
        userId: session?.user?.id,
      });

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setLoading(true);
        fetchUserRole(session.user.id, session.user.email || "");
      } else {
        setRole(null);
        setLoading(false);
        isLoadingRole.current = false;
        currentUserId.current = null;
      }
    });

    return () => {
      console.log("[AuthDebug] Desmontando AuthProvider");
      subscription.unsubscribe();
    };
  }, [fetchUserRole]);

  const value = {
    user,
    session,
    loading,
    role,
    confirmed_user,
    logout,
    refreshUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
