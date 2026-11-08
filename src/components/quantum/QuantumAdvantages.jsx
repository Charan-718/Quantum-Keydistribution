// File: src/components/quantum/QuantumAdvantages.jsx
import React, { useState } from 'react';
import './QuantumAdvantages.css';

function QuantumAdvantages({ eavesdropperDetected, errorRate, finalKeyLength }) {
  const [activeAdvantage, setActiveAdvantage] = useState(null);

  const advantages = [
    {
      id: 'security',
      title: 'Information-Theoretic Security',
      description: 'Security is physical rather than computational. Not dependent on prime factorization hardness.',
      metricLabel: 'Security Level',
      metricVal: 'Physical (Unconditional)',
      color: 'var(--color-quantum-contrast)'
    },
    {
      id: 'detection',
      title: 'Real-Time Interception Auditing',
      description: 'Heisenberg state collapse ensures any interception introduces measurable +25% QBER.',
      metricLabel: 'Intrusion Status',
      metricVal: eavesdropperDetected ? 'Interception Abort' : 'Active Channel Guard',
      color: eavesdropperDetected ? 'var(--color-error)' : 'var(--color-success)'
    },
    {
      id: 'future',
      title: 'Quantum Computer Immunity',
      description: 'Immune to Shor\'s and Grover\'s algorithms which break RSA and ECC cryptography.',
      metricLabel: 'Quantum Resistance',
      metricVal: '100% Post-Quantum',
      color: 'var(--color-success)'
    },
    {
      id: 'forward',
      title: 'Inherent Forward Secrecy',
      description: 'Each photon stream key is ephemeral and unique. Historical data cannot be decrypted retroactively.',
      metricLabel: 'Forward Secrecy',
      metricVal: 'Inherent Protocol Feature',
      color: 'var(--color-quantum-contrast)'
    }
  ];

  const comparisonRows = [
    { aspect: 'Security Foundation', classical: 'Computational Complexity', quantum: 'Quantum Physics (Heisenberg)', advantage: 'quantum' },
    { aspect: 'Interception Detection', classical: 'Indirect / Undetected', quantum: 'Immediate Physical Perturbation', advantage: 'quantum' },
    { aspect: 'Shor Quantum Resistance', classical: 'Vulnerable (Polynomial Break)', quantum: 'Immune (State Collapses)', advantage: 'quantum' },
    { aspect: 'Forward Secrecy', classical: 'Ephemeral DH Dependent', quantum: 'Inherent per Session', advantage: 'quantum' },
    { aspect: 'Hardware Speed', classical: 'Gigabits / sec (ASIC/GPU)', quantum: 'Kilobits to Megabits / sec', advantage: 'classical' },
    { aspect: 'Infrastructure Requirement', classical: 'Standard Internet IP', quantum: 'Dark Fiber / Satellite QKD', advantage: 'classical' },
  ];

  return (
    <div className="quantum-advantages-card">
      <div className="advantages-card-header">
        <h3 className="advantages-title">Physical Quantum Security Advantages</h3>
        <span className="advantages-tag">Physical Axiom vs Computational Hardness</span>
      </div>

      {/* Grid of 4 Key Advantages */}
      <div className="advantages-features-grid">
        {advantages.map(adv => (
          <div
            key={adv.id}
            className={`adv-feature-card ${activeAdvantage === adv.id ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveAdvantage(adv.id)}
            onMouseLeave={() => setActiveAdvantage(null)}
          >
            <div className="adv-feature-header">
              <span className="adv-feature-title">{adv.title}</span>
            </div>
            <p className="adv-feature-desc">{adv.description}</p>
            <div className="adv-feature-metric">
              <span className="adv-m-label">{adv.metricLabel}:</span>
              <span className="adv-m-val" style={{ color: adv.color }}>{adv.metricVal}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Comparison Table */}
      <div className="comparison-table-wrapper">
        <h4 className="table-heading">Comparative Protocol Matrix</h4>
        <div className="comparison-matrix-table" role="table" aria-label="Quantum vs Classical Comparison">
          <div className="matrix-row matrix-header" role="row">
            <span className="matrix-cell aspect-col" role="columnheader">Cryptographic Aspect</span>
            <span className="matrix-cell classical-col" role="columnheader">Classical (RSA / DH)</span>
            <span className="matrix-cell quantum-col" role="columnheader">BB84 Quantum Key Distribution</span>
          </div>

          {comparisonRows.map((row, idx) => (
            <div key={idx} className="matrix-row" role="row">
              <span className="matrix-cell aspect-col" role="cell">{row.aspect}</span>
              <span className={`matrix-cell classical-col ${row.advantage === 'classical' ? 'has-advantage' : ''}`} role="cell">
                {row.classical}
              </span>
              <span className={`matrix-cell quantum-col ${row.advantage === 'quantum' ? 'has-advantage' : ''}`} role="cell">
                {row.quantum}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuantumAdvantages;
