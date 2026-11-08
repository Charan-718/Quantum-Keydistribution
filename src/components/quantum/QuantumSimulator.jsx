// File: src/components/quantum/QuantumSimulator.jsx
import React, { useState, useEffect } from 'react';
import { generateQuantumKey, simulateBB84Protocol, detectEavesdropping } from '../../utils/quantumSimulation';
import PhotonVisualization from './PhotonVisualization';
import EavesdropperDetector from './EavesdropperDetector';
import QuantumAdvantages from './QuantumAdvantages';
import { PlayIcon, RotateCcwIcon, Sphere3DIcon, CheckCircleIcon, AlertTriangleIcon } from '../ui/Icons';
import { SkeletonBitSequence } from '../ui/Skeleton';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import './QuantumSimulator.css';

function QuantumSimulator({ simulationSpeed = 1, showEavesdropper, onOpen3DModel }) {
  const [photons, setPhotons] = useState([]);
  const [aliceBits, setAliceBits] = useState([]);
  const [bobMeasurements, setBobMeasurements] = useState([]);
  const [siftedKey, setSiftedKey] = useState([]);
  const [finalKey, setFinalKey] = useState([]);
  const [eavesdropperDetected, setEavesdropperDetected] = useState(false);
  const [errorRate, setErrorRate] = useState(0);
  const [transmissionPhase, setTransmissionPhase] = useState('idle');

  const phases = [
    { id: 'idle', label: 'Idle / Ready' },
    { id: 'generating', label: 'Single-Photon Pulse' },
    { id: 'transmitting', label: 'Polarization Channel' },
    { id: 'measuring', label: 'Conjugate Detection' },
    { id: 'sifting', label: 'Basis Reconciliation' },
    { id: 'final', label: 'Privacy Amplification' },
  ];

  useEffect(() => {
    if (showEavesdropper && transmissionPhase === 'transmitting') {
      const detectionResult = detectEavesdropping(photons, bobMeasurements);
      setEavesdropperDetected(detectionResult.detected);
      setErrorRate(detectionResult.errorRate);
    }
  }, [photons, bobMeasurements, showEavesdropper, transmissionPhase]);

  const startTransmission = () => {
    setTransmissionPhase('generating');
    setSiftedKey([]);
    setFinalKey([]);
    setEavesdropperDetected(false);
    setErrorRate(0);

    const { photons: newPhotons, aliceBits: newAliceBits } = generateQuantumKey(48);
    setPhotons(newPhotons);
    setAliceBits(newAliceBits);

    setTimeout(() => {
      setTransmissionPhase('transmitting');

      setTimeout(() => {
        const measurements = simulateBB84Protocol(newPhotons, showEavesdropper);
        setBobMeasurements(measurements);
        setTransmissionPhase('measuring');

        if (showEavesdropper) {
          const detectionResult = detectEavesdropping(newPhotons, measurements);
          setEavesdropperDetected(detectionResult.detected);
          setErrorRate(detectionResult.errorRate);
        }

        setTimeout(() => {
          const sifted = newAliceBits.filter((bit, index) =>
            measurements[index]?.basis === newPhotons[index]?.basis
          ).map(item => item.bit);

          setSiftedKey(sifted);
          setTransmissionPhase('sifting');

          setTimeout(() => {
            // Privacy amplification reduces sifting key by ~20%
            const final = sifted.slice(0, Math.floor(sifted.length * 0.8));
            setFinalKey(final);
            setTransmissionPhase('final');
          }, 800 / simulationSpeed);
        }, 800 / simulationSpeed);
      }, 1400 / simulationSpeed);
    }, 600 / simulationSpeed);
  };

  const resetSimulation = () => {
    setPhotons([]);
    setAliceBits([]);
    setBobMeasurements([]);
    setSiftedKey([]);
    setFinalKey([]);
    setEavesdropperDetected(false);
    setErrorRate(0);
    setTransmissionPhase('idle');
  };

  const isSimulating = transmissionPhase !== 'idle' && transmissionPhase !== 'final';

  return (
    <div className="quantum-simulator">
      <div className="simulation-header">
        <div className="header-meta">
          <span className="section-kicker">PHYSICAL CRYPTOGRAPHY ENGINE</span>
          <h2 className="section-title">BB84 Quantum Key Distribution Protocol</h2>
        </div>
        <div className="protocol-badge-wrapper">
          <Badge
            variant={eavesdropperDetected ? 'error' : 'quantum'}
            dot={true}
            icon={eavesdropperDetected ? <AlertTriangleIcon size={13} /> : <CheckCircleIcon size={13} />}
          >
            {eavesdropperDetected ? 'INTRUSION DETECTED (ABORT)' : 'QUANTUM CHANNEL SECURE'}
          </Badge>
        </div>
      </div>

      {/* Quantum Phase Pipeline */}
      <div className="quantum-phase-tracker">
        {phases.map((phase, idx) => {
          const currentIdx = phases.findIndex(p => p.id === transmissionPhase);
          const isCompleted = currentIdx > idx;
          const isActive = transmissionPhase === phase.id;

          return (
            <div
              key={phase.id}
              className={`quantum-phase-item ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
            >
              <div className="phase-disc">
                {isCompleted ? <CheckCircleIcon size={14} /> : idx + 1}
              </div>
              <span className="phase-label">{phase.label}</span>
            </div>
          );
        })}
      </div>

      <div className="simulation-content">
        <div className="quantum-visualization-area">
          <PhotonVisualization
            photons={photons}
            transmissionPhase={transmissionPhase}
            showEavesdropper={showEavesdropper}
            simulationSpeed={simulationSpeed}
          />

          <EavesdropperDetector
            eavesdropperDetected={eavesdropperDetected}
            errorRate={errorRate}
            showEavesdropper={showEavesdropper}
          />
        </div>

        <div className="quantum-data-panel">
          <div className="key-generation-display">
            <h3 className="data-panel-title">Quantum Bitstream Reconciliation</h3>

            <div className="bitstream-columns">
              <div className="bit-column">
                <span className="bit-column-header">Alice State Polarization Stream:</span>
                {transmissionPhase === 'generating' ? (
                  <SkeletonBitSequence count={16} />
                ) : aliceBits.length > 0 ? (
                  <div className="bit-sequence">
                    {aliceBits.slice(0, 24).map((bit, idx) => (
                      <span key={idx} className={`bit-chip val-${bit.bit}`} title={`Basis: ${bit.basis}`}>
                        {bit.bit}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="bitstream-empty-hint">Awaiting photon pulse emission...</div>
                )}
              </div>

              <div className="bit-column">
                <span className="bit-column-header">Bob Measurement Stream:</span>
                {transmissionPhase === 'generating' || transmissionPhase === 'transmitting' ? (
                  <SkeletonBitSequence count={16} />
                ) : bobMeasurements.length > 0 ? (
                  <div className="bit-sequence">
                    {bobMeasurements.slice(0, 24).map((m, idx) => {
                      const matches = m?.basis === photons[idx]?.basis;
                      return (
                        <span
                          key={idx}
                          className={`bit-chip ${matches ? 'is-match' : 'is-mismatch'}`}
                          title={`Bob: ${m.basis}, Alice: ${photons[idx]?.basis}`}
                        >
                          {m?.bit}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bitstream-empty-hint">Awaiting photon detector arrival...</div>
                )}
              </div>
            </div>

            {/* Sifted Key Output */}
            {siftedKey.length > 0 && (
              <div className="sifted-key-block">
                <div className="sifted-header">
                  <span className="sifted-title">Sifted Key Pool (Reconciled Bases Only):</span>
                  <span className="sifted-count">{siftedKey.length} bits</span>
                </div>
                <div className="bit-sequence sifted">
                  {siftedKey.slice(0, 24).map((bit, idx) => (
                    <span key={idx} className="bit-chip val-1">{bit}</span>
                  ))}
                  {siftedKey.length > 24 && <span className="bit-overflow">+{siftedKey.length - 24} more</span>}
                </div>
              </div>
            )}

            {/* Final Amplified Secure Key */}
            {finalKey.length > 0 && (
              <div className="final-key-block">
                <div className="final-key-header">
                  <span className="final-key-title">Final Information-Theoretic Secure Key:</span>
                  <Badge variant={eavesdropperDetected ? 'error' : 'success'} size="sm">
                    {eavesdropperDetected ? 'DISCARDED (QBER EXCEEDED)' : 'UNCONDITIONALLY VERIFIED'}
                  </Badge>
                </div>
                <div className="final-key-hex-box">
                  <code>
                    {finalKey.map(b => b.toString(16)).join('').toUpperCase()}
                  </code>
                </div>
                <div className="final-key-meta-row">
                  <span>Entropy: True Physical Random</span>
                  <span>Effective Length: {finalKey.length} bits</span>
                  <span>QBER: {errorRate.toFixed(1)}%</span>
                </div>
              </div>
            )}
          </div>

          <QuantumAdvantages
            eavesdropperDetected={eavesdropperDetected}
            errorRate={errorRate}
            finalKeyLength={finalKey.length}
          />
        </div>
      </div>

      <div className="simulation-controls-row">
        <Button
          variant="primary"
          size="md"
          icon={<PlayIcon size={15} />}
          onClick={startTransmission}
          disabled={isSimulating}
          isLoading={isSimulating}
        >
          {isSimulating ? 'Photon Transmission in Progress...' : 'Emit Single-Photon Pulse'}
        </Button>

        <Button
          variant="secondary"
          size="md"
          icon={<RotateCcwIcon size={14} />}
          onClick={resetSimulation}
        >
          Reset Quantum Channel
        </Button>

        {onOpen3DModel && (
          <Button
            variant="secondary"
            size="md"
            icon={<Sphere3DIcon size={15} />}
            onClick={onOpen3DModel}
          >
            Inspect 3D State Lattice
          </Button>
        )}

        <div className="channel-live-stats-bar">
          <div className="stat-unit">
            <span className="stat-unit-label">Photons Sent</span>
            <span className="stat-unit-val">{photons.length}</span>
          </div>
          <div className="stat-unit">
            <span className="stat-unit-label">Channel QBER</span>
            <span className="stat-unit-val" style={{ color: errorRate > 11 ? 'var(--color-error)' : 'var(--color-success)' }}>
              {errorRate.toFixed(2)}%
            </span>
          </div>
          <div className="stat-unit">
            <span className="stat-unit-label">Key Yield</span>
            <span className="stat-unit-val">{finalKey.length} bits</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuantumSimulator;
