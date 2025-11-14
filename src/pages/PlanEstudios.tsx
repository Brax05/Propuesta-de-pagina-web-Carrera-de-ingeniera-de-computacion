import { useState } from 'react';
import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';

export default function StudyPlan() {
  const semestres = [
    { numero: 1, curso: [ 'Introducción al Cálculo', 'Introducción al Álgebra', 'Introducción a la Ingeniería Civil en Computación e Informática', 'Taller de Estrategias de Aprendizaje para Ingeniería' ] },
    { numero: 2, curso: [ 'Cálculo Diferencial e Integral', 'Álgebra Lineal', 'Física Newtoniana', 'Programación Estructurada', 'Taller de Habilidades Comunicativas para Ingeniería' ] },
    { numero: 3, curso: [ 'Cálculo en Varias Variables', 'Ecuaciones Diferenciales', 'Electromagnetismo', 'Programación Orientada a Objetos', 'Inglés para Ingeniería I' ] },
    { numero: 4, curso: [ 'Métodos Numéricos para Ingeniería', 'Probabilidad y Estadística', 'Óptica y Ondas', 'Bases de Datos', 'Desafío de Proyecto de Ingeniería I', 'Inglés para Ingeniería II' ] },
    { numero: 5, curso: [ 'Diseño y Análisis de Algoritmos', 'Fundamentos de Economía', 'Investigación de Operaciones', 'Paradigmas y Lenguajes de Programación', 'Arquitectura de Computadores', 'Inglés para Ingeniería III', 'Ampliando la mirada en Derechos Humanos, Violencia y Discriminación de Género, Interculturalidad y Ciudadanía' ] },
    { numero: 6, curso: [ 'Inteligencia Artificial', 'Teoría de la Computación', 'Electrónica Aplicada', 'Tópicos Avanzados de Bases de Datos', 'Sistemas Operativos' ] },
    { numero: 7, curso: [ 'Aprendizaje Automático', 'Internet de las Cosas', 'Ingeniería de Software', 'Preparación y Evaluación de Proyectos', 'Redes y Sistemas Distribuidos' ] },
    { numero: 8, curso: [ 'Sistemas Inteligentes', 'Innovación y Emprendimiento Informático', 'Taller de Desarrollo I', 'Desafío de Proyecto de Ingeniería II', 'Sistemas de Información', 'Gestión de Proyectos Informáticos' ] },
    { numero: 9, curso: [ 'Informática y Sociedad', 'Taller de Desarrollo II', 'Electivo de Formación Profesional I', 'Electivo de Formación Profesional II' ] },
    { numero: 10, curso: [ 'Taller de Desarrollo III', 'Electivo de Formación Profesional III', 'Electivo de Formación Profesional IV' ] }
  ];

  //lista de prerequisitos
  const prereqs: { [k: string]: string[] } = {
    'Cálculo Diferencial e Integral': ['Introducción al Cálculo'],
    'Álgebra Lineal': ['Introducción al Álgebra'],
    'Física Newtoniana': ['Introducción al Cálculo'],
    'Programación Estructurada': ['Introducción a la Ingeniería Civil en Computación e Informática'],
    'Taller de Habilidades Comunicativas para Ingeniería': ['Taller de Estrategias de Aprendizaje para Ingeniería'],
    'Cálculo en Varias Variables': ['Cálculo Diferencial e Integral'],
    'Ecuaciones Diferenciales': ['Cálculo Diferencial e Integral', 'Álgebra Lineal'],
    'Electromagnetismo': ['Física Newtoniana'],
    'Programación Orientada a Objetos': ['Programación Estructurada'],
    'Métodos Numéricos para Ingeniería': ['Ecuaciones Diferenciales'],
    'Óptica y Ondas': ['Electromagnetismo'],
    'Bases de Datos': ['Programación Orientada a Objetos'],
    'Desafío de Proyecto de Ingeniería I': ['Cálculo en Varias Variables', 'Ecuaciones Diferenciales', 'Electromagnetismo', 'Programación Orientada a Objetos', 'Inglés para Ingeniería I'],
    'Inglés para Ingeniería II': ['Inglés para Ingeniería I'],
    'Diseño y Análisis de Algoritmos': ['Métodos Numéricos para Ingeniería'],
    'Paradigmas y Lenguajes de Programación': ['Bases de Datos'],
    'Inglés para Ingeniería III': ['Inglés para Ingeniería II'],
    'Inteligencia Artificial': ['Probabilidad y Estadística'],
    'Teoría de la Computación': ['Diseño y Análisis de Algoritmos'],
    'Electrónica Aplicada': ['Arquitectura de Computadores'],
    'Tópicos Avanzados de Bases de Datos': ['Paradigmas y Lenguajes de Programación'],
    'Sistemas Operativos': ['Arquitectura de Computadores'],
    'Aprendizaje Automático': ['Inteligencia Artificial'],
    'Internet de las Cosas': ['Electrónica Aplicada'],
    'Ingeniería de Software': ['Tópicos Avanzados de Bases de Datos'],
    'Preparación y Evaluación de Proyectos': ['Fundamentos de Economía'],
    'Redes y Sistemas Distribuidos': ['Sistemas Operativos'],
    'Sistemas Inteligentes': ['Aprendizaje Automático'],
    'Innovación y Emprendimiento Informático': ['Preparación y Evaluación de Proyectos'],
    'Taller de Desarrollo I': ['Ingeniería de Software'],
    'Desafío de Proyecto de Ingeniería II': ['Aprendizaje Automático', 'Internet de las Cosas', 'Ingeniería de Software', 'Preparación y Evaluación de Proyectos', 'Redes y Sistemas Distribuidos'],
    'Sistemas de Información': ['Ingeniería de Software'],
    'Gestión de Proyectos Informáticos': ['Preparación y Evaluación de Proyectos'],
    'Informática y Sociedad': ['Sistemas Inteligentes', 'Innovación y Emprendimiento Informático', 'Taller de Desarrollo I', 'Desafío de Proyecto de Ingeniería II', 'Sistemas de Información', 'Gestión de Proyectos Informáticos'],
    'Taller de Desarrollo II': ['Taller de Desarrollo I'],
    'Taller de Desarrollo III': ['Taller de Desarrollo II']
  };

  const maxCursos = Math.max(...semestres.map(s => s.curso.length));
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  // Siempre devuelve un string[]
  const highlightedPrereqs: string[] = hoveredCourse && prereqs[hoveredCourse] ? prereqs[hoveredCourse] : [];


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white py-8 border-b-4 border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Plan de Estudios</h1>
        </div>
      </div>

      <div className="flex-1 py-12 bg-gray-50">
        <div className="max-w-full overflow-x-auto px-2">
          <div className="mb-8 flex flex-col gap-2 items-center lg:items-start lg:flex-row lg:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-base">ULS</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">UNIVERSIDAD DE LA SERENA</h2>
                  <p className="text-gray-600 text-sm">CHILE</p>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="flex items-center gap-2 justify-center lg:justify-end">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-xs">ISO-CHILE</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-700">PLAN DE ESTUDIO</h3>
                  <p className="text-gray-700 text-sm">Ingeniería Civil en Computación e Informática</p>
                  <p className="text-gray-700 font-semibold text-xs">COD. 25006</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-max mx-auto grid grid-cols-1 lg:grid-cols-10 gap-4 mb-8">
            {semestres.map((sem, idx) => (
              <div key={idx} className="w-[175px]">
                <div className="bg-blue-700 text-white p-2 rounded text-center font-bold text-base mb-2">
                  {sem.numero}° Semestre
                </div>
                <div className="space-y-2">
                  {sem.curso.map((course, idx2) => {
                    const isPrereq = highlightedPrereqs.includes(course);
                    return (
                      <div
                        key={idx2}
                        onMouseEnter={() => setHoveredCourse(course)}
                        onMouseLeave={() => setHoveredCourse(null)}
                        className={`p-2 rounded text-xs text-gray-800 text-center font-medium transition-colors duration-100 ${
                          course.startsWith("Ampliando la mirada")
                            ? "bg-blue-200"
                            : isPrereq
                              ? "bg-yellow-200"
                              : "bg-gray-200"
                        } ${
                          hoveredCourse === course ? 'ring-2 ring-blue-400' : ''
                        }`}
                      >
                        {course}
                      </div>
                    );
                  })}
                  {Array.from({length: maxCursos - sem.curso.length}).map((_, i) => (
                    <div key={`vacio-${i}`} className="p-2 rounded invisible text-xs">-</div>
                  ))}
                </div>
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
