// File: src/components/classical/KeyExchangeVisualization.jsx
import React from 'react';
import {
  UserIcon,
  ServerIcon,
  EyeIcon,
  CheckCircleIcon
} from '../ui/Icons';
import { Skeleton } from '../ui/Skeleton';
import './KeyExchangeVisualization.css';

function KeyExchangeVisualization({
  aliceKeys,
  bobKeys,
  sharedSecret,
  currentStep,
  showEavesdropper,
  eavesdroppedKey,
  isGenerating
}) {
  const steps = [
    { id: 1, label: 'Generate Exponents' },
    { id: 2, label: 'Exchange Public Keys' },
    { id: 3, label: 'Compute Secret' },
    { id: 4, label: 'Verify Match' }
  ];

  return (
    <div className="key-exchange-viz">
      <div className="viz-header">
        <h3 className="viz-title">Diffie-Hellman Protocol Topology</h3>
        <div className="protocol-info-tags">
          <span className="info-tag">Discrete Logarithm</span>
          <span className="info-tag">Unauthenticated Public Channel</span>
          {showEavesdropper && <span className="info-tag warning">MitM Vulnerable</span>}
        </div>
      </div>

      <div className="exchange-diagram">
        {/* Alice Node */}
        <div className="party-card alice">
          <div className="party-header">
            <div className="party-icon-badge alice">
              <UserIcon size={18} />
            </div>
            <div className="party-info">
              <h4 className="party-name">Alice (Field Transmitter)</h4>
              <span className="party-role">Source Node A</span>
            </div>
          </div>

          <div className="party-keys-block">
            <div className="key-row">
              <span className="key-type">Private Exponent (a):</span>
              {isGenerating || !aliceKeys ? (
                <Skeleton variant="text" width="100%" height="22px" />
              ) : (
                <code className="key-snippet">
                  {aliceKeys.privateKey.substring(0, 14)}...
                </code>
              )}
            </div>
            <div className="key-row">
              <span className="key-type">Public Value (g^a mod p):</span>
              {isGenerating || !aliceKeys ? (
                <Skeleton variant="text" width="100%" height="22px" />
              ) : (
                <code className="key-snippet public">
                  {aliceKeys.publicKey.substring(0, 14)}...
                </code>
              )}
            </div>
          </div>
        </div>

        {/* Channel Transmission Core */}
        <div className="channel-exchange-core">
          <div className="channel-wire">
            {/* Alice to Bob Line */}
            <div className={`wire-line ${currentStep >= 1 ? 'is-active' : ''} to-bob`}>
              <span className="wire-label">g^a mod p &rarr;</span>
              {currentStep >= 1 && aliceKeys && (
                <code className="wire-packet">{aliceKeys.publicKey.substring(0, 8)}</code>
              )}
            </div>

            {/* Eve Intercept Probe */}
            {showEavesdropper && (
              <div className="eve-channel-probe">
                <div className="probe-indicator">
                  <EyeIcon size={15} />
                  <span>Eve Interception Probe</span>
                </div>
                {eavesdroppedKey ? (
                  <span className="probe-data">Compromised Fragment: {eavesdroppedKey}</span>
                ) : (
                  <span className="probe-data listening">Passive Sniffing of Public Values</span>
                )}
              </div>
            )}

            {/* Bob to Alice Line */}
            <div className={`wire-line ${currentStep >= 1 ? 'is-active' : ''} to-alice`}>
              <span className="wire-label">&larr; g^b mod p</span>
              {currentStep >= 1 && bobKeys && (
                <code className="wire-packet">{bobKeys.publicKey.substring(0, 8)}</code>
              )}
            </div>
          </div>

          {/* Shared Secret Verified State */}
          {sharedSecret && (
            <div className="shared-secret-banner">
              <div className="secret-title">Identical Shared Secret Computed</div>
              <code className="secret-hash">{sharedSecret.substring(0, 24)}...</code>
              <div className="secret-verified-tag">
                <CheckCircleIcon size={14} />
                <span>k = g^(ab) mod p established</span>
              </div>
            </div>
          )}
        </div>

        {/* Bob Node */}
        <div className="party-card bob">
          <div className="party-header">
            <div className="party-icon-badge bob">
              <ServerIcon size={18} />
            </div>
            <div className="party-info">
              <h4 className="party-name">Bob (HQ Gateway Server)</h4>
              <span className="party-role">Destination Node B</span>
            </div>
          </div>

          <div className="party-keys-block">
            <div className="key-row">
              <span className="key-type">Private Exponent (b):</span>
              {isGenerating || !bobKeys ? (
                <Skeleton variant="text" width="100%" height="22px" />
              ) : (
                <code className="key-snippet">
                  {bobKeys.privateKey.substring(0, 14)}...
                </code>
              )}
            </div>
            <div className="key-row">
              <span className="key-type">Public Value (g^b mod p):</span>
              {isGenerating || !bobKeys ? (
                <Skeleton variant="text" width="100%" height="22px" />
              ) : (
                <code className="key-snippet public">
                  {bobKeys.publicKey.substring(0, 14)}...
                </code>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="step-pipeline-row">
        {steps.map(step => (
          <div
            key={step.id}
            className={`pipeline-step ${currentStep >= step.id ? 'is-complete' : ''} ${currentStep + 1 === step.id ? 'is-active' : ''}`}
          >
            <span className="pipeline-step-num">{step.id}</span>
            <span className="pipeline-step-text">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Mathematical Foundation */}
      <div className="math-basis-card">
        <h4 className="math-basis-title">Mathematical Hardness Foundation</h4>
        <div className="math-formula-box">
          <code>Shared Secret: (g^a)^b mod p = (g^b)^a mod p = g^(ab) mod p</code>
        </div>
        <p className="math-basis-explanation">
          Security is computational: an eavesdropper sees generator g, prime modulus p, and public values 
          g^a and g^b, but computing secret exponent a requires solving the Discrete Logarithm problem.
          <strong> Vulnerability:</strong> Efficiently solvable on quantum hardware using Shor's algorithm in polynomial time O((log N)^3).
        </p>
      </div>
    </div>
  );
}

export default KeyExchangeVisualization;
