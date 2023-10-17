import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'virtual:uno.css';

import { RouteGuard } from '@/layout/guard';
import { App } from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RouteGuard>
      <App />
    </RouteGuard>
  </BrowserRouter>,
);
