import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import 'virtual:uno.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<App />} />
    </Routes>
  </BrowserRouter>,
);
