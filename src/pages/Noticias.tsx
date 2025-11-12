import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';

export default function News() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white py-8 border-b-4 border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Noticias</h1>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">Noticia Destacada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-lg mb-16">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop"
              alt="Estudiantes en Hackathon"
              className="w-full h-80 object-cover rounded"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Estudiantes de Ingeniería en Computación destacan en Hackathon Nacional 2025
              </h3>
              <p className="text-gray-600 text-sm mb-4">Coiquimbo de Chile | 5 de noviembre de 2025</p>
              <p className="text-gray-700 mb-6">
                Un equipo de estudiantes de la Universidad de La Serena obtuvo el segundo lugar en el Hackathon Nacional de Innovación Tecnológica, desarrollando una aplicación de inteligencia artificial enfocada en el monitoreo ambiental.
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                Ver Noticia Completa
              </button>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Noticias Recientes</h2>
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
                    {i === 1 ? 'Bienvenido Ing. Computación' : 'Capacitación Departamento'}
                  </h3>
                  <p className="text-gray-600 text-sm">Conoce nuestras actividades académicas.</p>
                  <Link to="#" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
                    Leer más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
