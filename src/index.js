import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Capture from './capture';
import Login from './components/login/login.tsx'
import LandingPage from './components/landing-page/landing-page.tsx'
import Welcome from './components/welcome/welcome.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInformation from './components/personal-information/personal-information.tsx';
import Signature from './components/digital-signature/digital.signature.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />  
        <Route path="/landing-page" element={<LandingPage />} />  
        <Route path="/personal-information" element={<PersonalInformation />} />
        <Route path="/digital-signature" element={<Signature />} />
        <Route path="/capture" element={<Capture />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
serviceWorkerRegistration.unregister();
reportWebVitals();
