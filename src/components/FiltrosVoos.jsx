import React from "react";

export function FiltrosVoos({ filtros, atualizarFiltro, voos }) {
  const opcoesUnicas = (chave) =>
    [...new Set(voos.map((v) => v[chave]).filter(Boolean))];

  return (
    <div className="flex gap-4 flex-wrap ">
      {/* Origem */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Origem</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("origem", e.target.value)}
          value={filtros.origem || ""}
        >
          <option value="">Todas</option>
          {opcoesUnicas("origem").map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* Destino */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Destino</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("destino", e.target.value)}
          value={filtros.destino || ""}
        >
          <option value="">Todos</option>
          {opcoesUnicas("destino").map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Companhia */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Companhia</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("companhia", e.target.value)}
          value={filtros.companhia || ""}
        >
          <option value="">Todas</option>
          {opcoesUnicas("companhia").map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de Voo */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Tipo de Voo</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("tipo_voo", e.target.value)}
          value={filtros.tipo_voo || ""}
        >
          <option value="">Todos</option>
          {opcoesUnicas("tipo_voo").map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Cliente */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Cliente</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("cliente_nome", e.target.value)}
          value={filtros.cliente_nome || ""}
        >
          <option value="">Todos</option>
          {opcoesUnicas("cliente_nome").map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Categoria do Hotel */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Categoria Hotel</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("categoria_hotel", e.target.value)}
          value={filtros.categoria_hotel || ""}
        >
          <option value="">Todas</option>
          <option value="5">5 estrelas</option>
          <option value="4">4 estrelas</option>
          <option value="3">3 estrelas</option>
        </select>
      </div>

      {/* Conexões */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Conexões</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          onChange={(e) => atualizarFiltro("qtd_conexoes", e.target.value)}
          value={filtros.qtd_conexoes || ""}
        >
          <option value="">Todas</option>
          <option value="0">Direto</option>
          <option value="1">1 conexão</option>
          <option value="2">2 ou mais conexões</option>
        </select>
      </div>

      {/* Data de Ida */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Data Ida</label>
        <input
          type="date"
          className="mt-1 block w-full border rounded p-2"
          value={filtros.data_ida || ""}
          onChange={(e) => atualizarFiltro("data_ida", e.target.value)}
        />
      </div>

      {/* Data de Volta */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Data Volta</label>
        <input
          type="date"
          className="mt-1 block w-full border rounded p-2"
          value={filtros.data_volta || ""}
          onChange={(e) => atualizarFiltro("data_volta", e.target.value)}
        />
      </div>

      {/* Preço Mínimo */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Preço Mínimo (R$)</label>
        <input
          type="number"
          placeholder="Ex: 1000"
          className="mt-1 block w-full border rounded p-2"
          value={filtros.precoMin || ""}
          onChange={(e) =>
            atualizarFiltro(
              "precoMin",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
        />
      </div>

      {/* Preço Máximo */}
      <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700">Preço Máximo (R$)</label>
        <input
          type="number"
          placeholder="Ex: 5000"
          className="mt-1 block w-full border rounded p-2"
          value={filtros.precoMax || ""}
          onChange={(e) =>
            atualizarFiltro(
              "precoMax",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
        />
      </div>
    </div>
  );
}
