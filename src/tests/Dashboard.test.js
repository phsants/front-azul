import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Dashboard from '../pages/Dashboard';
import { fetchVoos, getFilterOptionsFromAPI, fetchDadosGrafico, fetchIndicadores } from '../services/voosService';

// Mock dos módulos
jest.mock('axios');
jest.mock('../services/voosService');

describe('Dashboard com API Real', () => {
  beforeEach(() => {
    // Mock das funções da API
    fetchVoos.mockResolvedValue([
      {
        id: 1,
        origem: 'São Paulo',
        destino: 'Rio de Janeiro',
        data_ida: '15/06/2025',
        data_volta: '20/06/2025',
        companhia: 'LATAM',
        nome_hotel: 'Hotel Teste',
        tipo_quarto: 'Standard',
        categoria_hotel: '4',
        preco: 'R$ 1.500,00',
        preco_total_pacote: 'R$ 3.000,00',
        data_pesquisa: '30/05/2025'
      }
    ]);
    
    getFilterOptionsFromAPI.mockResolvedValue({
      origens: ['Todos', 'São Paulo', 'Rio de Janeiro'],
      destinos: ['Todos', 'Rio de Janeiro', 'Miami'],
      hoteis: ['Todos', 'Hotel Teste', 'Hotel Luxo'],
      companhias: ['Todos', 'LATAM', 'GOL'],
      conexoes: ['Todos', 'Direto', 'Com Conexão']
    });
    
    fetchDadosGrafico.mockImplementation((tipo) => {
      if (tipo === 'evolucao-precos') {
        return Promise.resolve({
          labels: ['01/05', '02/05', '03/05'],
          datasets: [{ label: 'São Paulo → Rio de Janeiro', data: [450, 470, 460] }]
        });
      }
      return Promise.resolve({});
    });
    
    fetchIndicadores.mockResolvedValue([
      { id: 1, titulo: 'Pesquisas Realizadas', valor: 1248, variacao: 12.5, periodo: 'vs mês anterior' }
    ]);
  });
  
  test('Carrega dados da API real ao inicializar', async () => {
    render(<Dashboard />);
    
    // Verificar se as funções da API foram chamadas
    await waitFor(() => {
      expect(fetchVoos).toHaveBeenCalled();
      expect(getFilterOptionsFromAPI).toHaveBeenCalled();
      expect(fetchDadosGrafico).toHaveBeenCalledWith('evolucao-precos');
      expect(fetchIndicadores).toHaveBeenCalled();
    });
    
    // Verificar se os dados foram renderizados
    await waitFor(() => {
      expect(screen.getByText('Dashboard de Viagens')).toBeInTheDocument();
      expect(screen.getByText('Pesquisas Realizadas')).toBeInTheDocument();
    });
  });
  
  test('Aplica filtros usando a API real', async () => {
    render(<Dashboard />);
    
    // Esperar carregamento inicial
    await waitFor(() => {
      expect(screen.getByText('Aplicar Filtros')).toBeInTheDocument();
    });
    
    // Simular aplicação de filtro
    const filtroButton = screen.getByText('Aplicar Filtros');
    userEvent.click(filtroButton);
    
    // Verificar se a API foi chamada com os filtros
    await waitFor(() => {
      expect(fetchVoos).toHaveBeenCalledTimes(2); // Uma vez no carregamento inicial, outra no filtro
    });
  });
});
