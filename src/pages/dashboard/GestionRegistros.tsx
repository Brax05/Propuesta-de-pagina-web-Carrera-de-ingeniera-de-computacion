import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, Search, Check, X, Clock, UserCheck } from "lucide-react";

interface PendingUser {
  id_usuario: string;
  correo_usuario: string;
  nombres: string;
  apellidos: string;
  fecha_registro: string;
  estado_registro: "pendiente" | "aprobado" | "rechazado";
}

// ========================================
// DATOS SIMULADOS LOCALES
// ========================================
// Ejemplo para simular usuarios registrados pendientes
const MOCK_USERS: PendingUser[] = [
  {
    id_usuario: "1",
    correo_usuario: "pedro.martinez@userena.cl",
    nombres: "Pedro",
    apellidos: "Martínez López",
    fecha_registro: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    estado_registro: "pendiente",
  },
  {
    id_usuario: "2",
    correo_usuario: "ana.silva@userena.cl",
    nombres: "Ana",
    apellidos: "Silva García",
    fecha_registro: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    estado_registro: "pendiente",
  },
  {
    id_usuario: "3",
    correo_usuario: "luis.fernandez@userena.cl",
    nombres: "Luis",
    apellidos: "Fernández Torres",
    fecha_registro: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    estado_registro: "pendiente",
  },
  {
    id_usuario: "4",
    correo_usuario: "carolina.rojas@userena.cl",
    nombres: "Carolina",
    apellidos: "Rojas Muñoz",
    fecha_registro: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    estado_registro: "pendiente",
  },
  {
    id_usuario: "5",
    correo_usuario: "diego.castro@userena.cl",
    nombres: "Diego",
    apellidos: "Castro Pérez",
    fecha_registro: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    estado_registro: "aprobado",
  },
];

export default function GestionRegistros() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "todos" | "pendiente" | "aprobado" | "rechazado"
  >("pendiente");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPendingUsers = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setPendingUsers(MOCK_USERS);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPendingUsers();
  }, [loadPendingUsers]);

  const handleApprove = async (userId: string) => {
    setProcessingId(userId);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPendingUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id_usuario === userId
            ? { ...user, estado_registro: "aprobado" as const }
            : user
        )
      );
      alert("Usuario aprobado exitosamente");
    } catch (error) {
      console.error("Error al aprobar usuario:", error);
      alert("Error al aprobar el usuario");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (userId: string) => {
    if (!window.confirm("¿Estás seguro de rechazar este registro? El usuario quedará marcado como rechazado.")) {
      return;
    }
    setProcessingId(userId);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPendingUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id_usuario === userId
            ? { ...user, estado_registro: "rechazado" as const }
            : user
        )
      );
      alert("Usuario rechazado");
    } catch (error) {
      console.error("Error al rechazar usuario:", error);
      alert("Error al rechazar el usuario");
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `Hace ${diffMinutes} minuto${diffMinutes > 1 ? "s" : ""}`;
    }
  };

  const filteredUsers = pendingUsers.filter((user) => {
    const matchesSearch =
      user.correo_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "todos" || user.estado_registro === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = pendingUsers.filter(
    (u) => u.estado_registro === "pendiente"
  ).length;
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const processedThisWeek = pendingUsers.filter((u) => {
    if (u.estado_registro === "pendiente") return false;
    const registrationDate = new Date(u.fecha_registro);
    return registrationDate >= oneWeekAgo;
  });
  
  const approvedThisWeek = processedThisWeek.filter(
    (u) => u.estado_registro === "aprobado"
  ).length;
  const rejectedThisWeek = processedThisWeek.filter(
    (u) => u.estado_registro === "rechazado"
  ).length;
  const totalProcessedThisWeek = processedThisWeek.length;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <LoadingSpinner message="Cargando registros..." />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard/perfil"
            className="inline-flex items-center text-blue-100 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Perfil
          </Link>
          <h1 className="text-4xl font-bold mb-2">Gestión de Registros</h1>
          <p className="text-blue-100">
            Revisa y aprueba nuevas solicitudes de registro
          </p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">
                  PENDIENTES
                </p>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                {pendingCount}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">
                  PROCESADOS ESTA SEMANA
                </p>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-700 mb-3">
                {totalProcessedThisWeek}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {approvedThisWeek} aprobados
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {rejectedThisWeek} rechazados
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobado">Aprobados</option>
              <option value="rechazado">Rechazados</option>
            </select>
          </div>

          {/* Tabla de Registros */}
          {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No hay registros{" "}
                {filterStatus !== "todos" && filterStatus}
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "No se encontraron resultados para tu búsqueda"
                  : "Todos los registros han sido procesados"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Registro</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id_usuario} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {user.nombres} {user.apellidos}
                            </div>
                            <div className="text-sm text-gray-500">{user.correo_usuario}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm text-gray-900">
                              {formatDate(user.fecha_registro)}
                            </div>
                            <div className="text-xs text-blue-600 font-semibold">
                              {getTimeSince(user.fecha_registro)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {user.estado_registro === "pendiente" ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pendiente
                            </span>
                          ) : user.estado_registro === "aprobado" ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Aprobado
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Rechazado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {user.estado_registro === "pendiente" && (
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleApprove(user.id_usuario)}
                                disabled={processingId === user.id_usuario}
                                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm rounded transition flex items-center gap-1.5"
                              >
                                <Check className="w-3.5 h-3.5" />
                                {processingId === user.id_usuario ? "..." : "Aprobar"}
                              </button>
                              <button
                                onClick={() => handleReject(user.id_usuario)}
                                disabled={processingId === user.id_usuario}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm rounded transition flex items-center gap-1.5"
                              >
                                <X className="w-3.5 h-3.5" />
                                {processingId === user.id_usuario ? "..." : "Rechazar"}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}