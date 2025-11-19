import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { ArrowLeft, Search, Edit, Trash2, Plus, Save, X, User, Video } from "lucide-react";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}

export default function GestionEstudiantes() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      firstName: "Juanito",
      lastName: "Perez",
      specialty: "Desarrollo de Software",
      description: "Trabaja en Data Analytics para empresa del sector financiero.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      firstName: "Carlita",
      lastName: "Flores",
      specialty: "Ciencia de Datos",
      description: "Lidera equipo de Data Scientists en empresa del sector financiero.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      firstName: "Camilito",
      lastName: "Bugz",
      specialty: "Computación en la Nube",
      description: "Ingeniero de sistemas en compañía de servicios tecnológicos.",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    firstName: "",
    lastName: "",
    specialty: "",
    description: "",
    videoUrl: "",
    imageUrl: ""
  });

  const handleAddStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.specialty || !newStudent.description) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const student: Student = {
      id: Date.now(),
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      specialty: newStudent.specialty,
      description: newStudent.description,
      videoUrl: newStudent.videoUrl || "",
      imageUrl: newStudent.imageUrl || ""
    };

    setStudents([...students, student]);
    setNewStudent({ 
      firstName: "", 
      lastName: "", 
      specialty: "", 
      description: "", 
      videoUrl: "", 
      imageUrl: "" 
    });
    setIsAdding(false);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent({ ...student });
  };

  const handleSaveEdit = () => {
    if (!editingStudent) return;
    setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este estudiante destacado?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/perfil" className="inline-flex items-center text-blue-100 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Perfil
          </Link>
          <h1 className="text-4xl font-bold mb-2">Edición de Estudiantes Destacados</h1>
          <p className="text-blue-100">Gestiona los perfiles de estudiantes destacados que aparecen en el sitio</p>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuevo Estudiante Destacado</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                    <input
                      type="text"
                      value={newStudent.firstName}
                      onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Juan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido *</label>
                    <input
                      type="text"
                      value={newStudent.lastName}
                      onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Pérez"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Especialización *</label>
                  <input
                    type="text"
                    value={newStudent.specialty}
                    onChange={(e) => setNewStudent({ ...newStudent, specialty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Ej: Desarrollo de Software, Ciencia de Datos..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Breve Descripción *</label>
                  <textarea
                    value={newStudent.description}
                    onChange={(e) => setNewStudent({ ...newStudent, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                    placeholder="Describe brevemente la trayectoria o logros del estudiante..."
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
                    onChange={(e) => setNewStudent({ ...newStudent, videoUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Video de presentación o testimonio del estudiante</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL de Foto (opcional)</label>
                  <input
                    type="text"
                    value={newStudent.imageUrl}
                    onChange={(e) => setNewStudent({ ...newStudent, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="https://..."
                  />
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
              <div key={student.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                {editingStudent?.id === student.id ? (
                  // Modo Edición
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Editar Estudiante</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre</label>
                        <input
                          type="text"
                          value={editingStudent.firstName}
                          onChange={(e) => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Apellido</label>
                        <input
                          type="text"
                          value={editingStudent.lastName}
                          onChange={(e) => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Especialización</label>
                        <input
                          type="text"
                          value={editingStudent.specialty}
                          onChange={(e) => setEditingStudent({ ...editingStudent, specialty: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Descripción</label>
                        <textarea
                          value={editingStudent.description}
                          onChange={(e) => setEditingStudent({ ...editingStudent, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">URL Video</label>
                        <input
                          type="text"
                          value={editingStudent.videoUrl || ""}
                          onChange={(e) => setEditingStudent({ ...editingStudent, videoUrl: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">URL Foto</label>
                        <input
                          type="text"
                          value={editingStudent.imageUrl || ""}
                          onChange={(e) => setEditingStudent({ ...editingStudent, imageUrl: e.target.value })}
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
                        {student.imageUrl ? (
                          <img
                            src={student.imageUrl}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{student.specialty}</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-700">{student.description}</p>
                        </div>

                        {student.videoUrl && (
                          <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                            <Video className="w-4 h-4" />
                            <span>Video disponible</span>
                          </div>
                        )}
                      </div>
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