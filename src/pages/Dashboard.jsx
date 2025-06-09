import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  useTheme,
  Container
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  AttachMoney as AttachMoneyIcon,
  AccessTime as AccessTimeIcon,
  AirplanemodeActive as AirplanemodeActiveIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { fetchHoteis, getFilterOptionsFromAPI, fetchDadosGrafico, fetchIndicadores } from '../services/hoteisService';
import OfertasTable from '../components/OfertasTable';
import FiltrosOfertas from '../components/FiltrosOfertas';

// Componente de Card Indicador
const CardIndicador = ({ titulo, valor, variacao, periodo }) => {
  const isPositive = variacao >= 0;
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        boxShadow: 2, 
        borderRadius: 2,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {titulo}
        </Typography>
        <Typography variant="h5" component="div" fontWeight="bold" mt={1}>
          {valor}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          {isPositive ? 
            <TrendingUpIcon fontSize="small" color="success" /> : 
            <TrendingDownIcon fontSize="small" color="error" />
          }
          <Typography 
            variant="body2" 
            color={isPositive ? "success.main" : "error.main"}
            ml={0.5}
          >
            {Math.abs(variacao)}% {periodo}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Componente principal do Dashboard
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(false);
  const [indicadores, setIndicadores] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [filtrosOfertas, setFiltrosOfertas] = useState(null);
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [evolucaoPrecos, setEvolucaoPrecos] = useState(null);
  const [distribuicaoCompanhias, setDistribuicaoCompanhias] = useState(null);
  const [mediaPrecosPorDestino, setMediaPrecosPorDestino] = useState(null);
  const [comparativoVoosDiretos, setComparativoVoosDiretos] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  
  // Carregar dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        // Carregar todos os dados necessários da API real
        const indicadoresData = await fetchIndicadores();
        const ofertasData = await fetchHoteis();
        const filtrosOfertasData = await getFilterOptionsFromAPI();
        const evolucaoPrecosData = await fetchDadosGrafico('evolucao-precos');
        const distribuicaoCompanhiasData = await fetchDadosGrafico('distribuicao-companhias');
        const mediaPrecosPorDestinoData = await fetchDadosGrafico('media-precos-destino');
        const comparativoVoosDiretosData = await fetchDadosGrafico('comparativo-voos-diretos');
        
        // Atualizar o estado com os dados carregados
        setIndicadores(indicadoresData);
        setOfertas(ofertasData);
        setFiltrosOfertas(filtrosOfertasData);
        setEvolucaoPrecos(evolucaoPrecosData);
        setDistribuicaoCompanhias(distribuicaoCompanhiasData);
        setMediaPrecosPorDestino(mediaPrecosPorDestinoData);
        setComparativoVoosDiretos(comparativoVoosDiretosData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, []);
  
  // Função para aplicar filtros às ofertas
  const aplicarFiltrosOfertas = async (filtrosAtivos) => {
    setLoadingFiltro(true);
    setFiltrosAtivos(filtrosAtivos);
    console.log('Filtros enviados para API:', filtrosAtivos);

    try {
      // Usar API real para buscar dados filtrados
      let ofertasData = await fetchHoteis(filtrosAtivos);

      // Filtro local de conexões (caso o filtro esteja ativo)
      if (filtrosAtivos.conexoes) {
        ofertasData = ofertasData.filter(hotel =>
          filtrosAtivos.conexoes === 'Direto'
            ? hotel.tipo_conexao === 'Direto'
            : hotel.tipo_conexao === 'Com Conexão'
        );
      }

      // Atualizar o estado com os dados filtrados
      setOfertas(ofertasData);
      console.log('Ofertas atualizadas:', ofertasData);

    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    } finally {
      setLoadingFiltro(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom>Dashboard de Viagens</Typography>
            <Typography variant="body1" color="text.secondary">
              Visualize e analise os dados de pesquisas e preços
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Indicadores */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {indicadores.slice(0, 4).map((indicador) => (
          <Grid item xs={12} sm={6} md={3} key={indicador.id}>
            <CardIndicador
              titulo={indicador.titulo}
              valor={indicador.valor}
              variacao={indicador.variacao}
              periodo={indicador.periodo}
            />
          </Grid>
        ))}
      </Grid>
      
      {/* Tabs para diferentes visualizações */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Melhores Ofertas" />
          <Tab label="Evolução de Preços" />
          <Tab label="Comparativos" />
          <Tab label="Destinos" />
        </Tabs>
      </Paper>
      
      {/* Conteúdo da Tab Melhores Ofertas */}
      {tabValue === 0 && (
        <>
          {/* Filtros para Ofertas */}
          <FiltrosOfertas 
            onFiltrar={aplicarFiltrosOfertas} 
            filtros={filtrosOfertas}
            loading={loadingFiltro}
          />
          
          {/* Tabela de Ofertas */}
          <OfertasTable ofertas={ofertas} loading={loadingFiltro} filtros={filtrosAtivos} />
        </>
      )}
      
      {/* Conteúdo da Tab Evolução de Preços */}
      {tabValue === 1 && (
        <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>Evolução Detalhada de Preços</Typography>
          <Box height={500}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={evolucaoPrecos?.datasets[0]?.data.map((value, index) => ({
                  name: evolucaoPrecos.labels[index],
                  "São Paulo → Rio de Janeiro": value,
                  "São Paulo → Miami": evolucaoPrecos?.datasets[1]?.data[index],
                  "Rio de Janeiro → Lisboa": evolucaoPrecos?.datasets[2]?.data[index],
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="São Paulo → Rio de Janeiro" 
                  stroke={theme.palette.primary.main} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="São Paulo → Miami" 
                  stroke={theme.palette.secondary.main} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="Rio de Janeiro → Lisboa" 
                  stroke={theme.palette.info.main} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      )}
      
      {/* Conteúdo da Tab Comparativos - Expandido para 100% da largura */}
      {tabValue === 2 && (
        <Box sx={{ width: '100%', px: 0 }}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>Comparativo: Voos Diretos vs. Com Conexão</Typography>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparativoVoosDiretos?.datasets[0]?.data.map((value, index) => ({
                    name: comparativoVoosDiretos.labels[index],
                    "Voo Direto": value,
                    "Com Conexão": comparativoVoosDiretos?.datasets[1]?.data[index],
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value) => [`R$ ${value}`, '']} />
                  <Legend />
                  <Bar 
                    dataKey="Voo Direto" 
                    fill={theme.palette.primary.main} 
                    name="Voo Direto" 
                  />
                  <Bar 
                    dataKey="Com Conexão" 
                    fill={theme.palette.secondary.main} 
                    name="Com Conexão" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>
      )}
      
      {/* Conteúdo da Tab Destinos - Expandido para 100% da largura */}
      {tabValue === 3 && (
        <Box sx={{ width: '100%', px: 0 }}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>Média de Preços por Destino</Typography>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mediaPrecosPorDestino?.datasets[0]?.data.map((value, index) => ({
                    name: mediaPrecosPorDestino.labels[index],
                    "Preço Médio": value,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <RechartsTooltip formatter={(value) => [`R$ ${value}`, '']} />
                  <Legend />
                  <Bar 
                    dataKey="Preço Médio" 
                    fill={theme.palette.primary.main} 
                    name="Preço Médio" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
