import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import PesquisaViagem from './pages/PesquisaViagem';
import Agendamentos from './pages/agendamentos';
import DashboardGuide from './pages/DashboardGuide';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/home" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard-guide" element={<DashboardGuide />} />
              <Route path="/pesquisa" element={<PesquisaViagem />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
