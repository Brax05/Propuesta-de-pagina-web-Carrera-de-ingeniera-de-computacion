import { useEffect, useState } from "react";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabaseCliente } from "@/services/supabaseCliente";

interface Student {
  id: number;
  fullname: string;
  specialty: string;
  videoUrlEmbed?: string;
}

export default function Estudiantes() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabaseCliente
          .from("destacados")
          .select(
            "id, nombre_completo, nivel_estudiante, url_video_embed"
          )
          .order("id", { ascending: true });

        if (error) throw error;

        const mapped =
          data?.map((row: any) => ({
            id: row.id,
            fullname: row.nombre_completo,
            specialty: row.nivel_estudiante,
            videoUrlEmbed: row.url_video_embed || "",
          })) || [];

        setStudents(mapped);
      } catch (err) {
        console.error("Error al cargar estudiantes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1">
          <LoadingSpinner message="Cargando estudiantes..." fullScreen={false} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-14 shadow-inner border-b-4 border-blue-900 text-center">
        <h1 className="text-4xl font-bold">Nuestros Estudiantes</h1>
        <p className="text-blue-100 mt-2">
          Conoce a nuestros estudiantes y sus testimonios
        </p>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {students.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
              <p className="text-gray-500">No hay estudiantes disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white shadow rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {student.fullname}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {student.specialty}
                    </p>
                  </div>

                  {student.videoUrlEmbed && (
                    <div className="w-full aspect-video bg-black">
                      <iframe
                        className="w-full h-full"
                        src={student.videoUrlEmbed}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}