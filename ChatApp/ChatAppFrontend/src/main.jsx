import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import AppRoutes from './config/AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
)
