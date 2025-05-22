import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, Home, Search, Calendar, BarChart2, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Componente de barra lateral para navegação
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.isMobileOpen - Estado de abertura do menu em dispositivos móveis
 * @param {Function} props.toggleMobileMenu - Função para alternar o menu em dispositivos móveis
 * @param {boolean} props.darkMode - Estado do modo escuro
 * @param {Function} props.toggleDarkMode - Função para alternar o modo escuro
 * @returns {JSX.Element} Componente Sidebar
 */
const Sidebar = ({ isMobileOpen, toggleMobileMenu, darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Lista de itens do menu
  const menuItems = [
    { 
      name: 'Home', 
      path: '/home', 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <BarChart2 className="w-5 h-5" /> 
    },
    { 
      name: 'Pesquisa de Viagem', 
      path: '/pesquisa', 
      icon: <Search className="w-5 h-5" /> 
    },
    { 
      name: 'Agendamentos', 
      path: '/agendamentos', 
      icon: <Calendar className="w-5 h-5" /> 
    }
  ];

  // Verificar se um item está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Variantes de animação para o menu móvel
  const mobileMenuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Renderização do conteúdo da sidebar
  const renderSidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/home" className="flex items-center">
          <span className="text-xl font-bold text-primary dark:text-blue-400">Travel Dashboard</span>
        </Link>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-100 text-primary dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modo Escuro</span>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm">
        {renderSidebarContent()}
      </div>

      {/* Overlay para dispositivos móveis */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar para dispositivos móveis */}
      <motion.div
        className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 z-30 md:hidden shadow-xl"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileOpen ? 'open' : 'closed'}
      >
        {renderSidebarContent()}
      </motion.div>

      {/* Botão para abrir o menu em dispositivos móveis */}
      <button
        onClick={toggleMobileMenu}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg md:hidden z-10"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;
