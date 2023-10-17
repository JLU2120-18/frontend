import { create } from 'zustand';
import { RouteObject } from 'react-router-dom';
import LoginPage from '@/routes/login/page';
import RegisterPage from '@/routes/register/page';
import LogoutPage from '@/routes/logout/page';
import Layout from '@/layout';
import AppPage from '@/routes/page';
import TimeCardPage from '@/routes/timecard/page';
import PurchasePage from '@/routes/purchase/page';
import EmployeesPage from '@/routes/employee/page';

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
    { path: 'timecard', element: <TimeCardPage /> },
    { path: 'purchase', element: <PurchasePage /> },
    { path: 'employee', element: <EmployeesPage /> },
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

