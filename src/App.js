import React, { useState } from 'react';
import './App.css';
import Capture from './capture';

function App() {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = (imageSrc) => {
    setImage(imageSrc);
    setShowCamera(false);
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <div className="container-welcome">
      {showCamera ? (
        <Capture onCapture={handleCapture} onClose={handleCloseCamera} />
      ) : (
        <>
          <h1 className="title">Personal Information</h1>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" className="input-field" />
          </div>

          <div className="input-group">
            <label htmlFor="ssn">Social Security #</label>
            <input type="password" id="ssn" placeholder="•••••••••" className="input-field" />
          </div>

          <div className="upload-section">
            <div className="camera-icon" onClick={handleOpenCamera}>
              <i className="fas fa-camera fa-3x"></i>
              <label htmlFor="image-upload" className="upload-label">
                {image ? (
                  <img src={image} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
                ) : (
                  'Click to attach image'
                )}
              </label>
            </div>

            {image && (
              <div className="image-preview">
                <img src={image} alt="Captured" style={{ width: '100%', height: 'auto' }} />
                <button onClick={handleOpenCamera}>Volver a tomar otra foto</button>
              </div>
            )}
          </div>

          <div className="button-group">
            <button className="button">Exit</button>
            <button className="button">Submit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
