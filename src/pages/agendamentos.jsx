import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectItem } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Toast } from '@/components/ui/toast';

export default function TelaAgendamentos() {
  const [pesquisas, setPesquisas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisaSelecionada, setPesquisaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: '', type: 'success', visible: false }), 3000);
  };

  const carregarPesquisas = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

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
      if (error.response?.status === 401) navigate("/login");
      showToast("Erro ao buscar pesquisas", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPesquisas();
  }, []);

  const abrirModalAgendamento = (pesquisa) => {
    setPesquisaSelecionada(pesquisa);
    setModalAberto(true);
  };

  const excluirPesquisa = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!window.confirm("Tem certeza que deseja excluir esta pesquisa?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/pesquisa/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Pesquisa excluída com sucesso", "success");
      carregarPesquisas();
    } catch (error) {
      console.error("Erro ao excluir pesquisa", error);
      showToast("Erro ao excluir pesquisa", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] px-4">
        <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg border border-[#4caf50]">
          <h1 className="text-xl font-bold text-[#0077b6]">Agendamentos</h1>

          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {pesquisas.map(p => (
                <Card key={p.id} className="w-80 border border-[#0077b6] hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="font-semibold text-lg">{p.cliente_nome}</div>
                    <div>Status: <span className="font-medium capitalize">{p.status}</span></div>
                    <div>Tipo Período: {p.tipo_periodo}</div>
                    <div className="flex gap-2 mt-4">
                      <Button className="bg-[#0077b6] hover:bg-[#005f8d] text-white" onClick={() => navigate(`/pesquisa/${p.id}`)}>Editar</Button>
                      <Button className="bg-[#4caf50] hover:bg-[#388e3c] text-white" variant="secondary" onClick={() => abrirModalAgendamento(p)}>Agendar</Button>
                      <Button variant="destructive" onClick={() => excluirPesquisa(p.id)}>Excluir</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalAberto && pesquisaSelecionada && (
        <ModalOverlay>
          <ModalAgendamento pesquisa={pesquisaSelecionada} fechar={() => setModalAberto(false)} />
        </ModalOverlay>
      )}

      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </Layout>
  );
}

function ModalOverlay({ children }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#0077b6] w-full max-w-2xl mx-4 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalAgendamento({ pesquisa, fechar }) {
  const [diasSemana, setDiasSemana] = useState([]);
  const [horarios, setHorarios] = useState('');
  const [frequencia, setFrequencia] = useState('diario');
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setLoading(true);
    axios.get(`http://localhost:5000/api/pesquisa/${pesquisa.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const agendamento = res.data.data.agendamentos[0] || {};
      setDiasSemana(agendamento.dias_semana || []);
      setHorarios(agendamento.horarios || '');
      setFrequencia(agendamento.frequencia || 'diario');
      setAtivo(agendamento.ativo ?? true);
    }).catch(() => {
      console.error("Erro ao carregar agendamento");
    }).finally(() => {
      setLoading(false);
    });
  }, [pesquisa, navigate]);

  const salvar = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

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
      fechar();
    } catch (error) {
      console.error("Erro ao salvar agendamento", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDia = (dia) => {
    setDiasSemana(prev => prev.includes(dia)
      ? prev.filter(d => d !== dia)
      : [...prev, dia]);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold text-center text-[#0077b6] mb-4">
        Agendamento - {pesquisa.cliente_nome}
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="font-medium">Dias da Semana</label>
              <div className="grid grid-cols-3 gap-3">
                {["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"].map(dia => (
                  <Checkbox key={dia} checked={diasSemana.includes(dia)} onCheckedChange={() => toggleDia(dia)}>
                    {dia}
                  </Checkbox>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Horários</label>
              <Input value={horarios} onChange={e => setHorarios(e.target.value)} placeholder="Ex: 08:00, 14:00" />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Frequência</label>
              <Select value={frequencia} onValueChange={setFrequencia}>
                <SelectItem value="diario">Diário</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={ativo} onCheckedChange={setAtivo}>Ativo</Checkbox>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button className="tw-reset w-32 bg-[#4caf50] hover:bg-[#388e3c] text-white">Salvar</Button>
            <Button className="tw-reset w-32 bg-[#e53935] hover:bg-[#c62828] text-white" onClick={fechar}>Cancelar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
