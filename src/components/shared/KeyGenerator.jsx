// File: src/components/shared/KeyGenerator.jsx
import React, { useState, useEffect } from 'react';
// import '../../styles/shared.css';
import './KeyGenerator.css';

function KeyGenerator({ type, keySize, onKeyGenerated }) {
  const [keyBits, setKeyBits] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  const generateKey = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setKeyBits([]);
    
    const totalBits = type === 'quantum' ? 256 : keySize;
    const bits = [];
    let progress = 0;
    
    const interval = setInterval(() => {
      if (progress >= totalBits) {
        clearInterval(interval);
        setIsGenerating(false);
        
        // Create final key representation
        const keyHex = bits.map(bit => bit.toString(16)).join('');
        setGeneratedKey(keyHex);
        
        if (onKeyGenerated) {
          onKeyGenerated({
            bits: bits,
            hex: keyHex,
            size: totalBits,
            type: type
          });
        }
        return;
      }
      
      // Generate bit
      const bit = Math.random() > 0.5 ? 1 : 0;
      bits.push(bit);
      
      // For quantum, simulate basis and polarization
      if (type === 'quantum') {
        const basis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal';
        const polarization = basis === 'rectilinear' 
          ? (bit === 1 ? 'vertical' : 'horizontal')
          : (bit === 1 ? '45deg' : '135deg');
        
        bits[bits.length - 1] = {
          bit,
          basis,
          polarization,
          id: Date.now() + Math.random()
        };
      }
      
      setKeyBits([...bits]);
      setGenerationProgress((progress + 1) / totalBits * 100);
      progress++;
    }, type === 'quantum' ? 50 : 10);
  };

  const resetKey = () => {
    setKeyBits([]);
    setGeneratedKey('');
    setGenerationProgress(0);
    setIsGenerating(false);
  };

  return (
    <div className={`key-generator ${type}`}>
      <div className="generator-header">
        <h3>
          {type === 'quantum' ? 'Quantum Key Generation' : 'Classical Key Generation'}
        </h3>
        <div className="key-size-badge">
          {type === 'quantum' ? '256 photons' : `${keySize} bits`}
        </div>
      </div>
      
      <div className="generation-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${generationProgress}%`,
              backgroundColor: type === 'quantum' ? '#00E5FF' : '#4DABFF'
            }}
          ></div>
        </div>
        <div className="progress-text">
          {isGenerating ? 'Generating...' : generationProgress === 100 ? 'Complete' : 'Ready'}
          <span className="progress-percent">{generationProgress.toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="bit-visualization">
        <div className="bit-grid">
          {keyBits.slice(0, 64).map((bit, index) => (
            <div 
              key={index}
              className={`bit-cell ${type} ${
                type === 'quantum' 
                  ? (bit.basis === 'rectilinear' ? 'rect' : 'diag')
                  : (bit === 1 ? 'one' : 'zero')
              }`}
              title={type === 'quantum' 
                ? `Bit: ${bit.bit}, Basis: ${bit.basis}, Pol: ${bit.polarization}`
                : `Bit: ${bit}`
              }
            >
              {type === 'quantum' ? (
                <div className={`photon ${bit.polarization}`}>
                  {bit.bit === 1 ? '↕️' : '↔️'}
                </div>
              ) : (
                <span>{bit}</span>
              )}
            </div>
          ))}
        </div>
        {keyBits.length > 64 && (
          <div className="bit-count">
            ... and {keyBits.length - 64} more bits
          </div>
        )}
      </div>
      
      {generatedKey && (
        <div className="generated-key-display">
          <h4>Generated Key:</h4>
          <div className="key-hex">
            <code>{generatedKey.substring(0, 64)}...</code>
          </div>
          <div className="key-metrics">
            <span className="metric">Entropy: {type === 'quantum' ? 'True Random' : 'Pseudo Random'}</span>
            <span className="metric">Length: {keyBits.length} {type === 'quantum' ? 'photons' : 'bits'}</span>
            <span className="metric">Security: {type === 'quantum' ? 'Information-Theoretic' : 'Computational'}</span>
          </div>
        </div>
      )}
      
      <div className="generator-controls">
        <button 
          className={`generate-btn ${type}`}
          onClick={generateKey}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : `Generate ${type === 'quantum' ? 'Quantum' : 'Classical'} Key`}
        </button>
        <button 
          className="reset-btn"
          onClick={resetKey}
        >
          Reset
        </button>
        {generatedKey && (
          <button className="copy-btn">
            Copy Key
          </button>
        )}
      </div>
      
      <div className="generator-info">
        <h4>Key Generation Information:</h4>
        <ul>
          {type === 'quantum' ? (
            <>
              <li>Uses quantum randomness from photon polarization</li>
              <li>Any measurement attempt disturbs quantum states</li>
              <li>Provides information-theoretic security</li>
              <li>Real photons transmitted over quantum channel</li>
            </>
          ) : (
            <>
              <li>Uses mathematical algorithms (PRNG)</li>
              <li>Fast generation using computer algorithms</li>
              <li>Security based on computational hardness</li>
              <li>Can be stored and reused</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default KeyGenerator;