import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Capture from './capture';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Pantalla principal */}
        <Route path="/capture" element={<Capture />} /> {/* Pantalla de captura */}
      </Routes>
    </Router>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
