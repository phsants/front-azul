import React from 'react';
import { 
  DollarSign, 
  Users, 
  Home, 
  Plane, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

/**
 * Componente para exibir KPIs e métricas em formato de card
 * @param {Object} props - Propriedades do componente
 * @param {string} props.titulo - Título do indicador
 * @param {string|number} props.valor - Valor do indicador
 * @param {string} props.variacao - Variação percentual (ex: "+12%")
 * @param {boolean} props.positivo - Se a variação é positiva ou negativa
 * @param {string} props.icone - Nome do ícone a ser exibido
 * @returns {JSX.Element} Componente CardIndicador
 */
const CardIndicador = ({ titulo, valor, variacao, positivo, icone }) => {
  // Função para renderizar o ícone correto
  const renderizarIcone = () => {
    switch (icone) {
      case 'dollar-sign':
        return <DollarSign className="w-6 h-6" />;
      case 'users':
        return <Users className="w-6 h-6" />;
      case 'home':
        return <Home className="w-6 h-6" />;
      case 'plane':
        return <Plane className="w-6 h-6" />;
      default:
        return <DollarSign className="w-6 h-6" />;
    }
  };

  return (
    <div className="card flex flex-col p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full ${positivo ? 'bg-blue-100 text-primary dark:bg-blue-900' : 'bg-red-100 text-red-600 dark:bg-red-900'}`}>
          {renderizarIcone()}
        </div>
        <div className="flex items-center">
          {positivo ? (
            <TrendingUp className="w-4 h-4 text-success mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={positivo ? 'text-success' : 'text-red-500'}>
            {variacao}
          </span>
        </div>
      </div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
        {titulo}
      </h3>
      <p className="text-2xl font-bold dark:text-white">
        {valor}
      </p>
    </div>
  );
};

export default CardIndicador;
