import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbarpage";
import Footer from "@/components/Footerpage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabaseCliente } from "@/services/supabaseCliente";
import { ArrowLeft, Calendar, MapPin, Star } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext"; 

interface NewsDetail {
  id: number;
  title: string;
  previewDescription: string;
  content: string;
  date: string;
  location: string;
  imageUrl?: string;
  isFeatured: boolean;
  isPublic: boolean;
}

export default function NoticiaDetalle() {
  const { loading: authLoading, session } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    if (authLoading || !id) return;

    const fetchNewsById = async () => {
      try {
        setLoadingNews(true);
        setError(null);

        const { data, error } = await supabaseCliente
          .from("noticias")
          .select(
            "id, titular, descripcion_previa, descripcion, fecha, ubicacion, imagen_url, es_destacada, es_publica"
          )
          .eq("id", Number(id))
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError("La noticia no existe o no tienes permiso para verla.");
          return;
        }

        const mapped: NewsDetail = {
          id: data.id,
          title: data.titular,
          previewDescription: data.descripcion_previa,
          content: data.descripcion,
          date: data.fecha,
          location: data.ubicacion,
          imageUrl: data.imagen_url || "",
          isFeatured: data.es_destacada,
          isPublic: data.es_publica,
        };

        setNews(mapped);
      } catch (err) {
        console.error("Error al cargar noticia:", err);
        setError("No se pudo cargar la noticia.");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNewsById();
  }, [authLoading, session, id]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-gray-900 text-white py-8 border-b-4 border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/noticias"
            className="inline-flex items-center text-gray-300 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a noticias
          </Link>
          <h1 className="text-3xl font-bold">
            {news ? news.title : "Detalle de noticia"}
          </h1>
        </div>
      </div>

      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingNews && (
            <LoadingSpinner message="Cargando noticia..." size="md" fullScreen={false} />
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {!loadingNews && !error && news && (
            <article className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              {news.imageUrl && (
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full max-h-[450px] object-cover"
                />
              )}

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(news.date).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {news.location}
                  </span>
                  {news.isFeatured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Star className="w-4 h-4 mr-1" />
                      Destacada
                    </span>
                  )}
                </div>

                {news.previewDescription && (
                  <p className="text-lg text-gray-700 font-semibold mb-6">
                    {news.previewDescription}
                  </p>
                )}

                <div className="prose max-w-none text-gray-800">
                  {news.content.split("\n").map((p, i) => (
                    <p key={i} className="mb-4">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}