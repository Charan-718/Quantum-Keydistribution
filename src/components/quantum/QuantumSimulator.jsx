// File: src/components/quantum/QuantumSimulator.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/quantum.css';
import { generateQuantumKey, simulateBB84Protocol, detectEavesdropping } from '../../utils/quantumSimulation';
import PhotonVisualization from './PhotonVisualization';
import EavesdropperDetector from './EavesdropperDetector';
import QuantumAdvantages from './QuantumAdvantages';

import './QuantumSimulator.css'; // In QuantumSimulator.jsx


function QuantumSimulator({ simulationSpeed, showEavesdropper }) {
  const [photons, setPhotons] = useState([]);
  const [aliceBits, setAliceBits] = useState([]);
  const [bobMeasurements, setBobMeasurements] = useState([]);
  const [siftedKey, setSiftedKey] = useState([]);
  const [finalKey, setFinalKey] = useState([]);
  const [eavesdropperDetected, setEavesdropperDetected] = useState(false);
  const [errorRate, setErrorRate] = useState(0);
  const [transmissionPhase, setTransmissionPhase] = useState('idle');

  const phases = [
    { id: 'idle', label: 'Ready', color: '#2A3441' },
    { id: 'generating', label: 'Photon Generation', color: '#00E5FF' },
    { id: 'transmitting', label: 'Quantum Transmission', color: '#00E5FF' },
    { id: 'measuring', label: 'Measurement', color: '#00FF9D' },
    { id: 'sifting', label: 'Key Sifting', color: '#4DABFF' },
    { id: 'final', label: 'Final Key', color: '#00FF9D' },
  ];

  useEffect(() => {
    if (showEavesdropper && transmissionPhase === 'transmitting') {
      const detectionResult = detectEavesdropping(photons);
      setEavesdropperDetected(detectionResult.detected);
      setErrorRate(detectionResult.errorRate);
    }
  }, [photons, showEavesdropper, transmissionPhase]);

  const startTransmission = () => {
    setTransmissionPhase('generating');
    
    // Generate quantum key
    const { photons: newPhotons, aliceBits: newAliceBits } = generateQuantumKey(50);
    setPhotons(newPhotons);
    setAliceBits(newAliceBits);
    
    // Simulate transmission
    setTimeout(() => {
      setTransmissionPhase('transmitting');
      
      // Bob measures photons
      setTimeout(() => {
        const measurements = simulateBB84Protocol(newPhotons, showEavesdropper);
        setBobMeasurements(measurements);
        setTransmissionPhase('measuring');
        
        // Sift key
        setTimeout(() => {
          const sifted = siftKey(newAliceBits, measurements);
          setSiftedKey(sifted);
          setTransmissionPhase('sifting');
          
          // Final key (after error correction & privacy amplification)
          setTimeout(() => {
            const final = finalizeKey(sifted);
            setFinalKey(final);
            setTransmissionPhase('final');
          }, 1000 / simulationSpeed);
        }, 1000 / simulationSpeed);
      }, 2000 / simulationSpeed);
    }, 1000 / simulationSpeed);
  };

  const siftKey = (aliceBits, bobMeasurements) => {
    return aliceBits.filter((bit, index) => 
      bobMeasurements[index]?.basis === photons[index]?.basis
    ).map(item => item.bit);
  };

  const finalizeKey = (siftedKey) => {
    // Simulate error correction and privacy amplification
    return siftedKey.slice(0, Math.floor(siftedKey.length * 0.8));
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

  return (
    <div className="quantum-simulator">
      <div className="simulation-header">
        <h2>Quantum Key Distribution (BB84 Protocol)</h2>
        <div className="protocol-badge quantum">
          <span className="protocol-name">QKD - Information Theoretic Security</span>
          <span className="protocol-status">
            {eavesdropperDetected ? 'EAVESDROPPER DETECTED' : 'QUANTUM SECURE'}
          </span>
        </div>
      </div>

      <div className="quantum-phase-tracker">
        {phases.map(phase => (
          <div 
            key={phase.id} 
            className={`phase ${transmissionPhase === phase.id ? 'active' : ''} ${phases.findIndex(p => p.id === transmissionPhase) > phases.findIndex(p => p.id === phase.id) ? 'completed' : ''}`}
            style={{ '--phase-color': phase.color }}
          >
            {/* <div className="phase-icon">⚛️</div> */}
            <div className="phase-label">{phase.label}</div>
            <div className="phase-indicator"></div>
          </div>
        ))}
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
            <h3>Quantum Key Generation</h3>
            <div className="bit-display">
              <div className="bit-column">
                <h4>Alice's Random Bits:</h4>
                <div className="bit-sequence">
                  {aliceBits.slice(0, 20).map((bit, index) => (
                    <span key={index} className={`bit ${bit.bit}`}>{bit.bit}</span>
                  ))}
                </div>
              </div>
              <div className="bit-column">
                <h4>Bob's Measurements:</h4>
                <div className="bit-sequence">
                  {bobMeasurements.slice(0, 20).map((measurement, index) => (
                    <span 
                      key={index} 
                      className={`bit ${measurement?.bit || '?'} ${measurement?.basis === photons[index]?.basis ? 'matching' : 'mismatch'}`}
                    >
                      {measurement?.bit || '?'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {siftedKey.length > 0 && (
              <div className="sifted-key">
                <h4>Sifted Key (After Basis Reconciliation):</h4>
                <div className="bit-sequence">
                  {siftedKey.slice(0, 16).map((bit, index) => (
                    <span key={index} className={`bit ${bit}`}>{bit}</span>
                  ))}
                  {siftedKey.length > 16 && <span>... ({siftedKey.length} bits total)</span>}
                </div>
              </div>
            )}
            
            {finalKey.length > 0 && (
              <div className="final-key">
                <h4>Final Secure Key:</h4>
                <div className="bit-sequence secure">
                  {finalKey.slice(0, 16).map((bit, index) => (
                    <span key={index} className={`bit ${bit}`}>{bit}</span>
                  ))}
                  <div className="key-metrics">
                    <span className="metric">Length: {finalKey.length} bits</span>
                    <span className="metric">Security: Information-Theoretic</span>
                    <span className="metric">Eavesdropper: {eavesdropperDetected ? 'DETECTED & DISCARDED' : 'NONE'}</span>
                  </div>
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

      <div className="simulation-controls">
        <button 
          className="control-btn quantum-primary"
          onClick={startTransmission}
          disabled={transmissionPhase !== 'idle'}
        >
          {transmissionPhase === 'idle' ? 'Start Quantum Transmission' : 'Transmission in Progress...'}
        </button>
        <button className="control-btn quantum-secondary" onClick={resetSimulation}>
          Reset Quantum Channel
        </button>
        <div className="quantum-stats">
          <div className="stat">
            <span className="stat-label">Photons Sent:</span>
            <span className="stat-value">{photons.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Error Rate:</span>
            <span className="stat-value" style={{ color: errorRate > 0.11 ? '#FF2E5C' : '#00FF9D' }}>
              {errorRate.toFixed(2)}%
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Key Rate:</span>
            <span className="stat-value">{finalKey.length} bits/sec</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuantumSimulator;