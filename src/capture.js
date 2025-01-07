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
      <div className="button-group">
      <button className="button" onClick={capture}>Capturar Imagen</button>
      </div>

      INSTRUCTIONS
      <p>Take a headshot with a plain, light-colored background and even lighting to avoid shadows or bright spots. Wear business casual attire without logos or patterns, and ensure no glare if wearing glasses.</p>
    </div>
  );
}

export default Capture;
