// File: src/components/quantum/QuantumAdvantages.jsx
import React, { useState } from 'react';
import '../../styles/quantum.css';

import './QuantumAdvantages.css'; // In QuantumAdvantages.jsx


function QuantumAdvantages({ eavesdropperDetected, errorRate, finalKeyLength }) {
  const [activeAdvantage, setActiveAdvantage] = useState(null);

  const advantages = [
    {
      id: 'security',
      title: 'Information-Theoretic Security',
      icon: '',
      description: 'Based on laws of quantum physics, not mathematical assumptions',
      details: [
        'Heisenberg Uncertainty Principle prevents perfect measurement',
        'No-Cloning Theorem prevents quantum state copying',
        'Security independent of computational power'
      ],
      metrics: {
        label: 'Security Level',
        value: 'Absolute',
        color: '#00FF9D'
      }
    },
    {
      id: 'detection',
      title: 'Real-time Eavesdropper Detection',
      icon: '',
      description: 'Any interception attempt is immediately detectable',
      details: [
        'Measurement disturbs quantum states',
        'Error rate analysis reveals eavesdropping',
        'Automatic key discard when compromised'
      ],
      metrics: {
        label: 'Detection Confidence',
        value: eavesdropperDetected ? '100%' : 'Active Monitoring',
        color: eavesdropperDetected ? '#FF2E5C' : '#00E5FF'
      }
    },
    {
      id: 'future',
      title: 'Quantum Computer Resistance',
      icon: '',
      description: 'Immune to attacks from quantum computers',
      details: [
        'Not vulnerable to Shor\'s algorithm',
        'Secure against Grover\'s algorithm',
        'Future-proof for decades'
      ],
      metrics: {
        label: 'Quantum Resistance',
        value: '100%',
        color: '#00FF9D'
      }
    },
    {
      id: 'forward',
      title: 'Perfect Forward Secrecy',
      icon: '',
      description: 'Each key is unique and cannot be derived from others',
      details: [
        'No long-term secret storage needed',
        'Compromise of one key doesn\'t affect others',
        'Automatic key renewal'
      ],
      metrics: {
        label: 'Forward Secrecy',
        value: 'Inherent',
        color: '#00E5FF'
      }
    },
    {
      id: 'authentication',
      title: 'Device-Independent Security',
      icon: '',
      description: 'Security not dependent on trusted hardware',
      details: [
        'Works with untrusted detectors (MDI-QKD)',
        'No trusted third parties required',
        'End-to-end security verification'
      ],
      metrics: {
        label: 'Trust Level',
        value: 'Zero Trust',
        color: '#4DABFF'
      }
    },
    {
      id: 'entanglement',
      title: 'Quantum Entanglement',
      icon: '',
      description: 'Future-proof with quantum correlation',
      details: [
        'Bell test verifies quantumness',
        'Device-independent key distribution',
        'Long-distance quantum networks'
      ],
      metrics: {
        label: 'Entanglement Verified',
        value: 'Yes',
        color: '#9D4DFF'
      }
    }
  ];

  const getComparisonData = () => [
    { aspect: 'Security Foundation', classical: 'Mathematics', quantum: 'Physics', advantage: 'quantum' },
    { aspect: 'Eavesdropper Detection', classical: 'Indirect', quantum: 'Direct', advantage: 'quantum' },
    { aspect: 'Quantum Resistance', classical: 'Vulnerable', quantum: 'Secure', advantage: 'quantum' },
    { aspect: 'Forward Secrecy', classical: 'Optional', quantum: 'Inherent', advantage: 'quantum' },
    { aspect: 'Key Generation Speed', classical: 'Faster', quantum: 'Slower', advantage: 'classical' },
    { aspect: 'Infrastructure Cost', classical: 'Lower', quantum: 'Higher', advantage: 'classical' }
  ];

  return (
    <div className="quantum-advantages">
      <div className="advantages-header">
        <h3>Quantum Key Distribution Advantages</h3>
        <div className="advantages-tagline">
          Why quantum cryptography represents the future of secure communications
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="key-metrics">
        <div className="metrics-grid">
          <div className="metric-card">
            {/* <div className="metric-icon">⚛️</div> */}
            <div className="metric-content">
              <div className="metric-name">Security Type</div>
              <div className="metric-value quantum">Information-Theoretic</div>
              <div className="metric-desc">Not based on computational hardness</div>
            </div>
          </div>
          <div className="metric-card">
            {/* <div className="metric-icon">🔍</div> */}
            <div className="metric-content">
              <div className="metric-name">Eavesdropper Detection</div>
              <div className="metric-value" style={{ color: eavesdropperDetected ? '#FF2E5C' : '#00FF9D' }}>
                {eavesdropperDetected ? 'DETECTED' : 'ACTIVE'}
              </div>
              <div className="metric-desc">Real-time monitoring active</div>
            </div>
          </div>
          <div className="metric-card">
            {/* <div className="metric-icon">🛡️</div> */}
            <div className="metric-content">
              <div className="metric-name">Quantum Resistance</div>
              <div className="metric-value quantum">100% Secure</div>
              <div className="metric-desc">Immune to quantum computer attacks</div>
            </div>
          </div>
          <div className="metric-card">
            {/* <div className="metric-icon">📊</div> */}
            <div className="metric-content">
              <div className="metric-name">Key Rate</div>
              <div className="metric-value">{finalKeyLength} bits</div>
              <div className="metric-desc">Secure key generated</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Advantages Grid */}
      <div className="advantages-grid">
        {advantages.map(advantage => (
          <div
            key={advantage.id}
            className={`advantage-card ${activeAdvantage === advantage.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveAdvantage(advantage.id)}
            onMouseLeave={() => setActiveAdvantage(null)}
          >
            <div className="card-header">
              <div className="advantage-icon">{advantage.icon}</div>
              <div className="advantage-title">{advantage.title}</div>
            </div>
            <div className="card-content">
              <div className="advantage-description">{advantage.description}</div>
              <div className="advantage-metrics">
                <div className="metric-label">{advantage.metrics.label}</div>
                <div 
                  className="metric-value"
                  style={{ color: advantage.metrics.color }}
                >
                  {advantage.metrics.value}
                </div>
              </div>
            </div>
            {activeAdvantage === advantage.id && (
              <div className="card-details">
                <div className="details-title">Key Features:</div>
                <ul className="details-list">
                  {advantage.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Side-by-Side Comparison */}
      <div className="quantum-classical-comparison">
        <h4>Quantum vs Classical: Direct Comparison</h4>
        <div className="comparison-table">
          <div className="table-header">
            <div className="header-item">Security Aspect</div>
            <div className="header-item classical">Classical</div>
            <div className="header-item quantum">Quantum</div>
            <div className="header-item">Advantage</div>
          </div>
          {getComparisonData().map((row, index) => (
            <div key={index} className="table-row">
              <div className="row-item aspect">{row.aspect}</div>
              <div className="row-item classical">
                <div className="value">{row.classical}</div>
                {row.advantage === 'classical' && <div className="advantage-indicator">★</div>}
              </div>
              <div className="row-item quantum">
                <div className="value">{row.quantum}</div>
                {row.advantage === 'quantum' && <div className="advantage-indicator">★</div>}
              </div>
              <div className={`row-item advantage ${row.advantage}`}>
                {row.advantage.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quantum Principles */}
      <div className="quantum-physics-principles">
        <h4>Quantum Physics Principles Enabling Security:</h4>
        <div className="principles-container">
          <div className="principle">
            <div className="principle-header">
              {/* <div className="principle-icon">📐</div> */}
              <div className="principle-title">Heisenberg Uncertainty Principle</div>
            </div>
            <div className="principle-content">
              It is impossible to simultaneously know both the position and momentum 
              of a quantum particle with perfect accuracy. In QKD: Cannot measure 
              both polarization and basis without disturbing the photon.
            </div>
          </div>
          <div className="principle">
            <div className="principle-header">
              {/* <div className="principle-icon">🚫</div> */}
              <div className="principle-title">No-Cloning Theorem</div>
            </div>
            <div className="principle-content">
              It is impossible to create an identical copy of an arbitrary unknown 
              quantum state. In QKD: Eavesdroppers cannot copy photons for later analysis.
            </div>
          </div>
          <div className="principle">
            <div className="principle-header">
              {/* <div className="principle-icon">🎲</div> */}
              <div className="principle-title">Quantum Randomness</div>
            </div>
            <div className="principle-content">
              Quantum measurements produce fundamentally random outcomes. 
              In QKD: Provides true randomness for key generation, not pseudo-random numbers.
            </div>
          </div>
        </div>
      </div>
      
      {/* Future Outlook */}
      <div className="future-outlook">
        <h4>Future of Quantum Cryptography:</h4>
        <div className="outlook-content">
          <div className="outlook-item">
            {/* <div className="outlook-icon">🌐</div> */}
            <div className="outlook-text">
              <strong>Quantum Internet:</strong> Global network of quantum-secure communication
            </div>
          </div>
          <div className="outlook-item">
            {/* <div className="outlook-icon">🛰️</div> */}
            <div className="outlook-text">
              <strong>Satellite QKD:</strong> Space-based quantum key distribution for global coverage
            </div>
          </div>
          <div className="outlook-item">
            {/* <div className="outlook-icon">💻</div> */}
            <div className="outlook-text">
              <strong>Quantum Repeaters:</strong> Extending QKD range beyond 1000km
            </div>
          </div>
          <div className="outlook-item">
            {/* <div className="outlook-icon">🔮</div> */}
            <div className="outlook-text">
              <strong>Post-Quantum Era:</strong> QKD as the standard for critical infrastructure
            </div>
          </div>
        </div>
        <div className="migration-timeline">
          <div className="timeline-item current">
            <div className="timeline-year">2024</div>
            <div className="timeline-text">Hybrid classical-quantum systems</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2030</div>
            <div className="timeline-text">Widespread QKD deployment</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2040</div>
            <div className="timeline-text">Quantum internet operational</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuantumAdvantages;