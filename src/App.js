import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const webcamRef = React.useRef(null);

  // Función para capturar la imagen
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container-welcome">
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
        {/* Webcam Section */}
        <div className="camera-icon">
          <i className="fas fa-camera fa-3x"></i>
          <label htmlFor="image-upload" className="upload-label">
            {image ? (
              <img src={image} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
            ) : (
              'Click to attach image'
            )}
          </label>
        </div>

        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: "user" // Esto fuerza la cámara frontal
            }}
          />
          <div>
            <button onClick={capture}>Capturar Imagen</button>
          </div>
        </div>

        {image && (
          <div className="image-preview">
            <img src={image} alt="Captured" style={{ width: '100%', height: 'auto' }} />
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
