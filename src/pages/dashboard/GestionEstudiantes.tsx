import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { ArrowLeft, Search, Edit, Trash2, Plus, Save, X, User, Video } from "lucide-react";
import { supabaseCliente } from "@/services/supabaseCliente";

interface Student {
  id: number;
  fullname: string;
  specialty: string;
  videoUrl?: string;
  videoUrlEmbed?: string;
}

// Función para convertir URL normal de YouTube → embed
function youtubeToEmbed(original: string): string {
  try {
    const u = new URL(original);

    let id = u.searchParams.get("v");

    if (!id && u.hostname === "youtu.be") {
      id = u.pathname.replace("/", "");
    }

    if (!id) return original;

    let start = 0;
    const t = u.searchParams.get("t");
    if (t) {
      const clean = t.replace("s", "");
      const n = parseInt(clean, 10);
      if (!isNaN(n)) start = n;
    }

    return `https://www.youtube.com/embed/${id}${
      start ? `?start=${start}` : ""
    }`;
  } catch {
    return original;
  }
}

export default function GestionEstudiantes() {
  const [students, setStudents] = useState<Student[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [, setLoadError] = useState<string | null>(null);
  const [, setLoadingList] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    fullname: "",
    specialty: "",
    videoUrl: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoadingList(true);
        setLoadError(null);

        const { data, error } = await supabaseCliente
          .from("destacados")
          .select(
            "id, nombre_completo, nivel_estudiante, url_video, url_video_embed"
          )
          .order("id", { ascending: true });

        if (error) throw error;

        const mapped: Student[] =
          data?.map((row: any) => ({
            id: row.id,
            fullname: row.nombre_completo,
            specialty: row.nivel_estudiante,
            videoUrl: row.url_video || "",
            videoUrlEmbed: row.url_video_embed || "",
          })) || [];

        setStudents(mapped);
      } catch (err) {
        console.error("Error al cargar los estudiantes:", err);
        setLoadError("No se pudieron cargar los estudiantes");
      } finally {
        setLoadingList(false);
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    if (!newStudent.fullname || !newStudent.specialty) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      const normalUrl = newStudent.videoUrl || null;
      const embedUrl = normalUrl ? youtubeToEmbed(normalUrl) : null;

      const { data, error } = await supabaseCliente
        .from("destacados")
        .insert([
          {
            nombre_completo: newStudent.fullname,
            nivel_estudiante: newStudent.specialty,
            url_video: normalUrl,
            url_video_embed: embedUrl,
          },
        ])
        .select("id, nombre_completo, nivel_estudiante, url_video, url_video_embed")
        .single();

      if (error) throw error;

      const student: Student = {
        id: data.id,
        fullname: data.nombre_completo,
        specialty: data.nivel_estudiante,
        videoUrl: data.url_video || "",
        videoUrlEmbed: data.url_video_embed || "",
      };

      setStudents((prev) => [...prev, student]);
      setNewStudent({
        fullname: "",
        specialty: "",
        videoUrl: "",
      });
      setIsAdding(false);
    } catch (err) {
      console.error("Error al agregar estudiante:", err);
      alert("No se pudo guardar el estudiante");
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent({ ...student });
  };

  const handleSaveEdit = async () => {
    if (!editingStudent) return;

    try {
      const normalUrl = editingStudent.videoUrl || null;
      const embedUrl = normalUrl ? youtubeToEmbed(normalUrl) : null;

      const { data, error } = await supabaseCliente
        .from("destacados")
        .update({
          nombre_completo: editingStudent.fullname,
          nivel_estudiante: editingStudent.specialty,
          url_video: normalUrl,
          url_video_embed: embedUrl,
        })
        .eq("id", editingStudent.id)
        .select("id, nombre_completo, nivel_estudiante, url_video, url_video_embed")
        .single();

      if (error) throw error;

      const updated: Student = {
        id: data.id,
        fullname: data.nombre_completo,
        specialty: data.nivel_estudiante,
        videoUrl: data.url_video || "",
        videoUrlEmbed: data.url_video_embed || "",
      };

      setStudents((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
      setEditingStudent(null);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      alert("No se pudo actualizar el estudiante");
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este estudiante destacado?")) {
      return;
    }

    try {
      const { error } = await supabaseCliente
        .from("destacados")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error al eliminar estudiante:", err);
      alert("No se pudo eliminar el estudiante");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard/perfil"
            className="inline-flex items-center text-blue-100 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Perfil
          </Link>
          <h1 className="text-4xl font-bold mb-2">Edición de Testimonios</h1>
          <p className="text-blue-100">
            Gestiona los perfiles y testimonios en video que serán publicados en "Nuestros Estudiantes"
          </p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra de Búsqueda y Agregar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar estudiantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition flex items-center justify-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Agregar Estudiante
            </button>
          </div>

          {/* Formulario Agregar Estudiante */}
          {isAdding && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Nuevo Estudiante Destacado
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={newStudent.fullname}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        fullname: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nivel del Estudiante *
                  </label>
                  <input
                    type="text"
                    value={newStudent.specialty}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        specialty: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Ej: 4to semestre, Egresado, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Video className="w-4 h-4 inline mr-1" />
                    URL del Video (opcional)
                  </label>
                  <input
                    type="text"
                    value={newStudent.videoUrl}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, videoUrl: e.target.value || "" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Video de presentación o testimonio del estudiante
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddStudent}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Grid de Estudiantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
              >
                {editingStudent?.id === student.id ? (
                  // Modo Edición
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Editar Estudiante
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          value={editingStudent.fullname}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              fullname: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Nivel del Estudiante
                        </label>
                        <input
                          type="text"
                          value={editingStudent.specialty}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              specialty: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          URL Video (YouTube)
                        </label>
                        <input
                          type="text"
                          value={editingStudent.videoUrl || ""}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              videoUrl: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm rounded transition flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingStudent(null)}
                        className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Modo Vista
                  <>
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <User className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {student.fullname}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {student.specialty}
                        </p>
                      </div>

                      {student.videoUrl && (
                        <div className="flex flex-col items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            <span>Video disponible</span>
                          </div>
                          <a
                            href={student.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] underline"
                          >
                            Ver video
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex gap-2">
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="flex-1 px-3 py-2 text-blue-600 hover:text-blue-700 text-sm font-semibold border border-blue-600 rounded hover:bg-blue-50 transition flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="px-3 py-2 text-red-600 hover:text-red-700 border border-red-600 rounded hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron estudiantes</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}