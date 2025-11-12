import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';

export default function StudyPlan() {
  const semesters = [
    { number: 1, courses: ['Introducción a Cálculo', 'Cálculo Diferencial e Integral', 'Introducción a Programación', 'Taller de Programación'] },
    { number: 2, courses: ['Cálculo Diferencial', 'Cálculo Integral', 'Álgebra Lineal', 'Programación Orientada a Objetos'] },
    { number: 3, courses: ['Física Fundamental', 'Electromagnetismo', 'Estructuras de Datos', 'Taller de Programación II'] },
    { number: 4, courses: ['Métodos Numéricos', 'Bases de Datos', 'Diseño de Proyectos de Ingeniería I', 'Sistemas Operacionales'] },
    { number: 5, courses: ['Ingeniería de Software', 'Análisis y Diseño de Algoritmos', 'Taller de Ingeniería de Software', 'Sistemas Distribuidos'] },
    { number: 6, courses: ['Ingeniería de Datos', 'Inteligencia Artificial', 'Redes de Computadores', 'Taller de Redes'] },
    { number: 7, courses: ['Seguridad Informática', 'Sistemas Avanzados', 'Taller de Seguridad', 'Ciberseguridad'] },
    { number: 8, courses: ['Informática Aplicada', 'Taller de Ingeniería de Software II', 'Seminario de Ingeniería', 'Taller de Seminario II'] },
    { number: 9, courses: ['Seminario de Ingeniería II', 'Taller de Seminario II', 'Electivo Profesional I', 'Taller de Seminario III'] },
    { number: 10, courses: ['Taller de Seminario IV', 'Práctica Profesional', 'Electivo Profesional II', 'Taller de Seminario IV'] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white py-8 border-b-4 border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Plan de Estudios</h1>
        </div>
      </div>

      <div className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">ULS</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">UNIVERSIDAD DE LA SERENA</h2>
                  <p className="text-gray-600">CHILE</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-sm">ISO-CHILE</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-700">PLAN DE ESTUDIO</h3>
                  <p className="text-gray-700">Ingeniería Civil en Computación e Informática</p>
                  <p className="text-gray-700 font-semibold">COD. 25006</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {semesters.map((sem) => (
              <div key={sem.number} className="bg-blue-700 text-white p-3 rounded text-center font-bold">
                {sem.number}° Semestre
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {semesters.map((sem) => (
              <div key={sem.number} className="space-y-2">
                {sem.courses.map((course, idx) => (
                  <div key={idx} className="bg-gray-200 p-3 rounded text-xs text-gray-700 text-center">
                    {course}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-4 text-sm text-gray-700">
            <p className="border-l-4 border-blue-700 pl-4">
              * Elaborará el grado de Bachiller en Ciencias de la Ingeniería cuando apruebe todas las asignaturas hasta el nivel 4 inclusive.
            </p>
            <p className="border-l-4 border-blue-700 pl-4">
              * Obtendrá el título de Licenciado(a) en Ciencias de la Ingeniería cuando apruebe todas las asignaturas hasta el nivel 6 inclusive.
            </p>
            <p className="border-l-4 border-blue-700 pl-4">
              * Estudiantes deben rendir la asignatura "Ampliación e mirada en Derechos Humanos, violencia y discriminación de género, interculturalidad y ciudadanía". Asignatura con 1 crédito transferible.
            </p>
            <p className="border-l-4 border-blue-700 pl-4">
              * Sujeto a modificaciones en el marco del proceso de mejora continua de la carrera.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition">
              Descargar Malla Curricular
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
