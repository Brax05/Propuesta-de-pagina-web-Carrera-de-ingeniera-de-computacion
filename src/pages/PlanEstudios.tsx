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

  const cursoInfo: { [k: string]: { descripcion: string, tipo: string, tel: string } } = {
  'Introducción al Cálculo': {
    descripcion: 'Busca desarrollar el razonamiento científico y la resolución de problemas mediante el estudio de los fundamentos del cálculo diferencial e integral, como los límites, derivadas y la variación continua',
    tipo: 'Semestral',
    tel: '6-0-2'
  },
  'Introducción al Álgebra': {
    descripcion: 'Abarca la lógica proposicional, las estructuras algebraicas fundamentales como grupos y anillos, el estudio de los conjuntos numéricos (N,Z,Q,R,C), funciones (exponenciales, logarítmicas, trigonométricas) y el álgebra lineal',
    tipo: 'Semestral',
    tel: '6-0-2'
  },
  'Introducción a la Ingeniería Civil en Computación e Informática': {
    descripcion: 'introduce los fundamentos de la profesión, combinando conocimientos de ciencias básicas, ingeniería y computación.',
    tipo: 'Anual',
    tel: '4-0-0'
  },
  'Taller de Estrategias de Aprendizaje para Ingeniería': {
    descripcion: 'Experiencia educativa práctica y colaborativa, diseñada para que los estudiantes de ingeniería desarrollen y mejoren sus habilidades de estudio y aprendizaje de forma activa. ',
    tipo: 'Anual',
    tel: '0-0-4'
  },
  'Cálculo Diferencial e Integral':{
    descripcion: 'Abarca temas como límites, derivadas e integrales, con aplicaciones en el modelado, optimización y resolución de problemas en áreas como ingeniería y ciencias. ',
    tipo: 'Semestral',
    tel: '6-0-0'
  },
  'Álgebra Lineal': {
    descripcion: 'Estudia vectores, matrices, sistemas de ecuaciones lineales, espacios vectoriales y transformaciones lineales.',
    tipo: 'Semestral',
    tel: '6-0-0'
  },
  'Física Newtoniana': {
    descripcion: 'El	 estudiante	 es	 introducido	 a	 las	 bases	 de	 la	 física	 newtoniana,	 abarcando desde	los	elementos	básicos	matemáticos hasta	el	planteamiento	de	las	leyes	de	Newton.',
    tipo: 'Semestral',
    tel: '6-0-2'
  },
  'Programación Estructurada': {
    descripcion: 'Introduce la lógica de programación y el diseño de algoritmos usando estructuras básicas como secuencia, selección y repetición.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Taller de Habilidades Comunicativas para Ingeniería':{
    descripcion: 'Orientada a fortalecer la comunicación oral y escrita en contextos profesionales y tecnológicos.',
    tipo: 'Anual',
    tel: '0-0-2'
  },
  'Cálculo en Varias Variables': {
    descripcion: 'Estudia funciones de varias variables y sus aplicaciones. Incluye derivadas parciales, gradientes, optimización multivariable e integración múltiple, enfocándose en resolver problemas propios de la ingeniería y las ciencias.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Ecuaciones Diferenciales': {
    descripcion: 'Dedicada al estudio y solución de ecuaciones diferenciales ordinarias que modelan fenómenos físicos y de ingeniería.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Electromagnetismo': {
    descripcion: 'Aborda los principios del campo eléctrico y magnético, sus interacciones y las leyes fundamentales que los rigen.',
    tipo: 'Semestral',
    tel: '4-0-2'
  },
  'Programación Orientada a Objetos': {
    descripcion: 'Introduce el desarrollo de software utilizando el paradigma orientado a objetos. Se estudian conceptos como clases, objetos, encapsulamiento, herencia y polimorfismo, aplicados al diseño de programas modulares y reutilizables.',
    tipo: 'Anual',
    tel: '4-0-4'
  },
  'Inglés para Ingeniería I': {
    descripcion: 'Enfocada en desarrollar competencias básicas de comprensión y comunicación en inglés dentro de contextos académicos y técnicos.',
    tipo: 'Anual',
    tel: '2-0-2'
  },
  'Métodos Numéricos para Ingeniería': {
    descripcion: 'Aborda técnicas numéricas para resolver problemas matemáticos aplicados a la ingeniería. Incluye métodos de aproximación, solución de ecuaciones, interpolación, derivación e integración numérica, y análisis de errores.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Probabilidad y Estadística': {
    descripcion:'Introduce los fundamentos de probabilidad y el análisis estadístico para modelar, interpretar y tomar decisiones basadas en datos.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Óptica y Ondas': {
    descripcion: 'Estudia el comportamiento de las ondas y los principios fundamentales de la óptica.',
    tipo: 'Semestral',
    tel: '4-0-2'
  },
  'Bases de Datos': {
    descripcion: 'Introduce los conceptos fundamentales del diseño, modelación y administración de bases de datos.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Desafío de Proyecto de Ingeniería I': {
    descripcion: 'Orientada al desarrollo de un proyecto inicial de ingeniería, donde los estudiantes aplican conocimientos básicos para identificar un problema, proponer soluciones y elaborar un prototipo o informe técnico.',
    tipo: 'Semestral',
    tel: '0-0-4'
  },
  'Inglés para Ingeniería II': {
    descripcion: 'Enfocada en fortalecer las habilidades de comprensión y comunicación en inglés en contextos técnicos.',
    tipo: 'Anual',
    tel: '2-0-2'
  },
  'Diseño y Análisis de Algoritmos': {
    descripcion: 'Aborda la formulación, optimización y evaluación de algoritmos.',
    tipo: 'Anual',
    tel: '4-0-0'
  },
  'Fundamentos de Economía': {
    descripcion: 'Introduce los principios básicos de la economía, incluyendo oferta y demanda, funcionamiento de mercados, costos, producción y toma de decisiones económicas.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Investigación de Operaciones': {
    descripcion: 'Estudia métodos cuantitativos para optimizar procesos y apoyar la toma de decisiones.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Paradigmas y Lenguajes de Programación': {
    descripcion: 'Presenta los principales paradigmas de programación —imperativo, funcional, orientado a objetos y lógico— y sus características.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Arquitectura de Computadores': {
    descripcion: 'Estudia la organización interna y el funcionamiento de los computadores.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Inglés para Ingeniería III': {
    descripcion: 'Orientada a desarrollar un dominio intermedio del inglés en contextos académicos y profesionales.',
    tipo: 'Anual',
    tel: '2-0-2'
  },
  'Inteligencia Artificial': {
    descripcion: 'Introduce los fundamentos y técnicas básicas de la inteligencia artificial.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Teoría de la Computación': {
    descripcion: 'Estudia los fundamentos formales de los sistemas computacionales.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Electrónica Aplicada': {
    descripcion: 'Estudia el funcionamiento y uso práctico de componentes y circuitos electrónicos.',
    tipo: 'Anual',
    tel: '2-0-2'
  },
  'Tópicos Avanzados de Bases de Datos': {
    descripcion: 'Profundiza en conceptos avanzados de gestión y diseño de bases de datos.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Sistemas Operativos': {
    descripcion: 'Estudia el funcionamiento interno de los sistemas operativos.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Aprendizaje Automático': {
    descripcion: 'Introduce métodos y algoritmos para que los sistemas puedan aprender a partir de datos.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Internet de las Cosas': {
    descripcion: 'Estudia los principios, arquitecturas y tecnologías del Internet de las Cosas (IoT).',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Ingeniería de Software': {
    descripcion: 'Aborda los principios, métodos y herramientas para el desarrollo sistemático de software.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Preparación y Evaluación de Proyectos': {
    descripcion: 'Aborda las etapas para formular, analizar y evaluar proyectos de ingeniería.',
    tipo: 'Semestral',
    tel: '4-0-0'
  },
  'Redes y Sistemas Distribuidos': {
    descripcion: 'Estudia los principios de comunicación en redes y la arquitectura de sistemas distribuidos.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Sistemas Inteligentes': {
    descripcion: 'Estudia técnicas y modelos capaces de resolver problemas complejos de manera autónoma.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Innovación y Emprendimiento Informático': {
    descripcion: 'Fomenta la creación de soluciones tecnológicas innovadoras y el desarrollo de iniciativas de emprendimiento en el ámbito informático.',
    tipo: 'Anual',
    tel: '2-0-2'
  },
  'Taller de Desarrollo I': {
    descripcion: 'Orientada a la aplicación práctica de fundamentos de programación y desarrollo de software.',
    tipo: 'Anual',
    tel: '0-0-4'
  },
  'Desafío de Proyecto de Ingeniería II': {
    descripcion: 'Centrada en el desarrollo avanzado de un proyecto de ingeniería, donde los estudiantes profundizan en el análisis, diseño y validación de soluciones tecnológicas.',
    tipo: 'Anual',
    tel: '0-0-4'
  },
  'Sistemas de Información': {
    descripcion: 'Estudia el diseño, implementación y gestión de sistemas que integran tecnología y procesos organizacionales para apoyar la toma de decisiones.',
    tipo: 'Anual',
    tel: '2-0-2'
  },
  'Gestión de Proyectos Informáticos': {
    descripcion: 'Aborda metodologías y herramientas para planificar, ejecutar y controlar proyectos de software.',
    tipo: 'Anual',
    tel: '4-0-2'
  },
  'Informática y Sociedad': {
    descripcion: 'Analiza el impacto social, ético y legal de las tecnologías de la información.',
    tipo: 'Anual',
    tel: '4-0-0'
  },
  'Taller de Desarrollo II': {
    descripcion: 'Orientada al desarrollo de proyectos de software de mayor complejidad, aplicando prácticas avanzadas de diseño, programación, pruebas y documentación.',
    tipo: 'Anual',
    tel: '0-0-6'
  },
  'Taller de Desarrollo III': {
    descripcion: 'Enfocada en el desarrollo de soluciones de software completas y profesionales.',
    tipo: 'Anual',
    tel: '0-0-6'
  }
};

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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const closeModal = () => setSelectedCourse(null);

  // Siempre devuelve un string[]
  const highlightedPrereqs: string[] = hoveredCourse && prereqs[hoveredCourse] ? prereqs[hoveredCourse] : [];
  const showModal = !!selectedCourse;
  
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
                <div>
                  <img src="/logo.png" alt="Logo ULS" className="h-[120px] w-auto object-contain mt-4" />
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="flex items-center gap-2 justify-center lg:justify-end">
                <div>
                  <img src="/sct.png" alt="Sct ULS" className="h-[120px] w-auto object-contain mt-4" />
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

          {/* Modal */}
          {showModal && selectedCourse && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={closeModal}>
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs md:max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="font-bold text-lg mb-3">{selectedCourse}</h2>
                <p className="text-sm mb-2">{cursoInfo[selectedCourse]?.descripcion || 'Sin información adicional para este curso.'}</p>
                {cursoInfo[selectedCourse] && (
                  <div>
                    <span className="inline-block mb-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {cursoInfo[selectedCourse].tipo}
                      </span>
                      <div className="text-xs mb-4">
                        <span className="font-semibold text-gray-800">T.E.L:</span> {cursoInfo[selectedCourse].tel}
                        </div>
                        </div>
                      )}
                <button onClick={closeModal} className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700">
                  Cerrar
                </button>
              </div>
            </div>
          )}

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
