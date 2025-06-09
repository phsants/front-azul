import { formatarData, formatarPreco, formatarNomeHotel, mapearTipoQuarto } from '../utils/formatters';
import dayjs from 'dayjs';
// URL base da API de hotéis (sem o domínio, apenas o path)
const API_BASE_URL = 'http://localhost:5000';
const API_HOTEIS_ENDPOINT = '/api/hoteis';
const API_VOOS_ENDPOINT = '/api/voos';

/**
 * Extrai o valor numérico de uma string formatada como preço
 * @param {string|number} precoFormatado - Preço formatado (ex: "R$ 1.234,56" ou 1234.56)
 * @returns {number} - Valor numérico do preço
 */
export function extrairValorNumerico(precoFormatado) {
  if (typeof precoFormatado === 'number') return precoFormatado;
  
  if (!precoFormatado || typeof precoFormatado !== 'string') return 0;
  
  // Remove símbolos de moeda, pontos de milhar e converte vírgula decimal para ponto
  return parseFloat(precoFormatado.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}
/**
 * Conta o número total de conexões (ida + volta)
 * @param {Object} vooData - Objeto contendo arrays 'ida' e 'volta'
 * @returns {number} - Número total de conexões
 */
function contarConexoes(vooData) {
  if (!vooData || typeof vooData !== 'object') return 0;

  const conexoesIda = Array.isArray(vooData.ida) ? vooData.ida.length - 1 : 0;
  const conexoesVolta = Array.isArray(vooData.volta) ? vooData.volta.length - 1 : 0;

  return conexoesIda + conexoesVolta;
  console.log('Qtd trechos ida:', vooData.ida?.length, 'volta:', vooData.volta?.length);
}

const converterDataParaISO = (dataInput) => {
  if (!dataInput) return '';

  // Se for string no formato DD/MM/YYYY, converte corretamente
  if (typeof dataInput === 'string' && dataInput.includes('/')) {
    const [dia, mes, ano] = dataInput.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  // Se for objeto dayjs válido
  if (dayjs.isDayjs(dataInput)) {
    return dataInput.format('YYYY-MM-DD');
  }

  // Se for Date ou outro objeto válido
  const parsed = dayjs(dataInput);
  return parsed.isValid() ? parsed.format('YYYY-MM-DD') : '';
};
/**
 * Busca dados de hotéis da API real
 * @param {Object} filtros - Objeto com filtros a serem aplicados
 * @returns {Promise<Array>} - Array de hotéis formatados
 */
export async function fetchHoteis(filtros = {}) {
  try {
    const token = localStorage.getItem("token");
    // Preparar parâmetros de consulta com base nos filtros
    const params = new URLSearchParams();

    // Mapear filtros do frontend para parâmetros da API
    if (filtros.origem && filtros.origem.length > 0) {
      // Suportar múltiplas origens
      filtros.origem.forEach(origem => {
        params.append('origem', origem);
      });
    }
    
    if (filtros.destino && filtros.destino.length > 0) {
      // Suportar múltiplos destinos
      filtros.destino.forEach(destino => {
        params.append('destino', destino);
      });
    }
    
    if (filtros.nomeHotel && filtros.nomeHotel.length > 0) {
      // Suportar múltiplos hotéis
      filtros.nomeHotel.forEach(hotel => {
        params.append('nome_hotel', hotel);
      });
    }
    
    if (filtros.faixaPreco && Array.isArray(filtros.faixaPreco) && filtros.faixaPreco.length === 2) {
      params.append('preco_min', filtros.faixaPreco[0]);
      params.append('preco_max', filtros.faixaPreco[1]);
    }
    
    if (filtros.conexoes) {
      params.append('conexoes', filtros.conexoes === 'Direto' ? 'direto' : 'conexao');
    }
    
    if (filtros.dataInicio) {
      params.append('data_inicio', converterDataParaISO(filtros.dataInicio));
    }

    if (filtros.dataFim) {
      params.append('data_fim', converterDataParaISO(filtros.dataFim));
    }
    
    // Construir endpoint com query params
    const endpoint = `${API_BASE_URL}${API_HOTEIS_ENDPOINT}${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Buscando hotéis no endpoint:', endpoint);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Dados recebidos da API:', data);
    
    // Formatar dados recebidos
    const hoteisFormatados = data.map(hotel => {
      // Extrair o valor numérico do preço para uso em ordenações e filtros
      const precoTotalNumerico = extrairValorNumerico(hotel.preco_total_pacote);
      const precoPorPessoaNumerico = extrairValorNumerico(hotel.preco_por_pessoa);
      
      return {
        id: hotel.id || `hotel-${Math.random().toString(36).substr(2, 9)}`,
        id_execucao: hotel.id_execucao,
        origem: hotel.origem || 'Não informado',
        destino: hotel.destino || 'Não informado',
        data_ida: formatarData(hotel.data_ida),
        data_volta: formatarData(hotel.data_volta),
        nome_hotel: formatarNomeHotel(hotel.nome_hotel),
        tipo_quarto: mapearTipoQuarto(hotel.tipo_quarto),
        refeicao: hotel.refeicao || 'Não informado',
        preco_total_pacote: formatarPreco(hotel.preco_total_pacote),
        preco_total_numerico: precoTotalNumerico, // Valor numérico para ordenação e filtros
        preco_por_pessoa: formatarPreco(hotel.preco_por_pessoa),
        preco_pessoa_numerico: precoPorPessoaNumerico, // Valor numérico para ordenação e filtros
        data_pesquisa: formatarData(hotel.data_pesquisa)
      };
    });
    console.log('Hoteis formatados:', hoteisFormatados);
    // Aplicar filtro de preço localmente se necessário
    // Isso garante que o filtro funcione mesmo que a API não suporte
    //if (filtros.faixaPreco && Array.isArray(filtros.faixaPreco) && filtros.faixaPreco.length === 2) {
    //  const precoMin = filtros.faixaPreco[0];
    //  const precoMax = filtros.faixaPreco[1];

    //  return hoteisFormatados.filter(hotel => {
    //    const preco = hotel.preco_total_numerico; // já está em reais
    //    return preco >= precoMin && preco <= precoMax;
    //  });
    //}
    // Enriquecer hotéis com quantidade de conexões (fetchDetalhesVoo por id_execucao)
    for (const hotel of hoteisFormatados) {
      try {
        const vooData = await fetchDetalhesVoo(hotel.id_execucao); // <-- Aqui você está buscando os voos
        hotel.conexoes = contarConexoes(vooData); // <-- Aqui você está contando as conexões
        hotel.tipo_conexao = hotel.conexoes === 0 ? 'Direto' : 'Com Conexão'; // <-- E classificando
      } catch (err) {
        console.error(`Erro ao contar conexões para hotel ${hotel.nome_hotel}`, err);
        hotel.conexoes = 0;
        hotel.tipo_conexao = 'Desconhecido';
      }
    }

    return hoteisFormatados;
  } catch (error) {
    console.error('Erro ao buscar hotéis da API:', error);
    // Em caso de erro, retornar array vazio
    return [];
  }
}

/**
 * Busca detalhes de um voo específico pelo ID de execução
 * @param {string} idExecucao - ID de execução do voo
 * @returns {Promise<Object>} - Detalhes do voo
 */
export async function fetchDetalhesVoo(idExecucao) {
  try {
    if (!idExecucao) {
      throw new Error('ID de execução não fornecido');
    }
    const token = localStorage.getItem("token");

    // Construir endpoint para detalhes do voo
    const endpoint = `${API_BASE_URL}${API_VOOS_ENDPOINT}/${idExecucao}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Buscando detalhes do voo no endpoint:', endpoint);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Dados de voo recebidos da API:', data);
    
    // Retornar os dados conforme recebidos da API
    return data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do voo ${idExecucao}:`, error);
    return null;
  }
}

/**
 * Busca opções para os filtros a partir da API real
 * @returns {Promise<Object>} - Objeto com opções para os filtros
 */
export async function getFilterOptionsFromAPI() {
  try {
    const token = localStorage.getItem("token");

    // Buscar todos os hotéis para extrair opções de filtro
    const endpoint = `${API_BASE_URL}${API_HOTEIS_ENDPOINT}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Buscando opções de filtro no endpoint:', endpoint);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Dados para opções de filtro recebidos:', data);
    
    // Extrair valores únicos para cada filtro
    const origens = [...new Set(data.map(hotel => hotel.origem).filter(Boolean))].sort();
    const destinos = [...new Set(data.map(hotel => hotel.destino).filter(Boolean))].sort();
    const hoteis = [...new Set(data.map(hotel => hotel.nome_hotel).filter(Boolean))].sort();
    const conexoes = ['Direto', 'Com Conexão'];
    
    // Adicionar opção "Todos" no início de cada lista
    return {
      origens: ['Todos', ...origens],
      destinos: ['Todos', ...destinos],
      hoteis: ['Todos', ...hoteis],
      hoteisCompletos: data,
      conexoes: ['Todos', ...conexoes]
    };
  } catch (error) {
    console.error('Erro ao buscar opções de filtro da API:', error);
    // Em caso de erro, retornar objeto vazio
    return {
      origens: ['Todos'],
      destinos: ['Todos'],
      hoteis: ['Todos'],
      conexoes: ['Todos', 'Direto', 'Com Conexão']
    };
  }
}

