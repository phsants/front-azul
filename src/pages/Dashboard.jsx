import React, { useState } from 'react';
import { kpis } from '../data/mockData';
import CardIndicador from '../components/CardIndicador';
import FiltrosVoos from '../components/FiltrosVoos';
import GraficosDashboard from '../components/GraficosDashboard';
import TabelaVoos from '../components/TabelaVoos';
import ModalDetalhes from '../components/ModalDetalhes';
import useFiltroVoos from '../hooks/useFiltroVoos';
import { motion } from 'framer-motion';

/**
 * Página principal do dashboard com KPIs, gráficos, tabelas e filtros
 * @returns {JSX.Element} Componente Dashboard
 */
const Dashboard = () => {
  const { filtros, resultados, carregando, atualizarFiltro, limparFiltros, aplicarFiltros } = useFiltroVoos();
  const [vooSelecionado, setVooSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Função para abrir o modal de detalhes
  const abrirModalDetalhes = (voo) => {
    setVooSelecionado(voo);
    setModalAberto(true);
  };

  // Função para fechar o modal de detalhes
  const fecharModalDetalhes = () => {
    setModalAberto(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0"
        >
          Dashboard de Viagens
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-2"
        >
          <select 
            className="select"
            defaultValue="hoje"
          >
            <option value="hoje">Hoje</option>
            <option value="semana">Última semana</option>
            <option value="mes">Último mês</option>
            <option value="trimestre">Último trimestre</option>
            <option value="ano">Último ano</option>
          </select>
          <button className="btn-primary">
            Exportar
          </button>
        </motion.div>
      </div>

      {/* KPIs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpis.map((kpi) => (
          <CardIndicador
            key={kpi.id}
            titulo={kpi.titulo}
            valor={kpi.valor}
            variacao={kpi.variacao}
            positivo={kpi.positivo}
            icone={kpi.icone}
          />
        ))}
      </motion.div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FiltrosVoos
          filtros={filtros}
          atualizarFiltro={atualizarFiltro}
          limparFiltros={limparFiltros}
          aplicarFiltros={aplicarFiltros}
        />
      </motion.div>

      {/* Gráficos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="card p-4">
          <GraficosDashboard tipo="preco" />
        </div>
        <div className="card p-4">
          <GraficosDashboard tipo="volume" />
        </div>
        <div className="card p-4">
          <GraficosDashboard tipo="ocupacao" />
        </div>
        <div className="card p-4">
          <GraficosDashboard tipo="categorias" />
        </div>
      </motion.div>

      {/* Tabela de Voos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Voos Disponíveis
        </h2>
        <TabelaVoos
          voos={resultados}
          carregando={carregando}
          onVerDetalhes={abrirModalDetalhes}
        />
      </motion.div>

      {/* Modal de Detalhes */}
      <ModalDetalhes
        isOpen={modalAberto}
        onClose={fecharModalDetalhes}
        voo={vooSelecionado}
      />
    </div>
  );
};

export default Dashboard;
