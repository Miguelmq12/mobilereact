import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import Flag from "react-world-flags";
import reliableImage from '../../assets/images/reliable.png';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const countries = [
    { code: "US", label: "Estados Unidos", dialCode: "+1" },
    { code: "MX", label: "México", dialCode: "+52" },
    { code: "CA", label: "Canadá", dialCode: "+1" },
    { code: "GB", label: "Reino Unido", dialCode: "+44" },
    { code: "DE", label: "Alemania", dialCode: "+49" },
    { code: "FR", label: "Francia", dialCode: "+33" },
    { code: "ES", label: "España", dialCode: "+34" },
    { code: "IT", label: "Italia", dialCode: "+39" },
    { code: "JP", label: "Japón", dialCode: "+81" },
    { code: "CN", label: "China", dialCode: "+86" },
    { code: "IN", label: "India", dialCode: "+91" },
    { code: "BR", label: "Brasil", dialCode: "+55" },
    { code: "AR", label: "Argentina", dialCode: "+54" },
    { code: "CO", label: "Colombia", dialCode: "+57" },
    { code: "PE", label: "Perú", dialCode: "+51" },
    { code: "CL", label: "Chile", dialCode: "+56" },
    { code: "AU", label: "Australia", dialCode: "+61" },
    { code: "ZA", label: "Sudáfrica", dialCode: "+27" },
    { code: "RU", label: "Rusia", dialCode: "+7" },
  ];
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleContinue = async () => {
    setError('');
    try {
      navigate('/welcome');

    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };
  const formatOptionLabel = ({ code, label, dialCode }) => (
    <div className="option-label">
      <Flag code={code} className="country-flag" width="20" height="20" />
 
    </div>
  );

  return (
    <div className="login-container">
      <img src={reliableImage} alt="Logo" className="login-logo" /> 
      <div className="login-box">
        <h2>Enter phone number</h2>

        <p className="sms-info">
          Enter your phone number to receive a passcode for authentication.
        </p>

        <div className="phone-input-container">
          <div className="phone-input-wrapper">
            {/* Selector de país dentro del mismo contenedor */}
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              options={countries}
              formatOptionLabel={formatOptionLabel} // Usamos la función de formateo
              getOptionValue={(e) => e.code}
              className="country-select"
              placeholder="Select a country" // Agrega un placeholder
            />

            <span className="dial-code">{selectedCountry.dialCode}</span>

            {/* Campo de texto para el número de teléfono */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Número de teléfono"
              className="phone-input"
            />
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}


        <p className="sms-info-sub ">
          By continuing, you may receive an SMS for verification. Message and data rates may apply.
        </p>

        <button onClick={handleContinue} className="login-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;