import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box } from '@mui/material';

/**
 * Layout compartilhado para páginas protegidas
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.darkMode - Estado do modo escuro
 * @param {Function} props.toggleDarkMode - Função para alternar o modo escuro
 * @returns {JSX.Element} Componente Layout
 */
const Layout = ({ darkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Função para alternar o menu em dispositivos móveis
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Função para realizar logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh',
        overflow: 'hidden',
        bgcolor: darkMode ? 'background.default' : 'background.default'
      }}
    >
      {/* Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
        darkMode={darkMode}
      />

      {/* Conteúdo principal */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' }
        }}
      >
        <Header 
          toggleMobileMenu={toggleMobileMenu} 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleLogout={handleLogout}
        />
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            overflow: 'auto',
            bgcolor: darkMode ? 'background.default' : 'background.default'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
