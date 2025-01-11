import React, { useState, useRef, useEffect } from 'react';

const Signature = () => {
  const [drawing, setDrawing] = useState(false);
  const [font, setFont] = useState('cursive');
  const [fontList] = useState([
    'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana', 'Cursive', 'Comic Sans MS', 'Tahoma', 'Trebuchet MS', 'Segoe UI'
  ]);
  const [fontInput, setFontInput] = useState('');
  const [showFontModal, setShowFontModal] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
    }
  }, []);

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();

    ctx.font = `48px ${font}`; // Aplicar la fuente *aquí*
    ctx.strokeStyle = '#000';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();

  }

  const handleTouchStart = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
      setDrawing(true);
    }
  };

  const handleTouchMove = (e) => {
    if (drawing) {
      const canvas = canvasRef.current;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      draw({clientX:touch.clientX, clientY:touch.clientY});
    }
  };

  const handleTouchEnd = () => {
    setDrawing(false);
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


  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL('image/png');
    console.log('Signature data (binary):', signatureData);
  };

  const handleFontInputChange = (e) => {
    setFontInput(e.target.value);
  };

  const handleFontSelect = (selectedFont) => {
    setFont(selectedFont);
    setShowFontModal(false);
  };

  const handleSearchFontClick = () => {
    setShowFontModal(true);
  };

  return (
    <div className="container-welcome">
      <h1 className="title">Digital Signature</h1>
      <p className="message">
        I hereby voluntarily consent to use a digital signature for the completion of my new hire paperwork online. I understand that my digital signature holds the same legal weight and validity as a handwritten signature.
        <br />
        I acknowledge the following:
        <br />
        - All signed documents will be stored electronically.
        <br />
        - The company will implement measures to safeguard my information.
        <br />
        - I retain the right to withdraw my consent at any point, though this may result in a delay in the hiring process.
      </p>

      <div className="signature-container">
        <div className="signature-options">
          <input
            type="text"
            value={fontInput}
            onClick={handleSearchFontClick}
            onChange={handleFontInputChange}
            placeholder="Search font"
            style={{ padding: '5px', fontSize: '1em', fontFamily: font }}
          />
        </div>

        {showFontModal && (
          <div className="font-modal">
            <div className="font-modal-content">
              <h2>Select a Font</h2>
              <div className="font-list">
                {fontList.map((font, index) => (
                  <div
                    key={index}
                    onClick={() => handleFontSelect(font)}
                    className="font-option"
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </div>
                ))}
              </div>
              <button onClick={() => setShowFontModal(false)}>Close</button>
            </div>
          </div>
        )}

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            style={{ border: '1px solid black', marginTop: '20px', touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>

        <div className="signature-actions">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleSaveSignature}>Save Signature</button>
        </div>
      </div>
    </div>
  );
};

export default Signature;