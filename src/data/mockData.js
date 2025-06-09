// Dados mockados para o dashboard
export const mockData = {
  indicadores: [
    { id: 1, titulo: 'Pesquisas Realizadas', valor: 1248, variacao: 12.5, periodo: 'vs mês anterior' },
    { id: 2, titulo: 'Preço Médio', valor: 'R$ 2.567', variacao: -8.3, periodo: 'vs mês anterior' },
    { id: 3, titulo: 'Destinos Populares', valor: 42, variacao: 5.2, periodo: 'novos destinos' },
    { id: 4, titulo: 'Economia Gerada', valor: 'R$ 156.789', variacao: 23.7, periodo: 'vs mês anterior' },
  ],
  evolucaoPrecos: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Preço Médio 2025',
        data: [2100, 2300, 2500, 2400, 2200, 2600, 2800, 3000, 2900, 2700, 2500, 2400],
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Preço Médio 2024',
        data: [1900, 2100, 2300, 2200, 2000, 2400, 2600, 2800, 2700, 2500, 2300, 2200],
        borderColor: '#9F7AEA',
        backgroundColor: 'rgba(159, 122, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  },
  distribuicaoCompanhias: {
    labels: ['LATAM', 'GOL', 'Azul', 'Emirates', 'American Airlines', 'Outras'],
    datasets: [
      {
        data: [35, 25, 20, 10, 5, 5],
        backgroundColor: [
          '#3182CE', '#38B2AC', '#4299E1', '#9F7AEA', '#ED8936', '#A0AEC0'
        ],
        borderWidth: 1,
      },
    ],
  },
  destinosPopulares: {
    labels: ['São Paulo', 'Rio de Janeiro', 'Miami', 'Lisboa', 'Paris', 'Orlando'],
    datasets: [
      {
        label: 'Número de Pesquisas',
        data: [350, 290, 260, 240, 220, 200],
        backgroundColor: '#4FD1C5',
      },
    ],
  },
  voos: [
    { id: 1, origem: 'São Paulo', destino: 'Rio de Janeiro', companhia: 'LATAM', preco: 'R$ 450', data: '15/06/2025', economia: 'R$ 120' },
    { id: 2, origem: 'São Paulo', destino: 'Miami', companhia: 'American Airlines', preco: 'R$ 3.200', data: '22/06/2025', economia: 'R$ 850' },
    { id: 3, origem: 'Rio de Janeiro', destino: 'Lisboa', companhia: 'TAP', preco: 'R$ 4.100', data: '10/07/2025', economia: 'R$ 1.200' },
    { id: 4, origem: 'Brasília', destino: 'Paris', companhia: 'Air France', preco: 'R$ 4.500', data: '05/08/2025', economia: 'R$ 980' },
    { id: 5, origem: 'São Paulo', destino: 'Orlando', companhia: 'GOL', preco: 'R$ 3.800', data: '12/09/2025', economia: 'R$ 760' },
    { id: 6, origem: 'Recife', destino: 'Madrid', companhia: 'Iberia', preco: 'R$ 4.300', data: '18/10/2025', economia: 'R$ 1.050' },
    { id: 7, origem: 'Fortaleza', destino: 'Buenos Aires', companhia: 'Aerolíneas Argentinas', preco: 'R$ 2.100', data: '25/06/2025', economia: 'R$ 430' },
    { id: 8, origem: 'Belo Horizonte', destino: 'Santiago', companhia: 'LATAM', preco: 'R$ 2.400', data: '30/07/2025', economia: 'R$ 520' },
  ],
  filtros: {
    origens: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Recife', 'Fortaleza', 'Belo Horizonte'],
    destinos: ['Rio de Janeiro', 'Miami', 'Lisboa', 'Paris', 'Orlando', 'Madrid', 'Buenos Aires', 'Santiago'],
    companhias: ['LATAM', 'GOL', 'Azul', 'American Airlines', 'Emirates', 'TAP', 'Air France', 'Iberia', 'Aerolíneas Argentinas'],
    periodos: ['Próximos 30 dias', 'Próximos 60 dias', 'Próximos 90 dias', 'Personalizado'],
    tiposVoo: ['Direto', '1 Conexão', '2+ Conexões']
  }
};

// Função para simular uma API que retorna os dados mockados
export const fetchMockData = (endpoint, params = {}) => {
  return new Promise((resolve) => {
    // Simula um delay de rede
    setTimeout(() => {
      switch (endpoint) {
        case 'indicadores':
          resolve(mockData.indicadores);
          break;
        case 'evolucao-precos':
          resolve(mockData.evolucaoPrecos);
          break;
        case 'distribuicao-companhias':
          resolve(mockData.distribuicaoCompanhias);
          break;
        case 'destinos-populares':
          resolve(mockData.destinosPopulares);
          break;
        case 'voos':
          // Simula filtragem de voos
          let voosFiltrados = [...mockData.voos];
          
          if (params.origem) {
            voosFiltrados = voosFiltrados.filter(voo => 
              voo.origem.toLowerCase().includes(params.origem.toLowerCase())
            );
          }
          
          if (params.destino) {
            voosFiltrados = voosFiltrados.filter(voo => 
              voo.destino.toLowerCase().includes(params.destino.toLowerCase())
            );
          }
          
          if (params.companhia) {
            voosFiltrados = voosFiltrados.filter(voo => 
              voo.companhia.toLowerCase().includes(params.companhia.toLowerCase())
            );
          }
          
          resolve(voosFiltrados);
          break;
        case 'filtros':
          resolve(mockData.filtros);
          break;
        default:
          resolve(mockData);
      }
    }, 800); // Delay de 800ms para simular tempo de resposta da API
  });
};
