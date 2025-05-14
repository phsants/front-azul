import React, { useEffect, useState } from "react";
import { useFiltroVoos } from "../hooks/useFiltroVoos";
import { FiltrosVoos } from "../components/FiltrosVoos";
import { GraficoPrecoVoos } from "../components/GraficoPrecoVoos";
import { TabelaVoos } from "../components/TabelaVoos";

export default function Dashboard() {
  const [voos, setVoos] = useState([]);
  const { filtros, atualizarFiltro, dadosFiltrados } = useFiltroVoos(voos);

  useEffect(() => {
    const fetchVoos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token não encontrado. Redirecionando...");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/voos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setVoos(data);
        } else {
          console.error("Erro no fetchVoos:", data);
          alert(data.error || "Erro ao buscar voos.");
        }
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
        alert("Erro de comunicação com o servidor.");
      }
    };

    fetchVoos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard de Voos</h1>
      <FiltrosVoos filtros={filtros} atualizarFiltro={atualizarFiltro} voos={voos} />
      <GraficoPrecoVoos dados={dadosFiltrados} />
      <TabelaVoos dados={dadosFiltrados} />
    </div>
  );
}
