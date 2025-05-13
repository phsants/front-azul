import { Routes, Route } from "react-router-dom"; // ✅ Só importa Routes e Route
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Pesquisa from "./pages/PesquisaViagem";
import RotaProtegida from "./pages/RotaProtegida";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/pesquisa"
        element={
          <RotaProtegida>
            <Pesquisa />
          </RotaProtegida>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
