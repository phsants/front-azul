import React from "react";

export function ModalDetalhes({ aberto, onClose, dados }) {
  if (!aberto || !dados) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">
            Detalhes do Voo
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold hover:underline"
          >
            Fechar
          </button>
        </div>

        <div className="space-y-4">
          {/* Voo */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">✈️ Voo</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Origem:</strong> {dados.origem}</div>
              <div><strong>Destino:</strong> {dados.destino}</div>
              <div><strong>Companhia:</strong> {dados.companhia}</div>
              <div><strong>Tipo de Voo:</strong> {dados.tipo_voo}</div>
              <div><strong>Partida:</strong> {dados.partida_data} {dados.partida_hora}</div>
              <div><strong>Chegada:</strong> {dados.chegada_data} {dados.chegada_hora}</div>
              <div><strong>Partida Aeroporto:</strong> {dados.partida_aeroporto}</div>
              <div><strong>Chegada Aeroporto:</strong> {dados.chegada_aeroporto}</div>
              <div><strong>Conexões:</strong> {dados.qtd_conexoes === 0 ? "Direto" : `${dados.qtd_conexoes} conexão(ões)`}</div>
              <div><strong>Classe:</strong> {dados.classe}</div>
              <div><strong>Tipo Avião:</strong> {dados.tipo_aviao}</div>
              <div><strong>Duração Voo:</strong> {dados.tempo_voo ? `${Math.round(dados.tempo_voo)} min` : "N/A"}</div>
            </div>
          </div>

          {/* Hotel */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">🏨 Hotel</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Hotel:</strong> {dados.nome_hotel || "N/A"}</div>
              <div><strong>Categoria:</strong> {dados.categoria_hotel ? `${dados.categoria_hotel} estrelas` : "N/A"}</div>
              <div><strong>Preço por Pessoa:</strong> {dados.preco ? `R$ ${dados.preco}` : "N/A"}</div>
              <div><strong>Preço Total Pacote:</strong> {dados.preco_total_pacote ? `R$ ${dados.preco_total_pacote}` : "N/A"}</div>
            </div>
          </div>

          {/* Dados da Pesquisa */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">👥 Dados da Pesquisa</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Cliente:</strong> {dados.cliente_nome}</div>
              <div><strong>Tipo de Voo:</strong> {dados.tipo_voo}</div>
              <div><strong>Adultos:</strong> {dados.adultos}</div>
              <div><strong>Crianças:</strong> {dados.criancas}</div>
              <div><strong>Bebês:</strong> {dados.bebes}</div>
              <div><strong>Apartamentos:</strong> {dados.apartamento}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
