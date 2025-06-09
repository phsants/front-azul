import { fetchWithFallbackProxy } from './proxyService';
import { formatarData, formatarPreco, formatarNomeHotel, mapearTipoQuarto, formatarCategoriaHotel } from '../utils/formatters';

// URL base da API de voos (sem o domínio, apenas o path)
const API_ENDPOINT = '/api/voos';

/**
 * Busca dados de voos da API real
 * @param {Object} filtros - Objeto com filtros a serem aplicados
 * @returns {Promise<Array>} - Array de voos formatados
 */
export async function fetchVoos(filtros = {}) {
  try {
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
      params.append('hotel', 'true');
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
      params.append('data_ida', filtros.dataInicio);
    }
    
    if (filtros.dataFim) {
      params.append('data_volta', filtros.dataFim);
    }
    
    // Construir endpoint com query params
    const endpoint = `${API_ENDPOINT}${params.toString() ? '?' + params.toString() : ''}`;
    
    // Fazer requisição à API usando o proxy
    const response = await fetchWithFallbackProxy(endpoint);
    
    // Formatar dados recebidos
    const voosFormatados = response.map(voo => ({
      id: voo.id,
      id_execucao: voo.id_execucao,
      origem: voo.origem || 'Não informado',
      destino: voo.destino || 'Não informado',
      data_ida: formatarData(voo.data_ida),
      data_volta: formatarData(voo.data_volta),
      companhia: voo.companhia || 'Não informado',
      nome_hotel: formatarNomeHotel(voo.nome_hotel),
      tipo_quarto: mapearTipoQuarto(voo.apartamento),
      categoria_hotel: formatarCategoriaHotel(voo.categoria_hotel),
      preco: formatarPreco(voo.preco),
      preco_total_pacote: formatarPreco(voo.preco_total_pacote),
      data_pesquisa: formatarData(voo.data_pesquisa),
      qtd_conexoes: voo.qtd_conexoes || 0,
      tempo_voo: voo.tempo_voo ? `${Math.floor(voo.tempo_voo / 60)}h ${voo.tempo_voo % 60}m` : 'Não informado',
      cliente_nome: voo.cliente_nome || 'Não informado'
    }));
    
    return voosFormatados;
  } catch (error) {
    console.error('Erro ao buscar voos da API:', error);
    // Em caso de erro, retornar array vazio
    return [];
  }
}

/**
 * Busca opções para os filtros a partir da API real
 * @returns {Promise<Object>} - Objeto com opções para os filtros
 */
export async function getFilterOptionsFromAPI() {
  try {
    // Buscar todos os voos para extrair opções de filtro usando o proxy
    const response = await fetchWithFallbackProxy(API_ENDPOINT);
    
    // Extrair valores únicos para cada filtro
    const origens = [...new Set(response.map(voo => voo.origem).filter(Boolean))].sort();
    const destinos = [...new Set(response.map(voo => voo.destino).filter(Boolean))].sort();
    const hoteis = [...new Set(response.map(voo => voo.nome_hotel).filter(Boolean))].sort();
    const companhias = [...new Set(response.map(voo => voo.companhia).filter(Boolean))].sort();
    const conexoes = ['Direto', 'Com Conexão'];
    
    // Adicionar opção "Todos" no início de cada lista
    return {
      origens: ['Todos', ...origens],
      destinos: ['Todos', ...destinos],
      hoteis: ['Todos', ...hoteis],
      companhias: ['Todos', ...companhias],
      conexoes: ['Todos', ...conexoes]
    };
  } catch (error) {
    console.error('Erro ao buscar opções de filtro da API:', error);
    // Em caso de erro, retornar objeto vazio
    return {
      origens: ['Todos'],
      destinos: ['Todos'],
      hoteis: ['Todos'],
      companhias: ['Todos'],
      conexoes: ['Todos', 'Direto', 'Com Conexão']
    };
  }
}

/**
 * Filtra localmente os dados com base nos filtros selecionados
 * Útil quando a API não suporta todos os tipos de filtros
 * @param {Array} voos - Array de voos a serem filtrados
 * @param {Object} filtros - Objeto com filtros a serem aplicados
 * @returns {Array} - Array de voos filtrados
 */
