import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  ArrowLeft,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Users as UsersIcon,
} from "lucide-react";
import { supabaseCliente } from "@/services/supabaseCliente";

interface User {
  id: number;                      
  idUsuario: string | null;     
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "editor" | "student" | string;
  isCECMember: boolean;
  cecPosition?: string;
  studentStatus?: string | null;  
}

const STUDENT_STATUS_OPTIONS = [
  { value: "activo", label: "Activo" },
  { value: "egresado", label: "Egresado" },
  { value: "suspendido", label: "Suspendido" },
  { value: "retirado", label: "Retirado" },
];

export default function GestionUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "editor":
        return "Editor";
      case "student":
        return "Estudiante";
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status?: string | null) => {
    if (!status) return "Sin estado";
    const option = STUDENT_STATUS_OPTIONS.find((o) => o.value === status);
    return option ? option.label : status;
  };

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case "activo":
        return "bg-emerald-100 text-emerald-800";
      case "egresado":
        return "bg-indigo-100 text-indigo-800";
      case "suspendido":
        return "bg-yellow-100 text-yellow-800";
      case "retirado":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingList(true);
        setLoadError(null);

        const { data, error } = await supabaseCliente
          .from("usuarios")
          .select("id, id_usuario, nombres, apellidos, correo_usuario, rol, estado_estudiante, miembros_cec ( cargo )"
          )
          .order("apellidos", { ascending: true });

        if (error) throw error;

        const mapped: User[] =
          data?.map((row: any) => {
            const cec = row.miembros_cec;
            const cargos =
              Array.isArray(cec) ? cec : cec ? [cec] : [];

            const isCECMember = cargos.length > 0;
            const cecPosition = isCECMember ? cargos[0].cargo : "";

            return {
              id: row.id,
              idUsuario: row.id_usuario,
              email: row.correo_usuario,
              firstName: row.nombres || "",
              lastName: row.apellidos || "",
              role: (row.rol || "student") as User["role"],
              isCECMember,
              cecPosition,
              studentStatus: row.estado_estudiante || null,
            };
          }) ?? [];

        setUsers(mapped);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setLoadError("No se pudieron cargar los usuarios.");
      } finally {
        setLoadingList(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setNewPassword("");
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    const prevUser = users.find((u) => u.id === editingUser.id);
    const hadCECBefore = prevUser?.isCECMember ?? false;

    try {
      const { error: updateUserError } = await supabaseCliente
        .from("usuarios")
        .update({
          correo_usuario: editingUser.email,
          nombres: editingUser.firstName,
          apellidos: editingUser.lastName,
          rol: editingUser.role,
          estado_estudiante: editingUser.studentStatus || "activo",
        })
        .eq("id", editingUser.id);

      if (updateUserError) throw updateUserError;

      if (newPassword && newPassword.length >= 6) {
        // Aquí iría la lógica de Supabase para actualizar la contraseña
        // Por ahora solo un console.log
        console.log(`Actualizar contraseña para usuario ${editingUser.email}: ${newPassword}`);
        alert(`Contraseña actualizada correctamente`);
      } else if (newPassword && newPassword.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      if (editingUser.idUsuario) {
        if (editingUser.isCECMember) {
          if (!hadCECBefore) {
            const { error: insertCECError } = await supabaseCliente
              .from("miembros_cec")
              .insert({
                id_usuario: editingUser.idUsuario,
                cargo: editingUser.cecPosition || null,
              });

            if (insertCECError) throw insertCECError;
          } else {
            const { error: updateCECError } = await supabaseCliente
              .from("miembros_cec")
              .update({
                cargo: editingUser.cecPosition || null,
              })
              .eq("id_usuario", editingUser.idUsuario);

            if (updateCECError) throw updateCECError;
          }
        } else if (hadCECBefore) {
          const { error: deleteCECError } = await supabaseCliente
            .from("miembros_cec")
            .delete()
            .eq("id_usuario", editingUser.idUsuario);

          if (deleteCECError) throw deleteCECError;
        }
      } else if (editingUser.isCECMember) {
        alert(
          "Este usuario aún no tiene cuenta vinculada (id_usuario). No se puede registrar en el CEC hasta que se registre en la plataforma."
        );
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? editingUser : u))
      );
      setEditingUser(null);
      setNewPassword("");
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert("No se pudo actualizar el usuario.");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    const userToDelete = users.find((u) => u.id === id);

    try {
      if (userToDelete?.idUsuario) {
        await supabaseCliente
          .from("miembros_cec")
          .delete()
          .eq("id_usuario", userToDelete.idUsuario);
      }

      const { error } = await supabaseCliente
        .from("usuarios")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingList) {
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
            <h1 className="text-4xl font-bold mb-2">
              Gestión de Usuarios y Roles
            </h1>
            <p className="text-blue-100">
              Edita roles, estado de estudiante y membresías CEC
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner message="Cargando usuarios..." fullScreen={false} />
        </div>
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
          <h1 className="text-4xl font-bold mb-2">
            Gestión de Usuarios y Roles
          </h1>
          <p className="text-blue-100">
            Edita roles, estado de estudiante y membresías CEC
          </p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Búsqueda */}
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
          </div>

          {loadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {loadError}
            </div>
          )}

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      CEC
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      {editingUser?.id === user.id ? (
                        <td className="px-6 py-4" colSpan={5}>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Nombre
                                </label>
                                <input
                                  type="text"
                                  value={editingUser.firstName}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      firstName: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Apellidos
                                </label>
                                <input
                                  type="text"
                                  value={editingUser.lastName}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      lastName: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  value={editingUser.email}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      email: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Nueva Contraseña
                                </label>
                                <input
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                  placeholder="Dejar vacío para no cambiar"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Rol
                                </label>
                                <select
                                  value={editingUser.role}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      role: e.target.value as any,
                                    })
                                  }
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                >
                                  <option value="student">Estudiante</option>
                                  <option value="editor">Editor</option>
                                  <option value="admin">Administrador</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Estado estudiante
                                </label>
                                <select
                                  value={editingUser.studentStatus || "activo"}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      studentStatus: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                >
                                  {STUDENT_STATUS_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                              <label className="flex items-center cursor-pointer mb-2">
                                <input
                                  type="checkbox"
                                  checked={editingUser.isCECMember}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      isCECMember: e.target.checked,
                                    })
                                  }
                                  className="w-4 h-4 text-blue-700 rounded mr-2"
                                  disabled={!editingUser.idUsuario}
                                />
                                <span className="text-sm font-semibold text-gray-900">
                                  Miembro del CEC
                                </span>
                              </label>
                              {!editingUser.idUsuario && (
                                <p className="text-xs text-gray-500">
                                  El usuario debe tener cuenta vinculada para
                                  poder registrarlo como miembro del CEC.
                                </p>
                              )}
                              {editingUser.isCECMember && (
                                <input
                                  type="text"
                                  value={editingUser.cecPosition || ""}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      cecPosition: e.target.value,
                                    })
                                  }
                                  className="mt-2 w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                                  placeholder="Cargo en CEC"
                                />
                              )}
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm rounded transition flex items-center gap-2"
                              >
                                <Save className="w-4 h-4" />
                                Guardar
                              </button>
                              <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition flex items-center gap-2"
                              >
                                <X className="w-4 h-4" />
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {getRoleName(user.role)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                user.studentStatus
                              )}`}
                            >
                              {getStatusLabel(user.studentStatus)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {user.isCECMember ? (
                              <div>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  ✓ Miembro
                                </span>
                                {user.cecPosition && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {user.cecPosition}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}