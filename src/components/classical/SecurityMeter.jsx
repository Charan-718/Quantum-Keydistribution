// File: src/components/classical/SecurityMeter.jsx
import React, { useEffect, useState } from 'react';
import { calculateBruteForceTime } from '../../utils/cryptography';
// import '../../styles/classical.css';

import './SecurityMeter.css'; // In SecurityMeter.jsx

function SecurityMeter({ keySize, showEavesdropper, eavesdroppedKey, transmissionStep }) {
  const [securityLevel, setSecurityLevel] = useState(0);
  const [threats, setThreats] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);

  useEffect(() => {
    // Calculate security level based on key size and step
    let level = 0;
    
    // Base level from key size
    if (keySize >= 4096) level = 95;
    else if (keySize >= 3072) level = 85;
    else if (keySize >= 2048) level = 70;
    else if (keySize >= 1024) level = 40;
    else level = 20;
    
    // Adjust based on transmission progress
    if (transmissionStep >= 3) level += 10; // Shared secret established
    if (transmissionStep >= 5) level += 15; // Encryption active
    
    // Penalize for eavesdropper
    if (showEavesdropper && keySize <= 2048) level -= 30;
    if (eavesdroppedKey) level -= 50;
    
    level = Math.max(0, Math.min(100, level));
    setSecurityLevel(level);
    
    // Update threats
    const newThreats = [];
    if (keySize <= 1024) newThreats.push('Weak key size vulnerable to brute force');
    if (showEavesdropper && !eavesdroppedKey) newThreats.push('Passive eavesdropper monitoring');
    if (eavesdroppedKey) newThreats.push('ACTIVE KEY INTERCEPTION DETECTED');
    if (keySize <= 2048) newThreats.push('Vulnerable to quantum attacks (Shor\'s algorithm)');
    
    setThreats(newThreats);
    
    // Update vulnerabilities
    const newVulnerabilities = [];
    if (keySize < 2048) newVulnerabilities.push({ name: 'Small Key Size', severity: 'critical' });
    if (showEavesdropper) newVulnerabilities.push({ name: 'Man-in-the-Middle', severity: 'high' });
    if (keySize <= 3072) newVulnerabilities.push({ name: 'Quantum Vulnerable', severity: 'medium' });
    
    setVulnerabilities(newVulnerabilities);
  }, [keySize, showEavesdropper, eavesdroppedKey, transmissionStep]);

  const getSecurityColor = () => {
    if (securityLevel >= 80) return '#00FF9D';
    if (securityLevel >= 60) return '#4DABFF';
    if (securityLevel >= 40) return '#FFA726';
    return '#FF6B6B';
  };

  const getSecurityLabel = () => {
    if (securityLevel >= 80) return 'SECURE';
    if (securityLevel >= 60) return 'MODERATE';
    if (securityLevel >= 40) return 'VULNERABLE';
    return 'CRITICAL';
  };

  const bruteForceTime = calculateBruteForceTime(keySize);

  return (
    <div className="security-meter">
      <div className="meter-header">
        <h3>Security Assessment</h3>
        <div className="security-status" style={{ color: getSecurityColor() }}>
          {getSecurityLabel()}
        </div>
      </div>
      
      {/* Security Meter */}
      <div className="meter-visualization">
        <div className="meter-bar">
          <div 
            className="meter-fill"
            style={{ 
              width: `${securityLevel}%`,
              backgroundColor: getSecurityColor()
            }}
          ></div>
          <div className="meter-labels">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
          <div className="meter-percentage">
            {securityLevel}% Security Level
          </div>
        </div>
        
        {/* Security Indicators */}
        <div className="security-indicators">
          <div className="indicator">
            <div className="indicator-label">Key Size:</div>
            <div className={`indicator-value ${keySize >= 2048 ? 'good' : 'bad'}`}>
              {keySize} bits
            </div>
          </div>
          <div className="indicator">
            <div className="indicator-label">Eavesdropper:</div>
            <div className={`indicator-value ${showEavesdropper ? 'bad' : 'good'}`}>
              {showEavesdropper ? 'PRESENT' : 'ABSENT'}
            </div>
          </div>
          <div className="indicator">
            <div className="indicator-label">Key Compromise:</div>
            <div className={`indicator-value ${eavesdroppedKey ? 'critical' : 'good'}`}>
              {eavesdroppedKey ? 'DETECTED' : 'NONE'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Brute Force Resistance */}
      <div className="brute-force-resistance">
        <h4>Brute Force Attack Resistance:</h4>
        <div className="resistance-bar">
          <div 
            className="resistance-fill"
            style={{ 
              width: `${Math.min(100, Math.log10(bruteForceTime.years) * 10)}%`,
              backgroundColor: bruteForceTime.color
            }}
          ></div>
        </div>
        <div className="resistance-text">
          <span className="time-estimate">
            Estimated break time: {bruteForceTime.years > 1e30 ? '> 10³⁰ years' : `~${bruteForceTime.years.toExponential(2)} years`}
          </span>
          <span className="time-context">
            {bruteForceTime.years > 1e30 ? 'Practically impossible' : 'Potentially breakable with sufficient resources'}
          </span>
        </div>
      </div>
      
      {/* Threat Analysis */}
      <div className="threat-analysis">
        <h4>Threat Analysis:</h4>
        {threats.length > 0 ? (
          <div className="threats-list">
            {threats.map((threat, index) => (
              <div key={index} className="threat-item">
                {/* <div className="threat-icon">⚠️</div> */}
                <div className="threat-text">{threat}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-threats">
            {/* <div className="safe-icon">✅</div> */}
            <div className="safe-text">No active threats detected</div>
          </div>
        )}
      </div>
      
      {/* Vulnerability Report */}
      <div className="vulnerability-report">
        <h4>Vulnerability Report:</h4>
        <div className="vulnerabilities-grid">
          {vulnerabilities.map((vuln, index) => (
            <div key={index} className={`vulnerability ${vuln.severity}`}>
              <div className="vuln-name">{vuln.name}</div>
              <div className={`vuln-severity ${vuln.severity}`}>
                {vuln.severity.toUpperCase()}
              </div>
            </div>
          ))}
          {vulnerabilities.length === 0 && (
            <div className="no-vulnerabilities">
              {/* <div className="secure-icon">🛡️</div> */}
              <div className="secure-text">No known vulnerabilities</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="security-recommendations">
        <h4>Security Recommendations:</h4>
        <div className="recommendations-list">
          {keySize < 2048 && (
            <div className="recommendation critical">
              {/* <span className="rec-icon">🚨</span> */}
              <span className="rec-text">Upgrade to at least 2048-bit keys immediately</span>
            </div>
          )}
          {showEavesdropper && (
            <div className="recommendation high">
              {/* <span className="rec-icon">⚠️</span> */}
              <span className="rec-text">Implement certificate-based authentication</span>
            </div>
          )}
          {keySize <= 3072 && (
            <div className="recommendation medium">
              {/* <span className="rec-icon">🔮</span> */}
              <span className="rec-text">Plan migration to post-quantum cryptography</span>
            </div>
          )}
          {securityLevel >= 80 && (
            <div className="recommendation good">
              {/* <span className="rec-icon">✅</span> */}
              <span className="rec-text">Current configuration meets security standards</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecurityMeter;