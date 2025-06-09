import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente para exibir detalhes dos pacotes e voos em um modal
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.isOpen - Estado de abertura do modal
 * @param {Function} props.onClose - Função para fechar o modal
 * @param {Object} props.voo - Dados do voo a ser exibido
 * @returns {JSX.Element} Componente ModalDetalhes
 */
const ModalDetalhes = ({ isOpen, onClose, voo }) => {
  const [activeTab, setActiveTab] = useState('voo');

  if (!voo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Detalhes do Pacote
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'voo'
                      ? 'border-b-2 border-primary text-primary dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('voo')}
                >
                  Informações do Voo
                </button>
                {voo.hospedagem && (
                  <button
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === 'hospedagem'
                        ? 'border-b-2 border-primary text-primary dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                    onClick={() => setActiveTab('hospedagem')}
                  >
                    Hospedagem
                  </button>
                )}
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'preco'
                      ? 'border-b-2 border-primary text-primary dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('preco')}
                >
                  Preços e Taxas
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {activeTab === 'voo' && (
                  <div className="space-y-6">
                    {/* Cabeçalho do voo */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {voo.companhia.nome} - {voo.numero_voo}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {voo.data_ida} • {voo.hora_partida}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 px-3 py-1 bg-blue-100 text-primary dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                        {voo.conexoes.length === 0 ? 'Voo Direto' : `${voo.conexoes.length} ${voo.conexoes.length === 1 ? 'Conexão' : 'Conexões'}`}
                      </div>
                    </div>
                    
                    {/* Detalhes da rota */}
                    <div className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <div className="w-0.5 h-20 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="w-4 h-4 rounded-full bg-success"></div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-8">
                          <p className="font-bold text-gray-900 dark:text-white">
                            {voo.origem.nome} ({voo.origem.codigo})
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {voo.hora_partida} • {voo.data_ida}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {voo.destino.nome} ({voo.destino.codigo})
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            Duração total: {voo.duracao}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Conexões */}
                    {voo.conexoes.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                          Conexões
                        </h4>
                        <div className="space-y-4">
                          {voo.conexoes.map((conexao, index) => (
                            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {conexao.aeroporto.nome} ({conexao.aeroporto.codigo})
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Tempo de parada: {conexao.duracao_parada}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Informações adicionais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Assentos disponíveis</p>
                        <p className="font-medium text-gray-900 dark:text-white">{voo.assentos_disponiveis}</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Duração do voo</p>
                        <p className="font-medium text-gray-900 dark:text-white">{voo.duracao}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'hospedagem' && voo.hospedagem && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {voo.hospedagem.hotel.nome}
                        </h3>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: voo.hospedagem.hotel.categoria }).map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          <span className="ml-2 text-gray-500 dark:text-gray-400">
                            {voo.hospedagem.hotel.categoria} {voo.hospedagem.hotel.categoria === 1 ? 'estrela' : 'estrelas'}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-success dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                        Incluído no pacote
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Diária</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          R$ {voo.hospedagem.hotel.preco_diaria.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Estadia</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {voo.hospedagem.dias_estadia} {voo.hospedagem.dias_estadia === 1 ? 'dia' : 'dias'}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total hospedagem</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          R$ {voo.hospedagem.preco_total.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Localização</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {voo.destino.nome}, {voo.destino.estado}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'preco' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Detalhamento de Preços
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-500 dark:text-gray-400">Tarifa base</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          R$ {voo.preco_base.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-500 dark:text-gray-400">Taxa de embarque</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          R$ {voo.taxa_embarque.toFixed(2)}
                        </span>
                      </div>
                      {voo.hospedagem && (
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-500 dark:text-gray-400">Hospedagem ({voo.hospedagem.dias_estadia} {voo.hospedagem.dias_estadia === 1 ? 'dia' : 'dias'})</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            R$ {voo.hospedagem.preco_total.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between py-3 font-bold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-primary dark:text-blue-400">
                          R$ {voo.preco_total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button className="btn-primary w-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Reservar agora
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalDetalhes;
