// File: src/components/shared/ControlPanel.jsx
import React from 'react';
// import '../../styles/shared.css';
import './ControlPanel.css';

function ControlPanel({
  activeTab,
  setActiveTab,
  simulationSpeed,
  setSimulationSpeed,
  showEavesdropper,
  setShowEavesdropper,
  keySize,
  setKeySize
}) {
  const tabs = [
    { id: 'comparison', label: 'Side-by-Side Comparison', icon: '' },
    { id: 'classical', label: 'Classical System Only', icon: '' },
    { id: 'quantum', label: 'Quantum System Only', icon: '' },
  ];

  const keySizes = [
    { bits: 512, label: '512-bit (Weak)', color: '#ff6b6b' },
    { bits: 1024, label: '1024-bit (Vulnerable)', color: '#ffa726' },
    { bits: 2048, label: '2048-bit (Standard)', color: '#4ecdc4' },
    { bits: 3072, label: '3072-bit (Secure)', color: '#1dd1a1' },
    { bits: 4096, label: '4096-bit (Ultra)', color: '#00d2d3' },
  ];

  return (
    <div className="control-panel">
      <div className="panel-section">
        <h3>Transmission Mode</h3>
        <div className="tab-selector">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Simulation Controls</h3>
        <div className="control-group">
          <label>
            <span className="control-label">Simulation Speed: {simulationSpeed}x</span>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
              className="slider"
            />
          </label>
        </div>

        <div className="control-group">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showEavesdropper}
              onChange={() => setShowEavesdropper(!showEavesdropper)}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">
              {showEavesdropper ? 'Eavesdropper ACTIVE' : 'Simulate Eavesdropper'}
            </span>
          </label>
        </div>
      </div>

      <div className="panel-section">
        <h3>Cryptographic Parameters</h3>
        <div className="control-group">
          <label className="control-label">Key Size:</label>
          <div className="key-size-selector">
            {keySizes.map(size => (
              <button
                key={size.bits}
                className={`size-btn ${keySize === size.bits ? 'selected' : ''}`}
                onClick={() => setKeySize(size.bits)}
                style={{ '--btn-color': size.color }}
              >
                {size.label}
              </button>
            ))}
          </div>
          <div className="key-strength-meter">
            <div 
              className="strength-bar"
              style={{ 
                width: `${((keySize - 512) / (4096 - 512)) * 100}%`,
                backgroundColor: keySizes.find(s => s.bits === keySize)?.color
              }}
            ></div>
            <div className="strength-labels">
              <span>Weak</span>
              <span>Strong</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3>Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary">
            {/* <span className="action-icon">▶️</span> */}
            Start Transmission
          </button>
          <button className="action-btn secondary">
            {/* <span className="action-icon">🔄</span> */}
            Generate New Keys
          </button>
          <button className="action-btn danger">
            {/* <span className="action-icon">🚨</span> */}
            Attack Simulation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;