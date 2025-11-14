export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y Descripción */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <div className="text-center">
                <p className="text-xs font-bold text-gray-800">UNIVERSIDAD</p>
                <p className="text-xs text-gray-600">DE LA SERENA</p>
              </div>
            </div>
          </div>

          {/* Contactos por Unidades */}
          <div className="text-center">
            <h3 className="font-bold text-sm mb-4">CONTACTOS POR UNIDADES</h3>
            <p className="text-xs text-gray-300">
              <a href="#" className="hover:text-white transition">VER AQUÍ</a>
            </p>
          </div>

          {/* Logos de Alianzas */}
          <div className="flex justify-center md:justify-end gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs font-semibold">CNA</div>
            <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs font-semibold">ACRED</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-xs text-gray-400">
            <p>Benavente 980 - La Serena - Chile</p>
            <p>51 2 20 4000</p>
            <p className="mt-4">© 2025 Derechos reservados</p>
            <p>Desarrollado por estudiantes de Ingeniería en Computación de la Universidad de la Serena</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
