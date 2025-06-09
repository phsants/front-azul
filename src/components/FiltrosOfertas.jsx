import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Autocomplete,
  Chip,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  DateRange as DateRangeIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Componente de Filtros para Ofertas
const FiltrosOfertas = ({ onFiltrar, filtros, loading = false }) => {
  const [filtroAtivo, setFiltroAtivo] = useState({
    origem: [],
    destino: [],
    nomeHotel: [],
    faixaPreco: [0, 50000], // Valor inicial para o slider
    conexoes: '',
    dataInicio: null,
    dataFim: null
  });

  // Estado para os inputs de preço
  const [precoMinimo, setPrecoMinimo] = useState(0);
  const [precoMaximo, setPrecoMaximo] = useState(50000);

  // Estado para as opções filtradas de hotéis
  const [hoteisDisponiveis, setHoteisDisponiveis] = useState([]);

  // Formatador de preço
  const formatarPreco = (valor) => `R$ ${valor.toLocaleString('pt-BR')}`;

  // Converter string de data para objeto dayjs
  const converterStringParaData = (dataInput) => {
    if (!dataString) return null;
    const [dia, mes, ano] = dataInput.split('/');
    return dayjs(`${ano}-${mes}-${dia}`);
  };

  // Converter objeto dayjs para string de data
  const converterDataParaString = (data) => {
    if (!data) return '';
    return data.format('DD/MM/YYYY');
  };

  // Atualizar opções de filtro quando filtros mudar
  useEffect(() => {
    if (filtros) {
      console.log("Opções de filtro atualizadas:", filtros);

      // Inicializar hotéis disponíveis com todos os hotéis
      if (filtros.hoteis) {
        setHoteisDisponiveis(filtros.hoteis.filter(hotel => hotel !== 'Todos'));
      }
    }
  }, [filtros]);

  // Atualizar hotéis disponíveis quando origem ou destino mudar
  useEffect(() => {
    if (!filtros || !filtros.hoteisCompletos) return;

    let hoteisFiltrados = filtros.hoteisCompletos;

    if (filtroAtivo.origem.length > 0) {
      hoteisFiltrados = hoteisFiltrados.filter(h =>
        filtroAtivo.origem.includes(h.origem)
      );
     }

    if (filtroAtivo.destino.length > 0) {
      hoteisFiltrados = hoteisFiltrados.filter(h =>
        filtroAtivo.destino.includes(h.destino)
      );
    }

    const nomesHoteis = [...new Set(hoteisFiltrados.map(h => h.nome_hotel).filter(Boolean))];

    setHoteisDisponiveis(nomesHoteis);

    // Atualiza os hotéis selecionados se algum saiu do escopo
    if (filtroAtivo.nomeHotel.length > 0) {
      const hoteisValidos = filtroAtivo.nomeHotel.filter(hotel =>
        nomesHoteis.includes(hotel)
      );

      if (hoteisValidos.length !== filtroAtivo.nomeHotel.length) {
        setFiltroAtivo(prev => ({
          ...prev,
          nomeHotel: hoteisValidos
        }));
      }
    }
  }, [filtroAtivo.origem, filtroAtivo.destino, filtros]);

  const handleChange = (campo, valor) => {
    console.log(`Alterando ${campo} para:`, valor);
    setFiltroAtivo(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Atualizar o estado do filtro quando os inputs de preço mudarem
  useEffect(() => {
    setFiltroAtivo(prev => ({
      ...prev,
      faixaPreco: [precoMinimo, precoMaximo]
    }));
  }, [precoMinimo, precoMaximo]);

  // Manipular mudança no input de preço mínimo
  const handlePrecoMinimoChange = (event) => {
    const valor = event.target.value === '' ? 0 : Number(event.target.value);
    setPrecoMinimo(valor);
  };

  // Manipular mudança no input de preço máximo
  const handlePrecoMaximoChange = (event) => {
    const valor = event.target.value === '' ? 0 : Number(event.target.value);
    setPrecoMaximo(valor);
  };

  const handleDateChange = (campo, novaData) => {
    setFiltroAtivo(prev => ({
      ...prev,
      [campo]: dayjs(novaData)
    }));
  };

  const aplicarFiltros = () => {
    // Preparar objeto de filtros para enviar
    const filtrosParaAplicar = {
      ...filtroAtivo,
      // Converter datas para string no formato esperado pela API/mock
      dataInicio: filtroAtivo.dataInicio ? converterDataParaString(filtroAtivo.dataInicio) : '',
      dataFim: filtroAtivo.dataFim ? converterDataParaString(filtroAtivo.dataFim) : '',
    };

    console.log("Aplicando filtros:", filtrosParaAplicar);
    onFiltrar(filtrosParaAplicar);
  };

  const limparFiltros = () => {
    setPrecoMinimo(0);
    setPrecoMaximo(50000);
    setFiltroAtivo({
      origem: [],
      destino: [],
      nomeHotel: [],
      faixaPreco: [0, 50000],
      conexoes: '',
      dataInicio: null,
      dataFim: null
    });
    onFiltrar({});
  };

  // Verificar se há opções de filtro disponíveis
  const temOpcoesDeOrigem = filtros?.origens && filtros.origens.length > 1; // > 1 porque sempre tem "Todos"
  const temOpcoesDeDestino = filtros?.destinos && filtros.destinos.length > 1;
  const temOpcoesDeHotel = hoteisDisponiveis && hoteisDisponiveis.length > 0;
  const temOpcoesDeConexao = filtros?.conexoes && filtros.conexoes.length > 1;

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" display="flex" alignItems="center">
            <FilterIcon sx={{ mr: 1 }} />
            Filtros
          </Typography>
          <Box>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={limparFiltros}
              disabled={loading}
              sx={{ mr: 1 }}
            >
              Limpar
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<FilterIcon />}
              onClick={aplicarFiltros}
              disabled={loading}
            >
              {loading ? 'Aplicando...' : 'Aplicar Filtros'}
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* Filtros principais sempre visíveis */}
        <Grid item xs={12} md={3}>
          <Autocomplete
            multiple
            id="origem-autocomplete"
            options={temOpcoesDeOrigem ? filtros.origens.filter(origem => origem !== 'Todos') : []}
            value={filtroAtivo.origem}
            onChange={(e, newValue) => handleChange('origem', newValue)}
            disabled={loading || !temOpcoesDeOrigem}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Origem"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <FlightIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const tagProps = getTagProps({ index });
                // Extrair a key e remover do restante das props
                const { key, ...restTagProps } = tagProps;
                return (
                  <Chip
                    key={key}
                    variant="outlined"
                    label={option}
                    size="small"
                    {...restTagProps}
                  />
                );
              })
            }
            noOptionsText="Nenhuma origem disponível"
            loadingText="Carregando..."
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Autocomplete
            multiple
            id="destino-autocomplete"
            options={temOpcoesDeDestino ? filtros.destinos.filter(destino => destino !== 'Todos') : []}
            value={filtroAtivo.destino}
            onChange={(e, newValue) => handleChange('destino', newValue)}
            disabled={loading || !temOpcoesDeDestino}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destino"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <FlightIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const tagProps = getTagProps({ index });
                // Extrair a key e remover do restante das props
                const { key, ...restTagProps } = tagProps;
                return (
                  <Chip
                    key={key}
                    variant="outlined"
                    label={option}
                    size="small"
                    {...restTagProps}
                  />
                );
              })
            }
            noOptionsText="Nenhum destino disponível"
            loadingText="Carregando..."
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Autocomplete
            multiple
            id="hotel-autocomplete"
            options={hoteisDisponiveis}
            value={filtroAtivo.nomeHotel}
            onChange={(e, newValue) => handleChange('nomeHotel', newValue)}
            disabled={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nome do Hotel"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <HotelIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const tagProps = getTagProps({ index });
                // Extrair a key e remover do restante das props
                const { key, ...restTagProps } = tagProps;
                return (
                  <Chip
                    key={key}
                    variant="outlined"
                    label={option}
                    size="small"
                    {...restTagProps}
                  />
                );
              })
            }
            noOptionsText={
              filtroAtivo.origem.length > 0 || filtroAtivo.destino.length > 0
                ? "Nenhum hotel disponível para a origem/destino selecionados"
                : "Nenhum hotel disponível"
            }
            loadingText="Carregando..."
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Conexões</InputLabel>
            <Select
              value={filtroAtivo.conexoes}
              label="Conexões"
              onChange={(e) => handleChange('conexoes', e.target.value)}
              disabled={loading || !temOpcoesDeConexao}
              startAdornment={<FlightIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />}
            >
              <MenuItem value="">Todos</MenuItem>
              {temOpcoesDeConexao &&
                filtros.conexoes
                  .filter(conexao => conexao !== 'Todos')
                  .map((conexao, index) => (
                    <MenuItem key={index} value={conexao}>{conexao}</MenuItem>
                  ))
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Filtros de Faixa de Preço e Período alinhados horizontalmente */}
      <Box sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Filtro de Faixa de Preço com Inputs Customizáveis */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom display="flex" alignItems="center">
            <AttachMoneyIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
            Faixa de Preço
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Preço Mínimo"
                value={precoMinimo}
                onChange={handlePrecoMinimoChange}
                disabled={loading}
                type="number"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Preço Máximo"
                value={precoMaximo}
                onChange={handlePrecoMaximoChange}
                disabled={loading}
                type="number"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  inputProps: { min: precoMinimo }
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Filtro de Data com DatePicker */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom display="flex" alignItems="center">
            <DateRangeIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
            Período da Pesquisa
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data Inicial"
                  value={filtroAtivo.dataInicio}
                  onChange={(newValue) => handleDateChange('dataInicio', newValue)}
                  disabled={loading}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      disabled: loading
                    }
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data Final"
                  value={filtroAtivo.dataFim}
                  onChange={(newValue) => handleDateChange('dataFim', newValue)}
                  disabled={loading}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      disabled: loading
                    }
                  }}
                  format="DD/MM/YYYY"
                  minDate={filtroAtivo.dataInicio || undefined}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Exibir chips de filtros ativos */}
      {(filtroAtivo.origem.length > 0 ||
        filtroAtivo.destino.length > 0 ||
        filtroAtivo.nomeHotel.length > 0 ||
        filtroAtivo.conexoes ||
        filtroAtivo.dataInicio ||
        filtroAtivo.dataFim ||
        precoMinimo > 0 ||
        precoMaximo < 50000) && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Filtros Ativos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {filtroAtivo.origem.map((origem, index) => (
              <Chip
                key={`origem-${index}`}
                label={`Origem: ${origem}`}
                onDelete={() => {
                  const novasOrigens = [...filtroAtivo.origem];
                  novasOrigens.splice(index, 1);
                  handleChange('origem', novasOrigens);
                }}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}

            {filtroAtivo.destino.map((destino, index) => (
              <Chip
                key={`destino-${index}`}
                label={`Destino: ${destino}`}
                onDelete={() => {
                  const novosDestinos = [...filtroAtivo.destino];
                  novosDestinos.splice(index, 1);
                  handleChange('destino', novosDestinos);
                }}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}

            {filtroAtivo.nomeHotel.map((hotel, index) => (
              <Chip
                key={`hotel-${index}`}
                label={`Hotel: ${hotel}`}
                onDelete={() => {
                  const novosHoteis = [...filtroAtivo.nomeHotel];
                  novosHoteis.splice(index, 1);
                  handleChange('nomeHotel', novosHoteis);
                }}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}

            {filtroAtivo.conexoes && (
              <Chip
                key="conexoes"
                label={`Conexão: ${filtroAtivo.conexoes}`}
                onDelete={() => handleChange('conexoes', '')}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}

            {(precoMinimo > 0 || precoMaximo < 50000) && (
              <Chip
                key="preco"
                label={`Preço: ${formatarPreco(precoMinimo)} - ${formatarPreco(precoMaximo)}`}
                onDelete={() => {
                  setPrecoMinimo(0);
                  setPrecoMaximo(50000);
                }}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}

            {filtroAtivo.dataInicio && (
              <Chip
                key="data-inicio"
                label={`A partir de: ${converterDataParaString(filtroAtivo.dataInicio)}`}
                onDelete={() => handleDateChange('dataInicio', null)}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}

            {filtroAtivo.dataFim && (
              <Chip
                key="data-fim"
                label={`Até: ${converterDataParaString(filtroAtivo.dataFim)}`}
                onDelete={() => handleDateChange('dataFim', null)}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default FiltrosOfertas;
