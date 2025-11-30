import { useAuth } from "@/hooks/AuthContext";

export default function AuthDebug() {
  const { user, session, role, loading } = useAuth();

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded text-xs max-w-xs overflow-auto max-h-64 shadow-lg border border-gray-700 z-50">
      <h3 className="font-bold mb-2 text-sm">🔐 Auth Debug</h3>
      <div className="space-y-1 font-mono text-[10px]">
        <p>
          Loading:{" "}
          <span className={loading ? "text-yellow-400" : "text-green-400"}>
            {loading ? "⏳" : "✅"}
          </span>
        </p>
        <p>
          User:{" "}
          <span className={user ? "text-green-400" : "text-red-400"}>
            {user ? user.email : "❌"}
          </span>
        </p>
        <p>
          Session:{" "}
          <span className={session ? "text-green-400" : "text-red-400"}>
            {session ? "✅" : "❌"}
          </span>
        </p>
        <p>
          Role: <span className="text-blue-300">{role || "null"}</span>
        </p>
        <p>
          ID:{" "}
          <span className="text-purple-300">{user?.id?.slice(0, 8)}...</span>
        </p>
        <p>
          Email confirmado:{" "}
          <span
            className={
              user?.email_confirmed_at ? "text-green-400" : "text-orange-400"
            }
          >
            {user?.email_confirmed_at ? "✅" : "❌"}
          </span>
        </p>
      </div>
    </div>
  );
}
