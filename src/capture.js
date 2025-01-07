import React from 'react';
import Webcam from 'react-webcam';

function Capture({ onCapture, onClose }) {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="camera-container">
      <button onClick={onClose} className="back-button">←</button>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{ facingMode: "user" }}
      />
      <div>
        <button onClick={capture}>Capturar Imagen</button>
        <button onClick={onClose}>Finalizar</button>
      </div>
    </div>
  );
}

export default Capture;
