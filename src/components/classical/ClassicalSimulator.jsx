// File: src/components/classical/ClassicalSimulator.jsx
import React, { useState, useEffect, useCallback } from 'react';  // Added useCallback
// import '../../styles/classical.css';
import { generateClassicalKeys, simulateDiffieHellman, encryptMessage } from '../../utils/cryptography';
import KeyExchangeVisualization from './KeyExchangeVisualization';
import EncryptionDecryptionDemo from './EncryptionDecryptionDemo';
import SecurityMeter from './SecurityMeter';

import './ClassicalSimulator.css'; // In ClassicalSimulator.jsx

function ClassicalSimulator({ simulationSpeed, showEavesdropper, keySize }) {
  const [aliceKeys, setAliceKeys] = useState(null);
  const [bobKeys, setBobKeys] = useState(null);
  const [sharedSecret, setSharedSecret] = useState(null);
  const [transmissionStep, setTransmissionStep] = useState(0);
  const [encryptedMessage, setEncryptedMessage] = useState(null);
  const [eavesdroppedKey, setEavesdroppedKey] = useState(null);

  // Fixed: Added useCallback to prevent infinite re-renders
  const initializeKeys = useCallback(() => {
    const { alice, bob } = generateClassicalKeys(keySize);
    setAliceKeys(alice);
    setBobKeys(bob);
    setSharedSecret(null);
    setTransmissionStep(0);
    setEncryptedMessage(null);
    setEavesdroppedKey(null);
  }, [keySize]);

  useEffect(() => {
    // Initialize keys when component mounts or keySize changes
    initializeKeys();
  }, [initializeKeys]); // Fixed: Added initializeKeys to dependency array

  const advanceStep = () => {
    if (transmissionStep < 5) { // Changed from steps.length - 1 to hardcoded 5
      setTransmissionStep(prev => prev + 1);
      
      // Simulate key exchange at step 2
      if (transmissionStep === 1 && aliceKeys && bobKeys) {
        const secret = simulateDiffieHellman(aliceKeys, bobKeys);
        setSharedSecret(secret);
        
        // Simulate eavesdropping
        if (showEavesdropper) {
          setEavesdroppedKey(secret.substring(0, 16) + '...');
        }
      }
      
      // Encrypt message at step 4
      if (transmissionStep === 3 && sharedSecret) {
        const message = 'OPERATION NIGHTFALL PROCEED TO CHECKPOINT ALPHA';
        const encrypted = encryptMessage(message, sharedSecret);
        setEncryptedMessage(encrypted);
      }
    }
  };

  const resetSimulation = () => {
    initializeKeys();
  };

  const steps = [
    'Key Generation',
    'Public Key Exchange',
    'Shared Secret Computation',
    'Symmetric Key Derivation',
    'Message Encryption',
    'Secure Transmission'
  ];

  return (
    <div className="classical-simulator">
      <div className="simulation-header">
        <h2>Classical Cryptographic Protocol</h2>
        <div className="protocol-badge">
          <span className="protocol-name">RSA-{keySize} / Diffie-Hellman</span>
          <span className="protocol-status">
            {showEavesdropper ? 'UNDER ATTACK' : 'SECURE'}
          </span>
        </div>
      </div>

      <div className="progress-tracker">
        {steps.map((step, index) => (
          <div key={step} className={`step ${index <= transmissionStep ? 'completed' : ''} ${index === transmissionStep ? 'current' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>

      <div className="simulation-content">
        <div className="left-panel">
          <KeyExchangeVisualization
            aliceKeys={aliceKeys}
            bobKeys={bobKeys}
            sharedSecret={sharedSecret}
            currentStep={transmissionStep}
            showEavesdropper={showEavesdropper}
            eavesdroppedKey={eavesdroppedKey}
          />
          
          <SecurityMeter
            keySize={keySize}
            showEavesdropper={showEavesdropper}
            eavesdroppedKey={eavesdroppedKey}
            transmissionStep={transmissionStep}
          />
        </div>

        <div className="right-panel">
          <EncryptionDecryptionDemo
            encryptedMessage={encryptedMessage}
            sharedSecret={sharedSecret}
            currentStep={transmissionStep}
          />
          
          <div className="key-details">
            <h3>Key Information</h3>
            <div className="key-info">
              <div className="key-item">
                <span className="key-label">Alice's Private Key:</span>
                <code className="key-value">
                  {aliceKeys?.privateKey?.substring(0, 32) || 'Generating...'}
                </code>
              </div>
              <div className="key-item">
                <span className="key-label">Bob's Public Key:</span>
                <code className="key-value">
                  {bobKeys?.publicKey?.substring(0, 32) || 'Generating...'}
                </code>
              </div>
              {sharedSecret && (
                <div className="key-item">
                  <span className="key-label">Shared Secret:</span>
                  <code className="key-value secure">
                    {sharedSecret.substring(0, 32)}...
                  </code>
                </div>
              )}
              {showEavesdropper && eavesdroppedKey && (
                <div className="key-item compromised">
                  <span className="key-label">🕵️ Eavesdropper's Guess:</span>
                  <code className="key-value">
                    {eavesdroppedKey}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="simulation-controls">
        <button 
          className="control-btn primary"
          onClick={advanceStep}
          disabled={transmissionStep >= 5}
        >
          {transmissionStep === 0 ? 'Start Protocol' : 'Next Step'}
        </button>
        <button className="control-btn secondary" onClick={resetSimulation}>
          Reset Simulation
        </button>
        <button className="control-btn" onClick={initializeKeys}>
          Generate New Keys
        </button>
      </div>
    </div>
  );
}

export default ClassicalSimulator;