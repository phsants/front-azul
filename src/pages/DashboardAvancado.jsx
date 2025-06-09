import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Select,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  HStack,
  VStack,
  Icon,
  Divider,
  Badge,
  Spinner,
  Stack
} from '@chakra-ui/react';
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
  Check
} from 'lucide-react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';
import { fetchMockDataExtended } from '../data/mockDataExtended';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Componente de Card Indicador
const CardIndicador = ({ titulo, valor, variacao, periodo, darkMode = false }) => {
  const bgColor = darkMode ? 'gray.800' : 'white';
  const textColor = darkMode ? 'white' : 'gray.800';
  const isPositive = variacao >= 0;

  return (
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" transition="transform 0.3s" _hover={{ transform: 'translateY(-5px)' }}>
      <CardBody>
        <Box>
          <Text fontSize="sm" color="gray.500">{titulo}</Text>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>{valor}</Text>
          <Flex alignItems="center" mt={1}>
            <Icon 
              as={isPositive ? ArrowUp : ArrowDown} 
              color={isPositive ? "green.500" : "red.500"} 
              mr={1}
            />
            <Text fontSize="sm" color={isPositive ? "green.500" : "red.500"}>
              {Math.abs(variacao)}% {periodo}
            </Text>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
};

// Componente de Gráfico de Linha
const GraficoLinha = ({ dados, titulo, altura = '300px', subtitulo = '', darkMode = false }) => {
  const textColor = darkMode ? 'white' : 'gray.800';
  const bgColor = darkMode ? 'gray.800' : 'white';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        },
      },
      title: {
        display: true,
        text: titulo,
        color: darkMode ? '#FFFFFF' : '#1A202C',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 5
        }
      },
      subtitle: {
        display: !!subtitulo,
        text: subtitulo,
        color: darkMode ? '#A0AEC0' : '#4A5568',
        font: {
          size: 12,
          style: 'italic'
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#FFFFFF' : '#1A202C',
        bodyColor: darkMode ? '#FFFFFF' : '#1A202C',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
          }
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  };

  return (
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" p={4} h="100%">
      <Box height={altura}>
        <Line data={dados} options={options} />
      </Box>
    </Card>
  );
};

// Componente de Gráfico de Barras
const GraficoBarras = ({ dados, titulo, altura = '300px', horizontal = false, subtitulo = '', darkMode = false }) => {
  const textColor = darkMode ? 'white' : 'gray.800';
  const bgColor = darkMode ? 'gray.800' : 'white';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      legend: {
        display: dados.datasets.length > 1,
        position: 'top',
        labels: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        },
      },
      title: {
        display: true,
        text: titulo,
        color: darkMode ? '#FFFFFF' : '#1A202C',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 5
        }
      },
      subtitle: {
        display: !!subtitulo,
        text: subtitulo,
        color: darkMode ? '#A0AEC0' : '#4A5568',
        font: {
          size: 12,
          style: 'italic'
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#FFFFFF' : '#1A202C',
        bodyColor: darkMode ? '#FFFFFF' : '#1A202C',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed[horizontal ? 'x' : 'y'] !== null) {
              if (titulo.includes('Preço') || titulo.includes('R$')) {
                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed[horizontal ? 'x' : 'y']);
              } else {
                label += context.parsed[horizontal ? 'x' : 'y'];
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      [horizontal ? 'x' : 'y']: {
        ticks: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
          callback: function(value) {
            if (titulo.includes('Preço') || titulo.includes('R$')) {
              return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
            }
            return value;
          }
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      [horizontal ? 'y' : 'x']: {
        ticks: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8
  };

  return (
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" p={4} h="100%">
      <Box height={altura}>
        <Bar data={dados} options={options} />
      </Box>
    </Card>
  );
};

// Componente de Gráfico de Pizza/Donut
const GraficoPizza = ({ dados, titulo, altura = '300px', tipo = 'pie', subtitulo = '', darkMode = false }) => {
  const textColor = darkMode ? 'white' : 'gray.800';
  const bgColor = darkMode ? 'gray.800' : 'white';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: darkMode ? '#FFFFFF' : '#1A202C',
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        },
      },
      title: {
        display: true,
        text: titulo,
        color: darkMode ? '#FFFFFF' : '#1A202C',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 5
        }
      },
      subtitle: {
        display: !!subtitulo,
        text: subtitulo,
        color: darkMode ? '#A0AEC0' : '#4A5568',
        font: {
          size: 12,
          style: 'italic'
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#FFFFFF' : '#1A202C',
        bodyColor: darkMode ? '#FFFFFF' : '#1A202C',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true
      }
    },
    cutout: tipo === 'donut' ? '60%' : 0,
    radius: '90%'
  };

  return (
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" p={4} h="100%">
      <Box height={altura}>
        {tipo === 'pie' ? (
          <Pie data={dados} options={options} />
        ) : (
          <Doughnut data={dados} options={options} />
        )}
      </Box>
    </Card>
  );
};

