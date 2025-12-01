import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabaseCliente } from "@/services/supabaseCliente";
import { Calendar, MapPin, Star } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext";

interface NewsItem {
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

export default function News() {
  const { loading: authLoading, session } = useAuth();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return; 

    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        setLoadError(null);

        const { data, error } = await supabaseCliente
          .from("noticias")
          .select(
            "id, titular, descripcion_previa, descripcion, fecha, ubicacion, imagen_url, es_destacada, es_publica"
          )
          .order("es_destacada", { ascending: false })
          .order("fecha", { ascending: false });

        if (error) throw error;

        const mapped =
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
          })) ?? [];

        setNewsList(mapped);
      } catch (err) {
        console.error("Error al cargar noticias:", err);
        setLoadError("No se pudieron cargar las noticias.");
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, [authLoading, session]);

  const featured = newsList.find((n) => n.isFeatured) ?? newsList[0] ?? null;
  const others = featured
    ? newsList.filter((n) => n.id !== featured.id)
    : newsList;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white py-8 border-b-4 border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Noticias</h1>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingNews && (
            <LoadingSpinner message="Cargando noticias..." size="md" fullScreen={false} />
          )}

          {loadError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {loadError}
            </div>
          )}

          {!loadingNews && !loadError && newsList.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">
                Aún no hay noticias publicadas. Vuelve pronto.
              </p>
            </div>
          )}

          {featured && (
            <>
              <h2 className="text-3xl font-bold text-blue-700 mb-8">
                Noticia Destacada
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-lg mb-16">
                <img
                  src={
                    featured.imageUrl ||
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop"
                  }
                  alt={featured.title}
                  className="w-full h-80 object-cover rounded"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {featured.title}
                    </h3>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>

                  <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featured.date).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {featured.location}
                  </p>

                  <p className="text-gray-700 mb-6">
                    {featured.previewDescription}
                  </p>

                  <Link to={`/noticias/${featured.id}`}>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                      Ver Noticia Completa
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}

          {others.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Noticias Recientes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {others.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200"
                  >
                    <img
                      src={
                        n.imageUrl ||
                        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
                      }
                      alt={n.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {n.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(n.date).toLocaleDateString("es-CL", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-600 text-xs mb-3 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {n.location}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {n.previewDescription}
                      </p>
                      <Link
                        to={`/noticias/${n.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block"
                      >
                        Leer más
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}