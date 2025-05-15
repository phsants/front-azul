import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectItem } from '@/components/ui/select';

export default function TelaAgendamentos() {
  const [pesquisas, setPesquisas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisaSelecionada, setPesquisaSelecionada] = useState(null);
  const navigate = useNavigate();

  const carregarPesquisas = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const response = await axios.get("http://localhost:5000/api/pesquisa", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPesquisas(response.data.data);
      } else {
        console.error("Erro ao buscar pesquisas", response.data.error);
      }
    } catch (error) {
      console.error("Erro ao buscar pesquisas", error);
    }
  };

  useEffect(() => {
    carregarPesquisas();
  }, []);

  const rodarPesquisa = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    await axios.post(`http://localhost:5000/api/pesquisa/${id}/rodar`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    carregarPesquisas();
  };

  const excluirPesquisa = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!window.confirm("Tem certeza que deseja excluir esta pesquisa?")) return;

    await axios.delete(`http://localhost:5000/api/pesquisa/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    carregarPesquisas();
  };

  const abrirModalAgendamento = (pesquisa) => {
    setPesquisaSelecionada(pesquisa);
    setModalAberto(true);
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold">Agendamentos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pesquisas.map(p => (
          <Card key={p.id}>
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="font-semibold">{p.cliente_nome}</div>
              <div>Status: <span className="font-medium capitalize">{p.status}</span></div>
              <div>Tipo Período: {p.tipo_periodo}</div>

              <div className="flex gap-2 mt-2">
                <Button onClick={() => navigate(`/pesquisa/${p.id}`)}>Editar</Button>
                <Button variant="secondary" onClick={() => abrirModalAgendamento(p)}>Agendar</Button>
                <Button variant="destructive" onClick={() => excluirPesquisa(p.id)}>Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <ModalAgendamento pesquisa={pesquisaSelecionada} fechar={() => setModalAberto(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ModalAgendamento({ pesquisa, fechar }) {
  const [diasSemana, setDiasSemana] = useState([]);
  const [horarios, setHorarios] = useState('');
  const [frequencia, setFrequencia] = useState('diario');
  const [ativo, setAtivo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (pesquisa) {
      axios.get(`http://localhost:5000/api/pesquisa/${pesquisa.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        const agendamento = res.data.data.agendamentos[0] || {};
        setDiasSemana(agendamento.dias_semana || []);
        setHorarios(agendamento.horarios || '');
        setFrequencia(agendamento.frequencia || 'diario');
        setAtivo(agendamento.ativo ?? true);
      });
    }
  }, [pesquisa, navigate]);

  const salvar = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    await axios.post(`http://localhost:5000/api/pesquisa/${pesquisa.id}/agendamento`, {
      dias_semana: diasSemana,
      horarios,
      frequencia,
      ativo
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fechar();
  };

  const toggleDia = (dia) => {
    setDiasSemana(prev => prev.includes(dia)
      ? prev.filter(d => d !== dia)
      : [...prev, dia]);
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Agendamento - {pesquisa?.cliente_nome}</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Dias da Semana</label>
        <div className="flex gap-2 flex-wrap">
          {["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"].map(dia => (
            <Checkbox key={dia} checked={diasSemana.includes(dia)} onCheckedChange={() => toggleDia(dia)}>
              {dia}
            </Checkbox>
          ))}
        </div>

        <label className="font-medium">Horários</label>
        <Input value={horarios} onChange={e => setHorarios(e.target.value)} placeholder="Ex: 08:00, 14:00" />

        <label className="font-medium">Frequência</label>
        <Select value={frequencia} onValueChange={setFrequencia}>
          <SelectItem value="diario">Diário</SelectItem>
          <SelectItem value="semanal">Semanal</SelectItem>
        </Select>

        <div className="flex items-center gap-2">
          <Checkbox checked={ativo} onCheckedChange={setAtivo}>Ativo</Checkbox>
        </div>

        <div className="flex gap-2 justify-end mt-4">
          <Button onClick={salvar}>Salvar</Button>
          <Button variant="secondary" onClick={fechar}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
