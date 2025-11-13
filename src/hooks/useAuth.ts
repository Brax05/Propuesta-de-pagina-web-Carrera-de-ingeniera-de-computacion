// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import type { User } from "@/types";
import { loginUsuario, registrarUsuario } from "@/services/authService";

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
        id: supaUser.correo, // usamos correo como identificador
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
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const [nombre, ...resto] = name.split(" ");
      const apellido = resto.join(" ") || " ";

      const supaUser = await registrarUsuario({
        nombre,
        apellido,
        correo: email,
        clave: password,
      });

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


