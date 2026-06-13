// File: src/components/classical/KeyExchangeVisualization.jsx
import React from 'react';
// import '../../styles/classical.css';

import './KeyExchangeVisualization.css'; // In KeyExchangeVisualization.jsx

function KeyExchangeVisualization({
  aliceKeys,
  bobKeys,
  sharedSecret,
  currentStep,
  showEavesdropper,
  eavesdroppedKey
}) {
  const steps = [
    { id: 1, label: 'Generate Key Pairs', alice: 'Private Key', bob: 'Private Key' },
    { id: 2, label: 'Exchange Public Keys', alice: 'Sends Public Key', bob: 'Sends Public Key' },
    { id: 3, label: 'Compute Shared Secret', alice: 'Computes Secret', bob: 'Computes Secret' },
    { id: 4, label: 'Verify Match', alice: 'Shared Secret', bob: 'Shared Secret' }
  ];

  return (
    <div className="key-exchange-viz">
      <div className="viz-header">
        <h3>Diffie-Hellman Key Exchange Visualization</h3>
        <div className="protocol-info">
          <span className="info-tag">Modular Exponentiation</span>
          <span className="info-tag">Public Channel</span>
          {showEavesdropper && <span className="info-tag warning">Eavesdropper Active</span>}
        </div>
      </div>
      
      <div className="exchange-diagram">
        {/* Alice Section */}
        <div className="party-section alice">
          <div className="party-header">
            <div className="party-icon">🕵️</div>
            <div className="party-info">
              <h4>Alice (Field Agent)</h4>
              <span className="party-status">Generating keys...</span>
            </div>
          </div>
          
          <div className="key-display">
            <div className="key-item">
              <span className="key-label">Private Key (a):</span>
              <div className="key-value">
                {aliceKeys?.privateKey?.substring(0, 16) || 'Generating...'}
              </div>
            </div>
            <div className="key-item">
              <span className="key-label">Public Key (g^a mod p):</span>
              <div className="key-value public">
                {aliceKeys?.publicKey?.substring(0, 16) || 'Generating...'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle - Exchange Area */}
        <div className="exchange-area">
          <div className="exchange-path">
            {/* Public Key Transmission Lines */}
            <div className={`transmission-line ${currentStep >= 1 ? 'active' : ''} to-bob`}>
              <div className="line-arrow"></div>
              <div className="line-label">
                Public Key A → B
                {currentStep >= 1 && (
                  <div className="transmission-data">
                    {aliceKeys?.publicKey?.substring(0, 8) || '...'}
                  </div>
                )}
              </div>
            </div>
            
            <div className={`transmission-line ${currentStep >= 1 ? 'active' : ''} to-alice`}>
              <div className="line-arrow"></div>
              <div className="line-label">
                Public Key B → A
                {currentStep >= 1 && (
                  <div className="transmission-data">
                    {bobKeys?.publicKey?.substring(0, 8) || '...'}
                  </div>
                )}
              </div>
            </div>
            
            {/* Eavesdropper */}
            {showEavesdropper && (
              <div className="eavesdropper-overlay">
                {/* <div className="eavesdropper-icon">👁️</div> */}
                <div className="eavesdropper-text">INTERCEPTING</div>
                {eavesdroppedKey && (
                  <div className="intercepted-data">
                    Intercepted: {eavesdroppedKey}
                  </div>
                )}
              </div>
            )}
            
            {/* Shared Secret Display */}
            {sharedSecret && (
              <div className="shared-secret-display">
                <div className="secret-header">Computed Shared Secret:</div>
                <div className="secret-value">
                  {sharedSecret.substring(0, 32)}...
                </div>
                <div className="secret-verification">
                  <span className="verification-icon">✅</span>
                  <span>Both parties computed identical secret</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bob Section */}
        <div className="party-section bob">
          <div className="party-header">
            <div className="party-icon">🏢</div>
            <div className="party-info">
              <h4>Bob (HQ Server)</h4>
              <span className="party-status">Generating keys...</span>
            </div>
          </div>
          
          <div className="key-display">
            <div className="key-item">
              <span className="key-label">Private Key (b):</span>
              <div className="key-value">
                {bobKeys?.privateKey?.substring(0, 16) || 'Generating...'}
              </div>
            </div>
            <div className="key-item">
              <span className="key-label">Public Key (g^b mod p):</span>
              <div className="key-value public">
                {bobKeys?.publicKey?.substring(0, 16) || 'Generating...'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Step Indicator */}
      <div className="step-indicator">
        {steps.map(step => (
          <div 
            key={step.id} 
            className={`step ${currentStep >= step.id ? 'completed' : ''} ${currentStep + 1 === step.id ? 'current' : ''}`}
          >
            <div className="step-number">{step.id}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
      
      {/* Mathematical Explanation */}
      <div className="math-explanation">
        <h4>Mathematical Foundation:</h4>
        <div className="math-formula">
          <code>
            {/* FIXED: Escape the mathematical notation */}
            {'Shared Secret = (g^a)^b mod p = (g^b)^a mod p = g^{a×b} mod p'}
          </code>
        </div>
        <div className="math-description">
          <p>
            Both parties independently compute the same shared secret without ever transmitting it.
            Security relies on the difficulty of solving the discrete logarithm problem.
          </p>
          {showEavesdropper && (
            <p className="security-warning">
              {/* FIXED: Escape the mathematical notation */}
              {'⚠️ Eavesdropper sees g^a and g^b but cannot compute g^{a×b} without a or b'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default KeyExchangeVisualization;