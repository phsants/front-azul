import React from "react";

export function FiltrosVoos({ filtros, atualizarFiltro, voos }) {
  const opcoesUnicas = (chave) => [...new Set(voos.map((v) => v[chave]))];

  return (
    <div className="filtros">
      <label>Origem:
        <select onChange={(e) => atualizarFiltro("origem", e.target.value)} value={filtros.origem || ""}>
          <option value="">Todas</option>
          {opcoesUnicas("origem").map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>

      <label>Destino:
        <select onChange={(e) => atualizarFiltro("destino", e.target.value)} value={filtros.destino || ""}>
          <option value="">Todos</option>
          {opcoesUnicas("destino").map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </label>

      <label>Companhia:
        <select onChange={(e) => atualizarFiltro("companhia", e.target.value)} value={filtros.companhia || ""}>
          <option value="">Todas</option>
          {opcoesUnicas("companhia").map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label>Tipo de Voo:
        <select onChange={(e) => atualizarFiltro("tipo_voo", e.target.value)} value={filtros.tipo_voo || ""}>
          <option value="">Todos</option>
          {opcoesUnicas("tipo_voo").map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      <label>Preço Máximo:
        <input
          type="number"
          placeholder="Ex: 2000"
          value={filtros.precoMax || ""}
          onChange={(e) => atualizarFiltro("precoMax", e.target.value ? parseInt(e.target.value) : null)}
        />
      </label>
    </div>
  );
}
