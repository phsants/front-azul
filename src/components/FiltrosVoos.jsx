import React, { useState } from 'react';
import { cidades, aeroportos, companhiasAereas } from '../data/mockData';
import { Search, X, Filter } from 'lucide-react';

/**
 * Componente para filtros dinâmicos de voos e pacotes
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.filtros - Estado atual dos filtros
 * @param {Function} props.atualizarFiltro - Função para atualizar um filtro específico
 * @param {Function} props.limparFiltros - Função para limpar todos os filtros
 * @param {Function} props.aplicarFiltros - Função para aplicar os filtros
 * @returns {JSX.Element} Componente FiltrosVoos
 */
const FiltrosVoos = ({ filtros, atualizarFiltro, limparFiltros, aplicarFiltros }) => {
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filtros de Pesquisa</h2>
        <button 
          onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
          className="flex items-center text-primary hover:text-blue-700 transition-colors"
        >
          <Filter className="w-4 h-4 mr-1" />
          {mostrarFiltrosAvancados ? 'Ocultar filtros avançados' : 'Mostrar filtros avançados'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Filtro de Origem */}
        <div>
          <label htmlFor="origem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Origem
          </label>
          <select
            id="origem"
            className="select w-full"
            value={filtros.origem}
            onChange={(e) => atualizarFiltro('origem', e.target.value)}
          >
            <option value="">Todas as origens</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome} ({cidade.codigo})
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Destino */}
        <div>
          <label htmlFor="destino" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Destino
          </label>
          <select
            id="destino"
            className="select w-full"
            value={filtros.destino}
            onChange={(e) => atualizarFiltro('destino', e.target.value)}
          >
            <option value="">Todos os destinos</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome} ({cidade.codigo})
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Data de Ida */}
        <div>
          <label htmlFor="dataIda" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data de Ida
          </label>
          <input
            type="date"
            id="dataIda"
            className="input w-full"
            value={filtros.dataIda}
            onChange={(e) => atualizarFiltro('dataIda', e.target.value)}
          />
        </div>

        {/* Filtro de Companhia Aérea */}
        <div>
          <label htmlFor="companhia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Companhia Aérea
          </label>
          <select
            id="companhia"
            className="select w-full"
            value={filtros.companhia}
            onChange={(e) => atualizarFiltro('companhia', e.target.value)}
          >
            <option value="">Todas as companhias</option>
            {companhiasAereas.map((companhia) => (
              <option key={companhia.id} value={companhia.id}>
                {companhia.nome} ({companhia.codigo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros avançados */}
      {mostrarFiltrosAvancados && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 border-t pt-4 border-gray-200 dark:border-gray-700">
          {/* Filtro de Preço Mínimo */}
          <div>
            <label htmlFor="precoMin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preço Mínimo (R$)
            </label>
            <input
              type="number"
              id="precoMin"
              className="input w-full"
              value={filtros.precoMin}
              onChange={(e) => atualizarFiltro('precoMin', e.target.value)}
              min="0"
              step="50"
            />
          </div>

          {/* Filtro de Preço Máximo */}
          <div>
            <label htmlFor="precoMax" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preço Máximo (R$)
            </label>
            <input
              type="number"
              id="precoMax"
              className="input w-full"
              value={filtros.precoMax}
              onChange={(e) => atualizarFiltro('precoMax', e.target.value)}
              min="0"
              step="50"
            />
          </div>

          {/* Filtro de Conexões */}
          <div>
            <label htmlFor="conexoes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Conexões
            </label>
            <select
              id="conexoes"
              className="select w-full"
              value={filtros.conexoes}
              onChange={(e) => atualizarFiltro('conexoes', e.target.value)}
            >
              <option value="todos">Todos os voos</option>
              <option value="direto">Apenas voos diretos</option>
              <option value="conexao">Apenas voos com conexão</option>
            </select>
          </div>

          {/* Filtro de Hotel */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hospedagem
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="hotel"
                className="mr-2 h-4 w-4"
                checked={filtros.hotel}
                onChange={(e) => atualizarFiltro('hotel', e.target.checked)}
              />
              <label htmlFor="hotel" className="text-sm text-gray-700 dark:text-gray-300">
                Incluir hotel
              </label>
            </div>
          </div>

          {/* Filtro de Categoria de Hotel (visível apenas se hotel estiver marcado) */}
          {filtros.hotel && (
            <div>
              <label htmlFor="categoriaHotel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoria do Hotel
              </label>
              <select
                id="categoriaHotel"
                className="select w-full"
                value={filtros.categoriaHotel}
                onChange={(e) => atualizarFiltro('categoriaHotel', e.target.value)}
              >
                <option value="">Todas as categorias</option>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          onClick={limparFiltros}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4 mr-1" />
          Limpar
        </button>
        <button
          onClick={aplicarFiltros}
          className="btn-primary flex items-center"
        >
          <Search className="w-4 h-4 mr-1" />
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltrosVoos;
