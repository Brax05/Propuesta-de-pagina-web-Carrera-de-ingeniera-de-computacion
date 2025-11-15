// src/services/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY");
}

export const supabaseCliente = createClient(supabaseUrl, supabaseAnonKey);

