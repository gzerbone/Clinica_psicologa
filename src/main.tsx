import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import LinksPage from './pages/LinksPage.tsx';
import './index.css';

// Roteamento simples por caminho — projeto é uma landing page estática,
// sem necessidade de uma lib de rotas para apenas duas páginas.
// Aceita tanto /links quanto /menu apontando para a mesma página de links.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const isLinksPage = currentPath === '/links' || currentPath === '/menu';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isLinksPage ? <LinksPage /> : <App />}
  </StrictMode>,
);