/**
 * Filtra localmente os dados com base nos filtros selecionados
 * Útil quando a API não suporta todos os tipos de filtros
 * @param {Array} hoteis - Array de hotéis a serem filtrados
 * @param {Object} filtros - Objeto com filtros a serem aplicados
 * @returns {Array} - Array de hotéis filtrados
 */
export function filtrarHoteisLocalmente(hoteis, filtros) {
  if (!filtros || Object.keys(filtros).length === 0) {
    return hoteis;
  }
  
  return hoteis.filter(hotel => {
    // Filtrar por origem (múltiplas)
    if (filtros.origem && filtros.origem.length > 0 && !filtros.origem.includes(hotel.origem)) {
      return false;
    }
    
    // Filtrar por destino (múltiplos)
    if (filtros.destino && filtros.destino.length > 0 && !filtros.destino.includes(hotel.destino)) {
      return false;
    }
    
    // Filtrar por nome do hotel (múltiplos)
    if (filtros.nomeHotel && filtros.nomeHotel.length > 0) {
      // Verificar se o nome do hotel contém algum dos termos de busca
      const hotelMatch = filtros.nomeHotel.some(termo => 
        hotel.nome_hotel && hotel.nome_hotel.toLowerCase().includes(termo.toLowerCase())
      );
      if (!hotelMatch) return false;
    }
    
    // Filtrar por faixa de preço - usando o valor numérico diretamente
    if (filtros.faixaPreco && Array.isArray(filtros.faixaPreco) && filtros.faixaPreco.length === 2) {
      // Usar o campo preco_total_numerico se disponível, ou extrair o valor
      const preco = hotel.preco_total_numerico !== undefined 
        ? hotel.preco_total_numerico 
        : extrairValorNumerico(hotel.preco_total_pacote);
        
      if (preco < filtros.faixaPreco[0] || preco > filtros.faixaPreco[1]) {
        return false;
      }
    }
    
    // Filtrar por data de ida
    if (filtros.dataInicio) {
      const dataIda = new Date(hotel.data_ida.split('/').reverse().join('-'));
      const dataInicio = new Date(filtros.dataInicio.split('/').reverse().join('-'));
      if (dataIda < dataInicio) {
        return false;
      }
    }
    
    // Filtrar por data de volta
    if (filtros.dataFim) {
      const dataVolta = new Date(hotel.data_volta.split('/').reverse().join('-'));
      const dataFim = new Date(filtros.dataFim.split('/').reverse().join('-'));
      if (dataVolta > dataFim) {
        return false;
      }
    }

    if (filtros.conexoes === 'Direto' && hotel.conexoes > 0) {
      return false;
    }
    if (filtros.conexoes === 'Com Conexão' && hotel.conexoes === 0) {
      return false;
    }

    return true;
  });
}

