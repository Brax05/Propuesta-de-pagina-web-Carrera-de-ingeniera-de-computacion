import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';
import ingCivilComputacion from '@/assets/icons/ing_civil_computacion_.png';
import { supabaseCliente } from '@/services/supabaseCliente';
import { Loader2, User } from 'lucide-react';

import NoticiasRecientesSection from "@/components/NoticiasRecientesSection";

interface StudentHighlight {
  id: number;
  fullname: string;
  specialty: string;
}

export default function Home() {
  const [students, setStudents] = useState<StudentHighlight[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabaseCliente
          .from("destacados")
          .select("id, nombre_completo, nivel_estudiante")
          .order("id", { ascending: true })
          .limit(3);

        if (error) throw error;

        const mapped: StudentHighlight[] =
          data?.map((row: any) => ({
            id: row.id,
            fullname: row.nombre_completo,
            specialty: row.nivel_estudiante,
          })) || [];

        setStudents(mapped);
      } catch (err) {
        console.error("Error al cargar estudiantes destacados:", err);
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Columna Izquierda */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Escuela de Ingeniería en Computación
              </h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Formamos profesionales con sólidos fundamentos en ciencias de la computación, capaces de diseñar, desarrollar y gestionar soluciones tecnológicas que aporten al desarrollo de la región y país.
              </p>
              <ul className="space-y-4 text-gray-300 mb-8">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Líneas: Ingeniería de software, inteligencia artificial, ciencia de datos, redes y ciberseguridad.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Apoyo a carreras de ingeniería, ciencias y programas de postgrado de la ULS.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Vinculación con la industria, proyectos estudiantiles y trabajo colaborativo con el entorno regional.</span>
                </li>
              </ul>
              <Link to="/contacto">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition">
                  Comunícate con nosotros
                </button>
              </Link>
            </div>

            {/* Columna Derecha */}
            <div className="bg-white rounded-lg p-10 text-center shadow-xl">
              <div className="mb-6">
                <img
                  src={ingCivilComputacion}
                  alt="Ingeniería Civil en Computación e Informática"
                  className="w-64 h-auto mx-auto object-scale-down"
                />
              </div>
              <div className="mt-8 space-y-3 text-left text-gray-700 text-sm">
                <p><strong>Grado Académico:</strong> Bachiller en Ciencias de la Ingeniería / Licenciado(a) en Ciencias de la Ingeniería</p>
                <p><strong>Título Profesional:</strong> Ingeniero(a) Civil en Computación e Informática</p>
                <p><strong>Duración:</strong> 10 semestres</p>
                <p><strong>Régimen de Estudios:</strong> Semestral</p>
                <p><strong>Arancel anual 2025:</strong> $4.105.000</p>
              </div>
              <div className="mt-8 space-y-3">
                <Link to="/plan-estudios">
                  <button className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition">
                    Ver Asignaturas
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Noticias Recientes */}
      <NoticiasRecientesSection />

      {/* Conoce a Profesionales */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Conoce a nuestros profesionales</h2>
            <Link to="/estudiantes" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
              Ver todos →
            </Link>
          </div>

          {/* Estado de carga */}
          {loadingStudents && (
            <div className="flex items-center justify-center py-8 text-gray-500 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Cargando estudiantes…</span>
            </div>
          )}

          {/* Sin estudiantes */}
          {!loadingStudents && students.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay estudiantes destacados disponibles.</p>
            </div>
          )}

          {/* Grid de estudiantes */}
          {!loadingStudents && students.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {students.map((student) => (
                <div 
                  key={student.id} 
                  className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow hover:shadow-lg transition"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{student.fullname}</h3>
                  <p className="text-gray-600 text-sm mb-4">{student.specialty}</p>
                  <div className="flex gap-2 justify-center">
                    <Link to="/estudiantes">
                      <button className="px-3 py-2 text-blue-600 hover:text-blue-700 text-sm font-semibold border border-blue-600 rounded hover:bg-blue-50 transition">
                        Conócelo
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}