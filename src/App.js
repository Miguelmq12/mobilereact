import React, { useState } from 'react';
import './App.css';
import Capture from './capture';
import Signature from './signature';

function App() {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [showSignature, setShowSignature] = useState(false);
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

  const handleExit = () => {
    setShowSignature(true); // Mostrar el componente de firma digital
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (image || selectedImage) {
      const binaryData = image || selectedImage;
      console.log('Imagen en formato binario:', binaryData);
    } else {
      alert('Por favor, cargue una imagen antes de enviar.');
    }
  };

  return (
    <div className="container-welcome">
      {showSignature ? (
        <Signature /> // Mostrar el componente de firma
      ) : (
        <>
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
              
              {/* Sección de carga de archivo */}
              <div className="tab-container">
                <button
                  className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  Cargar Archivo
                </button>
                <button
                  className={`tab ${activeTab === 'camera' ? 'active' : ''}`}
                  onClick={() => setActiveTab('camera')}
                >
                  Capturar Imagen
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'upload' && (
                  <div className="upload-section">
                    <input
                      type="file"
                      id="image-upload"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="image-upload" className="labelUpload">
                      {selectedImage ? (
                        <div className="image-preview">
                          <img
                            src={selectedImage}
                            alt="Preview"
                            style={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      ) : (
                        'Seleccionar archivo'
                      )}
                    </label>
                  </div>
                )}
                {activeTab === 'camera' && (
                  <div className="upload-section">
                    <div className="camera-icon" onClick={handleOpenCamera}>
                      <label htmlFor="image-upload" className="upload-label">
                        {image ? (
                          <img
                            src={image}
                            alt="Captured"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '5px',
                            }}
                          />
                        ) : (
                          'Click to attach image'
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="button-group">
                <button className="button" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="button" onClick={handleExit}>Exit</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
