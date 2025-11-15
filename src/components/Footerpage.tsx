export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y Descripción */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo-footer.png" alt="Logo Footer ULS" className="h-[98px] w-auto object-contain flex-shrink-0" />
              <div className="text-center">
              </div>
          </div>

          {/* Contactos por Unidades */}
          <div className="text-center">
            <img src="/contacto-por-unidades.png" alt="Contacto por unidades ULS" className="h-[115px] w-auto object-contain flex-shrink-0" />
          </div>

          {/* Logos de Alianzas */}
          <div className="flex justify-center md:justify-end gap-4">
            <img src="/logo-cna.png" alt="Logo Cna ULS" className="h-[98px] w-auto object-contain flex-shrink-0" />
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
