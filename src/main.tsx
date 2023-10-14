import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'virtual:uno.css';

import Layout from './layout';
import AppPage from '@/routes/page.tsx';
import LoginPage from '@/routes/login/page.tsx';
import RegisterPage from '@/routes/register/page';
import LogoutPage from '@/routes/logout/page';
import { RouteGuard } from '@/layout/guard.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RouteGuard>
      <Routes>
        <Route path={'/login'} element={
          <LoginPage />
        }/>
        <Route path={'/logout'} element={
          <LogoutPage />
        }/>
        <Route path={'/register'} element={
          <RegisterPage />
        }/>
        <Route path={'/'} element={<Layout />}>
          <Route index element={
            <AppPage />
          } />
        </Route>
      </Routes>
    </RouteGuard>
  </BrowserRouter>,
);
