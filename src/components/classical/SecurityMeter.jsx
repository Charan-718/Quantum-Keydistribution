// File: src/components/classical/SecurityMeter.jsx
import React, { useEffect, useState } from 'react';
import { calculateBruteForceTime } from '../../utils/cryptography';
import { AlertTriangleIcon } from '../ui/Icons';
import './SecurityMeter.css';

function SecurityMeter({ keySize, showEavesdropper, eavesdroppedKey, transmissionStep }) {
  const [securityLevel, setSecurityLevel] = useState(0);
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    let level = 0;
    if (keySize >= 4096) level = 95;
    else if (keySize >= 3072) level = 85;
    else if (keySize >= 2048) level = 70;
    else if (keySize >= 1024) level = 40;
    else level = 20;

    if (transmissionStep >= 3) level += 10;
    if (transmissionStep >= 5) level += 15;

    if (showEavesdropper && keySize <= 2048) level -= 30;
    if (eavesdroppedKey) level -= 50;

    level = Math.max(0, Math.min(100, level));
    setSecurityLevel(level);

    const newThreats = [];
    if (keySize <= 1024) newThreats.push('Insufficient key entropy: vulnerable to cluster brute-force factorization');
    if (showEavesdropper && !eavesdroppedKey) newThreats.push('Passive eavesdropper collecting channel exchange values');
    if (eavesdroppedKey) newThreats.push('ACTIVE INTERCEPTION: Eve extracted key segment');
    if (keySize <= 2048) newThreats.push('Vulnerable to polynomial-time quantum period-finding (Shor\'s Algorithm)');
    setThreats(newThreats);
  }, [keySize, showEavesdropper, eavesdroppedKey, transmissionStep]);

  const getStatusMeta = () => {
    if (securityLevel >= 80) return { label: 'DEFENSE GRADE', color: 'var(--color-success)' };
    if (securityLevel >= 60) return { label: 'STANDARD (CLASSICAL)', color: 'var(--color-quantum-contrast)' };
    if (securityLevel >= 40) return { label: 'VULNERABLE', color: 'var(--color-warning)' };
    return { label: 'COMPROMISED', color: 'var(--color-error)' };
  };

  const statusMeta = getStatusMeta();
  const bruteForceTime = calculateBruteForceTime(keySize);

  return (
    <div className="security-assessment-panel">
      <div className="assessment-header">
        <h3 className="assessment-title">Classical Security Evaluation</h3>
        <span className="assessment-badge" style={{ color: statusMeta.color, borderColor: statusMeta.color }}>
          {statusMeta.label}
        </span>
      </div>

      {/* Meter Bar */}
      <div className="meter-wrapper">
        <div className="meter-track">
          <div
            className="meter-fill"
            style={{ width: `${securityLevel}%`, backgroundColor: statusMeta.color }}
          />
        </div>
        <div className="meter-labels">
          <span>0%</span>
          <span>50%</span>
          <span className="meter-current-score" style={{ color: statusMeta.color }}>
            {securityLevel}% Confidence
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Key Metrics Indicators */}
      <div className="indicators-grid">
        <div className="indicator-pill">
          <span className="ind-label">Key Size</span>
          <span className="ind-val">{keySize} bits</span>
        </div>
        <div className="indicator-pill">
          <span className="ind-label">Interception State</span>
          <span className={`ind-val ${showEavesdropper ? 'error' : 'safe'}`}>
            {showEavesdropper ? 'PRESENT' : 'NONE'}
          </span>
        </div>
        <div className="indicator-pill">
          <span className="ind-label">Shor Quantum Status</span>
          <span className="ind-val warning">VULNERABLE</span>
        </div>
      </div>

      {/* Brute Force Estimate */}
      <div className="brute-force-box">
        <div className="bf-header">
          <span className="bf-label">Estimated Classical Factorization Effort:</span>
          <span className="bf-value">
            {bruteForceTime.years > 1e30 ? '> 10³⁰ CPU-years' : `~${bruteForceTime.years.toExponential(1)} years`}
          </span>
        </div>
        <div className="bf-track">
          <div
            className="bf-fill"
            style={{
              width: `${Math.min(100, Math.max(10, Math.log10(bruteForceTime.years) * 3))}%`,
              backgroundColor: bruteForceTime.years > 1e20 ? 'var(--color-success)' : 'var(--color-warning)'
            }}
          />
        </div>
        <span className="bf-sub">
          {bruteForceTime.years > 1e30
            ? 'Practically impossible classically; broken on quantum computer in seconds'
            : 'Potentially breakable with distributed cloud resources'}
        </span>
      </div>

      {/* Active Threats */}
      {threats.length > 0 && (
        <div className="threats-section">
          <span className="threats-title">Identified Attack Vectors:</span>
          <div className="threats-list">
            {threats.map((threat, idx) => (
              <div key={idx} className="threat-item">
                <AlertTriangleIcon size={14} className="threat-icon" />
                <span className="threat-text">{threat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SecurityMeter;