export function filtrarVoosLocalmente(voos, filtros) {
  if (!filtros || Object.keys(filtros).length === 0) {
    return voos;
  }
  
  return voos.filter(voo => {
    // Filtrar por origem (múltiplas)
    if (filtros.origem && filtros.origem.length > 0 && !filtros.origem.includes(voo.origem)) {
      return false;
    }
    
    // Filtrar por destino (múltiplos)
    if (filtros.destino && filtros.destino.length > 0 && !filtros.destino.includes(voo.destino)) {
      return false;
    }
    
    // Filtrar por nome do hotel (múltiplos)
    if (filtros.nomeHotel && filtros.nomeHotel.length > 0) {
      // Verificar se o nome do hotel contém algum dos termos de busca
      const hotelMatch = filtros.nomeHotel.some(termo => 
        voo.nome_hotel && voo.nome_hotel.toLowerCase().includes(termo.toLowerCase())
      );
      if (!hotelMatch) return false;
    }
    
    // Filtrar por faixa de preço
    if (filtros.faixaPreco && Array.isArray(filtros.faixaPreco) && filtros.faixaPreco.length === 2) {
      const preco = parseFloat(voo.preco_total_pacote.replace(/[^\d,]/g, '').replace(',', '.'));
      if (preco < filtros.faixaPreco[0] || preco > filtros.faixaPreco[1]) {
        return false;
      }
    }
    
    // Filtrar por conexões
    if (filtros.conexoes) {
      if (filtros.conexoes === 'Direto' && voo.qtd_conexoes > 0) {
        return false;
      }
      if (filtros.conexoes === 'Com Conexão' && voo.qtd_conexoes === 0) {
        return false;
      }
    }
    
    // Filtrar por data de ida
    if (filtros.dataInicio) {
      const dataIda = new Date(voo.data_ida.split('/').reverse().join('-'));
      const dataInicio = new Date(filtros.dataInicio.split('/').reverse().join('-'));
      if (dataIda < dataInicio) {
        return false;
      }
    }
    
    // Filtrar por data de volta
    if (filtros.dataFim) {
      const dataVolta = new Date(voo.data_volta.split('/').reverse().join('-'));
      const dataFim = new Date(filtros.dataFim.split('/').reverse().join('-'));
      if (dataVolta > dataFim) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Busca dados para os gráficos do dashboard
 * @param {string} tipoGrafico - Tipo de gráfico a ser buscado
 * @returns {Promise<Object>} - Dados formatados para o gráfico
 */
export async function fetchDadosGrafico(tipoGrafico) {
  try {
    // Buscar todos os voos para gerar dados dos gráficos usando o proxy
    const response = await fetchWithFallbackProxy(API_ENDPOINT);
    const voos = response;
    
    switch (tipoGrafico) {
      case 'evolucao-precos':
        return gerarDadosEvolucaoPrecos(voos);
      case 'distribuicao-companhias':
        return gerarDadosDistribuicaoCompanhias(voos);
      case 'media-precos-destino':
        return gerarDadosMediaPrecosPorDestino(voos);
      case 'comparativo-voos-diretos':
        return gerarDadosComparativoVoosDiretos(voos);
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
 * @param {Array} voos - Array de voos
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosEvolucaoPrecos(voos) {
  // Agrupar voos por data de pesquisa
  const voosPorData = voos.reduce((acc, voo) => {
    const data = voo.data_pesquisa ? new Date(voo.data_pesquisa).toLocaleDateString('pt-BR') : 'Desconhecido';
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(voo);
    return acc;
  }, {});
  
  // Obter rotas mais populares
  const rotas = {};
  voos.forEach(voo => {
    const rota = `${voo.origem} → ${voo.destino}`;
    if (!rotas[rota]) {
      rotas[rota] = 0;
    }
    rotas[rota]++;
  });
  
  // Selecionar as 3 rotas mais populares
  const rotasPopulares = Object.entries(rotas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([rota]) => rota);
  
  // Calcular preço médio por rota e data
  const labels = Object.keys(voosPorData).sort((a, b) => new Date(a) - new Date(b));
  const datasets = rotasPopulares.map((rota, index) => {
    const [origem, destino] = rota.split(' → ');
    const data = labels.map(data => {
      const voosDaRota = voosPorData[data]?.filter(voo => 
        voo.origem === origem && voo.destino === destino
      ) || [];
      
      if (voosDaRota.length === 0) return null;
      
      const precoMedio = voosDaRota.reduce((sum, voo) => 
        sum + (parseFloat(voo.preco_total_pacote) || 0), 0
      ) / voosDaRota.length;
      
      return precoMedio;
    });
    
    // Cores para os datasets
    const cores = ['#3182CE', '#9F7AEA', '#38B2AC'];
    
    return {
      label: rota,
      data,
      borderColor: cores[index],
      backgroundColor: `${cores[index]}1A`, // Adiciona transparência
      tension: 0.4,
      fill: true,
    };
  });
  
  return { labels, datasets };
}

/**
 * Gera dados para o gráfico de distribuição de companhias
 * @param {Array} voos - Array de voos
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosDistribuicaoCompanhias(voos) {
  // Contar voos por companhia
  const companhias = voos.reduce((acc, voo) => {
    const companhia = voo.companhia || 'Não informado';
    if (!acc[companhia]) {
      acc[companhia] = 0;
    }
    acc[companhia]++;
    return acc;
  }, {});
  
  // Ordenar por quantidade e limitar a 8 companhias + "Outras"
  const companhiasOrdenadas = Object.entries(companhias)
    .sort((a, b) => b[1] - a[1]);
  
  let labels = [];
  let data = [];
  
  if (companhiasOrdenadas.length <= 8) {
    labels = companhiasOrdenadas.map(([companhia]) => companhia);
    data = companhiasOrdenadas.map(([, count]) => count);
  } else {
    const principaisCompanhias = companhiasOrdenadas.slice(0, 8);
    const outrasCompanhias = companhiasOrdenadas.slice(8);
    
    labels = [...principaisCompanhias.map(([companhia]) => companhia), 'Outras'];
    data = [
      ...principaisCompanhias.map(([, count]) => count),
      outrasCompanhias.reduce((sum, [, count]) => sum + count, 0)
    ];
  }
  
  // Cores para o gráfico
  const cores = [
    '#3182CE', '#38B2AC', '#4299E1', '#9F7AEA', 
    '#ED8936', '#F6AD55', '#F56565', '#805AD5', '#A0AEC0'
  ];
  
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: cores.slice(0, labels.length),
      borderWidth: 1,
    }]
  };
}

/**
 * Gera dados para o gráfico de média de preços por destino
 * @param {Array} voos - Array de voos
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosMediaPrecosPorDestino(voos) {
  // Calcular preço médio por destino
  const destinosPrecos = voos.reduce((acc, voo) => {
    const destino = voo.destino || 'Não informado';
    if (!acc[destino]) {
      acc[destino] = { total: 0, count: 0 };
    }
    
    const preco = parseFloat(voo.preco_total_pacote) || 0;
    if (preco > 0) {
      acc[destino].total += preco;
      acc[destino].count++;
    }
    
    return acc;
  }, {});
  
  // Calcular média e ordenar por preço
  const destinosMedia = Object.entries(destinosPrecos)
    .map(([destino, { total, count }]) => ({
      destino,
      media: count > 0 ? total / count : 0
    }))
    .filter(item => item.media > 0)
    .sort((a, b) => b.media - a.media)
    .slice(0, 8); // Limitar a 8 destinos
  
  const labels = destinosMedia.map(item => item.destino);
  const data = destinosMedia.map(item => item.media);
  
  return {
    labels,
    datasets: [{
      label: 'Preço Médio',
      data,
      backgroundColor: '#4299E1',
    }]
  };
}

/**
 * Gera dados para o gráfico comparativo de voos diretos vs com conexão
 * @param {Array} voos - Array de voos
 * @returns {Object} - Dados formatados para o gráfico
 */
function gerarDadosComparativoVoosDiretos(voos) {
  // Agrupar voos por destino e tipo (direto ou com conexão)
  const voosPorDestinoETipo = voos.reduce((acc, voo) => {
    const destino = voo.destino || 'Não informado';
    const tipo = voo.qtd_conexoes > 0 ? 'conexao' : 'direto';
    
    if (!acc[destino]) {
      acc[destino] = { direto: { total: 0, count: 0 }, conexao: { total: 0, count: 0 } };
    }
    
    const preco = parseFloat(voo.preco_total_pacote) || 0;
    if (preco > 0) {
      acc[destino][tipo].total += preco;
      acc[destino][tipo].count++;
    }
    
    return acc;
  }, {});
  
  // Calcular média e filtrar destinos que têm ambos os tipos
  const destinosComAmbosTipos = Object.entries(voosPorDestinoETipo)
    .filter(([, dados]) => dados.direto.count > 0 && dados.conexao.count > 0)
    .map(([destino, dados]) => ({
      destino,
      direto: dados.direto.count > 0 ? dados.direto.total / dados.direto.count : 0,
      conexao: dados.conexao.count > 0 ? dados.conexao.total / dados.conexao.count : 0
    }))
    .sort((a, b) => (b.direto - b.conexao) - (a.direto - a.conexao))
    .slice(0, 5); // Limitar a 5 destinos
  
  const labels = destinosComAmbosTipos.map(item => item.destino);
  const dadosDireto = destinosComAmbosTipos.map(item => item.direto);
  const dadosConexao = destinosComAmbosTipos.map(item => item.conexao);
  
  return {
    labels,
    datasets: [
      {
        label: 'Voo Direto',
        data: dadosDireto,
        backgroundColor: '#3182CE',
      },
      {
        label: 'Com Conexão',
        data: dadosConexao,
        backgroundColor: '#9F7AEA',
      }
    ]
  };
}

/**
 * Busca indicadores para o dashboard
 * @returns {Promise<Array>} - Array de indicadores
 */
export async function fetchIndicadores() {
  try {
    // Buscar todos os voos para gerar indicadores usando o proxy
    const voos = await fetchWithFallbackProxy(API_ENDPOINT);
    
    // Calcular indicadores
    const totalPesquisas = voos.length;
    
    // Preço médio
    const precoTotal = voos.reduce((sum, voo) => 
      sum + (parseFloat(voo.preco_total_pacote) || 0), 0
    );
    const precoMedio = totalPesquisas > 0 ? precoTotal / totalPesquisas : 0;
    
    // Destinos únicos
    const destinosUnicos = new Set(voos.map(voo => voo.destino).filter(Boolean)).size;
    
    // Economia gerada (simulação)
    const economiaGerada = voos.reduce((sum, voo) => {
      // Simulação de economia: 15% do preço total
      const preco = parseFloat(voo.preco_total_pacote) || 0;
      return sum + (preco * 0.15);
    }, 0);
    
    // Voos abaixo de R$ 2.000
    const voosBaratos = voos.filter(voo => {
      const preco = parseFloat(voo.preco_total_pacote) || 0;
      return preco > 0 && preco < 2000;
    }).length;
    
    // Hotéis 5 estrelas até R$ 500 (por pessoa)
    const hoteis5Estrelas = voos.filter(voo => {
      const categoria = parseInt(voo.categoria_hotel) || 0;
      const precoPorPessoa = parseFloat(voo.preco) || 0;
      return categoria === 5 && precoPorPessoa > 0 && precoPorPessoa <= 500;
    }).length;
    
    return [
      { id: 1, titulo: 'Pesquisas Realizadas', valor: totalPesquisas, variacao: 12.5, periodo: 'vs mês anterior' },
      { id: 2, titulo: 'Preço Médio', valor: `R$ ${precoMedio.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`, variacao: -8.3, periodo: 'vs mês anterior' },
      { id: 3, titulo: 'Destinos Populares', valor: destinosUnicos, variacao: 5.2, periodo: 'novos destinos' },
      { id: 4, titulo: 'Economia Gerada', valor: `R$ ${economiaGerada.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`, variacao: 23.7, periodo: 'vs mês anterior' },
      { id: 5, titulo: 'Voos Abaixo de R$ 2.000', valor: voosBaratos, variacao: 15.2, periodo: 'vs semana anterior' },
      { id: 6, titulo: 'Hotéis 5★ até R$ 500', valor: hoteis5Estrelas, variacao: 9.5, periodo: 'novos hotéis' }
    ];
  } catch (error) {
    console.error('Erro ao gerar indicadores:', error);
    // Em caso de erro, retornar indicadores vazios
    return [
      { id: 1, titulo: 'Pesquisas Realizadas', valor: 0, variacao: 0, periodo: 'vs mês anterior' },
      { id: 2, titulo: 'Preço Médio', valor: 'R$ 0', variacao: 0, periodo: 'vs mês anterior' },
      { id: 3, titulo: 'Destinos Populares', valor: 0, variacao: 0, periodo: 'novos destinos' },
      { id: 4, titulo: 'Economia Gerada', valor: 'R$ 0', variacao: 0, periodo: 'vs mês anterior' },
      { id: 5, titulo: 'Voos Abaixo de R$ 2.000', valor: 0, variacao: 0, periodo: 'vs semana anterior' },
      { id: 6, titulo: 'Hotéis 5★ até R$ 500', valor: 0, variacao: 0, periodo: 'novos hotéis' }
    ];
  }
}
