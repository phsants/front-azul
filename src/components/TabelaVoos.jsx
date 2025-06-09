import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente para exibir tabela de voos pesquisados
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.voos - Lista de voos a serem exibidos
 * @param {boolean} props.carregando - Estado de carregamento da tabela
 * @param {Function} props.onVerDetalhes - Função para abrir modal de detalhes
 * @returns {JSX.Element} Componente TabelaVoos
 */
const TabelaVoos = ({ voos, carregando, onVerDetalhes }) => {
  const [ordenacao, setOrdenacao] = useState({ campo: 'preco_total', direcao: 'asc' });
  const [expandidos, setExpandidos] = useState({});

  // Função para alternar a ordenação
  const alternarOrdenacao = (campo) => {
    if (ordenacao.campo === campo) {
      setOrdenacao({
        campo,
        direcao: ordenacao.direcao === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setOrdenacao({
        campo,
        direcao: 'asc'
      });
    }
  };

  // Função para alternar a expansão de uma linha
  const alternarExpansao = (id) => {
    setExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Ordenar voos
  const voosOrdenados = [...voos].sort((a, b) => {
    let valorA, valorB;

    switch (ordenacao.campo) {
      case 'preco_total':
        valorA = a.preco_total;
        valorB = b.preco_total;
        break;
      case 'data_ida':
        valorA = new Date(a.data_ida);
        valorB = new Date(b.data_ida);
        break;
      case 'duracao':
        valorA = a.duracao;
        valorB = b.duracao;
        break;
      default:
        valorA = a.preco_total;
        valorB = b.preco_total;
    }

    if (ordenacao.direcao === 'asc') {
      return valorA > valorB ? 1 : -1;
    } else {
      return valorA < valorB ? 1 : -1;
    }
  });

  // Renderizar ícone de ordenação
  const renderIconeOrdenacao = (campo) => {
    if (ordenacao.campo !== campo) return null;
    
    return ordenacao.direcao === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1" /> : 
      <ChevronDown className="w-4 h-4 ml-1" />;
  };

  if (carregando) {
    return (
      <div className="card p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (voos.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">Nenhum voo encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Voo
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => alternarOrdenacao('data_ida')}
              >
                <div className="flex items-center">
                  Data/Hora
                  {renderIconeOrdenacao('data_ida')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rota
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => alternarOrdenacao('duracao')}
              >
                <div className="flex items-center">
                  Duração
                  {renderIconeOrdenacao('duracao')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => alternarOrdenacao('preco_total')}
              >
                <div className="flex items-center">
                  Preço
                  {renderIconeOrdenacao('preco_total')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ações
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Expandir</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {voosOrdenados.map((voo) => (
              <React.Fragment key={voo.id}>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                        <span className="text-primary dark:text-blue-400 font-bold">{voo.companhia.codigo}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {voo.companhia.nome}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {voo.numero_voo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{voo.data_ida}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{voo.hora_partida}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {voo.origem.codigo} → {voo.destino.codigo}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {voo.conexoes.length === 0 ? 'Direto' : `${voo.conexoes.length} ${voo.conexoes.length === 1 ? 'conexão' : 'conexões'}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {voo.duracao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      R$ {voo.preco_total.toFixed(2)}
                    </div>
                    {voo.hospedagem && (
                      <div className="text-xs text-success dark:text-green-400">
                        Hotel incluído
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onVerDetalhes(voo)}
                      className="text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Ver detalhes
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alternarExpansao(voo.id)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {expandidos[voo.id] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
                <AnimatePresence>
                  {expandidos[voo.id] && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td colSpan="7" className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Detalhes do voo */}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Detalhes do Voo</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Assentos disponíveis: {voo.assentos_disponiveis}
                            </p>
                            {voo.conexoes.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Conexões:</p>
                                <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-5">
                                  {voo.conexoes.map((conexao, index) => (
                                    <li key={index}>
                                      {conexao.aeroporto.nome} ({conexao.aeroporto.codigo})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          
                          {/* Detalhes da hospedagem */}
                          {voo.hospedagem ? (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospedagem</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {voo.hospedagem.hotel.nome}
                              </p>
                              <div className="flex items-center mt-1">
                                {Array.from({ length: voo.hospedagem.hotel.categoria }).map((_, i) => (
                                  <span key={i} className="text-yellow-400 text-xs">★</span>
                                ))}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {voo.hospedagem.dias_estadia} {voo.hospedagem.dias_estadia === 1 ? 'dia' : 'dias'} - 
                                R$ {voo.hospedagem.preco_total.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospedagem</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Não incluída neste pacote
                              </p>
                            </div>
                          )}
                          
                          {/* Ações */}
                          <div className="flex justify-end items-center">
                            <button
                              onClick={() => onVerDetalhes(voo)}
                              className="btn-primary flex items-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Reservar
                            </button>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaVoos;
