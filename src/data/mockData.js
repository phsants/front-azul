// Dados mockados para o dashboard de viagens

// Lista de cidades
export const cidades = [
  { id: 1, nome: "São Paulo", estado: "SP", pais: "Brasil", codigo: "SAO" },
  { id: 2, nome: "Rio de Janeiro", estado: "RJ", pais: "Brasil", codigo: "RIO" },
  { id: 3, nome: "Belo Horizonte", estado: "MG", pais: "Brasil", codigo: "BHZ" },
  { id: 4, nome: "Salvador", estado: "BA", pais: "Brasil", codigo: "SSA" },
  { id: 5, nome: "Recife", estado: "PE", pais: "Brasil", codigo: "REC" },
  { id: 6, nome: "Fortaleza", estado: "CE", pais: "Brasil", codigo: "FOR" },
  { id: 7, nome: "Brasília", estado: "DF", pais: "Brasil", codigo: "BSB" },
  { id: 8, nome: "Porto Alegre", estado: "RS", pais: "Brasil", codigo: "POA" },
  { id: 9, nome: "Curitiba", estado: "PR", pais: "Brasil", codigo: "CWB" },
  { id: 10, nome: "Manaus", estado: "AM", pais: "Brasil", codigo: "MAO" },
];

// Lista de aeroportos
export const aeroportos = [
  { id: 1, nome: "Aeroporto Internacional de Guarulhos", codigo: "GRU", cidade_id: 1 },
  { id: 2, nome: "Aeroporto de Congonhas", codigo: "CGH", cidade_id: 1 },
  { id: 3, nome: "Aeroporto Internacional do Galeão", codigo: "GIG", cidade_id: 2 },
  { id: 4, nome: "Aeroporto Santos Dumont", codigo: "SDU", cidade_id: 2 },
  { id: 5, nome: "Aeroporto Internacional de Confins", codigo: "CNF", cidade_id: 3 },
  { id: 6, nome: "Aeroporto Internacional de Salvador", codigo: "SSA", cidade_id: 4 },
  { id: 7, nome: "Aeroporto Internacional do Recife", codigo: "REC", cidade_id: 5 },
  { id: 8, nome: "Aeroporto Internacional de Fortaleza", codigo: "FOR", cidade_id: 6 },
  { id: 9, nome: "Aeroporto Internacional de Brasília", codigo: "BSB", cidade_id: 7 },
  { id: 10, nome: "Aeroporto Internacional de Porto Alegre", codigo: "POA", cidade_id: 8 },
  { id: 11, nome: "Aeroporto Internacional de Curitiba", codigo: "CWB", cidade_id: 9 },
  { id: 12, nome: "Aeroporto Internacional de Manaus", codigo: "MAO", cidade_id: 10 },
];

// Lista de companhias aéreas
export const companhiasAereas = [
  { id: 1, nome: "LATAM Airlines", codigo: "LA" },
  { id: 2, nome: "GOL Linhas Aéreas", codigo: "G3" },
  { id: 3, nome: "Azul Linhas Aéreas", codigo: "AD" },
  { id: 4, nome: "Avianca Brasil", codigo: "O6" },
  { id: 5, nome: "American Airlines", codigo: "AA" },
  { id: 6, nome: "Delta Air Lines", codigo: "DL" },
  { id: 7, nome: "Emirates", codigo: "EK" },
  { id: 8, nome: "Air France", codigo: "AF" },
  { id: 9, nome: "KLM", codigo: "KL" },
  { id: 10, nome: "British Airways", codigo: "BA" },
];

// Lista de hotéis
export const hoteis = [
  { id: 1, nome: "Grand Hotel São Paulo", cidade_id: 1, categoria: 5, preco_diaria: 850 },
  { id: 2, nome: "Comfort Inn Guarulhos", cidade_id: 1, categoria: 3, preco_diaria: 320 },
  { id: 3, nome: "Copacabana Palace", cidade_id: 2, categoria: 5, preco_diaria: 1200 },
  { id: 4, nome: "Windsor Barra", cidade_id: 2, categoria: 4, preco_diaria: 450 },
  { id: 5, nome: "BH Palace Hotel", cidade_id: 3, categoria: 4, preco_diaria: 380 },
  { id: 6, nome: "Salvador Praia Hotel", cidade_id: 4, categoria: 4, preco_diaria: 420 },
  { id: 7, nome: "Recife Mar Hotel", cidade_id: 5, categoria: 5, preco_diaria: 520 },
  { id: 8, nome: "Fortaleza Atlantic Center", cidade_id: 6, categoria: 3, preco_diaria: 280 },
  { id: 9, nome: "Brasília Palace", cidade_id: 7, categoria: 4, preco_diaria: 390 },
  { id: 10, nome: "Porto Alegre Business", cidade_id: 8, categoria: 3, preco_diaria: 310 },
  { id: 11, nome: "Curitiba Executive", cidade_id: 9, categoria: 4, preco_diaria: 350 },
  { id: 12, nome: "Manaus Tropical", cidade_id: 10, categoria: 4, preco_diaria: 370 },
];

