import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function GraficoPrecoVoos({ dados }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={dados}>
          <Line type="monotone" dataKey="preco" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
