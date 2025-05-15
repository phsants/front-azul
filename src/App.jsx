import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Pesquisa from "./pages/PesquisaViagem";
import RotaProtegida from "./pages/RotaProtegida";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/agendamentos";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        path="/"
        element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>
        }
      />
      <Route
        path="/pesquisa"
        element={
          <RotaProtegida>
            <Pesquisa />
          </RotaProtegida>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />
      <Route
        path="/agendamentos"
        element={
        <RotaProtegida>
          <Agendamentos />
        </RotaProtegida>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
