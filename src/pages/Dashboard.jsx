import React from "react";
import { mockTabelaVoos } from "../data/mockVoos";
import { useFiltroVoos } from "../hooks/useFiltroVoos";
import { FiltrosVoos } from "../components/FiltrosVoos";
import { GraficoPrecoVoos } from "../components/GraficoPrecoVoos";
import { TabelaVoos } from "../components/TabelaVoos";

export default function Dashboard() {
  const { filtros, atualizarFiltro, dadosFiltrados } = useFiltroVoos(mockTabelaVoos);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard de Voos</h1>
      <FiltrosVoos filtros={filtros} atualizarFiltro={atualizarFiltro} voos={mockTabelaVoos} />
      <GraficoPrecoVoos dados={dadosFiltrados} />
      <TabelaVoos dados={dadosFiltrados} />
    </div>
  );
}
