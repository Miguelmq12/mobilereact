import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [dob, setDob] = useState('');
  const [ssn, setSsn] = useState('');
  const [image, setImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error al acceder a la cámara: ", error);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [isCameraOn]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setImage(dataUrl);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
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
          {isCameraOn ? (
            <div>
              <video ref={videoRef} autoPlay></video>
              <div>
                <button onClick={captureImage}>Capturar Imagen</button>
                <button onClick={() => setIsCameraOn(false)}>Apagar Cámara</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsCameraOn(true)}>Encender Cámara</button>
          )}
        </div>

        <div>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            capture="camera"
            onChange={handleImageUpload}
            className="image-upload"
          />
        </div>

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

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;






