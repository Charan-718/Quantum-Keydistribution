// File: src/components/classical/EncryptionDecryptionDemo.jsx
import React, { useState, useEffect } from 'react';
import { LockIcon, UnlockIcon, CheckCircleIcon, ArrowDownIcon } from '../ui/Icons';
import './EncryptionDecryptionDemo.css';

function EncryptionDecryptionDemo({ encryptedMessage, sharedSecret, currentStep }) {
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [showProcess, setShowProcess] = useState(false);
  const [encryptionSteps, setEncryptionSteps] = useState([]);

  const message = 'OPERATION NIGHTFALL PROCEED TO CHECKPOINT ALPHA';

  useEffect(() => {
    if (encryptedMessage && currentStep >= 4) {
      setCipherText(encryptedMessage);

      const steps = [
        { text: 'Initialize AES-256 cipher context', completed: false },
        { text: 'Load 256-bit symmetric key derived via HKDF', completed: false },
        { text: 'Generate 96-bit Initialization Vector (IV)', completed: false },
        { text: 'Apply Galois/Counter Mode (GCM) block encryption', completed: false },
        { text: 'Synthesize 128-bit authentication tag', completed: false },
        { text: 'Ciphertext verified & decrypted successfully', completed: false }
      ];
      setEncryptionSteps(steps);

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

          if (stepIndex === steps.length) {
            setTimeout(() => {
              setDecryptedText(message);
            }, 300);
          }
        } else {
          clearInterval(interval);
        }
      }, 350);

      return () => clearInterval(interval);
    } else {
      setCipherText('');
      setDecryptedText('');
      setEncryptionSteps([]);
    }
  }, [encryptedMessage, currentStep, message]);

  return (
    <div className="encryption-demo-panel">
      <div className="demo-header">
        <h3 className="demo-title">Symmetric Payload Encryption</h3>
        <div className="algo-badge">
          <span className="algo-name">AES-256-GCM</span>
          <span className="algo-mode">AEAD Mode</span>
        </div>
      </div>

      <div className="payload-flow">
        {/* Stage 1: Plaintext */}
        <div className="payload-card plaintext">
          <div className="card-header-row">
            <span className="card-badge-label">1. Original Plaintext</span>
            <span className="card-length">{message.length} bytes</span>
          </div>
          <div className="payload-body">
            <p className="payload-text">{message}</p>
          </div>
        </div>

        {/* Transition Arrow 1 */}
        <div className={`flow-transition ${currentStep >= 4 ? 'is-active' : ''}`}>
          <ArrowDownIcon size={16} />
          <span className="flow-step-tag">
            {currentStep >= 4 ? 'Encrypting with Shared Secret' : 'Pending Key Exchange'}
          </span>
        </div>

        {/* Stage 2: Ciphertext */}
        <div className={`payload-card ciphertext ${currentStep >= 4 ? 'is-active' : ''}`}>
          <div className="card-header-row">
            <span className="card-badge-label">2. Encrypted Ciphertext</span>
            {cipherText && (
              <button
                type="button"
                className="toggle-process-btn"
                onClick={() => setShowProcess(!showProcess)}
              >
                {showProcess ? 'Hide Pipeline' : 'Inspect GCM Steps'}
              </button>
            )}
          </div>
          <div className="payload-body">
            {cipherText ? (
              <code className="cipher-block">{cipherText}</code>
            ) : (
              <div className="empty-state-notice">
                <LockIcon size={16} />
                <span>Waiting for shared key derivation...</span>
              </div>
            )}
          </div>
        </div>

        {/* Transition Arrow 2 */}
        <div className={`flow-transition ${decryptedText ? 'is-active' : ''}`}>
          <ArrowDownIcon size={16} />
          <span className="flow-step-tag">
            {decryptedText ? 'Bob Authenticated & Decrypted' : 'Awaiting Transmission'}
          </span>
        </div>

        {/* Stage 3: Decrypted Text */}
        <div className={`payload-card decrypted ${decryptedText ? 'is-verified' : ''}`}>
          <div className="card-header-row">
            <span className="card-badge-label">3. Decrypted Payload</span>
            {decryptedText && (
              <span className="auth-verified-badge">
                <CheckCircleIcon size={12} />
                <span>GCM Tag Verified</span>
              </span>
            )}
          </div>
          <div className="payload-body">
            {decryptedText ? (
              <p className="payload-text verified">{decryptedText}</p>
            ) : (
              <div className="empty-state-notice">
                <UnlockIcon size={16} />
                <span>Payload unretrieved</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded GCM Pipeline Steps */}
      {showProcess && encryptionSteps.length > 0 && (
        <div className="gcm-process-drawer">
          <h4 className="drawer-title">Galois/Counter Mode Pipeline</h4>
          <div className="drawer-steps-list">
            {encryptionSteps.map((step, idx) => (
              <div key={idx} className={`drawer-step-item ${step.completed ? 'is-done' : ''}`}>
                <span className="step-check-dot">
                  {step.completed ? <CheckCircleIcon size={12} /> : idx + 1}
                </span>
                <span className="step-text">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EncryptionDecryptionDemo;
