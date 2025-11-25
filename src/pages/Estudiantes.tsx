import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';

export default function Graduates() {
  const graduates = [
    { id: 1, name: 'Juanito Perez', title: 'Ingeniería Civil en Computación', specialty: 'Desarrollo de Software', description: 'Trabaja en Data Analytics para empresa del sector financiero.' },
    { id: 2, name: 'Carlita Flores', title: 'Ingeniería Civil en Computación', specialty: 'Ciencia de Datos', description: 'Lidera equipo de Data Scientists en empresa del sector financiero.' },
    { id: 3, name: 'Camilito Bugz', title: 'Ingeniería Civil en Computación', specialty: 'Computación en la Nube', description: 'Ingeniero de sistemas en compañía de servicios tecnológicos.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Nuestros Estudiantes</h1>
          <p className="text-blue-100">Universidad de La Serena</p>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 max-w-3xl mx-auto">
            Nuestros estudiantes son profesionales capaces de enfrentar los desafíos tecnológicos actuales con innovación y compromiso.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Conoce a nuestros profesionales</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {graduates.map((grad) => (
              <div key={grad.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition flex flex-col items-center">
                <div className="text-center mb-4">
                  <img
                    src={`https://images.unsplash.com/photo-${grad.id % 2 === 0 ? '1438761681033-6461ffad8d80' : '1507003211169-0a1dd7228f2d'}?w=150&h=150&fit=crop`}
                    alt={grad.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{grad.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{grad.title}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Especialización:</p>
                    <p className="text-sm text-gray-600">{grad.specialty}</p>
                  </div>
                  <p className="text-sm text-gray-700">{grad.description}</p>
                  <div className="flex gap-2 justify-center">
                   <button className="px-3 py-2 text-blue-600 hover:text-blue-700 text-sm font-semibold border border-blue-600 rounded hover:bg-blue-50 transition">
                     Conócelo
                    </button>
                  </div>
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
