import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  Divider,
  FormControlLabel,
  Card,
  CardContent,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import CamposDinamicos from './CamposDinamicos';
import MesesSelecao from './MesesSelecao';
import PeriodoPesquisa from './PeriodoPesquisa';
import HospedagemSelecao from './HospedagemSelecao';

export default function TelaAgendamentos() {
  // Estados principais
  const [pesquisas, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalAgendamentoAberto, setModalAgendamentoAberto] = useState(false);
  const [pesquisaSelecionada, setPesquisaSelecionada] = useState(null);

  // Estados para toast/notificações
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const navigate = useNavigate();
  const theme = useTheme();

  // Função para exibir notificações
  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  // Função para carregar pesquisas da API
  const carregarPesquisas = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/pesquisas", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPesquisas(response.data.data);
      } else {
        showToast("Erro ao buscar pesquisas", "error");
      }
    } catch (error) {
      console.error("Erro ao buscar pesquisas", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        showToast("Erro ao buscar pesquisas", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Carregar pesquisas ao montar o componente
  useEffect(() => {
    carregarPesquisas();
  }, []);

  // Função para excluir pesquisa
  const excluirPesquisa = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!window.confirm("Tem certeza que deseja excluir esta pesquisa?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/pesquisa/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("Pesquisa excluída com sucesso", "success");
      carregarPesquisas(); // Recarregar a lista
    } catch (error) {
      console.error("Erro ao excluir pesquisa", error);
      showToast("Erro ao excluir pesquisa", "error");
    } finally {
      setLoading(false);
    }
  };

  // Função para abrir modal de edição
  const abrirModalEditar = (pesquisa) => {
    setPesquisaSelecionada(pesquisa);
    setModalEditarAberto(true);
  };

  // Função para abrir modal de agendamento
  const abrirModalAgendamento = (pesquisa) => {
    setPesquisaSelecionada(pesquisa);
    setModalAgendamentoAberto(true);
  };

  // Função para fechar modais
  const fecharModais = () => {
    setModalEditarAberto(false);
    setModalAgendamentoAberto(false);
    setPesquisaSelecionada(null);
    carregarPesquisas(); // Recarregar após fechar modal
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Agendamentos
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {pesquisas.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ textAlign: 'center' }}>
                  Nenhuma pesquisa encontrada
                </Alert>
              </Grid>
            ) : (
              pesquisas.map((pesquisa) => (
                <Grid item xs={12} sm={6} md={4} key={pesquisa.id}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      border: `2px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        boxShadow: theme.shadows[8],
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {pesquisa.cliente_nome}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Status:</strong>
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor:
                              pesquisa.status === 'finalizado' ? 'success.light' :
                              pesquisa.status === 'em andamento' ? 'warning.light' : 'info.light',
                            color: 'white',
                            fontSize: '0.75rem',
                            textTransform: 'capitalize'
                          }}
                        >
                          {pesquisa.status}
                        </Box>
                      </Typography>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Tipo Período:</strong> {pesquisa.tipo_periodo}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Apartamentos:</strong> {pesquisa.apartamento}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Adultos:</strong> {pesquisa.adultos}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => abrirModalEditar(pesquisa)}
                          sx={{ minWidth: 'auto' }}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<ScheduleIcon />}
                          onClick={() => abrirModalAgendamento(pesquisa)}
                          sx={{ minWidth: 'auto' }}
                        >
                          Agendar
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => excluirPesquisa(pesquisa.id)}
                          sx={{ minWidth: 'auto' }}
                        >
                          Excluir
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Paper>

      {/* Modal de Edição */}
      {modalEditarAberto && pesquisaSelecionada && (
        <ModalEditar
          pesquisa={pesquisaSelecionada}
          aberto={modalEditarAberto}
          fechar={fecharModais}
          showToast={showToast}
        />
      )}

      {/* Modal de Agendamento */}
      {modalAgendamentoAberto && pesquisaSelecionada && (
        <ModalAgendamento
          pesquisa={pesquisaSelecionada}
          aberto={modalAgendamentoAberto}
          fechar={fecharModais}
          showToast={showToast}
        />
      )}

      {/* Toast de Notificações */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

// Modal de Edição com integração da API
function ModalEditar({ pesquisa, aberto, fechar, showToast }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDadosPesquisa = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/pesquisa/${pesquisa.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;
        setForm({
          cliente_nome: data.pesquisa.cliente_nome || '',
          origens: data.origensDestinos?.map(od => ({ nome: od.origem })) || [{ id: '', nome: '' }],
          destinos: data.origensDestinos?.map(od => ({
            nome: od.destino,
            hotel: od.nome_hotel || '',
            hotel_por_preco: od.hotel_por_preco
          })) || [{ id: '', nome: '', hotel: '', hotel_por_preco: true }],
          meses_selecionados: data.pesquisa.meses_selecionados || [],
          tipo_periodo: data.pesquisa.tipo_periodo || '',
          dia_especifico: data.pesquisa.dia_especifico || '',
          dias_semana: data.pesquisa.dias_semana || [],
          noites_min: data.pesquisa.noites_min || '',
          noites_max: data.pesquisa.noites_max || '',
          apartamento: data.pesquisa.apartamento || 1,
          adultos: data.pesquisa.adultos || 2,
          criancas: data.pesquisa.criancas || 0,
          idades_criancas: data.pesquisa.idades_criancas || [],
          bebes: data.pesquisa.bebes || 0,
          idades_bebes: data.pesquisa.idades_bebes || [],
          tipo_voo: data.pesquisa.tipo_voo || 'Mais Barato',
          status: data.pesquisa.status || 'pendente',
        });
      } catch (error) {
        console.error("Erro ao carregar dados da pesquisa", error);
        showToast("Erro ao carregar dados da pesquisa", "error");
      } finally {
        setLoading(false);
      }
    };

    if (aberto && pesquisa) {
      carregarDadosPesquisa();
    }
  }, [pesquisa, aberto, navigate, showToast]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/pesquisa/${pesquisa.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("Pesquisa atualizada com sucesso", "success");
      fechar();
    } catch (error) {
      console.error("Erro ao salvar edição", error);
      showToast("Erro ao salvar edição", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={aberto}
      onClose={fechar}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{
        textAlign: 'center',
        color: 'primary.main',
        fontWeight: 'bold',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        Editar Pesquisa
        <IconButton
          aria-label="close"
          onClick={fechar}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {loading || !form ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nome do Cliente"
              value={form.cliente_nome}
              onChange={(e) => setForm({ ...form, cliente_nome: e.target.value })}
            />

            <CamposDinamicos form={form} setForm={setForm} field="origens" label="Saindo de" />
            <CamposDinamicos form={form} setForm={setForm} field="destinos" label="Destino" />
            <MesesSelecao form={form} setForm={setForm} />
            <PeriodoPesquisa form={form} setForm={setForm} />
            <HospedagemSelecao form={form} setForm={setForm} />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="em andamento">Em Andamento</MenuItem>
                <MenuItem value="finalizado">Finalizado</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : 'Salvar'}
              </Button>
              <Button variant="outlined" color="error" onClick={fechar}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Modal de Agendamento com integração da API
function ModalAgendamento({ pesquisa, aberto, fechar, showToast }) {
  const [diasSemana, setDiasSemana] = useState([]);
  const [horarios, setHorarios] = useState('');
  const [frequencia, setFrequencia] = useState('diario');
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarAgendamento = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/pesquisa/${pesquisa.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const agendamento = response.data.data.agendamentos[0] || {};
        setDiasSemana(agendamento.dias_semana || []);
        setHorarios(agendamento.horarios || '');
        setFrequencia(agendamento.frequencia || 'diario');
        setAtivo(agendamento.ativo ?? true);
      } catch (error) {
        console.error("Erro ao carregar agendamento", error);
        showToast("Erro ao carregar agendamento", "error");
      } finally {
        setLoading(false);
      }
    };

    if (aberto && pesquisa) {
      carregarAgendamento();
    }
  }, [pesquisa, aberto, navigate, showToast]);

  const salvarAgendamento = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/pesquisa/${pesquisa.id}/agendamento`, {
        dias_semana: diasSemana,
        horarios,
        frequencia,
        ativo
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("Agendamento salvo com sucesso", "success");
      fechar();
    } catch (error) {
      console.error("Erro ao salvar agendamento", error);
      showToast("Erro ao salvar agendamento", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleDia = (dia) => {
    setDiasSemana(prev =>
      prev.includes(dia)
        ? prev.filter(d => d !== dia)
        : [...prev, dia]
    );
  };

  const diasDaSemana = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

  return (
    <Dialog
      open={aberto}
      onClose={fechar}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{
        textAlign: 'center',
        color: 'primary.main',
        fontWeight: 'bold',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        Agendamento - {pesquisa.cliente_nome}
        <IconButton
          aria-label="close"
          onClick={fechar}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Dias da Semana
              </Typography>
              <Grid container spacing={1}>
                {diasDaSemana.map(dia => (
                  <Grid item xs={6} sm={4} key={dia}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={diasSemana.includes(dia)}
                          onChange={() => toggleDia(dia)}
                        />
                      }
                      label={dia.charAt(0).toUpperCase() + dia.slice(1)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <TextField
              fullWidth
              label="Horários"
              value={horarios}
              onChange={(e) => setHorarios(e.target.value)}
              placeholder="Ex: 08:00, 14:00"
              helperText="Separe múltiplos horários com vírgula"
            />

            <FormControl fullWidth>
              <InputLabel>Frequência</InputLabel>
              <Select
                value={frequencia}
                label="Frequência"
                onChange={(e) => setFrequencia(e.target.value)}
              >
                <MenuItem value="diario">Diário</MenuItem>
                <MenuItem value="semanal">Semanal</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                />
              }
              label="Agendamento Ativo"
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                onClick={salvarAgendamento}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : 'Salvar'}
              </Button>
              <Button variant="outlined" color="error" onClick={fechar}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
