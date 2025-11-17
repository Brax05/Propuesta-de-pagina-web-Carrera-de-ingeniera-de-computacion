import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';
import ingCivilComputacion from '@/assets/icons/ing_civil_computacion_.png';

export default function Home() {
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
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition">
                Comunícate con nosotros
              </button>
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
                <button className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition">
                  Ver Asignaturas
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition">
                  Conoce a la Facultad
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Noticias Recientes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Noticias Recientes</h2>
            <Link to="/noticias" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200">
                <img
                  src={`https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&t=${i}`}
                  alt={`Noticia ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {i === 1 ? 'Bienvenido Ing. Computación' : i === 2 ? 'Capacitación Departamento' : '¡Pronto más noticias!'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {i === 1 ? 'Conoce nuestras actividades académicas.' : i === 2 ? 'Se realizaron talleres de actualización para docentes.' : 'Mantente atento a nuestras actividades.'}
                  </p>
                  {i < 3 && (
                    <Link to="#" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
                      Leer más
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charla con Profesionales */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Charla con nuestros profesionales</h2>
            <Link to="/academicos" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Juanito Rodriguez', 'Carlita Flores', 'Camilito Bugz'].map((name, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow hover:shadow-lg transition">
                <img
                  src={`https://images.unsplash.com/photo-${i === 0 ? '1507003211169-0a1dd7228f2d' : i === 1 ? '1438761681033-6461ffad8d80' : '1500648767791-00dcc994a43e'}?w=150&h=150&fit=crop`}
                  alt={name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-gray-600 text-sm mb-4">Ingeniería Civil en Computación</p>
                <div className="flex gap-2 justify-center">
                  <button className="px-3 py-2 text-blue-600 hover:text-blue-700 text-sm font-semibold border border-blue-600 rounded hover:bg-blue-50 transition">
                    Más Información
                  </button>
                  <button className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm rounded transition">
                    Contactar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
