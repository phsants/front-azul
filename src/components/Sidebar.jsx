import React, { useState } from 'react';
import { 
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Fab
} from '@mui/material';
import { 
  Home as HomeIcon,
  BarChart as BarChartIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de barra lateral para navegação
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.isMobileOpen - Estado de abertura do menu em dispositivos móveis
 * @param {Function} props.toggleMobileMenu - Função para alternar o menu em dispositivos móveis
 * @param {boolean} props.darkMode - Estado do modo escuro
 * @returns {JSX.Element} Componente Sidebar
 */
const Sidebar = ({ isMobileOpen, toggleMobileMenu, darkMode }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Lista de itens do menu
  const menuItems = [
    { 
      name: 'Home', 
      path: '/home', 
      icon: <HomeIcon /> 
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <BarChartIcon /> 
    },
    { 
      name: 'Pesquisa de Viagem', 
      path: '/pesquisa', 
      icon: <SearchIcon /> 
    },
    { 
      name: 'Agendamentos', 
      path: '/agendamentos', 
      icon: <CalendarIcon /> 
    }
  ];

  // Verificar se um item está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Conteúdo da sidebar
  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Cabeçalho da Sidebar */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Travel Dashboard
          </Typography>
        </Link>
        {isMobile && (
          <IconButton onClick={toggleMobileMenu} aria-label="Fechar menu">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Lista de navegação */}
      <List sx={{ px: 1, py: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: darkMode ? 'primary.dark' : 'primary.light',
                  color: darkMode ? 'primary.light' : 'primary.dark',
                  '&:hover': {
                    bgcolor: darkMode ? 'primary.dark' : 'primary.light',
                  }
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: isActive(item.path) 
                    ? (darkMode ? 'primary.light' : 'primary.dark')
                    : 'inherit'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Rodapé da Sidebar - Removido conforme solicitado */}
    </Box>
  );

  return (
    <>
      {/* Sidebar para desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper'
            },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Sidebar para dispositivos móveis */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={toggleMobileMenu}
          ModalProps={{
            keepMounted: true, // Melhor desempenho em dispositivos móveis
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              bgcolor: 'background.paper'
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Botão flutuante para abrir o menu em dispositivos móveis */}
      {isMobile && !isMobileOpen && (
        <Fab
          color="primary"
          aria-label="Abrir menu"
          onClick={toggleMobileMenu}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
        >
          <MenuIcon />
        </Fab>
      )}
    </>
  );
};

export default Sidebar;
