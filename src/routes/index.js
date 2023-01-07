import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Logout from '../pages/authentication/Logout';
import Register from '../pages/authentication/Register';
import ForgetPwd from '../pages/authentication/ForgetPassword';
import UserProfile from '../pages/profile/UserProfile';
import SalesManagement from '../pages/sales/SalesManagement';

/**
 * Define as rotas privadas da aplicação (qie poderão ser acessadas apenas se o usuário estiver logado)
 */
const authProtectedRoutes = [
  { path: '/dashboard', component: SalesManagement },
  { path: '/sales', component: SalesManagement },
  { path: '/profile', component: UserProfile },
  { path: '/profile/:tab', component: UserProfile },
  // eslint-disable-next-line react/display-name
  { path: '/', exact: true, component: () => <Redirect to="/dashboard" /> },
];

/**
 * Define as rotas públicas da aplicação como: login, cadastro, recuperação de senha
 */
const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPwd },
  { path: '/register', component: Register },
];

//exporta as rotas criadas
export { authProtectedRoutes, publicRoutes };
