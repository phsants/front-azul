import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const cores = ["#2563eb", "#16a34a", "#f97316", "#e11d48", "#7c3aed", "#059669"];

export function GraficosDashboard({ dados }) {
  if (!dados || dados.length === 0) {
    return <p className="text-center text-gray-500">Sem dados para exibir nos gráficos.</p>;
  }

  // 🎯 Dados do Gráfico de Linha (Preço x Data de Ida)
  const dadosLinha = dados.map((v) => ({
    data: v.data_ida,
    preco: v.preco,
  }));

  // 🎯 Dados do Gráfico de Barras (Destinos)
  const destinos = dados.reduce((acc, v) => {
    acc[v.destino] = (acc[v.destino] || 0) + 1;
    return acc;
  }, {});
  const dadosBarras = Object.entries(destinos).map(([destino, quantidade]) => ({
    destino,
    quantidade,
  }));

  // 🎯 Dados do Gráfico de Pizza (Companhias)
  const companhias = dados.reduce((acc, v) => {
    acc[v.companhia] = (acc[v.companhia] || 0) + 1;
    return acc;
  }, {});
  const dadosPizza = Object.entries(companhias).map(([companhia, quantidade]) => ({
    name: companhia,
    value: quantidade,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Linha */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">Preço ao Longo do Tempo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosLinha}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="preco" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Barras */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">Destinos Mais Buscados</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosBarras}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="destino" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade">
              {dadosBarras.map((_, index) => (
                <Cell key={index} fill={cores[index % cores.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pizza */}
      <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">Companhias Mais Usadas</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={dadosPizza}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dadosPizza.map((_, index) => (
                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
