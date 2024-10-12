import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const htmlRoot = document.getElementById('__appRoot');
if (!htmlRoot) throw new Error('Failed to find the root element');
const root = createRoot(htmlRoot);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
