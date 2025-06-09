import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  PieChart, 
  Map, 
  Filter, 
  Download, 
  RefreshCw,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Bell,
  Clock,
  DollarSign,
  Star,
  Hotel,
  Plane,
  Package,
  AlertTriangle,
  Info,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  Circle
} from 'lucide-react';
import { fetchMockDataExtended } from '../data/mockDataExtended';

// Componente de Card Indicador Simplificado
const CardIndicador = ({ titulo, valor, variacao, periodo, darkMode }) => {
  const isPositive = variacao >= 0;

  return (
    <div className={`shadow-md rounded-lg transition-transform hover:translate-y-[-5px] p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div>
        <p className="text-sm text-gray-500">{titulo}</p>
        <p className="text-2xl font-bold">{valor}</p>
        <div className="flex items-center mt-1">
          {isPositive ? 
            <ArrowUp className="text-green-500 mr-1" /> : 
            <ArrowDown className="text-red-500 mr-1" />
          }
          <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(variacao)}% {periodo}
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente de Tabela Simplificada
const TabelaSimplificada = ({ dados, colunas, titulo, acoes = [], loading = false, onRowClick = null, darkMode }) => {
  return (
    <div className={`shadow-md rounded-lg overflow-hidden h-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`py-3 px-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{titulo}</h3>
          <div className="flex gap-2">
            {acoes.map((acao, index) => (
              <button 
                key={index} 
                className="px-3 py-1 text-sm border rounded-md flex items-center"
                onClick={acao.onClick}
              >
                <span className="mr-2">
                  {acao.icon}
                </span>
                {acao.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            {/* Cabeçalho da tabela */}
            <div 
              className={`flex py-3 px-4 border-b ${
                darkMode ? 'bg-gray-700 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
              }`}
            >
              {colunas.map((coluna, index) => (
                <div 
                  key={index} 
                  className={`flex-${coluna.width || 1} px-2 font-bold ${coluna.isNumeric ? 'text-right' : 'text-left'}`}
                >
                  {coluna.header}
                </div>
              ))}
            </div>
            
            {/* Linhas da tabela */}
            {dados.map((item, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`flex py-3 px-4 border-b transition-colors duration-200 ${
                  darkMode 
                    ? 'border-gray-700 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                } ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {colunas.map((coluna, colIndex) => (
                  <div 
                    key={colIndex} 
                    className={`flex-${coluna.width || 1} px-2 ${coluna.isNumeric ? 'text-right' : 'text-left'}`}
                  >
                    {coluna.render ? coluna.render(item) : item[coluna.accessor]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Seção Expansível Simplificada (substitui Accordion)
const SecaoExpansivel = ({ titulo, children, defaultAberto = false, darkMode }) => {
  const [aberto, setAberto] = useState(defaultAberto);
  
  return (
    <div className="mb-4">
      <div 
        className={`flex justify-between items-center py-2 cursor-pointer border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
        onClick={() => setAberto(!aberto)}
      >
        <p className="font-medium">{titulo}</p>
        {aberto ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      <div 
        className={`mt-2 pb-4 ${aberto ? 'block' : 'hidden'}`}
      >
        {children}
      </div>
    </div>
  );
};

// Componente de Opção Personalizada (substitui Radio)
const OpcaoPersonalizada = ({ valor, label, selecionado, onChange, disabled = false }) => {
  return (
    <div 
      className={`flex items-center mb-2 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => !disabled && onChange(valor)}
    >
      <div 
        className={`w-5 h-5 rounded-full border-2 flex justify-center items-center mr-2 ${
          selecionado ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        {selecionado && (
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
        )}
      </div>
      <p>{label}</p>
    </div>
  );
};

// Componente de Grupo de Opções (substitui RadioGroup)
const GrupoOpcoes = ({ opcoes, valor, onChange, direcao = "column", disabled = false }) => {
  return (
    <div className={`flex ${direcao === "row" ? "flex-row" : "flex-col"} gap-4`}>
      {opcoes.map((opcao) => (
        <OpcaoPersonalizada
          key={opcao.valor}
          valor={opcao.valor}
          label={opcao.label}
          selecionado={valor === opcao.valor}
          onChange={onChange}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

// Componente de Filtros Simplificados
const FiltrosSimplificados = ({ onFiltrar, filtros, loading = false, darkMode }) => {
  const [filtroAtivo, setFiltroAtivo] = useState({
    origem: '',
    destino: '',
    companhia: '',
    dataInicio: '',
    dataFim: '',
    faixaPreco: '',
    tipoVoo: '',
    tempoVoo: '',
    categoriaHotel: '',
    nomeHotel: '',
    idPesquisa: ''
  });
  
  const handleChange = (campo, valor) => {
    setFiltroAtivo(prev => ({
      ...prev,
      [campo]: valor
    }));
  };
  
  const aplicarFiltros = () => {
    onFiltrar(filtroAtivo);
  };
  
  const limparFiltros = () => {
    setFiltroAtivo({
      origem: '',
      destino: '',
      companhia: '',
      dataInicio: '',
      dataFim: '',
      faixaPreco: '',
      tipoVoo: '',
      tempoVoo: '',
      categoriaHotel: '',
      nomeHotel: '',
      idPesquisa: ''
    });
    onFiltrar({});
  };
  
  return (
    <div className={`shadow-md rounded-lg p-4 border ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium flex items-center">
            <Filter className="mr-2" />
            Filtros Avançados
          </h3>
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md flex items-center"
              onClick={limparFiltros}
              disabled={loading}
            >
              <RefreshCw size={16} className="mr-2" />
              Limpar
            </button>
            <button 
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md flex items-center"
              onClick={aplicarFiltros}
              disabled={loading}
            >
              <Filter size={16} className="mr-2" />
              {loading ? 'Aplicando...' : 'Aplicar Filtros'}
            </button>
          </div>
        </div>
        
        <SecaoExpansivel titulo="Origem e Destino" defaultAberto={true} darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Origem</p>
              <select 
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                value={filtroAtivo.origem}
                onChange={(e) => handleChange('origem', e.target.value)}
                disabled={loading}
              >
                <option value="">Todas as origens</option>
                {filtros?.origens?.map((origem, index) => (
                  <option key={index} value={origem}>{origem}</option>
                ))}
              </select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Destino</p>
              <select 
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                value={filtroAtivo.destino}
                onChange={(e) => handleChange('destino', e.target.value)}
                disabled={loading}
              >
                <option value="">Todos os destinos</option>
                {filtros?.destinos?.map((destino, index) => (
                  <option key={index} value={destino}>{destino}</option>
                ))}
              </select>
            </div>
          </div>
        </SecaoExpansivel>
        
        <SecaoExpansivel titulo="Datas e Preços" darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium mb-1">Data de Saída (Início)</p>
              <input 
                type="date" 
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                value={filtroAtivo.dataInicio}
                onChange={(e) => handleChange('dataInicio', e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Data de Saída (Fim)</p>
              <input 
                type="date" 
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                value={filtroAtivo.dataFim}
                onChange={(e) => handleChange('dataFim', e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Faixa de Preço</p>
            <GrupoOpcoes 
              opcoes={[
                { valor: 'ate-2000', label: 'Até R$ 2.000' },
                { valor: '2000-5000', label: 'R$ 2.000 a R$ 5.000' },
                { valor: 'acima-5000', label: 'Acima de R$ 5.000' }
              ]}
              valor={filtroAtivo.faixaPreco}
              onChange={(val) => handleChange('faixaPreco', val)}
              direcao="row"
              disabled={loading}
            />
          </div>
        </SecaoExpansivel>
        
        <SecaoExpansivel titulo="Detalhes do Voo" darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium mb-1">Companhia Aérea</p>
              <select 
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                value={filtroAtivo.companhia}
                onChange={(e) => handleChange('companhia', e.target.value)}
                disabled={loading}
              >
                <option value="">Todas as companhias</option>
                {filtros?.companhias?.map((companhia, index) => (
                  <option key={index} value={companhia}>{companhia}</option>
                ))}
              </select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Tipo de Voo</p>
              <GrupoOpcoes 
                opcoes={[
                  { valor: 'direto', label: 'Direto' },
                  { valor: '1-conexao', label: '1 Conexão' },
                  { valor: '2-conexoes', label: '2+ Conexões' }
                ]}
                valor={filtroAtivo.tipoVoo}
                onChange={(val) => handleChange('tipoVoo', val)}
                direcao="row"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Tempo Total de Voo</p>
            <GrupoOpcoes 
              opcoes={[
                { valor: 'ate-4h', label: 'Até 4h' },
                { valor: '4h-8h', label: '4h a 8h' },
                { valor: 'mais-8h', label: 'Mais de 8h' }
              ]}
              valor={filtroAtivo.tempoVoo}
              onChange={(val) => handleChange('tempoVoo', val)}
              direcao="row"
              disabled={loading}
            />
          </div>
        </SecaoExpansivel>
      </div>
    </div>
  );
};

// Componente principal do Dashboard Simplificado
const DashboardSimplificado = () => {
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(false);
  const [periodo, setPeriodo] = useState('mes');
  const [indicadores, setIndicadores] = useState([]);
  const [voos, setVoos] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [rankingHoteis, setRankingHoteis] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [filtros, setFiltros] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [busca, setBusca] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('visao-geral'); // 'visao-geral', 'hoteis', 'pacotes'
  
  // Carregar dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        // Carregar todos os dados necessários
        const indicadoresData = await fetchMockDataExtended('indicadores');
        const voosData = await fetchMockDataExtended('voos');
        const pacotesData = await fetchMockDataExtended('pacotes');
        const rankingHoteisData = await fetchMockDataExtended('ranking-hoteis');
        const alertasData = await fetchMockDataExtended('alertas');
        const filtrosData = await fetchMockDataExtended('filtros');
        
        // Atualizar o estado com os dados carregados
        setIndicadores(indicadoresData);
        setVoos(voosData);
        setPacotes(pacotesData);
        setRankingHoteis(rankingHoteisData);
        setAlertas(alertasData);
        setFiltros(filtrosData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, []);
  
  // Função para aplicar filtros
  const aplicarFiltros = async (filtrosAtivos) => {
    setLoadingFiltro(true);
    try {
      // Simular chamada à API com os filtros
      const voosData = await fetchMockDataExtended('voos-filtrados');
      const pacotesData = await fetchMockDataExtended('pacotes-filtrados');
      
      // Atualizar o estado com os dados filtrados
      setVoos(voosData);
      setPacotes(pacotesData);
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    } finally {
      setLoadingFiltro(false);
    }
  };
  
  // Colunas para a tabela de voos
  const colunasVoos = [
    { header: 'Origem', accessor: 'origem', width: 1 },
    { header: 'Destino', accessor: 'destino', width: 1 },
    { header: 'Companhia', accessor: 'companhia', width: 1 },
    { header: 'Data', accessor: 'data', width: 1 },
    { 
      header: 'Preço', 
      accessor: 'preco', 
      width: 1, 
      isNumeric: true,
      render: (item) => `R$ ${item.preco.toFixed(2).replace('.', ',')}`
    },
    { 
      header: 'Variação', 
      accessor: 'variacao', 
      width: 1, 
      isNumeric: true,
      render: (item) => (
        <div className="flex items-center justify-end">
          {item.variacao > 0 ? (
            <ArrowUp className="text-red-500 mr-1" size={16} />
          ) : (
            <ArrowDown className="text-green-500 mr-1" size={16} />
          )}
          <span className={item.variacao > 0 ? 'text-red-500' : 'text-green-500'}>
            {Math.abs(item.variacao)}%
          </span>
        </div>
      )
    }
  ];
  
  // Renderizar o conteúdo principal
  const renderConteudo = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-6">
        {/* Indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicadores.map((indicador, index) => (
            <CardIndicador
              key={index}
              titulo={indicador.titulo}
              valor={indicador.valor}
              variacao={indicador.variacao}
              periodo={indicador.periodo}
              darkMode={darkMode}
            />
          ))}
        </div>
        
        {/* Filtros */}
        <FiltrosSimplificados
          onFiltrar={aplicarFiltros}
          filtros={filtros}
          loading={loadingFiltro}
          darkMode={darkMode}
        />
        
        {/* Abas */}
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-medium ${
              abaAtiva === 'visao-geral' 
                ? `border-b-2 border-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` 
                : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
            }`}
            onClick={() => setAbaAtiva('visao-geral')}
          >
            Visão Geral
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              abaAtiva === 'hoteis' 
                ? `border-b-2 border-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` 
                : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
            }`}
            onClick={() => setAbaAtiva('hoteis')}
          >
            Hotéis
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              abaAtiva === 'pacotes' 
                ? `border-b-2 border-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}` 
                : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
            }`}
            onClick={() => setAbaAtiva('pacotes')}
          >
            Pacotes
          </button>
        </div>
        
        {/* Conteúdo das abas */}
        {abaAtiva === 'visao-geral' && (
          <div className="grid grid-cols-1 gap-6">
            <TabelaSimplificada
              dados={voos}
              colunas={colunasVoos}
              titulo="Voos Disponíveis"
              acoes={[
                { 
                  label: 'Exportar', 
                  icon: <Download size={16} />, 
                  onClick: () => console.log('Exportar voos') 
                },
                { 
                  label: 'Atualizar', 
                  icon: <RefreshCw size={16} />, 
                  onClick: () => console.log('Atualizar voos') 
                }
              ]}
              loading={loadingFiltro}
              darkMode={darkMode}
            />
          </div>
        )}
        
        {abaAtiva === 'hoteis' && (
          <div className="grid grid-cols-1 gap-6">
            <TabelaSimplificada
              dados={rankingHoteis}
              colunas={[
                { header: 'Hotel', accessor: 'nome', width: 2 },
                { header: 'Cidade', accessor: 'cidade', width: 1 },
                { 
                  header: 'Categoria', 
                  accessor: 'categoria', 
                  width: 1,
                  render: (item) => (
                    <div className="flex">
                      {Array.from({ length: item.categoria }).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-500" />
                      ))}
                    </div>
                  )
                },
                { 
                  header: 'Preço Médio', 
                  accessor: 'precoMedio', 
                  width: 1, 
                  isNumeric: true,
                  render: (item) => `R$ ${item.precoMedio.toFixed(2).replace('.', ',')}`
                },
                { 
                  header: 'Avaliação', 
                  accessor: 'avaliacao', 
                  width: 1, 
                  isNumeric: true,
                  render: (item) => (
                    <div className="flex items-center justify-end">
                      <span className="mr-1">{item.avaliacao.toFixed(1)}</span>
                      <Star size={16} className="text-yellow-500" />
                    </div>
                  )
                }
              ]}
              titulo="Ranking de Hotéis"
              acoes={[
                { 
                  label: 'Exportar', 
                  icon: <Download size={16} />, 
                  onClick: () => console.log('Exportar hotéis') 
                }
              ]}
              darkMode={darkMode}
            />
          </div>
        )}
        
        {abaAtiva === 'pacotes' && (
          <div className="grid grid-cols-1 gap-6">
            <TabelaSimplificada
              dados={pacotes}
              colunas={[
                { header: 'Destino', accessor: 'destino', width: 1 },
                { header: 'Hotel', accessor: 'hotel', width: 1 },
                { 
                  header: 'Categoria', 
                  accessor: 'categoria', 
                  width: 1,
                  render: (item) => (
                    <div className="flex">
                      {Array.from({ length: item.categoria }).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-500" />
                      ))}
                    </div>
                  )
                },
                { header: 'Duração', accessor: 'duracao', width: 1 },
                { 
                  header: 'Preço Total', 
                  accessor: 'precoTotal', 
                  width: 1, 
                  isNumeric: true,
                  render: (item) => `R$ ${item.precoTotal.toFixed(2).replace('.', ',')}`
                },
                { 
                  header: 'Economia', 
                  accessor: 'economia', 
                  width: 1, 
                  isNumeric: true,
                  render: (item) => (
                    <div className="flex items-center justify-end">
                      <span className="text-green-500">
                        {item.economia}%
                      </span>
                    </div>
                  )
                }
              ]}
              titulo="Pacotes Disponíveis"
              acoes={[
                { 
                  label: 'Exportar', 
                  icon: <Download size={16} />, 
                  onClick: () => console.log('Exportar pacotes') 
                }
              ]}
              darkMode={darkMode}
            />
          </div>
        )}
        
        {/* Alertas */}
        {alertas.length > 0 && (
          <div className={`mt-4 p-4 rounded-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" />
                Alertas e Oportunidades
              </h3>
              <button
                className="text-sm flex items-center"
                onClick={() => setMostrarAlertas(!mostrarAlertas)}
              >
                {mostrarAlertas ? 'Ocultar' : 'Mostrar todos'}
                {mostrarAlertas ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />}
              </button>
            </div>
            
            <div className="space-y-2">
              {(mostrarAlertas ? alertas : alertas.slice(0, 3)).map((alerta, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md flex items-start ${
                    alerta.tipo === 'oportunidade' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {alerta.tipo === 'oportunidade' ? (
                    <Info className="mr-2 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{alerta.titulo}</p>
                    <p className="text-sm">{alerta.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm">
          Visualize e analise dados de viagens, hotéis e pacotes
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <select
            className={`mr-4 p-2 rounded border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="dia">Último dia</option>
            <option value="semana">Última semana</option>
            <option value="mes">Último mês</option>
            <option value="ano">Último ano</option>
          </select>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar..."
            className={`pl-10 pr-4 py-2 rounded-md border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>
      
      {renderConteudo()}
    </div>
  );
};

export default DashboardSimplificado;
