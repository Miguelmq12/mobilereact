import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [dob, setDob] = useState('');
  const [ssn, setSsn] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Image uploaded");
    }
  };

  return (
    <div className="container-welcome">
      <h1 className="title">Personal Information</h1>
      <p className="message">
        123 Main Street, Anytown, USA 90210
        <br />
        (555) 867-5309, sjones@gmail.com
      </p>
      <p className="message small">
        (contact HR if any of this information is incorrect)
      </p>

      <div className="input-group">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label htmlFor="ssn">Social Security #</label>
        <div className="ssn-input">
          <input
            type="password"
            id="ssn"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            className="input-field"
            placeholder="•••••••••"
          />
        </div>
      </div>

      <div className="upload-section">
        <div className="camera-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" width="40">
            <path d="M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5-3h2c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1h2l1-2h8l1 2zm0 2h-10l-1-2H7v9h10V9z"/>
          </svg>
        </div>
        <label htmlFor="image-upload" className="upload-label">
            Click to attach image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          capture="camera"
          onChange={handleImageUpload}
          className="image-upload"
        />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded preview" />
          </div>
        )}
      </div>

      <div className="button-group">
        <button className="button">Exit</button>
        <button className="button">Submit</button>
      </div>
    </div>
  );
}

export default App;






