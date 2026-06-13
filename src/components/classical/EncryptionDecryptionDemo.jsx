// File: src/components/classical/EncryptionDecryptionDemo.jsx
import React, { useState, useEffect } from 'react';
// import '../../styles/classical.css';

import './EncryptionDecryptionDemo.css'; // In EncryptionDecryptionDemo.jsx

function EncryptionDecryptionDemo({ encryptedMessage, sharedSecret, currentStep }) {
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [showProcess, setShowProcess] = useState(false);
  const [encryptionSteps, setEncryptionSteps] = useState([]);
  
  const message = 'OPERATION NIGHTFALL PROCEED TO CHECKPOINT ALPHA';

  useEffect(() => {
    if (encryptedMessage && currentStep >= 4) {
      setCipherText(encryptedMessage);
      
      // Simulate decryption process
      const steps = [
        { text: 'Initializing AES-256 cipher', completed: false },
        { text: 'Loading shared secret key', completed: false },
        { text: 'Setting initialization vector (IV)', completed: false },
        { text: 'Applying Galois/Counter Mode (GCM)', completed: false },
        { text: 'Processing ciphertext blocks', completed: false },
        { text: 'Verifying authentication tag', completed: false },
        { text: 'Decryption complete', completed: false }
      ];
      setEncryptionSteps(steps);
      
      // Simulate step-by-step decryption
      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          setEncryptionSteps(prev => 
            prev.map((step, idx) => ({
              ...step,
              completed: idx <= stepIndex
            }))
          );
          stepIndex++;
          
          // Show decrypted text at the end
          if (stepIndex === steps.length) {
            setTimeout(() => {
              setDecryptedText(message);
            }, 500);
          }
        } else {
          clearInterval(interval);
        }
      }, 800);
      
      return () => clearInterval(interval);
    } else {
      // Reset when not in encryption step
      setCipherText('');
      setDecryptedText('');
      setEncryptionSteps([]);
    }
  }, [encryptedMessage, currentStep, message]);

  const getEncryptionAlgorithm = () => {
    if (sharedSecret?.length === 64) return 'AES-256-GCM';
    if (sharedSecret?.length === 48) return 'AES-192-GCM';
    return 'AES-128-GCM';
  };

  return (
    <div className="encryption-demo">
      <div className="demo-header">
        <h3>Encryption/Decryption Process</h3>
        <div className="algorithm-badge">
          <span className="algorithm-name">{getEncryptionAlgorithm()}</span>
          <span className="algorithm-mode">Symmetric Encryption</span>
        </div>
      </div>
      
      <div className="message-flow">
        {/* Original Message */}
        <div className="message-box original">
          <div className="box-header">
            {/* <span className="box-icon">📝</span> */}
            <span className="box-title">Original Message</span>
          </div>
          <div className="box-content">
            <div className="message-text">{message}</div>
            <div className="message-meta">
              <span className="meta-item">Length: {message.length} chars</span>
              <span className="meta-item">Type: Plaintext</span>
              <span className="meta-item">Status: Unencrypted</span>
            </div>
          </div>
        </div>
        
        {/* Encryption Arrow */}
        <div className={`flow-arrow ${currentStep >= 4 ? 'active' : ''}`}>
          <div className="arrow-icon">↓</div>
          <div className="arrow-label">
            {currentStep >= 4 ? 'Encrypting...' : 'Waiting for key'}
          </div>
        </div>
        
        {/* Encrypted Message */}
        <div className={`message-box encrypted ${currentStep >= 4 ? 'active' : ''}`}>
          <div className="box-header">
            {/* <span className="box-icon">🔐</span> */}
            <span className="box-title">Encrypted Message</span>
          </div>
          <div className="box-content">
            {cipherText ? (
              <>
                <div className="cipher-text">
                  <code>{cipherText.substring(0, 60)}...</code>
                </div>
                <div className="cipher-meta">
                  <span className="meta-item">Base64 encoded</span>
                  <span className="meta-item">Secure transmission</span>
                  <button 
                    className="view-btn"
                    onClick={() => setShowProcess(!showProcess)}
                  >
                    {showProcess ? 'Hide Process' : 'Show Encryption Steps'}
                  </button>
                </div>
              </>
            ) : (
              <div className="placeholder">
                {/* <div className="placeholder-icon">⏳</div> */}
                <div className="placeholder-text">Waiting for encryption...</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Decryption Arrow */}
        <div className={`flow-arrow ${decryptedText ? 'active' : ''}`}>
          <div className="arrow-icon">↓</div>
          <div className="arrow-label">
            {decryptedText ? 'Decrypted Successfully' : 'Decryption pending'}
          </div>
        </div>
        
        {/* Decrypted Message */}
        <div className={`message-box decrypted ${decryptedText ? 'active' : ''}`}>
          <div className="box-header">
            {/* <span className="box-icon">✅</span> */}
            <span className="box-title">Decrypted Message</span>
          </div>
          <div className="box-content">
            {decryptedText ? (
              <>
                <div className="decrypted-text">
                  {decryptedText}
                </div>
                <div className="decrypted-meta">
                  <span className="meta-item success">✓ Integrity verified</span>
                  <span className="meta-item success">✓ Authenticity confirmed</span>
                  <span className="meta-item success">✓ Confidentiality maintained</span>
                </div>
              </>
            ) : (
              <div className="placeholder">
                {/* <div className="placeholder-icon">🔑</div> */}
                <div className="placeholder-text">Decryption in progress...</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Encryption Process Details */}
      {showProcess && encryptionSteps.length > 0 && (
        <div className="process-details">
          <h4>Encryption/Decryption Process Steps:</h4>
          <div className="steps-list">
            {encryptionSteps.map((step, index) => (
              <div key={index} className={`process-step ${step.completed ? 'completed' : ''}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <div className="step-text">{step.text}</div>
                  {step.completed && (
                    <div className="step-status">
                      <span className="status-icon">✓</span>
                      <span className="status-text">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Key Usage */}
      <div className="key-usage">
        <h4>Key Usage in Encryption:</h4>
        <div className="usage-grid">
          <div className="usage-item">
            {/* <div className="usage-icon">🔑</div> */}
            <div className="usage-content">
              <div className="usage-title">Shared Secret</div>
              <div className="usage-desc">Derived from Diffie-Hellman exchange</div>
              {sharedSecret && (
                <code className="usage-key">{sharedSecret.substring(0, 24)}...</code>
              )}
            </div>
          </div>
          <div className="usage-item">
            {/* <div className="usage-icon">⚙️</div> */}
            <div className="usage-content">
              <div className="usage-title">Key Derivation</div>
              <div className="usage-desc">HKDF used to create AES key</div>
              <div className="usage-desc">Salt: Random 128-bit value</div>
            </div>
          </div>
          <div className="usage-item">
            {/* <div className="usage-icon">🛡️</div> */}
            <div className="usage-content">
              <div className="usage-title">Security Features</div>
              <div className="usage-desc">Authenticated encryption (GCM)</div>
              <div className="usage-desc">Protects against tampering</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EncryptionDecryptionDemo;