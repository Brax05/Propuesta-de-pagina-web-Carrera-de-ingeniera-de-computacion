// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import type { User } from "@/types";
import { loginUsuario, registrarUsuario } from "@/services/authService";
import { supabaseCliente } from "@/services/supabaseClient";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supaUser = await loginUsuario(email, password);

      const newUser: User = {
        id: supaUser.correo,
        name: `${supaUser.nombre} ${supaUser.apellido}`,
        email: supaUser.correo,
        role: (supaUser.rol as User["role"]) ?? "student",
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const nombre = firstName.trim();
      const apellido = lastName.trim();

      //Crear usuario en Supabase Auth
      const { data, error } = await supabaseCliente.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre,
            apellido,
            full_name: `${nombre} ${apellido}`.trim(),
            rol: "student",
          },
        },
      });

      if (error) throw error;
      if (!data.user) {
        throw new Error("No se pudo obtener el usuario creado");
      }

      //Registrar en la tabla `usuarios` usando el id de auth
      const supaUser = await registrarUsuario({
        idAuth: data.user.id, //esto va a id_usuario
        nombre,
        apellido,
        correo: email,
        rol: "student",
      });

      //Guardar en el estado local
      const newUser: User = {
        id: supaUser.idAuth, //usamos el id de auth/users
        name: `${supaUser.nombre} ${supaUser.apellido}`.trim(),
        email: supaUser.correo,
        role: (supaUser.rol as User["role"]) ?? "student",
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
};