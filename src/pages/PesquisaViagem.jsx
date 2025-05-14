import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioPesquisa from "./FormularioPesquisa";

function PesquisaViagem() {
  const [form, setForm] = useState({
    cliente_nome: "", // Alterado de "nome" para "cliente_nome"
    adultos: 1,
    criancas: 0,
    idadesCriancas: [],
    origens: [""], // Alterado de "origem" para "origens"
    destinos: [""], // Alterado de "destino" para "destinos"
    meses_selecionados: [], // Alterado de "meses" para "meses_selecionados"
    conexao: "direto",
    qtdConexoes: 0,
    preferenciaVoo: "rapido",
  });
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ position: "relative", height: "100vh", backgroundColor: "#4CAF50" }}>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          color: "#ffffff",
        }}
        title="Sair"
      >
        Logout
      </button>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <FormularioPesquisa form={form} setForm={setForm} />
      </div>
    </div>

  );
}

export default PesquisaViagem;