import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("username") || "Usuário";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Header fixo */}
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Use travel</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Olá, {usuario}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
