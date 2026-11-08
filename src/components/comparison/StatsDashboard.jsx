// File: src/components/comparison/StatsDashboard.jsx
import React from 'react';
import { calculateBruteForceTime, isKeyVulnerable } from '../../utils/cryptography';
import { AlertTriangleIcon, CheckCircleIcon } from '../ui/Icons';
import './StatsDashboard.css';

function StatsDashboard({ showEavesdropper, keySize }) {
  const bruteForceTime = calculateBruteForceTime(keySize);
  const isVulnerable = isKeyVulnerable(keySize, showEavesdropper);

  const stats = [
    {
      title: 'Exchange Latency',
      classical: '~45 ms',
      quantum: '~180 ms',
      advantage: 'classical',
      description: 'Classical is faster on conventional hardware, but lacks physical tamper detection'
    },
    {
      title: 'Eavesdropper Detection',
      classical: 'None (Passive Snooping Possible)',
      quantum: 'Immediate (Wavefunction Collapse)',
      advantage: 'quantum',
      description: 'Quantum physical laws detect any observation attempt as a surge in QBER'
    },
    {
      title: 'Security Foundation',
      classical: 'Computational Hardness (P vs NP)',
      quantum: 'Quantum Mechanics (Heisenberg)',
      advantage: 'quantum',
      description: 'Mathematics can be solved by future algorithms; physics cannot be bypassed'
    },
    {
      title: 'Quantum Computer Resistance',
      classical: 'Vulnerable (Shor\'s Factorization)',
      quantum: 'Unconditionally Immune',
      advantage: 'quantum',
      description: 'RSA and discrete log algorithms break under polynomial-time Shor period-finding'
    },
    {
      title: 'Key Entropy Nature',
      classical: 'Pseudo-Random (PRNG Algorithm)',
      quantum: 'True Quantum Random (Shot Noise)',
      advantage: 'quantum',
      description: 'Quantum entropy originates in non-deterministic quantum measurement events'
    },
    {
      title: 'Forward Secrecy Guarantee',
      classical: 'Protocol Implementation Dependent',
      quantum: 'Inherent to Photon Transmission',
      advantage: 'quantum',
      description: 'Compromise of historical ciphertext provides zero leverage over future quantum keys'
    }
  ];

  return (
    <section className="stats-dashboard-panel" aria-label="Security Metrics and Benchmarks">
      <div className="dashboard-header">
        <h3 className="dashboard-title">Security Architecture Benchmarks</h3>
        <span className="dashboard-tag">NIST / Post-Quantum Cryptography Comparative Audit</span>
      </div>

      {/* Advisory Banner */}
      <div className={`security-advisory-banner ${isVulnerable ? 'is-vulnerable' : 'is-secure'}`}>
        <div className="advisory-icon" aria-hidden="true">
          {isVulnerable ? <AlertTriangleIcon size={20} /> : <CheckCircleIcon size={20} />}
        </div>
        <div className="advisory-content">
          <h4 className="advisory-title">
            {isVulnerable ? 'SECURITY ADVISORY: CLASSICAL QUANTUM VULNERABILITY' : 'NOMINAL CONFIGURATION'}
          </h4>
          <p className="advisory-text">
            {isVulnerable
              ? `${keySize}-bit asymmetric keys are vulnerable to quantum Shor algorithm factorization. Transition to BB84 QKD or post-quantum lattice schemes is recommended for long-term secrets.`
              : `Current parameters provide standard resistance against classical mathematical factoring.`}
          </p>
        </div>
      </div>

      {/* Brute Force Attack Benchmark Box */}
      <div className="benchmark-computation-box">
        <div className="comp-header">
          <span className="comp-title">Estimated Brute-Force Factorization Effort:</span>
          <span className="comp-score">
            {bruteForceTime.years > 1e30
              ? '> 10³⁰ CPU-Years (Practically Infinite Classically)'
              : `~${bruteForceTime.years.toExponential(2)} Years`}
          </span>
        </div>
        <div className="comp-subtext">
          {bruteForceTime.years > 1e30
            ? 'Classical break effort exceeds cosmological age of the universe; however Shor\'s quantum algorithm requires only O((log N)³) steps.'
            : 'Deprecation advisory: Computational feasibility falls within nation-state supercomputing clusters.'}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="benchmark-cards-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`benchmark-card adv-${stat.advantage} ${idx % 2 === 0 ? 'facet-delta' : 'facet-nabla'}`}>
            <div className="card-top-row">
              <div className="card-apex-badge" aria-hidden="true">
                <span className="apex-triangle">{idx % 2 === 0 ? '▲' : '▼'}</span>
                <span className="apex-num">0{idx + 1}</span>
              </div>
              <h5 className="benchmark-card-title">{stat.title}</h5>
              <span className={`benchmark-advantage-pill ${stat.advantage}`}>
                {stat.advantage === 'quantum' ? 'Quantum Advantage' : 'Classical Advantage'}
              </span>
            </div>

            <div className="benchmark-values-row">
              <div className="val-block classical">
                <span className="val-label">Classical:</span>
                <span className="val-data">{stat.classical}</span>
              </div>
              <div className="val-block quantum">
                <span className="val-label">Quantum:</span>
                <span className="val-data">{stat.quantum}</span>
              </div>
            </div>

            <p className="benchmark-desc">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsDashboard;
