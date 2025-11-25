import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabaseCliente } from "@/services/supabaseCliente";
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
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  
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

    useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingList(true);
        setLoadError(null);

        const { data, error } = await supabaseCliente
          .from("noticias")
          .select(
            "id, titular, descripcion_previa, descripcion, fecha, ubicacion, imagen_url, es_destacada, es_publica"
          )
          .order("fecha", { ascending: false });

        if (error) throw error;

        const mapped: News[] =
          data?.map((row: any) => ({
            id: row.id,
            title: row.titular,
            previewDescription: row.descripcion_previa,
            content: row.descripcion,
            date: row.fecha,
            location: row.ubicacion,
            isFeatured: row.es_destacada,
            isPublic: row.es_publica,
            imageUrl: row.imagen_url || "",
          })) || [];

        setNewsList(mapped);
      } catch (err) {
        console.error("Error al cargar noticias:", err);
        setLoadError("No se pudieron cargar las noticias");
      } finally {
        setLoadingList(false);
      }
    };

    fetchNews();
  }, []);

  const handleAddNews = async () => {
    if (
      !newNews.title ||
      !newNews.previewDescription ||
      !newNews.content ||
      !newNews.date ||
      !newNews.location
    ) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      let uploadImageUrl: string | null = null;

      if(imageFile){
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `noticias/${fileName}`;

      const {error: uploadError } = await supabaseCliente.storage
      .from("ImagenesNoticias")
      .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError);
        alert("No se pudo subir la imagen");
        return;
      }

      const {data:publicUrlData} = supabaseCliente.storage
      .from("ImagenesNoticias")
      .getPublicUrl(filePath);

      uploadImageUrl = publicUrlData.publicUrl;
      }


      const { data, error } = await supabaseCliente
        .from("noticias")
        .insert([
          {
            titular: newNews.title,
            autor: "Escuela de Ingenieria en Computacion",
            descripcion_previa: newNews.previewDescription,
            descripcion: newNews.content,
            fecha: newNews.date,
            ubicacion: newNews.location,
            imagen_url: uploadImageUrl || null,
            es_destacada: newNews.isFeatured || false,
            es_publica: newNews.isPublic || false,
          },
        ])
        .select(
          "id, titular, autor, descripcion_previa, descripcion, fecha, ubicacion, imagen_url, es_destacada, es_publica"
        )
        .single();

      if (error) throw error;

      const news: News = {
        id: data.id,
        title: data.titular,
        previewDescription: data.descripcion_previa,
        content: data.descripcion,
        date: data.fecha,
        location: data.ubicacion,
        isFeatured: data.es_destacada,
        isPublic: data.es_publica,
        imageUrl: data.imagen_url || "",
      };

      // La agregamos al estado
      setNewsList((prev) => [news, ...prev]);

      // Limpiamos el formulario
      setNewNews({
        title: "",
        previewDescription: "",
        content: "",
        date: "",
        location: "",
        isFeatured: false,
        isPublic: true,
        imageUrl: "",
      });
      setImageFile(null);
      setImageFileName("");
      setIsAdding(false);
    } catch (err) {
      console.error("Error al publicar noticia:", err);
      alert("Error al publicar noticia");
    }
  };

  const handleEditNews = (news: News) => {
    setEditingNews({ ...news });
  };

  const handleSaveEdit = async () => {
    if (!editingNews) return;

    try {
      const { error } = await supabaseCliente
        .from("noticias")
        .update({
          titular: editingNews.title,
          descripcion_previa: editingNews.previewDescription,
          descripcion: editingNews.content,
          fecha: editingNews.date,
          ubicacion: editingNews.location,
          imagen_url: editingNews.imageUrl || null,
          es_destacada: editingNews.isFeatured,
          es_publica: editingNews.isPublic,
        })
        .eq("id", editingNews.id);

      if (error) throw error;

      setNewsList((prev) =>
        prev.map((n) =>
          n.id === editingNews.id ? editingNews : n
        )
      );
      setEditingNews(null);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      alert("No se pudo guardar la noticia");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setImageFileName(file ? file.name : "");
  };


  const handleDeleteNews = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta noticia?")) return;

    try {
      const { error } = await supabaseCliente
        .from("noticias")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNewsList((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error al eliminar noticia:", err);
      alert("No se pudo eliminar la noticia");
    }
  };
  
  const toggleFeatured = async (id: number) => {
    const news = newsList.find((n) => n.id === id);
    if (!news) return;

    const nuevoValor = !news.isFeatured;

    try {
      const { error } = await supabaseCliente
        .from("noticias")
        .update({ es_destacada: nuevoValor })
        .eq("id", id);

      if (error) throw error;

      setNewsList((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isFeatured: nuevoValor } : n
        )
      );
    } catch (err) {
      console.error("Error al actualizar destacado:", err);
      alert("No se pudo actualizar la noticia destacada");
    }
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

          {/* Mensajes de carga / error */}
          {loadingList && (
            <div className="mb-6 text-gray-500 text-sm">
              Cargando noticias…
            </div>
          )}
          {loadError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {loadError}
            </div>
          )}

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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagen (opcional)
                  </label>

                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 bg-blue-50 border border-blue-300 rounded-lg text-sm font-semibold text-blue-700 cursor-pointer hover:bg-blue-100">
                      Seleccionar archivo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
            
                    <span className="inline-flex items-center px-2 py-1 mt-1 rounded-full border border-green-200 bg-green-50 text-xs font-medium text-green-700 max-w-xs truncate">
                      {imageFileName || "Ningún archivo seleccionado"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Sube una imagen para la noticia (JPG, PNG, etc.)
                  </p>
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