/**
 * Ordena hotéis por preço total (crescente ou decrescente)
 * @param {Array} hoteis - Array de hotéis a serem ordenados
 * @param {string} direcao - Direção da ordenação ('asc' ou 'desc')
 * @returns {Array} - Array de hotéis ordenados
 */
export function ordenarHoteisPorPreco(hoteis, direcao = 'asc') {
  return [...hoteis].sort((a, b) => {
    // Usar o campo preco_total_numerico se disponível, ou extrair o valor
    const precoA = a.preco_total_numerico !== undefined 
      ? a.preco_total_numerico 
      : extrairValorNumerico(a.preco_total_pacote);
      
    const precoB = b.preco_total_numerico !== undefined 
      ? b.preco_total_numerico 
      : extrairValorNumerico(b.preco_total_pacote);
    
    return direcao === 'asc' ? precoA - precoB : precoB - precoA;
  });
}

/**
 * Busca dados para os gráficos do dashboard
 * @param {string} tipoGrafico - Tipo de gráfico a ser buscado
 * @returns {Promise<Object>} - Dados formatados para o gráfico
 */
export async function fetchDadosGrafico(tipoGrafico) {
  try {
    // Buscar todos os hotéis para gerar dados dos gráficos
    const endpoint = `${API_BASE_URL}${API_HOTEIS_ENDPOINT}`;
    const response = await fetch(endpoint);
    const hoteis = await response.json();
    
    switch (tipoGrafico) {
      case 'evolucao-precos':
        return gerarDadosEvolucaoPrecos(hoteis);
      case 'distribuicao-companhias':
        return gerarDadosDistribuicaoCompanhias(hoteis);
      case 'media-precos-destino':
        return gerarDadosMediaPrecosPorDestino(hoteis);
      case 'comparativo-voos-diretos':
        return gerarDadosComparativoVoosDiretos(hoteis);
      default:
        throw new Error(`Tipo de gráfico não suportado: ${tipoGrafico}`);
    }
  } catch (error) {
    console.error(`Erro ao buscar dados para o gráfico ${tipoGrafico}:`, error);
    // Em caso de erro, retornar objeto vazio
    return {};
  }
}

