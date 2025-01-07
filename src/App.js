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
          <p className="message">
            123 Main Street, Anytown, USA 90210
            <br />
            (555) 867-5309, sjones@gmail.com
          </p>
          <p className="message small">
            (contact HR if any of this information is incorrect)
          </p>
          <div className="input-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="dob">Date of Birth</label>
                  </td>
                  <td>
                    <input type="date" id="dob" className="input-field" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="ssn">Social Security #</label>
                  </td>
                  <td>
                    <input type="password" id="ssn" placeholder="•••••••••" className="input-field" />
                  </td>
                </tr>
              </tbody>
            </table>
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
