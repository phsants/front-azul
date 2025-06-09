import { useState, useEffect, useCallback } from 'react';
import { voos } from '../data/mockData';

/**
 * Hook personalizado para gerenciar filtros de voos no dashboard e na página de pesquisa
 * @returns {Object} Objeto contendo estados e funções para manipulação dos filtros
 */
export default function useFiltroVoos() {
  // Estados para os filtros
  const [filtros, setFiltros] = useState({
    origem: '',
    destino: '',
    dataIda: '',
    dataVolta: '',
    precoMin: '',
    precoMax: '',
    companhia: '',
    conexoes: 'todos', // 'todos', 'direto', 'conexao'
    hotel: false,
    categoriaHotel: '',
  });

  // Estado para os resultados filtrados
  const [resultados, setResultados] = useState([]);

  // Estado para indicar carregamento
  const [carregando, setCarregando] = useState(false);

  // Função para atualizar um filtro específico
  const atualizarFiltro = useCallback((campo, valor) => {
    setFiltros(filtrosAtuais => ({
      ...filtrosAtuais,
      [campo]: valor
    }));
  }, []);

  // Função para limpar todos os filtros
  const limparFiltros = useCallback(() => {
    setFiltros({
      origem: '',
      destino: '',
      dataIda: '',
      dataVolta: '',
      precoMin: '',
      precoMax: '',
      companhia: '',
      conexoes: 'todos',
      hotel: false,
      categoriaHotel: '',
    });
  }, []);

  // Função para aplicar os filtros aos dados
  const aplicarFiltros = useCallback(() => {
    setCarregando(true);

    // Simulando um delay de carregamento para melhor experiência do usuário
    setTimeout(() => {
      let resultadosFiltrados = [...voos];

      // Filtrar por origem
      if (filtros.origem) {
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.origem.cidade_id === parseInt(filtros.origem) ||
                 voo.origem.id === parseInt(filtros.origem)
        );
      }

      // Filtrar por destino
      if (filtros.destino) {
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.destino.cidade_id === parseInt(filtros.destino) ||
                 voo.destino.id === parseInt(filtros.destino)
        );
      }

      // Filtrar por data de ida
      if (filtros.dataIda) {
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.data_ida === filtros.dataIda
        );
      }

      // Filtrar por preço mínimo
      if (filtros.precoMin) {
        const precoMin = parseFloat(filtros.precoMin);
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.preco_total >= precoMin
        );
      }

      // Filtrar por preço máximo
      if (filtros.precoMax) {
        const precoMax = parseFloat(filtros.precoMax);
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.preco_total <= precoMax
        );
      }

      // Filtrar por companhia aérea
      if (filtros.companhia) {
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.companhia.id === parseInt(filtros.companhia)
        );
      }

      // Filtrar por conexões
      if (filtros.conexoes !== 'todos') {
        if (filtros.conexoes === 'direto') {
          resultadosFiltrados = resultadosFiltrados.filter(
            voo => voo.conexoes.length === 0
          );
        } else if (filtros.conexoes === 'conexao') {
          resultadosFiltrados = resultadosFiltrados.filter(
            voo => voo.conexoes.length > 0
          );
        }
      }

      // Filtrar por hotel incluído
      if (filtros.hotel) {
        resultadosFiltrados = resultadosFiltrados.filter(
          voo => voo.hospedagem !== null
        );

        // Filtrar por categoria de hotel
        if (filtros.categoriaHotel) {
          const categoria = parseInt(filtros.categoriaHotel);
          resultadosFiltrados = resultadosFiltrados.filter(
            voo => voo.hospedagem && voo.hospedagem.hotel.categoria === categoria
          );
        }
      }

      setResultados(resultadosFiltrados);
      setCarregando(false);
    }, 500);
  }, [filtros]);

  // Aplicar filtros quando os filtros mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [aplicarFiltros]);

  return {
    filtros,
    resultados,
    carregando,
    atualizarFiltro,
    limparFiltros,
    aplicarFiltros
  };
}
