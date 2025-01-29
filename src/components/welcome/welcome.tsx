import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import reliableImage from '../../assets/images/reliable.png';
const Welcome = () => {
  const navigate = useNavigate();
  const handleContinue = async () => {
      navigate('/landing-page');
  };

    return (
      
      <div className="container-welcome">
        <img src={reliableImage} alt="Logo" className="login-logo" /> 
        {/* <img className="logo" src="/ruta/a/tu/logo.png" alt="Logo de Reliable Reports" /> */}
        <h1 className="title">Welcome to the Reliable<br/>Reports, Inc. New Hire<br/>Portal.</h1>
        <p className="message">We are excited to have you<br/>join our team.<br/><br/>Let's get started on your<br/>journey with us!</p>
        <button className="button" onClick={handleContinue}>Start Now</button>
        <p className="contact-info">Call or email Human<br/>Resources at any time<br/>should you need any<br/>assistance.</p>
      </div>
    );
  };
  
  export default Welcome;