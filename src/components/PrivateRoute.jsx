import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona para a página de login se o usuário não estiver autenticado
 * 
 * @returns {JSX.Element} Outlet para renderizar rotas filhas ou Navigate para redirecionamento
 */
const PrivateRoute = () => {
  // Verificar se existe token no localStorage (simulação de autenticação)
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Se autenticado, renderiza as rotas filhas, caso contrário redireciona para login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