// Função para gerar data aleatória nos próximos 90 dias
const gerarDataAleatoria = () => {
  const hoje = new Date();
  const diasAleatorios = Math.floor(Math.random() * 90);
  const dataFutura = new Date(hoje);
  dataFutura.setDate(hoje.getDate() + diasAleatorios);
  return dataFutura.toISOString().split('T')[0];
};

// Função para gerar hora aleatória
const gerarHoraAleatoria = () => {
  const horas = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minutos = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${horas}:${minutos}`;
};

// Função para gerar duração de voo aleatória (entre 1h e 12h)
const gerarDuracaoVoo = () => {
  const horasTotal = Math.floor(Math.random() * 11) + 1;
  const minutos = Math.floor(Math.random() * 60);
  return `${String(horasTotal).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
};

// Função para gerar preço aleatório (entre 300 e 5000)
const gerarPreco = () => {
  return Math.floor(Math.random() * 4700) + 300;
};

// Gerar voos
export const voos = Array.from({ length: 100 }, (_, index) => {
  // Selecionar aeroportos de origem e destino diferentes
  let origemIndex = Math.floor(Math.random() * aeroportos.length);
  let destinoIndex = Math.floor(Math.random() * aeroportos.length);
  while (origemIndex === destinoIndex) {
    destinoIndex = Math.floor(Math.random() * aeroportos.length);
  }
  
  const origem = aeroportos[origemIndex];
  const destino = aeroportos[destinoIndex];
  const companhia = companhiasAereas[Math.floor(Math.random() * companhiasAereas.length)];
  const dataIda = gerarDataAleatoria();
  const horaPartida = gerarHoraAleatoria();
  const duracao = gerarDuracaoVoo();
  const preco = gerarPreco();
  
  // Determinar se tem conexão (30% de chance)
  const temConexao = Math.random() < 0.3;
  let conexoes = [];
  
  if (temConexao) {
    // Gerar de 1 a 2 conexões
    const numConexoes = Math.floor(Math.random() * 2) + 1;
    
    // Garantir que as conexões não sejam nem a origem nem o destino
    const aeroportosDisponiveis = aeroportos.filter(
      a => a.id !== origem.id && a.id !== destino.id
    );
    
    for (let i = 0; i < numConexoes && i < aeroportosDisponiveis.length; i++) {
      const conexaoIndex = Math.floor(Math.random() * aeroportosDisponiveis.length);
      conexoes.push({
        aeroporto: aeroportosDisponiveis[conexaoIndex],
        duracao_parada: `${Math.floor(Math.random() * 3) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      });
      
      // Remover o aeroporto já usado para evitar duplicatas
      aeroportosDisponiveis.splice(conexaoIndex, 1);
    }
  }
  
  // Determinar se inclui hospedagem (50% de chance)
  const incluiHospedagem = Math.random() < 0.5;
  let hospedagem = null;
  
  if (incluiHospedagem) {
    const hoteisDestino = hoteis.filter(h => h.cidade_id === destino.cidade_id);
    if (hoteisDestino.length > 0) {
      const hotel = hoteisDestino[Math.floor(Math.random() * hoteisDestino.length)];
      const diasEstadia = Math.floor(Math.random() * 10) + 1;
      
      hospedagem = {
        hotel,
        dias_estadia: diasEstadia,
        preco_total: hotel.preco_diaria * diasEstadia
      };
    }
  }
  
  return {
    id: index + 1,
    numero_voo: `${companhia.codigo}${Math.floor(Math.random() * 9000) + 1000}`,
    origem,
    destino,
    companhia,
    data_ida: dataIda,
    hora_partida: horaPartida,
    duracao,
    conexoes,
    preco_base: preco,
    taxa_embarque: Math.floor(preco * 0.1),
    preco_total: preco + Math.floor(preco * 0.1) + (hospedagem ? hospedagem.preco_total : 0),
    assentos_disponiveis: Math.floor(Math.random() * 50) + 10,
    hospedagem
  };
});

// Dados para os gráficos do dashboard
export const dadosGraficos = {
  precoMedioPorDestino: cidades.map(cidade => ({
    cidade: cidade.nome,
    preco_medio: Math.floor(Math.random() * 2000) + 500
  })),
  
  volumeVoosPorCompanhia: companhiasAereas.map(companhia => ({
    companhia: companhia.nome,
    quantidade: Math.floor(Math.random() * 500) + 100
  })),
  
  ocupacaoPorMes: [
    { mes: "Janeiro", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Fevereiro", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Março", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Abril", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Maio", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Junho", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Julho", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Agosto", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Setembro", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Outubro", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Novembro", ocupacao: Math.floor(Math.random() * 30) + 70 },
    { mes: "Dezembro", ocupacao: Math.floor(Math.random() * 30) + 70 }
  ],
  
  distribuicaoCategoriasHoteis: [
    { categoria: "5 estrelas", quantidade: Math.floor(Math.random() * 100) + 50 },
    { categoria: "4 estrelas", quantidade: Math.floor(Math.random() * 200) + 100 },
    { categoria: "3 estrelas", quantidade: Math.floor(Math.random() * 300) + 150 },
    { categoria: "2 estrelas", quantidade: Math.floor(Math.random() * 200) + 100 },
    { categoria: "1 estrela", quantidade: Math.floor(Math.random() * 100) + 50 }
  ]
};

// Dados para os KPIs do dashboard
export const kpis = [
  {
    id: 1,
    titulo: "Total de Voos",
    valor: voos.length,
    variacao: "+12%",
    positivo: true,
    icone: "plane"
  },
  {
    id: 2,
    titulo: "Preço Médio",
    valor: `R$ ${Math.floor(voos.reduce((acc, voo) => acc + voo.preco_total, 0) / voos.length)}`,
    variacao: "-5%",
    positivo: true,
    icone: "dollar-sign"
  },
  {
    id: 3,
    titulo: "Ocupação Média",
    valor: "78%",
    variacao: "+3%",
    positivo: true,
    icone: "users"
  },
  {
    id: 4,
    titulo: "Pacotes com Hotel",
    valor: voos.filter(voo => voo.hospedagem).length,
    variacao: "+8%",
    positivo: true,
    icone: "home"
  }
];

// Dados para pesquisas agendadas
export const pesquisasAgendadas = [
  {
    id: 1,
    origem: "São Paulo",
    destino: "Rio de Janeiro",
    data_ida: "2025-06-15",
    data_volta: "2025-06-20",
    frequencia: "Diária",
    ultima_execucao: "2025-05-21",
    proxima_execucao: "2025-05-22",
    status: "Ativo"
  },
  {
    id: 2,
    origem: "Belo Horizonte",
    destino: "Salvador",
    data_ida: "2025-07-10",
    data_volta: "2025-07-17",
    frequencia: "Semanal",
    ultima_execucao: "2025-05-15",
    proxima_execucao: "2025-05-22",
    status: "Ativo"
  },
  {
    id: 3,
    origem: "Brasília",
    destino: "Recife",
    data_ida: "2025-08-05",
    data_volta: "2025-08-12",
    frequencia: "Diária",
    ultima_execucao: "2025-05-21",
    proxima_execucao: "2025-05-22",
    status: "Ativo"
  },
  {
    id: 4,
    origem: "Porto Alegre",
    destino: "Manaus",
    data_ida: "2025-09-20",
    data_volta: "2025-09-27",
    frequencia: "Mensal",
    ultima_execucao: "2025-04-22",
    proxima_execucao: "2025-05-22",
    status: "Ativo"
  },
  {
    id: 5,
    origem: "Curitiba",
    destino: "Fortaleza",
    data_ida: "2025-10-15",
    data_volta: "2025-10-22",
    frequencia: "Semanal",
    ultima_execucao: "2025-05-15",
    proxima_execucao: "2025-05-22",
    status: "Pausado"
  }
];

// Dados de usuários para autenticação
export const usuarios = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@exemplo.com",
    senha: "admin123",
    role: "admin"
  },
  {
    id: 2,
    nome: "Usuário Teste",
    email: "usuario@exemplo.com",
    senha: "usuario123",
    role: "user"
  }
];
