import LogoFooter from '@/assets/icons/logo-footer.png';
import ContactoUnidades from '@/assets/icons/contacto-por-unidades.png';
import LogoCna from '@/assets/icons/logo-cna.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y Descripción */}
          <div className="flex justify-center md:justify-start">
            <img 
            src={LogoFooter} 
            alt= "Logo Footer" 
            className="h-[98px] w-auto object-contain flex-shrink-0" />
          </div>

          {/* Contactos por Unidades */}
          <div className="flex justify-center">
            <img 
            src={ContactoUnidades} 
            alt="Contacto por unidades ULS" 
            className="h-[115px] w-auto object-contain flex-shrink-0" />
          </div>

          {/* Logos de Alianzas */}
          <div className="flex justify-center md:justify-end">
            <img 
            src={LogoCna} 
            alt="Logo Cna ULS" 
            className="h-[98px] w-auto object-contain flex-shrink-0" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-xs text-gray-400">
            <p className="mt-4">© 2025 Derechos reservados</p>
            <p>Desarrollado por estudiantes de Ingeniería en Computación de la Universidad de la Serena</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
