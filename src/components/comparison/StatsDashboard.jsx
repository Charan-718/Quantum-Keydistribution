// File: src/components/comparison/StatsDashboard.jsx
import React from 'react';
import { calculateBruteForceTime, isKeyVulnerable } from '../../utils/cryptography';
import '../../styles/shared.css';

import './StatsDashboard.css'; // In StatsDashboard.jsx

function StatsDashboard({ showEavesdropper, keySize }) {
  const bruteForceTime = calculateBruteForceTime(keySize);
  const isVulnerable = isKeyVulnerable(keySize, showEavesdropper);
  
  const stats = [
    {
      title: 'Key Exchange Speed',
      classical: '~50ms',
      quantum: '~200ms',
      advantage: 'classical',
      description: 'Classical is faster due to optimized hardware'
    },
    {
      title: 'Eavesdropper Detection',
      classical: 'Indirect/Mathematical',
      quantum: 'Direct/Physical',
      advantage: 'quantum',
      description: 'Quantum detects ANY interception immediately'
    },
    {
      title: 'Security Foundation',
      classical: 'Computational Complexity',
      quantum: 'Quantum Physics Laws',
      advantage: 'quantum',
      description: "Math can be broken, physics can't be violated"
    },
    {
      title: 'Quantum Computer Resistance',
      classical: 'VULNERABLE',
      quantum: 'SECURE',
      advantage: 'quantum',
      description: 'Classical crypto broken by Shor\'s algorithm'
    },
    {
      title: 'Key Size Required',
      classical: `${keySize} bits`,
      quantum: 'N/A (Continuous)',
      advantage: 'quantum',
      description: 'Quantum uses photon properties, not bit length'
    },
    {
      title: 'Forward Secrecy',
      classical: 'Protocol Dependent',
      quantum: 'INHERENT',
      advantage: 'quantum',
      description: 'Each quantum key is unique and ephemeral'
    }
  ];

  return (
    <div className="stats-dashboard">
      <h3>Security Metrics Dashboard</h3>
      
      <div className="security-alert" style={{ 
        backgroundColor: isVulnerable ? 'rgba(255, 46, 92, 0.1)' : 'rgba(0, 255, 157, 0.1)',
        borderColor: isVulnerable ? '#FF2E5C' : '#00FF9D'
      }}>
        <div className="alert-icon">{isVulnerable ? '⚠️' : '✅'}</div>
        <div className="alert-content">
          <h4>{isVulnerable ? 'SECURITY WARNING' : 'SECURE CONNECTION'}</h4>
          <p>
            {isVulnerable 
              ? `${keySize}-bit key is vulnerable to quantum attacks. Upgrade to post-quantum or quantum key distribution.`
              : `Current configuration provides strong security against classical attacks.`}
          </p>
          {showEavesdropper && (
            <p className="eavesdropper-warning">
              Eavesdropper simulation active - Real-time attack detection in progress
            </p>
          )}
        </div>
      </div>
      
      <div className="brute-force-estimate">
        <h4>Brute Force Attack Time Estimate:</h4>
        <div className="time-display" style={{ color: bruteForceTime.color }}>
          {bruteForceTime.years > 1e30 
            ? `> 10³⁰ years (Practically Impossible)`
            : `~${bruteForceTime.years.toExponential(2)} years`}
        </div>
        <div className="time-context">
          {bruteForceTime.years > 1e30 
            ? 'Time exceeds age of universe by many orders of magnitude'
            : 'Attack feasible with nation-state resources'}
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.advantage}`}>
            <div className="stat-header">
              <h5>{stat.title}</h5>
              <span className={`advantage-tag ${stat.advantage}`}>
                {stat.advantage === 'quantum' ? 'QUANTUM ADVANTAGE' : 'CLASSICAL ADVANTAGE'}
              </span>
            </div>
            <div className="stat-values">
              <div className="value classical">
                <span className="value-label">Classical:</span>
                <span className="value-data">{stat.classical}</span>
              </div>
              <div className="value quantum">
                <span className="value-label">Quantum:</span>
                <span className="value-data">{stat.quantum}</span>
              </div>
            </div>
            <div className="stat-description">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsDashboard;