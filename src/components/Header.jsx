import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Avatar, 
  Box, 
  useMediaQuery, 
  useTheme,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';

/**
 * Componente de cabeçalho para o dashboard
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.toggleMobileMenu - Função para alternar o menu em dispositivos móveis
 * @param {boolean} props.darkMode - Estado do modo escuro
 * @param {Function} props.toggleDarkMode - Função para alternar o modo escuro
 * @param {Function} props.handleLogout - Função para realizar logout
 * @returns {JSX.Element} Componente Header
 */
const Header = ({ toggleMobileMenu, darkMode, toggleDarkMode, handleLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    if (handleLogout) handleLogout();
  };

  const handleDarkModeToggle = () => {
    if (toggleDarkMode) toggleDarkMode();
    // Não fechamos o menu para permitir múltiplas ações
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={1}
      sx={{ 
        bgcolor: darkMode ? 'background.paper' : 'background.paper',
        color: darkMode ? 'text.primary' : 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Botão do menu móvel e título */}
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Abrir menu"
              onClick={toggleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="h1" fontWeight="bold" noWrap>
            Dashboard de Viagens
          </Typography>
        </Box>

        {/* Ações do cabeçalho */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Notificações */}
          <Tooltip title="Notificações">
            <IconButton color="inherit" size="large">
              <Badge badgeContent={3} color="primary" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Perfil do usuário */}
          <Box>
            <Tooltip title="Conta">
              <IconButton 
                onClick={handleClick}
                color="inherit" 
                edge="end"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'transparent' }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            
            {/* Menu do usuário */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                  mt: 1.5,
                  borderRadius: 1,
                  minWidth: 200,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem sx={{ pointerEvents: 'none' }}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Typography variant="subtitle1">Admin</Typography>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleDarkModeToggle}>
                <ListItemIcon>
                  {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText primary="Modo Escuro" />
                <Switch 
                  edge="end"
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  size="small"
                />
              </MenuItem>
              
              <MenuItem disabled>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </MenuItem>
              
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
