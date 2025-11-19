// src/services/authService.ts
import { supabaseCliente } from "@/services/supabaseClient";

export type Usuario = {
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
};

export async function loginUsuario(correo: string, clave: string) {
  const { data, error } = await supabaseCliente
    .from("usuarios") // nombre real de la tabla
    .select("nombre, apellido, correo, rol, clave")
    .eq("correo", correo)
    .eq("clave", clave)
    .single();

  console.log("Respuesta Supabase login:", { data, error });

  if (error || !data) {
    throw new Error("Correo o contraseña incorrectos");
  }

  const { clave: _omit, ...usuarioSinClave } = data;
  return usuarioSinClave as Usuario;
}

export async function registrarUsuario(payload: {
  idAuth: string;
  nombre: string;
  apellido: string;
  correo: string;
  rol?: string;
}) {
  const { idAuth, nombre, apellido, correo, rol = "student" } = payload;

  const { data, error } = await supabaseCliente
    .from("usuarios")
    .insert([
      {
        id_usuario: idAuth,
        correo_usuario: correo,
        nombres: nombre,
        apellidos: apellido,
        rol,
      },
    ])
    .select("id_usuario, correo_usuario, nombres, apellidos, rol")
    .single();

  console.log("Respuesta Supabase registro:", { data, error });

  if (error) {
    throw new Error(error.message);
  }

  return {
    idAuth: data.id_usuario,
    correo: data.correo_usuario,
    nombre: data.nombres,
    apellido: data.apellidos,
    rol: data.rol,
  };
}