/**
 * Gera dados para o gráfico de evolução de preços
 * @param {Array} hoteis - Array de hotéis
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosEvolucaoPrecos(hoteis) {
  // Implementação omitida para brevidade
  return { labels: [], datasets: [] };
}

/**
 * Gera dados para o gráfico de distribuição de companhias
 * @param {Array} hoteis - Array de hotéis
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosDistribuicaoCompanhias(hoteis) {
  // Implementação omitida para brevidade
  return { labels: [], datasets: [] };
}

/**
 * Gera dados para o gráfico de média de preços por destino
 * @param {Array} hoteis - Array de hotéis
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosMediaPrecosPorDestino(hoteis) {
  // Implementação omitida para brevidade
  return { labels: [], datasets: [] };
}

/**
 * Gera dados para o gráfico comparativo de voos diretos vs com conexão
 * @param {Array} hoteis - Array de hotéis
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosComparativoVoosDiretos(hoteis) {
  // Implementação omitida para brevidade
  return { labels: [], datasets: [] };
}

/**
 * Busca indicadores para o dashboard
 * @returns {Promise<Array>} - Array de indicadores
 */
export async function fetchIndicadores() {
  try {
    const token = localStorage.getItem("token");
    // Buscar todos os hotéis para gerar indicadores
    const endpoint = `${API_BASE_URL}${API_HOTEIS_ENDPOINT}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const hoteis = await response.json();
    
    // Calcular indicadores
    const totalPesquisas = hoteis.length;
    const precoMedio = calcularPrecoMedio(hoteis);
    const economiaMedia = calcularEconomiaMedia(hoteis);
    const taxaConversao = calcularTaxaConversao(hoteis);
    
    return [
      {
        id: 'total-pesquisas',
        titulo: 'Total de Pesquisas',
        valor: totalPesquisas.toString(),
        variacao: 12.5,
        periodo: 'último mês'
      },
      {
        id: 'preco-medio',
        titulo: 'Preço Médio',
        valor: formatarPreco(precoMedio),
        variacao: -5.2,
        periodo: 'último mês'
      },
      {
        id: 'economia-media',
        titulo: 'Economia Média',
        valor: formatarPreco(economiaMedia),
        variacao: 8.7,
        periodo: 'último mês'
      },
      {
        id: 'taxa-conversao',
        titulo: 'Taxa de Conversão',
        valor: `${taxaConversao.toFixed(1)}%`,
        variacao: 3.2,
        periodo: 'último mês'
      }
    ];
  } catch (error) {
    console.error('Erro ao buscar indicadores:', error);
    // Em caso de erro, retornar array vazio
    return [];
  }
}

// Funções auxiliares para cálculo de indicadores
function calcularPrecoMedio(hoteis) {
  if (hoteis.length === 0) return 0;
  
  const total = hoteis.reduce((sum, hotel) => {
    const preco = extrairValorNumerico(hotel.preco_total_pacote);
    return sum + preco;
  }, 0);
  
  return total / hoteis.length;
}

function calcularEconomiaMedia(hoteis) {
  // Simulação de economia média (20% do preço médio)
  return calcularPrecoMedio(hoteis) * 0.2;
}

function calcularTaxaConversao(hoteis) {
  // Simulação de taxa de conversão (entre 2% e 5%)
  return 2 + Math.random() * 3;
}
