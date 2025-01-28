import React, { useState, useRef, useEffect } from 'react';

const Signature = () => {
  const [drawing, setDrawing] = useState(false);
  const [font, setFont] = useState('Dancing Script');
  const [signatureType, setSignatureType] = useState('draw'); // Estado para seleccionar el tipo de firma
  const [fullName, setFullName] = useState(''); // Nombre completo ingresado
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (signatureType === 'draw') {
      // Inicializar el canvas y el contexto cada vez que cambiamos a "draw"
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
    }
  }, [signatureType]); // Este useEffect se activa cada vez que `signatureType` cambia

  // Limpiar el canvas al cambiar entre tabs
  useEffect(() => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas al cambiar de tipo de firma
    }
  }, [signatureType]);

  // Cambiar el tipo de firma entre "draw" o "type"
  const handleChangeSignatureType = (type) => {
    setSignatureType(type);
  };

  // Función para dibujar en el canvas
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();

    ctx.font = `48px ${font}`;
    ctx.strokeStyle = '#000';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  // Manejo de eventos de dibujo en touch y mouse
  const handleTouchStart = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const touch = e.touches[0]; // Obtiene el primer toque
      const rect = canvas.getBoundingClientRect(); // Calcula la posición del canvas
      ctxRef.current.beginPath(); // Inicia una nueva ruta de dibujo
      ctxRef.current.moveTo(touch.clientX - rect.left, touch.clientY - rect.top); // Mueve el punto de inicio al toque
      setDrawing(true); // Establece que estamos dibujando
    }
  };

  const handleTouchMove = (e) => {
    if (drawing) {
      const canvas = canvasRef.current;
      const touch = e.touches[0]; // Obtiene el primer toque
      const rect = canvas.getBoundingClientRect(); // Calcula la posición del canvas
      draw({ clientX: touch.clientX, clientY: touch.clientY }); // Llama a la función de dibujo pasando las coordenadas
    }
  };

  const handleTouchEnd = () => {
    setDrawing(false); // Detiene el dibujo cuando se levanta el dedo
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    draw(e);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  // Función para limpiar el canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Función para guardar la firma
  const handleSaveSignature = () => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      const signatureData = canvas.toDataURL('image/png');
      console.log('Signature data (base64):', signatureData);
    } else if (signatureType === 'type') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.font = `48px ${font}`;
      canvas.width = ctx.measureText(fullName).width;
      canvas.height = 60;
      ctx.fillText(fullName, 0, 50);
      const signatureData = canvas.toDataURL('image/png');
      console.log('Typed Signature data (base64):', signatureData);
    }
  };

  return (
    <div className="container-welcome">
      <h1 className="title">Digital Signature</h1>
      <p className="message">
        I hereby voluntarily consent to use a digital signature for the completion of my new hire paperwork online. I understand that my digital signature holds the same legal weight and validity as a handwritten signature.
      </p>

      {/* Pestañas para alternar entre tipo de firma */}
      <div className="tab-container">
        <button
          className={`tab ${signatureType === 'draw' ? 'active' : ''}`}
          onClick={() => handleChangeSignatureType('draw')}
        >
          Draw Signature
        </button>
        <button
          className={`tab ${signatureType === 'type' ? 'active' : ''}`}
          onClick={() => handleChangeSignatureType('type')}
        >
          Type Full Name
        </button>
      </div>

      <div class="tab-content">

      {signatureType === 'type' && (
        <div className="signature-options">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
              autoComplete="off"
            style={{ padding: '5px', fontSize: '1em',}}
          />

          <div
            style={{
              fontFamily: font,
              fontSize: '35px',
              marginTop: '20px',
              color: '#000',
            }}
          >
            {fullName}
          </div>
        </div>
      )}

      {/* Canvas para dibujar la firma */}
      {signatureType === 'draw' && (
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            style={{ border: '1px solid white', marginTop: '20px', touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      )}

      </div>



      <div className="button-group">
                <button className="button" onClick={handleClear}>
                Clear
                </button>
                <button className="button" onClick={handleSaveSignature}>Save Signature</button>
      </div>


    </div>
  );
};

export default Signature;
