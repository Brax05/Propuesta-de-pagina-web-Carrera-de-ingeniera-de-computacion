import { useEffect, useState } from "react";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { supabaseCliente } from "@/services/supabaseCliente";

type CECMember = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cecPosition: string;
  photoUrl?: string;
};

export default function CEC() {
  const [cecMembers, setCecMembers] = useState<CECMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCEC = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const { data, error } = await supabaseCliente
          .from("usuarios")
          .select("id, nombres, apellidos, correo_usuario, miembros_cec ( cargo )")
          .order("apellidos", { ascending: true });

        if (error) throw error;

        const mapped: CECMember[] =
          data?.flatMap((row: any) => {
            const rel = row.miembros_cec;
            const cargos = Array.isArray(rel) ? rel : rel ? [rel] : [];

            if (cargos.length === 0) return [];
            return cargos.map((c: any) => ({
              id: row.id,
              firstName: row.nombres ?? "",
              lastName: row.apellidos ?? "",
              email: row.correo_usuario ?? "",
              cecPosition: c.cargo ?? "",
            }));
          }) ?? [];

        setCecMembers(mapped);
      } catch (err) {
        console.error("Error al cargar miembros CEC:", err);
        setLoadError("No se pudieron cargar los miembros del CEC.");
      } finally {
        setLoading(false);
      }
    };

    fetchCEC();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <header className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Miembros CEC</h1>
          <p className="text-blue-100">
            Centro de Estudiantes de Computación - Universidad de La Serena
          </p>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="text-sm text-gray-500 mb-6">Cargando miembros…</p>
          )}

          {loadError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {loadError}
            </div>
          )}

          {!loading && cecMembers.length === 0 && !loadError && (
            <p className="text-center text-gray-500">
              Aún no hay miembros registrados en el CEC.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cecMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow border border-gray-200 p-6 flex flex-col items-center"
              >
                <div className="mb-4">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="rounded shadow object-cover h-36 w-36 bg-gray-100"
                    />
                  ) : (
                    <div className="h-36 w-36 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-lg font-bold text-blue-800 text-center">
                  {member.firstName} {member.lastName}
                </div>
                <div className="text-sm text-gray-500 text-center mb-2">
                  {member.email}
                </div>
                <div className="text-blue-700 font-semibold text-center">
                  {member.cecPosition}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}