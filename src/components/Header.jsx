import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

/**
 * Componente de cabeçalho para o dashboard
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.toggleMobileMenu - Função para alternar o menu em dispositivos móveis
 * @returns {JSX.Element} Componente Header
 */
const Header = ({ toggleMobileMenu }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Botão do menu móvel e título */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard de Viagens
            </h1>
          </div>

          {/* Ações do cabeçalho */}
          <div className="flex items-center space-x-4">
            {/* Notificações */}
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Perfil do usuário */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:block font-medium">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
