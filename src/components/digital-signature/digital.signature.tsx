import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent, TouchEvent } from 'react';

import './digital-signature.css';
import { useNavigate } from 'react-router-dom';

type SignatureType = 'draw' | 'type'; 

const Signature: React.FC = () => {
    const navigate = useNavigate();
  const [drawing, setDrawing] = useState<boolean>(false);
  const [font, setFont] = useState<string>('Dancing Script');
  const [signatureType, setSignatureType] = useState<SignatureType>('draw'); 
  const [fullName, setFullName] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
        if (ctx) {
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.strokeStyle = '#000';
        }
      }
    }
  }, [signatureType]); 

  useEffect(() => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
      }
    }
  }, [signatureType]);

  const handleChangeSignatureType = (type: SignatureType): void => {
    setSignatureType(type);
  };

  const draw = (e: MouseEvent | TouchEvent): void => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const handleTouchStart = (e: TouchEvent): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      const touch = e.touches[0]; 
      const rect = canvas.getBoundingClientRect(); 
      ctxRef.current?.beginPath(); 
      ctxRef.current?.moveTo(touch.clientX - rect.left, touch.clientY - rect.top); 
      setDrawing(true); 
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (drawing) {
      draw(e);
    }
  };

  const handleTouchEnd = (): void => {
    setDrawing(false); 
  };

  const handleMouseDown = (e: MouseEvent): void => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    ctxRef.current?.beginPath();
    if (rect) {
      ctxRef.current?.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    setDrawing(true);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    draw(e);
  };

  const handleMouseUp = (): void => {
    setDrawing(false);
  };

  const handleClear = (): void => {
    navigate('/landing-page');
  };

  const handleSaveSignature = (): void => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const signatureData = canvas.toDataURL('image/png');
        console.log('Signature data (base64):', signatureData);
      }
    } else if (signatureType === 'type') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = `48px ${font}`;
        canvas.width = ctx.measureText(fullName).width;
        canvas.height = 60;
        ctx.fillText(fullName, 0, 50);
        const signatureData = canvas.toDataURL('image/png');
        console.log('Typed Signature data (base64):', signatureData);
      }
    }
  };

  return (
    <div className="container-welcome">
      <h1 className="title">Digital Signature</h1>
      <p className="message">
        I hereby voluntarily consent to use a digital signature for the completion of my new hire paperwork online. I understand that my digital signature holds the same legal weight and validity as a handwritten signature.
      </p>

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

      <div className="tab-content">
        {signatureType === 'type' && (
          <div className="signature-options">
            <input
              type="text"
              value={fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="off"
              style={{ padding: '5px', fontSize: '1em' }}
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
          Exit
        </button>
        <button className="button" onClick={handleSaveSignature}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signature;