// Componente de Tabela Avançada
const TabelaAvancada = ({ dados, colunas, titulo, acoes = [], loading = false, onRowClick = null, darkMode = false }) => {
  const bgColor = darkMode ? 'gray.800' : 'white';
  const headerBgColor = darkMode ? 'gray.700' : 'gray.50';
  const borderColor = darkMode ? 'gray.700' : 'gray.200';
  const hoverBgColor = darkMode ? 'gray.700' : 'gray.50';
  const textColor = darkMode ? 'white' : 'gray.800';

  return (
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" overflow="hidden" h="100%">
      <CardHeader bg={headerBgColor} py={3} px={4}>
        <Flex justify="space-between" align="center">
          <Heading size="md" color={textColor}>{titulo}</Heading>
          <HStack>
            {acoes.map((acao, index) => (
              <Button 
                key={index} 
                size="sm" 
                variant="outline"
                onClick={acao.onClick}
              >
                <Box mr={2}>
                  {acao.icon}
                </Box>
                {acao.label}
              </Button>
            ))}
          </HStack>
        </Flex>
      </CardHeader>
      <Box overflowX="auto">
        {loading ? (
          <Flex justify="center" align="center" p={10}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </Flex>
        ) : (
          <Box>
            {/* Cabeçalho da tabela */}
            <Flex 
              bg={headerBgColor} 
              borderBottom="1px" 
              borderColor={borderColor}
              py={3}
              px={4}
            >
              {colunas.map((coluna, index) => (
                <Box 
                  key={index} 
                  flex={coluna.width || 1}
                  textAlign={coluna.isNumeric ? "right" : "left"}
                  fontWeight="bold"
                  color={textColor}
                  px={2}
                >
                  {coluna.header}
                </Box>
              ))}
            </Flex>
            
            {/* Linhas da tabela */}
            {dados.map((item, rowIndex) => (
              <Flex 
                key={rowIndex} 
                borderBottom="1px" 
                borderColor={borderColor}
                py={3}
                px={4}
                _hover={{ bg: hoverBgColor }}
                transition="background-color 0.2s"
                cursor={onRowClick ? "pointer" : "default"}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {colunas.map((coluna, colIndex) => (
                  <Box 
                    key={colIndex} 
                    flex={coluna.width || 1}
                    textAlign={coluna.isNumeric ? "right" : "left"}
                    px={2}
                  >
                    {coluna.render ? coluna.render(item) : item[coluna.accessor]}
                  </Box>
                ))}
              </Flex>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
};

// Componente de Seção Expansível Simplificada (substitui Accordion)
const SecaoExpansivel = ({ titulo, children, defaultAberto = false, darkMode = false }) => {
  const [aberto, setAberto] = useState(defaultAberto);
  const borderColor = darkMode ? 'gray.700' : 'gray.200';
  
  return (
    <Box mb={4}>
      <Flex 
        justify="space-between" 
        align="center" 
        py={2}
        cursor="pointer"
        onClick={() => setAberto(!aberto)}
        borderBottom="1px" 
        borderColor={borderColor}
      >
        <Text fontWeight="medium">{titulo}</Text>
        <Icon as={aberto ? ChevronUp : ChevronDown} />
      </Flex>
      
      <Box 
        mt={2} 
        display={aberto ? "block" : "none"}
        pb={4}
      >
        {children}
      </Box>
    </Box>
  );
};

// Componente de Filtros Avançados
const FiltrosAvancados = ({ onFiltrar, filtros, loading = false, darkMode = false }) => {
  const bgColor = darkMode ? 'gray.800' : 'white';
  const borderColor = darkMode ? 'gray.700' : 'gray.200';
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
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" p={4} borderWidth="1px" borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center" mb={2}>
          <Heading size="md" display="flex" alignItems="center">
            <Box mr={2}>
              <Filter />
            </Box>
            Filtros Avançados
          </Heading>
          <HStack>
            <Button 
              size="sm" 
              colorScheme="blue" 
              onClick={limparFiltros}
              isDisabled={loading}
            >
              <Box mr={2}>
                <RefreshCw size={16} />
              </Box>
              Limpar
            </Button>
            <Button 
              size="sm" 
              colorScheme="blue" 
              onClick={aplicarFiltros}
              isLoading={loading}
            >
              <Box mr={2}>
                <Filter size={16} />
              </Box>
              Aplicar Filtros
            </Button>
          </HStack>
        </Flex>
        
        <SecaoExpansivel titulo="Origem e Destino" defaultAberto={true} darkMode={darkMode}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <GridItem>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Origem</Text>
              <Select 
                placeholder="Todas as origens"
                value={filtroAtivo.origem}
                onChange={(e) => handleChange('origem', e.target.value)}
                isDisabled={loading}
              >
                {filtros?.origens?.map((origem, index) => (
                  <option key={index} value={origem}>{origem}</option>
                ))}
              </Select>
            </GridItem>
            
            <GridItem>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Destino</Text>
              <Select 
                placeholder="Todos os destinos"
                value={filtroAtivo.destino}
                onChange={(e) => handleChange('destino', e.target.value)}
                isDisabled={loading}
              >
                {filtros?.destinos?.map((destino, index) => (
                  <option key={index} value={destino}>{destino}</option>
                ))}
              </Select>
            </GridItem>
          </Grid>
        </SecaoExpansivel>
        
        <SecaoExpansivel titulo="Datas e Preços" darkMode={darkMode}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={4}>
            <GridItem>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Data de Saída (Início)</Text>
              <Input 
                type="date" 
                value={filtroAtivo.dataInicio}
                onChange={(e) => handleChange('dataInicio', e.target.value)}
                isDisabled={loading}
              />
            </GridItem>
            
            <GridItem>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Data de Saída (Fim)</Text>
              <Input 
                type="date" 
                value={filtroAtivo.dataFim}
                onChange={(e) => handleChange('dataFim', e.target.value)}
                isDisabled={loading}
              />
            </GridItem>
          </Grid>
        </SecaoExpansivel>
        
        <SecaoExpansivel titulo="Detalhes do Voo" darkMode={darkMode}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={4}>
            <GridItem>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Companhia Aérea</Text>
              <Select 
                placeholder="Todas as companhias"
                value={filtroAtivo.companhia}
                onChange={(e) => handleChange('companhia', e.target.value)}
                isDisabled={loading}
              >
                {filtros?.companhias?.map((companhia, index) => (
                  <option key={index} value={companhia}>{companhia}</option>
                ))}
              </Select>
            </GridItem>
          </Grid>
        </SecaoExpansivel>
      </VStack>
    </Card>
  );
};

// Componente de Modal Simplificado
const ModalSimplificado = ({ isOpen, onClose, titulo, children, darkMode = false }) => {
  if (!isOpen) return null;
  
  const bgColor = darkMode ? 'gray.800' : 'white';
  const borderColor = darkMode ? 'gray.700' : 'gray.200';
  
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0,0,0,0.5)"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg={bgColor}
        borderRadius="lg"
        boxShadow="xl"
        maxW="90%"
        maxH="90%"
        w="600px"
        overflow="auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Flex 
          justify="space-between" 
          align="center" 
          p={4} 
          borderBottom="1px" 
          borderColor={borderColor}
        >
          <Heading size="md">{titulo}</Heading>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={onClose}
          >
            <Icon as={X} />
          </Button>
        </Flex>
        <Box p={4}>
          {children}
        </Box>
        <Flex 
          justify="flex-end" 
          p={4} 
          borderTop="1px" 
          borderColor={borderColor}
        >
          <Button onClick={onClose}>Fechar</Button>
        </Flex>
      </Box>
    </Box>
  );
};

// Componente de Alerta Simplificado
const AlertaSimplificado = ({ status, titulo, descricao, onClose, darkMode = false }) => {
  const bgColor = {
    success: darkMode ? 'green.700' : 'green.100',
    error: darkMode ? 'red.700' : 'red.100',
    warning: darkMode ? 'orange.700' : 'orange.100',
    info: darkMode ? 'blue.700' : 'blue.100'
  };
  
  const textColor = {
    success: darkMode ? 'white' : 'green.800',
    error: darkMode ? 'white' : 'red.800',
    warning: darkMode ? 'white' : 'orange.800',
    info: darkMode ? 'white' : 'blue.800'
  };
  
  const IconComponent = {
    success: Check,
    error: X,
    warning: AlertTriangle,
    info: Info
  };
  
  return (
    <Box
      p={4}
      borderRadius="md"
      bg={bgColor[status] || bgColor.info}
      mb={4}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Icon as={IconComponent[status] || IconComponent.info} color={textColor[status] || textColor.info} mr={3} />
          <Box>
            {titulo && <Text fontWeight="bold" color={textColor[status] || textColor.info}>{titulo}</Text>}
            {descricao && <Text color={textColor[status] || textColor.info}>{descricao}</Text>}
          </Box>
        </Flex>
        {onClose && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={onClose}
          >
            <Icon as={X} />
          </Button>
        )}
      </Flex>
    </Box>
  );
};

// Componente principal do Dashboard Avançado
const DashboardAvancado = () => {
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(false);
  const [periodo, setPeriodo] = useState('mes');
  const [indicadores, setIndicadores] = useState([]);
  const [dadosEvolucaoPrecos, setDadosEvolucaoPrecos] = useState(null);
  const [dadosDistribuicaoCompanhias, setDadosDistribuicaoCompanhias] = useState(null);
  const [dadosDestinosPopulares, setDadosDestinosPopulares] = useState(null);
  const [voos, setVoos] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [rankingHoteis, setRankingHoteis] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [filtros, setFiltros] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [busca, setBusca] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('visao-geral'); // 'visao-geral', 'hoteis', 'pacotes'
  const [mapaAberto, setMapaAberto] = useState(false);
  const [detalhesVooAberto, setDetalhesVooAberto] = useState(false);
  const [vooSelecionado, setVooSelecionado] = useState(null);
  const [alertasMostrados, setAlertasMostrados] = useState([]);
  
  const bgColor = darkMode ? 'gray.900' : 'gray.50';
  const cardBgColor = darkMode ? 'gray.800' : 'white';
  const borderColor = darkMode ? 'gray.700' : 'gray.200';
  
  // Função para mostrar alerta
  const mostrarAlerta = (titulo, descricao, status = 'info') => {
    const novoAlerta = {
      id: Date.now(),
      titulo,
      descricao,
      status
    };
    
    setAlertasMostrados(prev => [...prev, novoAlerta]);
    
    // Remover alerta após 5 segundos
    setTimeout(() => {
      setAlertasMostrados(prev => prev.filter(alerta => alerta.id !== novoAlerta.id));
    }, 5000);
  };
  
  // Carregar dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        // Carregar todos os dados necessários
        const indicadoresData = await fetchMockDataExtended('indicadores');
        const evolucaoPrecosData = await fetchMockDataExtended('evolucao-precos');
        const distribuicaoCompanhiasData = await fetchMockDataExtended('distribuicao-companhias');
        const destinosPopularesData = await fetchMockDataExtended('destinos-populares');
        const voosData = await fetchMockDataExtended('voos');
        const pacotesData = await fetchMockDataExtended('pacotes');
        const rankingHoteisData = await fetchMockDataExtended('ranking-hoteis');
        const alertasData = await fetchMockDataExtended('alertas');
        const filtrosData = await fetchMockDataExtended('filtros');
        
        // Atualizar o estado com os dados carregados
        setIndicadores(indicadoresData);
        setDadosEvolucaoPrecos(evolucaoPrecosData);
        setDadosDistribuicaoCompanhias(distribuicaoCompanhiasData);
        setDadosDestinosPopulares(destinosPopularesData);
        setVoos(voosData);
        setPacotes(pacotesData);
        setRankingHoteis(rankingHoteisData);
        setAlertas(alertasData);
        setFiltros(filtrosData);
        
        // Mostrar alerta de sucesso
        mostrarAlerta('Dados carregados com sucesso', 'Os dados do dashboard foram atualizados.', 'success');
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        mostrarAlerta('Erro ao carregar dados', 'Não foi possível carregar os dados do dashboard.', 'error');
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
      
      // Mostrar alerta de sucesso
      mostrarAlerta('Filtros aplicados', 'Os dados foram filtrados com sucesso.', 'success');
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
      mostrarAlerta('Erro ao aplicar filtros', 'Não foi possível filtrar os dados.', 'error');
    } finally {
      setLoadingFiltro(false);
    }
  };
  
  // Função para alternar entre abas
  const alternarAba = (aba) => {
    setAbaAtiva(aba);
  };
  
  // Função para abrir modal de mapa
  const abrirMapa = () => {
    setMapaAberto(true);
  };
  
  // Função para fechar modal de mapa
  const fecharMapa = () => {
    setMapaAberto(false);
  };
  
  // Função para abrir modal de detalhes do voo
  const abrirDetalhesVoo = (voo) => {
    setVooSelecionado(voo);
    setDetalhesVooAberto(true);
  };
  
  // Função para fechar modal de detalhes do voo
  const fecharDetalhesVoo = () => {
    setDetalhesVooAberto(false);
    setVooSelecionado(null);
  };
  
  // Função para baixar relatório
  const baixarRelatorio = () => {
    mostrarAlerta('Relatório gerado', 'O relatório foi gerado e está pronto para download.', 'success');
  };
  
  // Função para atualizar dados
  const atualizarDados = async () => {
    setLoading(true);
    try {
      // Simular chamada à API para atualizar dados
      const indicadoresData = await fetchMockDataExtended('indicadores');
      const evolucaoPrecosData = await fetchMockDataExtended('evolucao-precos');
      const distribuicaoCompanhiasData = await fetchMockDataExtended('distribuicao-companhias');
      const destinosPopularesData = await fetchMockDataExtended('destinos-populares');
      const voosData = await fetchMockDataExtended('voos');
      const pacotesData = await fetchMockDataExtended('pacotes');
      const rankingHoteisData = await fetchMockDataExtended('ranking-hoteis');
      const alertasData = await fetchMockDataExtended('alertas');
      
      // Atualizar o estado com os dados atualizados
      setIndicadores(indicadoresData);
      setDadosEvolucaoPrecos(evolucaoPrecosData);
      setDadosDistribuicaoCompanhias(distribuicaoCompanhiasData);
      setDadosDestinosPopulares(destinosPopularesData);
      setVoos(voosData);
      setPacotes(pacotesData);
      setRankingHoteis(rankingHoteisData);
      setAlertas(alertasData);
      
      // Mostrar alerta de sucesso
      mostrarAlerta('Dados atualizados', 'Os dados do dashboard foram atualizados com sucesso.', 'success');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      mostrarAlerta('Erro ao atualizar dados', 'Não foi possível atualizar os dados do dashboard.', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // Renderizar componente
  return (
    <Box bg={bgColor} minH="100vh" p={4}>
      {/* Alertas */}
      <Box position="fixed" top={4} right={4} zIndex="toast" maxW="400px">
        {alertasMostrados.map(alerta => (
          <AlertaSimplificado
            key={alerta.id}
            status={alerta.status}
            titulo={alerta.titulo}
            descricao={alerta.descricao}
            onClose={() => setAlertasMostrados(prev => prev.filter(a => a.id !== alerta.id))}
            darkMode={darkMode}
          />
        ))}
      </Box>
      
      {/* Cabeçalho */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Dashboard de Monitoramento de Preços</Heading>
        <HStack spacing={4}>
          <Button
            leftIcon={<RefreshCw />}
            colorScheme="blue"
            variant="outline"
            onClick={atualizarDados}
            isLoading={loading}
          >
            Atualizar Dados
          </Button>
          <Button
            leftIcon={<Download />}
            colorScheme="blue"
            onClick={baixarRelatorio}
          >
            Exportar Relatório
          </Button>
          <Button
            leftIcon={<Bell />}
            colorScheme={alertas.length > 0 ? "red" : "gray"}
            variant="outline"
            onClick={() => setMostrarAlertas(!mostrarAlertas)}
          >
            {alertas.length > 0 ? `${alertas.length} Alertas` : "Alertas"}
          </Button>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            variant="outline"
          >
            {darkMode ? "Modo Claro" : "Modo Escuro"}
          </Button>
        </HStack>
      </Flex>
      
      {/* Barra de Filtros Rápidos */}
      <Card bg={cardBgColor} mb={6} p={4}>
        <Flex direction={{ base: "column", md: "row" }} gap={4} align="center">
          <InputGroup maxW={{ base: "100%", md: "300px" }}>
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={2}>
              <Search size={18} />
            </Box>
            <Input 
              pl={10} 
              placeholder="Buscar..." 
              value={busca} 
              onChange={(e) => setBusca(e.target.value)} 
            />
          </InputGroup>
          
          <Select 
            placeholder="Período" 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)}
            maxW={{ base: "100%", md: "200px" }}
          >
            <option value="dia">Último dia</option>
            <option value="semana">Última semana</option>
            <option value="mes">Último mês</option>
            <option value="trimestre">Último trimestre</option>
            <option value="ano">Último ano</option>
          </Select>
          
          <Button 
            leftIcon={<Map />} 
            colorScheme="blue" 
            variant="outline"
            onClick={abrirMapa}
          >
            Ver Mapa
          </Button>
          
          <Button 
            leftIcon={<Filter />} 
            colorScheme="blue"
            ml={{ base: 0, md: "auto" }}
            onClick={() => document.getElementById('filtros-avancados').scrollIntoView({ behavior: 'smooth' })}
          >
            Filtros Avançados
          </Button>
        </Flex>
      </Card>
      
      {/* Alertas */}
      {mostrarAlertas && alertas.length > 0 && (
        <Card bg={cardBgColor} mb={6} p={4}>
          <Heading size="md" mb={4} display="flex" alignItems="center">
            <Icon as={AlertTriangle} mr={2} color="red.500" />
            Alertas de Preço
          </Heading>
          <VStack spacing={3} align="stretch">
            {alertas.map((alerta, index) => (
              <Box 
                key={index} 
                p={3} 
                borderRadius="md" 
                borderLeft="4px solid" 
                borderColor={alerta.tipo === 'oportunidade' ? "green.500" : "red.500"}
                bg={darkMode ? 'gray.700' : 'gray.50'}
              >
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="bold">{alerta.titulo}</Text>
                    <Text fontSize="sm">{alerta.descricao}</Text>
                  </Box>
                  <Badge 
                    colorScheme={alerta.tipo === 'oportunidade' ? "green" : "red"}
                    fontSize="0.8em"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {alerta.tipo === 'oportunidade' ? "Oportunidade" : "Alerta de Alta"}
                  </Badge>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Card>
      )}
      
      {/* Abas */}
      <Flex mb={6} borderBottom="1px" borderColor={borderColor}>
        <Box 
          px={4} 
          py={2} 
          cursor="pointer" 
          borderBottom="2px solid" 
          borderColor={abaAtiva === 'visao-geral' ? "blue.500" : "transparent"}
          fontWeight={abaAtiva === 'visao-geral' ? "bold" : "normal"}
          onClick={() => alternarAba('visao-geral')}
        >
          Visão Geral
        </Box>
        <Box 
          px={4} 
          py={2} 
          cursor="pointer" 
          borderBottom="2px solid" 
          borderColor={abaAtiva === 'hoteis' ? "blue.500" : "transparent"}
          fontWeight={abaAtiva === 'hoteis' ? "bold" : "normal"}
          onClick={() => alternarAba('hoteis')}
        >
          Hotéis
        </Box>
        <Box 
          px={4} 
          py={2} 
          cursor="pointer" 
          borderBottom="2px solid" 
          borderColor={abaAtiva === 'pacotes' ? "blue.500" : "transparent"}
          fontWeight={abaAtiva === 'pacotes' ? "bold" : "normal"}
          onClick={() => alternarAba('pacotes')}
        >
          Pacotes
        </Box>
      </Flex>
      
      {/* Conteúdo da Aba Visão Geral */}
      {abaAtiva === 'visao-geral' && (
        <>
          {/* Indicadores */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={6}>
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
          </Grid>
          
          {/* Gráficos */}
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6} mb={6}>
            {dadosEvolucaoPrecos && (
              <GraficoLinha
                dados={dadosEvolucaoPrecos}
                titulo="Evolução de Preços por Destino"
                subtitulo="Últimos 30 dias"
                darkMode={darkMode}
              />
            )}
            
            {dadosDistribuicaoCompanhias && (
              <GraficoPizza
                dados={dadosDistribuicaoCompanhias}
                titulo="Distribuição por Companhia Aérea"
                tipo="donut"
                darkMode={darkMode}
              />
            )}
          </Grid>
          
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6} mb={6}>
            {dadosDestinosPopulares && (
              <GraficoBarras
                dados={dadosDestinosPopulares}
                titulo="Destinos Mais Populares"
                horizontal={true}
                darkMode={darkMode}
              />
            )}
            
            <TabelaAvancada
              dados={voos.slice(0, 5)}
              colunas={[
                { header: 'Origem', accessor: 'origem' },
                { header: 'Destino', accessor: 'destino' },
                { header: 'Companhia', accessor: 'companhia' },
                { 
                  header: 'Preço', 
                  accessor: 'preco', 
                  isNumeric: true,
                  render: (item) => `R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              ]}
              titulo="Melhores Ofertas"
              acoes={[
                { 
                  label: 'Ver Todas', 
                  icon: <ChevronDown size={16} />, 
                  onClick: () => document.getElementById('tabela-voos').scrollIntoView({ behavior: 'smooth' }) 
                }
              ]}
              onRowClick={abrirDetalhesVoo}
              darkMode={darkMode}
            />
          </Grid>
          
          {/* Filtros Avançados */}
          <Box id="filtros-avancados" mb={6}>
            <FiltrosAvancados
              onFiltrar={aplicarFiltros}
              filtros={filtros}
              loading={loadingFiltro}
              darkMode={darkMode}
            />
          </Box>
          
          {/* Tabela de Voos */}
          <Box id="tabela-voos" mb={6}>
            <TabelaAvancada
              dados={voos}
              colunas={[
                { header: 'Origem', accessor: 'origem' },
                { header: 'Destino', accessor: 'destino' },
                { header: 'Companhia', accessor: 'companhia' },
                { header: 'Data', accessor: 'data' },
                { 
                  header: 'Duração', 
                  accessor: 'duracao',
                  render: (item) => (
                    <Flex align="center">
                      <Icon as={Clock} size={16} mr={1} />
                      <Text>{item.duracao}</Text>
                    </Flex>
                  )
                },
                { 
                  header: 'Conexões', 
                  accessor: 'conexoes',
                  render: (item) => (
                    <Badge colorScheme={item.conexoes === 0 ? "green" : item.conexoes === 1 ? "yellow" : "red"}>
                      {item.conexoes === 0 ? "Direto" : `${item.conexoes} ${item.conexoes === 1 ? "conexão" : "conexões"}`}
                    </Badge>
                  )
                },
                { 
                  header: 'Preço', 
                  accessor: 'preco', 
                  isNumeric: true,
                  render: (item) => (
                    <Flex align="center" justify="flex-end">
                      <Icon 
                        as={item.variacao > 0 ? TrendingUp : TrendingDown} 
                        color={item.variacao > 0 ? "red.500" : "green.500"} 
                        mr={1} 
                      />
                      <Text fontWeight="bold">{`R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</Text>
                    </Flex>
                  )
                }
              ]}
              titulo="Voos Disponíveis"
              acoes={[
                { 
                  label: 'Exportar', 
                  icon: <Download size={16} />, 
                  onClick: baixarRelatorio 
                },
                { 
                  label: 'Atualizar', 
                  icon: <RefreshCw size={16} />, 
                  onClick: atualizarDados 
                }
              ]}
              loading={loading}
              onRowClick={abrirDetalhesVoo}
              darkMode={darkMode}
            />
          </Box>
        </>
      )}
      
      {/* Conteúdo da Aba Hotéis */}
      {abaAtiva === 'hoteis' && (
        <>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6} mb={6}>
            <TabelaAvancada
              dados={rankingHoteis}
              colunas={[
                { header: 'Hotel', accessor: 'nome' },
                { header: 'Cidade', accessor: 'cidade' },
                { 
                  header: 'Categoria', 
                  accessor: 'categoria',
                  render: (item) => (
                    <Flex>
                      {[...Array(item.categoria)].map((_, i) => (
                        <Icon key={i} as={Star} color="yellow.400" />
                      ))}
                    </Flex>
                  )
                },
                { 
                  header: 'Avaliação', 
                  accessor: 'avaliacao',
                  render: (item) => (
                    <Badge colorScheme={
                      item.avaliacao >= 9 ? "green" : 
                      item.avaliacao >= 8 ? "teal" : 
                      item.avaliacao >= 7 ? "blue" : 
                      item.avaliacao >= 6 ? "yellow" : "red"
                    }>
                      {item.avaliacao.toFixed(1)}
                    </Badge>
                  )
                },
                { 
                  header: 'Diária', 
                  accessor: 'diaria', 
                  isNumeric: true,
                  render: (item) => `R$ ${item.diaria.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              ]}
              titulo="Ranking de Hotéis"
              acoes={[
                { 
                  label: 'Exportar', 
                  icon: <Download size={16} />, 
                  onClick: baixarRelatorio 
                }
              ]}
              loading={loading}
              darkMode={darkMode}
            />
            
            <GraficoBarras
              dados={{
                labels: rankingHoteis.slice(0, 10).map(hotel => hotel.nome),
                datasets: [
                  {
                    label: 'Preço da Diária (R$)',
                    data: rankingHoteis.slice(0, 10).map(hotel => hotel.diaria),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgba(53, 162, 235, 1)',
                    borderWidth: 1
                  }
                ]
              }}
              titulo="Comparativo de Preços de Hotéis"
              horizontal={true}
              darkMode={darkMode}
            />
          </Grid>
        </>
      )}
      
      {/* Conteúdo da Aba Pacotes */}
      {abaAtiva === 'pacotes' && (
        <>
          <TabelaAvancada
            dados={pacotes}
            colunas={[
              { header: 'Origem', accessor: 'origem' },
              { header: 'Destino', accessor: 'destino' },
              { 
                header: 'Hotel', 
                accessor: 'hotel',
                render: (item) => (
                  <Flex align="center">
                    <Text mr={2}>{item.hotel}</Text>
                    <Flex>
                      {[...Array(item.categoria_hotel)].map((_, i) => (
                        <Icon key={i} as={Star} color="yellow.400" size={14} />
                      ))}
                    </Flex>
                  </Flex>
                )
              },
              { header: 'Data', accessor: 'data' },
              { header: 'Noites', accessor: 'noites' },
              { 
                header: 'Tipo', 
                accessor: 'tipo',
                render: (item) => (
                  <Badge colorScheme={item.tipo === 'Aéreo + Hotel' ? "blue" : "purple"}>
                    {item.tipo}
                  </Badge>
                )
              },
              { 
                header: 'Preço Total', 
                accessor: 'preco_total', 
                isNumeric: true,
                render: (item) => `R$ ${item.preco_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              }
            ]}
            titulo="Pacotes Disponíveis"
            acoes={[
              { 
                label: 'Exportar', 
                icon: <Download size={16} />, 
                onClick: baixarRelatorio 
              },
              { 
                label: 'Atualizar', 
                icon: <RefreshCw size={16} />, 
                onClick: atualizarDados 
              }
            ]}
            loading={loading}
            darkMode={darkMode}
          />
        </>
      )}
      
      {/* Modal de Mapa */}
      <ModalSimplificado
        isOpen={mapaAberto}
        onClose={fecharMapa}
        titulo="Mapa de Destinos"
        darkMode={darkMode}
      >
        <Box p={4} textAlign="center">
          <Text mb={4}>Funcionalidade de mapa em desenvolvimento.</Text>
          <Button onClick={fecharMapa}>Fechar</Button>
        </Box>
      </ModalSimplificado>
      
      {/* Modal de Detalhes do Voo */}
      <ModalSimplificado
        isOpen={detalhesVooAberto}
        onClose={fecharDetalhesVoo}
        titulo="Detalhes do Voo"
        darkMode={darkMode}
      >
        {vooSelecionado && (
          <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
              <Box>
                <Text fontWeight="bold">Origem:</Text>
                <Text>{vooSelecionado.origem}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Destino:</Text>
                <Text>{vooSelecionado.destino}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Companhia:</Text>
                <Text>{vooSelecionado.companhia}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Data:</Text>
                <Text>{vooSelecionado.data}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Duração:</Text>
                <Text>{vooSelecionado.duracao}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Conexões:</Text>
                <Text>{vooSelecionado.conexoes === 0 ? "Voo Direto" : `${vooSelecionado.conexoes} ${vooSelecionado.conexoes === 1 ? "conexão" : "conexões"}`}</Text>
              </Box>
            </Grid>
            
            <Divider my={4} />
            
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold" fontSize="lg">Preço:</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {`R$ ${vooSelecionado.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </Text>
              </Box>
              <Button colorScheme="blue">Reservar</Button>
            </Flex>
          </Box>
        )}
      </ModalSimplificado>
    </Box>
  );
};

export default DashboardAvancado;
