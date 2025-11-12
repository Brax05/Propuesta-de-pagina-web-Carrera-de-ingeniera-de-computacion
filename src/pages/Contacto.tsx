import { useState } from 'react';
import Navbar from '@/components/Navbarpage';
import Footer from '@/components/Footerpage';
import { Mail, MapPin } from 'lucide-react'; // agregar Phone

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gracias ${formData.name}, tu mensaje ha sido enviado.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white py-8 border-b-4 border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Contacto</h1>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gray-700 text-lg">
              Si tienes dudas sobre el plan de estudios, procesos académicos o admisión, nuestro equipo de carrera está disponible para ayudarte. Contáctanos directamente a través de los siguientes canales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Dirección de Carrera */}
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-blue-700 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Dirección de Carrera</h3>
                  <p className="text-gray-600 text-sm">Universidad de La Serena</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Director de Carrera</p>
                  <p className="text-gray-700">Miguel Ramos Tapia</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Correo</p>
                  <p className="text-gray-700">director@userena.cl</p>
                </div>
                <button className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition">
                  Enviar correo
                </button>
              </div>
            </div>

            {/* Secretaría de Carrera */}
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4 mb-6">
                <Mail className="text-blue-700 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Secretaría de Carrera</h3>
                  <p className="text-gray-600 text-sm">Universidad de La Serena</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Secretaria de Carrera</p>
                  <p className="text-gray-700">Katherine Ambler Iribarren</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Correo</p>
                  <p className="text-gray-700">secretaria@userena.cl</p>
                </div>
                <button className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition">
                  Enviar correo
                </button>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos tu mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="Tu mensaje"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
