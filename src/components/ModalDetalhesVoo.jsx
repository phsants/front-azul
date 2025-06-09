import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  Hotel as HotelIcon,
  AttachMoney as AttachMoneyIcon,
  AirplanemodeActive as AirplanemodeActiveIcon,
  Schedule as ScheduleIcon,
  SwapHoriz as SwapHorizIcon,
  EventSeat as EventSeatIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';

/**
 * Componente Modal para exibir detalhes de voos com múltiplos trechos
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.open - Estado de abertura do modal
 * @param {Function} props.onClose - Função para fechar o modal
 * @param {Object} props.oferta - Dados básicos da oferta selecionada
 * @param {Object} props.detalhesVoo - Detalhes completos do voo (ida, volta, conexões)
 * @param {boolean} props.loading - Estado de carregamento dos detalhes
 * @returns {JSX.Element} Componente ModalDetalhesVoo
 */
const ModalDetalhesVoo = ({ open, onClose, oferta, detalhesVoo, loading }) => {
  const [activeTab, setActiveTab] = useState('ida');
  const theme = useTheme();
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Renderizar conteúdo com base no estado de carregamento
  const renderConteudo = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={4} minHeight="300px">
          <CircularProgress />
        </Box>
      );
    }
    
    if (!detalhesVoo) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={4} minHeight="300px">
          <Typography color="text.secondary">
            Não foi possível carregar os detalhes deste voo. Por favor, tente novamente.
          </Typography>
        </Box>
      );
    }
    
    return (
      <>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab 
            icon={<FlightTakeoffIcon />} 
            iconPosition="start" 
            label="Voo de Ida" 
            value="ida" 
          />
          <Tab 
            icon={<FlightLandIcon />} 
            iconPosition="start" 
            label="Voo de Volta" 
            value="volta" 
            disabled={!detalhesVoo.volta || detalhesVoo.volta.length === 0}
          />
        </Tabs>
        
        {activeTab === 'ida' && renderVoosIda()}
        {activeTab === 'volta' && renderVoosVolta()}
      </>
    );
  };
  
  // Renderizar voos de ida (pode ter múltiplos trechos)
  const renderVoosIda = () => {
    if (!detalhesVoo || !detalhesVoo.ida || detalhesVoo.ida.length === 0) {
      return (
        <Typography color="text.secondary" align="center" py={4}>
          Informações do voo de ida não disponíveis
        </Typography>
      );
    }
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom color="primary">
          {oferta?.origem} → {oferta?.destino}
        </Typography>
        
        {detalhesVoo.ida.length === 1 ? (
          // Caso de voo direto (sem conexões)
          renderVooDireto(detalhesVoo.ida[0], 'ida')
        ) : (
          // Caso de voo com múltiplos trechos
          renderVooMultiplosTrechos(detalhesVoo.ida, 'ida')
        )}
      </Box>
    );
  };
  
  // Renderizar voos de volta (pode ter múltiplos trechos)
  const renderVoosVolta = () => {
    if (!detalhesVoo || !detalhesVoo.volta || detalhesVoo.volta.length === 0) {
      return (
        <Typography color="text.secondary" align="center" py={4}>
          Informações do voo de volta não disponíveis
        </Typography>
      );
    }
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom color="primary">
          {oferta?.destino} → {oferta?.origem}
        </Typography>
        
        {detalhesVoo.volta.length === 1 ? (
          // Caso de voo direto (sem conexões)
          renderVooDireto(detalhesVoo.volta[0], 'volta')
        ) : (
          // Caso de voo com múltiplos trechos
          renderVooMultiplosTrechos(detalhesVoo.volta, 'volta')
        )}
      </Box>
    );
  };
  
  // Calcular duração do voo com base nos horários
  const calcularDuracao = (voo) => {
    try {
      const [horaPartida, minutoPartida] = voo.partida_hora.split(':').map(Number);
      const [horaChegada, minutoChegada] = voo.chegada_hora.split(':').map(Number);
      
      let horasDuracao = horaChegada - horaPartida;
      let minutosDuracao = minutoChegada - minutoPartida;
      
      if (minutosDuracao < 0) {
        minutosDuracao += 60;
        horasDuracao -= 1;
      }
      
      if (horasDuracao < 0) {
        horasDuracao += 24; // Assumindo que o voo não dura mais de 24 horas
      }
      
      return `${horasDuracao}h ${minutosDuracao}min`;
    } catch (error) {
      console.error('Erro ao calcular duração:', error);
      return 'N/A';
    }
  };
  
  // Renderizar voo direto (sem conexões)
  const renderVooDireto = (voo, tipo) => {
    const duracao = calcularDuracao(voo);
    
    return (
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {voo.companhia} - {voo.numero_voo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {voo.partida_data} • Duração: {duracao}
            </Typography>
          </Box>
          <Chip 
            label="Voo Direto" 
            color="primary" 
            size="small"
            icon={<AirplanemodeActiveIcon />}
          />
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mr: 2,
                mt: 0.5
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main' 
                }} />
                <Box sx={{ 
                  width: 2, 
                  height: 50, 
                  bgcolor: 'divider',
                  my: 0.5
                }} />
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: 'success.main' 
                }} />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {voo.partida_aeroporto}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {voo.partida_hora} • {voo.partida_data}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {voo.chegada_aeroporto}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {voo.chegada_hora} • {voo.chegada_data}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="caption" color="text.secondary">
                    Companhia
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {voo.companhia}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="caption" color="text.secondary">
                    Número do Voo
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {voo.numero_voo}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="caption" color="text.secondary">
                    Tipo de Avião
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {voo.tipo_aviao}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="caption" color="text.secondary">
                    Classe
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {voo.classe}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="caption" color="text.secondary">
                    Duração
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {duracao}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };
  
  // Calcular duração total de voos com múltiplos trechos
  const calcularDuracaoTotal = (voos) => {
    if (!voos || voos.length === 0) return 'N/A';
    
    try {
      // Para simplificar, vamos apenas calcular do primeiro ao último voo
      const primeiroVoo = voos[0];
      const ultimoVoo = voos[voos.length - 1];
      
      const [horaPartida, minutoPartida] = primeiroVoo.partida_hora.split(':').map(Number);
      const [horaChegada, minutoChegada] = ultimoVoo.chegada_hora.split(':').map(Number);
      
      let horasDuracao = horaChegada - horaPartida;
      let minutosDuracao = minutoChegada - minutoPartida;
      
      if (minutosDuracao < 0) {
        minutosDuracao += 60;
        horasDuracao -= 1;
      }
      
      if (horasDuracao < 0) {
        horasDuracao += 24; // Assumindo que o voo não dura mais de 24 horas
      }
      
      return `${horasDuracao}h ${minutosDuracao}min`;
    } catch (error) {
      console.error('Erro ao calcular duração total:', error);
      return 'N/A';
    }
  };
  
  // Renderizar voo com múltiplos trechos
  const renderVooMultiplosTrechos = (voos, tipo) => {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Voo com {voos.length - 1} {voos.length - 1 === 1 ? 'conexão' : 'conexões'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duração total: {calcularDuracaoTotal(voos)}
          </Typography>
        </Box>
        
        <Stepper orientation="vertical" sx={{ mb: 3 }}>
          {voos.map((voo, index) => (
            <Step key={index} active={true} expanded={true}>
              <StepLabel 
                StepIconComponent={() => (
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: index === 0 ? 'primary.main' : 
                             index === voos.length - 1 ? 'success.main' : 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {index === 0 ? (
                      <FlightTakeoffIcon fontSize="small" />
                    ) : index === voos.length - 1 ? (
                      <FlightLandIcon fontSize="small" />
                    ) : (
                      <SwapHorizIcon fontSize="small" />
                    )}
                  </Box>
                )}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">
                    {index === 0 ? 'Partida' : 
                     index === voos.length - 1 ? 'Chegada' : `Conexão ${index}`}
                  </Typography>
                  {index > 0 && (
                    <Chip 
                      label={`Duração: ${calcularDuracao(voo)}`}
                      size="small"
                      color="warning"
                      variant="outlined"
                    />
                  )}
                </Box>
              </StepLabel>
              <StepContent>
                <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ 
                          mr: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FlightTakeoffIcon color="primary" fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {voo.partida_aeroporto}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {`${voo.partida_data} • ${voo.partida_hora}`}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          mr: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FlightLandIcon color="success" fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {voo.chegada_aeroporto}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {`${voo.chegada_data} • ${voo.chegada_hora}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Companhia
                          </Typography>
                          <Typography variant="body2">
                            {voo.companhia}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Voo
                          </Typography>
                          <Typography variant="body2">
                            {voo.numero_voo}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Tipo de Avião
                          </Typography>
                          <Typography variant="body2">
                            {voo.tipo_aviao}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Classe
                          </Typography>
                          <Typography variant="body2">
                            {voo.classe}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="detalhes-voo-titulo"
    >
      <DialogTitle id="detalhes-voo-titulo">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Detalhes da Viagem
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="fechar">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {renderConteudo()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetalhesVoo;
