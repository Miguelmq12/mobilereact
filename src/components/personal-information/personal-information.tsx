import React, { useState, ChangeEvent, MouseEvent } from 'react';
import './personal-information.css';
import Capture from '../../capture';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Compress from 'compress.js';
import { useNavigate } from 'react-router-dom';

interface AppState {
  image: string | null;
  showCamera: boolean;
  selectedImage: string | null;
  activeTab: 'upload' | 'camera';
  showSignature: boolean;
  ssn: string;
  showSsn: boolean;
}

const PersonalInformation = () => {

  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const maxFileSize = 2 * 1024 * 1024; // 2 MB

  const [ssn, setSsn] = useState<string>('');
  const [showSsn, setShowSsn] = useState<boolean>(false);

  const toggleShowSsn = () => {
    setShowSsn(!showSsn);
  };

  const formattedSsn = ssn.replace(/\d/g, '*');

  const handleSsnChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/[^\d\-]/g, '');
    if (value.length > 3 && value[3] !== '-') {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    if (value.length > 6 && value[6] !== '-') {
      value = value.slice(0, 6) + '-' + value.slice(6);
    }
    setSsn(value);
  };

  const handleCapture = (imageSrc: string) => {
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
    navigate('/landing-page');
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
  
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'image/bmp', 'image/tiff', 'image/heif', 'image/heic'
      ];

      if (validImageTypes.includes(fileType)) {
        if (selectedFile.size > maxFileSize) {
          alert('El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.');
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert('Por favor, seleccione un archivo de imagen válido.');
      }
    }
  };

  const compressImage = (imageFile: File): Promise<string> => {
    const compress = new Compress();
    return new Promise((resolve, reject) => {
      compress.compress([imageFile], {
        size: 2, 
        quality: 0.75, // Calidad de la imagen, 0 a 1 (0.75 es generalmente bueno)
        maxWidth: 1024,
        maxHeight: 1024, 
        resize: true,
      }).then((compressedImages) => {
        const compressedImage = compressedImages[0];
        resolve(compressedImage.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const handleSubmit = () => {
    if (image || selectedImage) {
      const isValidImage = (image || selectedImage)?.startsWith('data:image/');
      if (isValidImage) {
        const file = selectedImage ? selectedImage : image;
        const img = new Image();
        img.onload = () => {
          const fileSize = Math.round(file!.length * 0.75);
          if (fileSize > maxFileSize) {
            alert('El archivo de imagen es demasiado grande. El tamaño máximo permitido es 10KB.');
          } else {
            const binaryData = image || selectedImage;
            console.log('Imagen en formato binario:', binaryData);
          }
        };
        img.src = isValidImage ? file! : '';
      } else {
        alert('El archivo seleccionado no es una imagen válida.');
      }
    } else {
      alert('Por favor, cargue una imagen antes de enviar.');
    }
  };

  return (
    <div className="container-welcome">
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

              <div className="input-table">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="dob">Enter Date of Birth</label>
                      </td>
                      <td>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          className="input-field"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="tab-container">
                <button
                  className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  Upload
                </button>
                <button
                  className={`tab ${activeTab === 'camera' ? 'active' : ''}`}
                  onClick={() => setActiveTab('camera')}
                >
                  Capture
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
                        'Select image file'
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
                          'Take a picture'
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="button-group">
                <button className="button" onClick={handleExit}>
                  Exit
                </button>
                <button className="button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          )}
        </>

    </div>
  );
}

export default PersonalInformation;
