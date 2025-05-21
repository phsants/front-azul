import React, { useEffect, useState } from "react";
import { useFiltroVoos } from "../hooks/useFiltroVoos";
import { FiltrosVoos } from "../components/FiltrosVoos";
import { GraficoPrecoVoos } from "../components/GraficoPrecoVoos";
import { TabelaVoos } from "../components/TabelaVoos";
import { ModalDetalhes } from "../components/ModalDetalhes";
import { GraficosDashboard } from "../components/GraficosDashboard";

export default function Dashboard() {
  const [voos, setVoos] = useState([]);
  const { filtros, atualizarFiltro, dadosFiltrados } = useFiltroVoos(voos);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);

  useEffect(() => {
    const fetchVoos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/voos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setVoos(data);
        } else {
          alert(data.error || "Erro ao buscar voos.");
        }
      } catch (error) {
        alert("Erro de comunicação com o servidor.");
      }
    };

    fetchVoos();
  }, []);

  // 👉 Função para abrir modal ao clicar na linha
  const handleRowClick = (dados) => {
    setDadosSelecionados(dados);
  };

  // 👉 Indicadores
  const totalVoos = dadosFiltrados.length;
  const precos = dadosFiltrados.map((v) => v.preco).filter(Boolean);
  const mediaPreco = precos.length
    ? (precos.reduce((a, b) => a + b, 0) / precos.length).toFixed(2)
    : 0;
  const menorPreco = precos.length ? Math.min(...precos) : 0;
  const destinoMaisBuscado =
    dadosFiltrados.reduce((acc, v) => {
      acc[v.destino] = (acc[v.destino] || 0) + 1;
      return acc;
    }, {});
  const destinoPopular = Object.entries(destinoMaisBuscado).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "N/A";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">Dashboard de Voos</h1>

      {/* 🔥 Cards de Indicadores */}
      <div className="flex gap-4 flex-wrap">
        <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[180px]">
          <h2 className="text-sm text-gray-500">Total de Voos</h2>
          <p className="text-2xl font-semibold text-blue-600">{totalVoos}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[180px]">
          <h2 className="text-sm text-gray-500">Média de Preço</h2>
          <p className="text-2xl font-semibold text-green-600">
            R$ {mediaPreco}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[180px]">
          <h2 className="text-sm text-gray-500">Menor Preço</h2>
          <p className="text-2xl font-semibold text-green-600">
            R$ {menorPreco}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[180px]">
          <h2 className="text-sm text-gray-500">Destino + Buscado</h2>
          <p className="text-xl font-semibold text-blue-600">
            {destinoPopular}
          </p>
        </div>
      </div>

      <div className="mt-8">
          {/* 🔥 Filtros */}
          <FiltrosVoos
            filtros={filtros}
            atualizarFiltro={atualizarFiltro}
            voos={voos}
          />
      </div>

      {/* 🔥 Gráficos */}
      <GraficoPrecoVoos dados={dadosFiltrados} />
      <GraficosDashboard dados={dadosFiltrados} />

      {/* 🔥 Tabela */}
      <TabelaVoos dados={dadosFiltrados} onRowClick={handleRowClick} />

      {/* 🔥 Modal de Detalhes */}
      <ModalDetalhes
        aberto={!!dadosSelecionados}
        onClose={() => setDadosSelecionados(null)}
        dados={dadosSelecionados}
      />
    </div>
  );
}
