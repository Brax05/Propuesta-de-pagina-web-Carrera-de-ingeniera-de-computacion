import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";

type CECMember = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cecPosition: string;
  photoUrl?: string;
};

const cecMembers: CECMember[] = [
  {
    id: 1,
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@userena.cl",
    cecPosition: "Presidenta",
    photoUrl: "", 
  },
  {
    id: 2,
    firstName: "Carlos",
    lastName: "Rojas",
    email: "carlos.rojas@userena.cl",
    cecPosition: "Tesorero",
    photoUrl: "",
  },
  {
    id: 3,
    firstName: "Ana",
    lastName: "Pérez",
    email: "ana.perez@userena.cl",
    cecPosition: "Secretaria",
    photoUrl: "",
  }
];

export default function CEC() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <header className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Miembros CEC</h1>
          <p className="text-blue-100">Centro de Estudiantes de Computación - Universidad de La Serena</p>
        </div>
      </header>

      {/* miembros */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cecMembers.map(member => (
              <div key={member.id} className="bg-white rounded-lg shadow border border-gray-200 p-6 flex flex-col items-center">
                <div className="mb-4">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={`${member.firstName} ${member.lastName}`} className="rounded shadow object-cover h-36 w-36 bg-gray-100" />
                  ) : (
                    <div className="h-36 w-36 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                      {/* Placeholder SVG o ícono */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0 1 12 0v2" /></svg>
                    </div>
                  )}
                </div>
                <div className="text-lg font-bold text-blue-800 text-center">
                  {member.firstName} {member.lastName}
                </div>
                <div className="text-sm text-gray-500 text-center mb-2">{member.email}</div>
                <div className="text-blue-700 font-semibold">{member.cecPosition}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}






