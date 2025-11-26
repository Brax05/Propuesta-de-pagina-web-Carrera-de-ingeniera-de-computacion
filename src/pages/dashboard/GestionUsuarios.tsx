import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import {
  ArrowLeft,
  Search,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Users as UsersIcon,
} from "lucide-react";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "editor" | "student";
  isCECMember: boolean;
  cecPosition?: string;
}

export default function GestionUsuarios() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      email: "admin@userena.cl",
      firstName: "Juan",
      lastName: "Pérez",
      role: "admin",
      isCECMember: false,
    },
    {
      id: 2,
      email: "editor@userena.cl",
      firstName: "María",
      lastName: "González",
      role: "editor",
      isCECMember: true,
      cecPosition: "Secretaria",
    },
    {
      id: 3,
      email: "estudiante@userena.cl",
      firstName: "Carlos",
      lastName: "Rojas",
      role: "student",
      isCECMember: true,
      cecPosition: "Tesorero",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [newUser, setNewUser] = useState<Partial<User>>({
    email: "",
    firstName: "",
    lastName: "",
    role: "student",
    isCECMember: false,
    cecPosition: "",
  });

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "editor":
        return "Editor";
      case "student":
        return "Estudiante";
      default:
        return "Usuario";
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

  const handleAddUser = () => {
    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const user: User = {
      id: Date.now(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role || "student",
      isCECMember: newUser.isCECMember || false,
      cecPosition: newUser.cecPosition || "",
    };

    setUsers([...users, user]);
    setNewUser({
      email: "",
      firstName: "",
      lastName: "",
      role: "student",
      isCECMember: false,
      cecPosition: "",
    });
    setIsAdding(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Administra usuarios, asigna roles y gestiona membresías CEC
          </p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra de Búsqueda y Agregar */}
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
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition flex items-center justify-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Agregar Usuario
            </button>
          </div>

          {/* Formulario Agregar Usuario */}
          {isAdding && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Nuevo Usuario
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="usuario@userena.cl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rol *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    <option value="student">Estudiante</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Pérez González"
                  />
                </div>
              </div>

              {/* Membresía CEC */}
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newUser.isCECMember}
                    onChange={(e) =>
                      setNewUser({ ...newUser, isCECMember: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-700 rounded mr-3"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    Miembro del CEC
                  </span>
                </label>

                {newUser.isCECMember && (
                  <div className="mt-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cargo en CEC
                    </label>
                    <input
                      type="text"
                      value={newUser.cecPosition}
                      onChange={(e) =>
                        setNewUser({ ...newUser, cecPosition: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Ej: Presidente, Secretario, Tesorero..."
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddUser}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de Usuarios */}
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
                        <>
                          <td className="px-6 py-4" colSpan={4}>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  />
                                  <span className="text-sm font-semibold text-gray-900">
                                    Miembro del CEC
                                  </span>
                                </label>
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
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
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
                        </>
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
