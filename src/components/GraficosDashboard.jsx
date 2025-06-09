import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { dadosGraficos } from '../data/mockData';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Componente para exibir gráficos no dashboard
 * @param {Object} props - Propriedades do componente
 * @param {string} props.tipo - Tipo de gráfico a ser exibido ('preco', 'volume', 'ocupacao', 'categorias')
 * @returns {JSX.Element} Componente GraficosDashboard
 */
const GraficosDashboard = ({ tipo }) => {
  // Configurações comuns para tema claro/escuro
  const isDarkMode = document.documentElement.classList.contains('dark');
  const textColor = isDarkMode ? '#f3f4f6' : '#374151';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Opções comuns para todos os gráficos
  const opcoesComuns = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#f3f4f6' : '#111827',
        bodyColor: isDarkMode ? '#e5e7eb' : '#4b5563',
        borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        bodyFont: {
          family: 'Inter, sans-serif',
        },
        titleFont: {
          family: 'Inter, sans-serif',
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      },
      y: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      }
    }
  };

  // Gráfico de Preço Médio por Destino
  if (tipo === 'preco') {
    const data = {
      labels: dadosGraficos.precoMedioPorDestino.map(item => item.cidade),
      datasets: [
        {
          label: 'Preço Médio (R$)',
          data: dadosGraficos.precoMedioPorDestino.map(item => item.preco_medio),
          backgroundColor: '#2563eb',
          borderColor: '#1e40af',
          borderWidth: 1
        }
      ]
    };

    const opcoes = {
      ...opcoesComuns,
      plugins: {
        ...opcoesComuns.plugins,
        title: {
          display: true,
          text: 'Preço Médio por Destino',
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 'bold'
          }
        }
      }
    };

    return (
      <div className="h-80">
        <Bar data={data} options={opcoes} />
      </div>
    );
  }

  // Gráfico de Volume de Voos por Companhia
  if (tipo === 'volume') {
    const data = {
      labels: dadosGraficos.volumeVoosPorCompanhia.map(item => item.companhia),
      datasets: [
        {
          label: 'Quantidade de Voos',
          data: dadosGraficos.volumeVoosPorCompanhia.map(item => item.quantidade),
          backgroundColor: '#22c55e',
          borderColor: '#16a34a',
          borderWidth: 1
        }
      ]
    };

    const opcoes = {
      ...opcoesComuns,
      plugins: {
        ...opcoesComuns.plugins,
        title: {
          display: true,
          text: 'Volume de Voos por Companhia',
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 'bold'
          }
        }
      }
    };

    return (
      <div className="h-80">
        <Bar data={data} options={opcoes} />
      </div>
    );
  }

  // Gráfico de Ocupação por Mês
  if (tipo === 'ocupacao') {
    const data = {
      labels: dadosGraficos.ocupacaoPorMes.map(item => item.mes),
      datasets: [
        {
          label: 'Taxa de Ocupação (%)',
          data: dadosGraficos.ocupacaoPorMes.map(item => item.ocupacao),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };

    const opcoes = {
      ...opcoesComuns,
      plugins: {
        ...opcoesComuns.plugins,
        title: {
          display: true,
          text: 'Taxa de Ocupação por Mês',
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 'bold'
          }
        }
      }
    };

    return (
      <div className="h-80">
        <Line data={data} options={opcoes} />
      </div>
    );
  }

  // Gráfico de Distribuição de Categorias de Hotéis
  if (tipo === 'categorias') {
    const data = {
      labels: dadosGraficos.distribuicaoCategoriasHoteis.map(item => item.categoria),
      datasets: [
        {
          label: 'Quantidade de Hotéis',
          data: dadosGraficos.distribuicaoCategoriasHoteis.map(item => item.quantidade),
          backgroundColor: [
            '#2563eb', // Azul (primário)
            '#22c55e', // Verde (sucesso)
            '#eab308', // Amarelo
            '#f97316', // Laranja
            '#ef4444'  // Vermelho
          ],
          borderColor: [
            '#1e40af',
            '#16a34a',
            '#ca8a04',
            '#ea580c',
            '#dc2626'
          ],
          borderWidth: 1
        }
      ]
    };

    const opcoes = {
      ...opcoesComuns,
      plugins: {
        ...opcoesComuns.plugins,
        title: {
          display: true,
          text: 'Distribuição de Categorias de Hotéis',
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 'bold'
          }
        }
      }
    };

    return (
      <div className="h-80">
        <Pie data={data} options={opcoes} />
      </div>
    );
  }

  return <div>Tipo de gráfico não suportado</div>;
};

export default GraficosDashboard;
