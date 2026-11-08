// File: src/components/classical/ClassicalSimulator.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { generateClassicalKeys, simulateDiffieHellman, encryptMessage } from '../../utils/cryptography';
import KeyExchangeVisualization from './KeyExchangeVisualization';
import EncryptionDecryptionDemo from './EncryptionDecryptionDemo';
import SecurityMeter from './SecurityMeter';
import { PlayIcon, RotateCcwIcon, KeyIcon, AlertTriangleIcon, CheckCircleIcon } from '../ui/Icons';
import { Skeleton } from '../ui/Skeleton';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import './ClassicalSimulator.css';

function ClassicalSimulator({ simulationSpeed = 1, showEavesdropper, keySize }) {
  const [aliceKeys, setAliceKeys] = useState(null);
  const [bobKeys, setBobKeys] = useState(null);
  const [sharedSecret, setSharedSecret] = useState(null);
  const [transmissionStep, setTransmissionStep] = useState(0);
  const [encryptedMessage, setEncryptedMessage] = useState(null);
  const [eavesdroppedKey, setEavesdroppedKey] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const initializeKeys = useCallback(() => {
    setIsGenerating(true);
    setSharedSecret(null);
    setTransmissionStep(0);
    setEncryptedMessage(null);
    setEavesdroppedKey(null);

    // Simulate authentic key derivation calculation
    setTimeout(() => {
      const { alice, bob } = generateClassicalKeys(keySize);
      setAliceKeys(alice);
      setBobKeys(bob);
      setIsGenerating(false);
    }, 250 / simulationSpeed);
  }, [keySize, simulationSpeed]);

  useEffect(() => {
    initializeKeys();
  }, [initializeKeys]);

  const advanceStep = () => {
    if (transmissionStep < 5) {
      const nextStep = transmissionStep + 1;
      setTransmissionStep(nextStep);

      // Simulate key exchange at step 2
      if (nextStep === 2 && aliceKeys && bobKeys) {
        const secret = simulateDiffieHellman(aliceKeys, bobKeys);
        setSharedSecret(secret);

        if (showEavesdropper) {
          setEavesdroppedKey(secret.substring(0, 16) + '...');
        }
      }

      // Encrypt message at step 4
      if (nextStep === 4 && (sharedSecret || (aliceKeys && bobKeys))) {
        const secret = sharedSecret || simulateDiffieHellman(aliceKeys, bobKeys);
        if (!sharedSecret) setSharedSecret(secret);
        const message = 'OPERATION NIGHTFALL PROCEED TO CHECKPOINT ALPHA';
        const encrypted = encryptMessage(message, secret);
        setEncryptedMessage(encrypted);
      }
    }
  };

  const resetSimulation = () => {
    initializeKeys();
  };

  const steps = [
    { label: 'Key Generation', desc: 'Private & Public Keys' },
    { label: 'Public Exchange', desc: 'g^a & g^b mod p' },
    { label: 'Shared Secret', desc: 'Compute g^(ab)' },
    { label: 'Derivation', desc: 'HKDF Symmetric Key' },
    { label: 'Encryption', desc: 'AES-256-GCM Block' },
    { label: 'Transmission', desc: 'Ciphertext Over Wire' }
  ];

  return (
    <div className="classical-simulator">
      <div className="simulation-header">
        <div className="header-meta">
          <span className="section-kicker">ASYMMETRIC CRYPTOGRAPHIC PROTOCOL</span>
          <h2 className="section-title">Diffie-Hellman / RSA-{keySize} Key Exchange</h2>
        </div>
        <div className="protocol-badge-wrapper">
          <Badge
            variant={showEavesdropper ? 'error' : 'classical'}
            dot={true}
            icon={showEavesdropper ? <AlertTriangleIcon size={13} /> : <CheckCircleIcon size={13} />}
          >
            {showEavesdropper ? 'CHANNEL INTERCEPTED' : 'UNATTACKED CHANNEL'}
          </Badge>
        </div>
      </div>

      {/* Progress Pipeline */}
      <div className="progress-tracker" role="progressbar" aria-valuenow={transmissionStep + 1} aria-valuemin="1" aria-valuemax="6">
        {steps.map((step, index) => {
          const isCompleted = index < transmissionStep;
          const isCurrent = index === transmissionStep;
          return (
            <div
              key={step.label}
              className={`step-item ${isCompleted ? 'is-completed' : ''} ${isCurrent ? 'is-current' : ''}`}
            >
              <div className="step-disc">
                {isCompleted ? <CheckCircleIcon size={16} /> : index + 1}
              </div>
              <div className="step-content">
                <span className="step-label">{step.label}</span>
                <span className="step-desc">{step.desc}</span>
              </div>
            </div>
          );
        })}
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
            isGenerating={isGenerating}
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

          <div className="key-details-card">
            <h3 className="details-card-title">Cryptographic Material</h3>
            <div className="key-info-list">
              <div className="key-item">
                <span className="key-label">Alice Private Exponent (a):</span>
                {isGenerating || !aliceKeys ? (
                  <Skeleton variant="text" width="100%" height="24px" />
                ) : (
                  <code className="key-value mono">
                    {aliceKeys.privateKey.substring(0, 32)}...
                  </code>
                )}
              </div>

              <div className="key-item">
                <span className="key-label">Bob Public Exchange (g^b mod p):</span>
                {isGenerating || !bobKeys ? (
                  <Skeleton variant="text" width="100%" height="24px" />
                ) : (
                  <code className="key-value mono">
                    {bobKeys.publicKey.substring(0, 32)}...
                  </code>
                )}
              </div>

              {sharedSecret && (
                <div className="key-item">
                  <span className="key-label">Computed Shared Secret g^(ab) mod p:</span>
                  <code className="key-value secure mono">
                    {sharedSecret.substring(0, 32)}...
                  </code>
                </div>
              )}

              {showEavesdropper && eavesdroppedKey && (
                <div className="key-item compromised">
                  <span className="key-label intercept-label">
                    <AlertTriangleIcon size={13} />
                    <span>Intercepted Traffic (Eve Recovered Fragment):</span>
                  </span>
                  <code className="key-value error mono">
                    {eavesdroppedKey}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="simulation-controls-row">
        <Button
          variant="classical"
          size="md"
          icon={<PlayIcon size={15} />}
          onClick={advanceStep}
          disabled={transmissionStep >= 5 || isGenerating}
        >
          {transmissionStep === 0 ? 'Initialize Protocol Run' : 'Advance Next Step'}
        </Button>

        <Button
          variant="secondary"
          size="md"
          icon={<RotateCcwIcon size={14} />}
          onClick={resetSimulation}
        >
          Reset Simulation
        </Button>

        <Button
          variant="secondary"
          size="md"
          icon={<KeyIcon size={14} />}
          onClick={initializeKeys}
          disabled={isGenerating}
        >
          Regenerate Key Pair
        </Button>
      </div>
    </div>
  );
}

export default ClassicalSimulator;
