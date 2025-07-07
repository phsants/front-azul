/**
 * Utilitários para formatação de dados no sistema UseTravel
 */

/**
 * Formata uma data para o padrão brasileiro (DD/MM/AAAA)
 * @param {string|Date} data - Data a ser formatada (string ISO, timestamp ou objeto Date)
 * @param {string} fallback - Valor a ser retornado caso a data seja inválida
 * @returns {string} Data formatada ou fallback
 */
export const formatarData = (data, fallback = "Não informado") => {
  if (!data) return fallback;
  
  try {
    const dataObj = new Date(data);

    // Usa valores UTC para evitar mudança de fuso horário
    const dia = String(dataObj.getUTCDate()).padStart(2, '0');
    const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dataObj.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return fallback;
  }
};

/**
 * Formata um valor numérico para o padrão monetário brasileiro (R$ 0.000,00)
 * @param {number|string} valor - Valor a ser formatado
 * @param {string} fallback - Valor a ser retornado caso o valor seja inválido
 * @returns {string} Valor formatado ou fallback
 */
export const formatarPreco = (valor, fallback = "Não informado") => {
  if (valor === undefined || valor === null) return fallback;
  
  try {
    // Se já for uma string formatada com R$, tenta extrair o valor numérico
    if (typeof valor === 'string' && valor.includes('R$')) {
      valor = parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.').trim());
    }
    
    // Converte para número se for string
    const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;
    
    // Verifica se é um número válido
    if (isNaN(valorNumerico)) {
      return fallback;
    }
    
    // Formata para R$ 0.000,00
    return valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    console.error('Erro ao formatar preço:', error);
    return fallback;
  }
};

/**
 * Mapeia códigos de tipo de quarto para descrições legíveis
 * @param {string|number} codigo - Código do tipo de quarto
 * @param {string} fallback - Valor a ser retornado caso o código seja inválido
 * @returns {string} Descrição do tipo de quarto ou fallback
 */
export const mapearTipoQuarto = (codigo, fallback = "Standard") => {
  if (!codigo) return fallback;
  
  // Mapeamento de códigos para descrições
  const tiposQuarto = {
    '1': 'Standard',
    '2': 'Superior',
    '3': 'Luxo',
    '4': 'Suíte',
    '5': 'Suíte Executiva',
    '6': 'Suíte Presidencial',
    'standard': 'Standard',
    'superior': 'Superior',
    'luxo': 'Luxo',
    'suite': 'Suíte',
    'suite_executiva': 'Suíte Executiva',
    'suite_presidencial': 'Suíte Presidencial'
  };
  
  // Converte para string para garantir compatibilidade com o mapeamento
  const codigoStr = String(codigo).toLowerCase();
  
  // Retorna a descrição ou o fallback
  return tiposQuarto[codigoStr] || fallback;
};

/**
 * Formata o nome do hotel com fallback para valor padrão
 * @param {string} nome - Nome do hotel
 * @param {string} fallback - Valor a ser retornado caso o nome seja inválido
 * @returns {string} Nome do hotel ou fallback
 */
export const formatarNomeHotel = (nome, fallback = "Hotel não informado") => {
  if (!nome) return fallback;
  
  // Se for uma string vazia ou muito curta, retorna o fallback
  if (typeof nome === 'string' && nome.trim().length < 2) {
    return fallback;
  }
  
  return nome;
};

/**
 * Formata a categoria do hotel (estrelas)
 * @param {number|string} categoria - Categoria do hotel (1-5)
 * @param {number} fallback - Valor a ser retornado caso a categoria seja inválida
 * @returns {number} Categoria do hotel ou fallback
 */
export const formatarCategoriaHotel = (categoria, fallback = 3) => {
  if (categoria === undefined || categoria === null) return fallback;
  
  // Converte para número
  const categoriaNum = parseInt(categoria, 10);
  
  // Verifica se é um número válido entre 1 e 5
  if (isNaN(categoriaNum) || categoriaNum < 1 || categoriaNum > 5) {
    return fallback;
  }
  
  return categoriaNum;
};
