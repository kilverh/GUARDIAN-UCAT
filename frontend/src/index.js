import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/App.js';
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/PrincipalPageStyle.css';

// Obtén el elemento contenedor principal
const container = document.getElementById('root');

// Crea una raíz y renderiza la aplicación
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
