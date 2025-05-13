import React from "react";

export function TabelaVoos({ dados }) {
  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          <th>Origem</th>
          <th>Destino</th>
          <th>Companhia</th>
          <th>Tipo</th>
          <th>Data</th>
          <th>Preço (R$)</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((v) => (
          <tr key={v.id}>
            <td>{v.origem}</td>
            <td>{v.destino}</td>
            <td>{v.companhia}</td>
            <td>{v.tipo_voo}</td>
            <td>{v.data}</td>
            <td>{v.preco}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
