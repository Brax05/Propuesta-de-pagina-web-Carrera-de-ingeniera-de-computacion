// Copia este código completo y reemplaza tu GestionNoticias.tsx actual

import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import { ArrowLeft, Search, Edit, Trash2, Plus, Save, X, Star, Calendar, MapPin } from "lucide-react";

interface News {
  id: number;
  title: string;
  previewDescription: string;
  content: string;
  date: string;
  location: string;
  isFeatured: boolean;
  isPublic: boolean;
  imageUrl?: string;
}

export default function GestionNoticias() {
  const [newsList, setNewsList] = useState<News[]>([
    {
      id: 1,
      title: "Estudiantes de Ingeniería en Computación destacan en Hackathon Nacional 2025",
      previewDescription: "Un equipo de estudiantes obtuvo el segundo lugar desarrollando una aplicación de IA.",
      content: "Un equipo de estudiantes de la Universidad de La Serena obtuvo el segundo lugar en el Hackathon Nacional de Innovación Tecnológica, desarrollando una aplicación de inteligencia artificial enfocada en el monitoreo ambiental. El proyecto destacó por su innovación y aplicabilidad práctica.",
      date: "2025-11-05",
      location: "Coquimbo, Chile",
      isFeatured: true,
      isPublic: true,
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Bienvenida a nuevos estudiantes de Ingeniería en Computación",
      previewDescription: "Conoce nuestras actividades académicas y de bienvenida.",
      content: "La Escuela de Ingeniería en Computación dio la bienvenida a más de 50 nuevos estudiantes en una ceremonia realizada en el Campus Andrés Bello.",
      date: "2025-03-15",
      location: "La Serena, Chile",
      isFeatured: false,
      isPublic: false 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  
  const [newNews, setNewNews] = useState<Partial<News>>({
    title: "",
    previewDescription: "",
    content: "",
    date: "",
    location: "",
    isFeatured: false,
    isPublic: true,
    imageUrl: ""
  });

  const handleAddNews = () => {
    if (!newNews.title || !newNews.previewDescription || !newNews.content || !newNews.date || !newNews.location) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const news: News = {
      id: Date.now(),
      title: newNews.title,
      previewDescription: newNews.previewDescription,
      content: newNews.content,
      date: newNews.date,
      location: newNews.location,
      isFeatured: newNews.isFeatured || false,
      isPublic: newNews.isPublic !== undefined ? newNews.isPublic : true,
      imageUrl: newNews.imageUrl || ""
    };

    setNewsList([news, ...newsList]);
    setNewNews({ 
      title: "", 
      previewDescription: "", 
      content: "", 
      date: "", 
      location: "", 
      isFeatured: false,
      isPublic: true,
      imageUrl: "" 
    });
    setIsAdding(false);
  };

  const handleEditNews = (news: News) => {
    setEditingNews({ ...news });
  };

  const handleSaveEdit = () => {
    if (!editingNews) return;
    setNewsList(newsList.map(n => n.id === editingNews.id ? editingNews : n));
    setEditingNews(null);
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta noticia?")) {
      setNewsList(newsList.filter(n => n.id !== id));
    }
  };

  const toggleFeatured = (id: number) => {
    setNewsList(newsList.map(n => 
      n.id === id ? { ...n, isFeatured: !n.isFeatured } : n
    ));
  };

  const filteredNews = newsList.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.previewDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-blue-700 text-white py-12 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/perfil" className="inline-flex items-center text-blue-100 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Perfil
          </Link>
          <h1 className="text-4xl font-bold mb-2">Edición de Noticias</h1>
          <p className="text-blue-100">Crea, edita y gestiona las noticias de la escuela</p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar noticias..."
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
              Nueva Noticia
            </button>
          </div>

          {isAdding && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nueva Noticia</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Título *</label>
                  <input
                    type="text"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Título de la noticia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción de Vista Previa *</label>
                  <textarea
                    value={newNews.previewDescription}
                    onChange={(e) => setNewNews({ ...newNews, previewDescription: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                    placeholder="Breve descripción que se mostrará en la vista previa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contenido Completo *</label>
                  <textarea
                    value={newNews.content}
                    onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                    placeholder="Contenido completo de la noticia..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Fecha *
                    </label>
                    <input
                      type="date"
                      value={newNews.date}
                      onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Ubicación *
                    </label>
                    <input
                      type="text"
                      value={newNews.location}
                      onChange={(e) => setNewNews({ ...newNews, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="La Serena, Chile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL de Imagen (opcional)</label>
                  <input
                    type="text"
                    value={newNews.imageUrl}
                    onChange={(e) => setNewNews({ ...newNews, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="https://..."
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNews.isFeatured}
                      onChange={(e) => setNewNews({ ...newNews, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-blue-700 rounded mr-3"
                    />
                    <Star className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-900">Marcar como Noticia Destacada</span>
                  </label>
                  <p className="text-xs text-gray-600 mt-2 ml-7">La noticia destacada aparecerá en un lugar prominente en la página principal</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNews.isPublic}
                      onChange={(e) => setNewNews({ ...newNews, isPublic: e.target.checked })}
                      className="w-4 h-4 text-blue-700 rounded mr-3"
                    />
                    <span className="text-sm font-semibold text-gray-900">Noticia Pública</span>
                  </label>
                  <p className="text-xs text-gray-600 mt-2 ml-7">
                    {newNews.isPublic 
                      ? "Visible para todos los visitantes (logueados y no logueados)" 
                      : "Visible solo para usuarios autenticados"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddNews}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Publicar Noticia
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

          <div className="space-y-6">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                {editingNews?.id === news.id ? (
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Editar Noticia</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Título</label>
                        <input
                          type="text"
                          value={editingNews.title}
                          onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción de Vista Previa</label>
                        <textarea
                          value={editingNews.previewDescription}
                          onChange={(e) => setEditingNews({ ...editingNews, previewDescription: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Contenido Completo</label>
                        <textarea
                          value={editingNews.content}
                          onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
                          <input
                            type="date"
                            value={editingNews.date}
                            onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Ubicación</label>
                          <input
                            type="text"
                            value={editingNews.location}
                            onChange={(e) => setEditingNews({ ...editingNews, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">URL de Imagen</label>
                        <input
                          type="text"
                          value={editingNews.imageUrl || ""}
                          onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingNews.isFeatured}
                            onChange={(e) => setEditingNews({ ...editingNews, isFeatured: e.target.checked })}
                            className="w-4 h-4 text-blue-700 rounded mr-3"
                          />
                          <Star className="w-5 h-5 text-yellow-600 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">Noticia Destacada</span>
                        </label>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingNews.isPublic}
                            onChange={(e) => setEditingNews({ ...editingNews, isPublic: e.target.checked })}
                            className="w-4 h-4 text-blue-700 rounded mr-3"
                          />
                          <span className="text-sm font-semibold text-gray-900">Noticia Pública</span>
                        </label>
                        <p className="text-xs text-gray-600 mt-2 ml-7">
                          {editingNews.isPublic 
                            ? "Visible para todo público" 
                            : "Visible solo para usuarios autenticados"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={handleSaveEdit}
                        className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() => setEditingNews(null)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition flex items-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row">
                    {news.imageUrl && (
                      <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="mb-2">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{news.title}</h3>
                            <div className="flex flex-wrap items-center gap-2">
                              {news.isFeatured && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  ⭐ Destacada
                                </span>
                              )}
                              {!news.isPublic && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  🔒 Privada
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{news.previewDescription}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(news.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {news.location}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => toggleFeatured(news.id)}
                            className={`p-2 rounded transition ${news.isFeatured ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
                            title={news.isFeatured ? "Quitar destacado" : "Marcar como destacado"}
                          >
                            <Star className={`w-5 h-5 ${news.isFeatured ? 'fill-yellow-500' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleEditNews(news)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNews(news.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <p className="text-sm text-gray-700 line-clamp-2">{news.content}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
              <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron noticias</p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}