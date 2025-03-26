import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './components/App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="wrapper">
      <App />
    </div>
  </StrictMode>
);
