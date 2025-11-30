import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabaseCliente } from "@/services/supabaseCliente";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext";

interface NewsHome {
  id: number;
  title: string;
  previewDescription: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export default function NoticiasRecientesSection() {
  const { loading: authLoading, session } = useAuth();
  const [news, setNews] = useState<NewsHome[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    const fetchHomeNews = async () => {
      try {
        setLoadingNews(true);
        setNewsError(null);

        const { data, error } = await supabaseCliente
          .from("noticias")
          .select(
            "id, titular, descripcion_previa, fecha, ubicacion, imagen_url"
          )
          .order("fecha", { ascending: false })
          .limit(3);

        if (error) throw error;

        const mapped: NewsHome[] =
          data?.map((row: any) => ({
            id: row.id,
            title: row.titular,
            previewDescription: row.descripcion_previa,
            date: row.fecha,
            location: row.ubicacion,
            imageUrl: row.imagen_url || "",
          })) ?? [];

        setNews(mapped);
      } catch (err) {
        console.error("Error al cargar noticias para el home:", err);
        setNewsError("No se pudieron cargar las noticias recientes.");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchHomeNews();
  }, [authLoading, session]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Noticias Recientes</h2>
          <Link
            to="/noticias"
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            Ver todas →
          </Link>
        </div>

        {/* estados de carga / error */}
        {loadingNews && (
          <div className="flex items-center justify-center py-8 text-gray-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Cargando noticias…</span>
          </div>
        )}

        {newsError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {newsError}
          </div>
        )}

        {!loadingNews && !newsError && (
          <>
            {news.length === 0 ? (
              <p className="text-gray-500">
                Aún no hay noticias publicadas. Revisa más tarde.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.map((n) => (
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
            )}
          </>
        )}
      </div>
    </section>
  );
}
