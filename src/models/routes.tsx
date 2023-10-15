import { create } from 'zustand';
import { RouteObject } from 'react-router-dom';
import LoginPage from '@/routes/login/page.tsx';
import RegisterPage from '@/routes/register/page.tsx';
import LogoutPage from '@/routes/logout/page.tsx';
import Layout from '@/layout';
import AppPage from '@/routes/page.tsx';

interface State {
  routes: RouteObject[];
  loadRole: (role: 'employee' | 'commission' | 'payroll') => void;
}

const defaultRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/', element: <Layout /> , children: [
    { index: true, element: <AppPage /> },
  ] },
];

export const useRouteStore = create<State>()(
  (set) => ({
    routes: [...defaultRoutes],
    loadRole: (role) => set((state) => {
      switch (role) {
      case 'employee':
        break;
      case 'commission':
        break;
      case 'payroll':
        break;
      }
      return state;
    }),
  }),
);

