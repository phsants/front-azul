import { useState, useMemo } from "react";

export function useFiltroVoos(dadosOriginais) {
  const [filtros, setFiltros] = useState({
    origem: null,
    destino: null,
    companhia: null,
    tipo_voo: null,
    precoMax: null,
  });

  const atualizarFiltro = (chave, valor) => {
    setFiltros((prev) => ({ ...prev, [chave]: valor }));
  };

  const dadosFiltrados = useMemo(() => {
    return dadosOriginais.filter((voo) => {
      const { origem, destino, companhia, tipo_voo, precoMax } = filtros;
      return (
        (!origem || voo.origem === origem) &&
        (!destino || voo.destino === destino) &&
        (!companhia || voo.companhia === companhia) &&
        (!tipo_voo || voo.tipo_voo === tipo_voo) &&
        (!precoMax || voo.preco <= precoMax)
      );
    });
  }, [filtros, dadosOriginais]);

  return { filtros, atualizarFiltro, dadosFiltrados };
}
