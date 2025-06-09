import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Guia de uso do Dashboard

const DashboardGuide = () => {
  // Dados de exemplo para os gráficos de demonstração
  const lineData = [
    { name: 'Jan', valor: 400 },
    { name: 'Fev', valor: 300 },
    { name: 'Mar', valor: 600 },
    { name: 'Abr', valor: 800 },
    { name: 'Mai', valor: 500 },
  ];

  const barData = [
    { name: 'Rio de Janeiro', valor: 450 },
    { name: 'Miami', valor: 3200 },
    { name: 'Lisboa', valor: 4100 },
    { name: 'Paris', valor: 4500 },
  ];

  const pieData = [
    { name: 'LATAM', value: 30, color: '#3182CE' },
    { name: 'GOL', value: 22, color: '#38B2AC' },
    { name: 'Azul', value: 18, color: '#4299E1' },
    { name: 'Outras', value: 30, color: '#A0AEC0' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Guia do Dashboard de Viagens
        </Typography>
        
        <Typography variant="body1" paragraph>
          O Dashboard de Viagens foi completamente redesenhado para oferecer uma experiência visual moderna e funcional, 
          permitindo análise detalhada de dados de pesquisas, preços e tendências de viagens.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Principais Funcionalidades
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            1. Filtros Dinâmicos
          </Typography>
          <Typography variant="body1" paragraph>
            O sistema de filtros foi organizado em duas seções:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Filtros Principais: Origem, Destino, Companhia Aérea e Faixa de Preço</li>
            <li>Filtros Avançados (expansíveis): Data de Saída, Tipo de Voo, Tempo de Voo, Categoria de Hotel, Nome do Hotel e ID de Pesquisa</li>
          </Typography>
          <Typography variant="body1" paragraph>
            Os filtros são aplicados dinamicamente e afetam todos os gráficos e tabelas do dashboard.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. Indicadores de Performance (KPIs)
          </Typography>
          <Typography variant="body1" paragraph>
            Cards de indicadores mostram métricas importantes como:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Pesquisas Realizadas</li>
            <li>Preço Médio</li>
            <li>Destinos Populares</li>
            <li>Economia Gerada</li>
          </Typography>
          <Typography variant="body1" paragraph>
            Cada indicador mostra o valor atual e a variação percentual em relação ao período anterior.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. Visualizações Gráficas
          </Typography>
          <Typography variant="body1" paragraph>
            O dashboard inclui múltiplas visualizações organizadas em abas:
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Evolução de Preços (Gráfico de Linha)
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="valor" stroke="#3182CE" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Preço Médio por Destino (Gráfico de Barras)
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valor" fill="#38B2AC" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Distribuição por Companhias (Gráfico de Pizza)
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. Tabela de Melhores Ofertas
          </Typography>
          <Typography variant="body1" paragraph>
            Uma tabela interativa exibe as melhores ofertas encontradas, com informações detalhadas sobre:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Origem e Destino</li>
            <li>Companhia Aérea</li>
            <li>Data de Viagem</li>
            <li>Preço e Economia</li>
          </Typography>
          <Typography variant="body1" paragraph>
            A tabela pode ser filtrada e ordenada por qualquer coluna.
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Melhorias Estruturais
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            1. Header
          </Typography>
          <Typography variant="body1" paragraph>
            O cabeçalho foi completamente redesenhado para:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Eliminar problemas de renderização e alinhamento</li>
            <li>Garantir responsividade em todos os dispositivos</li>
            <li>Melhorar a consistência visual com o tema da aplicação</li>
            <li>Otimizar o acesso a notificações e perfil do usuário</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. Sidebar
          </Typography>
          <Typography variant="body1" paragraph>
            A barra lateral foi refatorada para:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Eliminar duplicações de componentes</li>
            <li>Corrigir problemas de renderização e comportamento</li>
            <li>Melhorar a navegação entre as diferentes seções</li>
            <li>Garantir funcionamento correto nos estados aberto/fechado</li>
            <li>Adaptar-se corretamente a dispositivos móveis</li>
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Tecnologias Utilizadas
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Material UI: Para componentes de interface modernos e responsivos</li>
            <li>Recharts: Biblioteca especializada para visualizações gráficas</li>
            <li>React Context: Para gerenciamento de estado e tema</li>
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Próximos Passos
          </Typography>
          <Typography variant="body1" paragraph>
            O dashboard está preparado para:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Integração com API real quando disponível</li>
            <li>Implementação de funcionalidades adicionais</li>
            <li>Otimização de performance para grandes volumes de dados</li>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default DashboardGuide;
