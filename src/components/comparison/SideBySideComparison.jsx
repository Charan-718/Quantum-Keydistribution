// File: src/components/comparison/SideBySideComparison.jsx
import React from 'react';
import ClassicalSimulator from '../classical/ClassicalSimulator';
import QuantumSimulator from '../quantum/QuantumSimulator';
import '../../styles/shared.css';

function SideBySideComparison({ simulationSpeed, showEavesdropper, keySize }) {
  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h2>Classical vs Quantum Key Distribution - Comparison</h2>
        <p className="comparison-subtitle">
          Real-time simulation of both protocols running simultaneously
        </p>
      </div>
      
      <div className="comparison-grid">
        {/* Classical Panel */}
        <div className="comparison-panel classical">
          <div className="panel-header">
            <div className="panel-title">
              {/* <span className="panel-icon">🔐</span> */}
              <h3>Classical Cryptography</h3>
            </div>
            <div className="panel-tag">
              <span className="tag mathematical">Mathematical Security</span>
              <span className="tag vulnerable">Quantum Vulnerable</span>
            </div>
          </div>
          <ClassicalSimulator 
            simulationSpeed={simulationSpeed}
            showEavesdropper={showEavesdropper}
            keySize={keySize}
          />
        </div>
        
        {/* Divider */}
        <div className="comparison-divider">
          <div className="divider-line"></div>
          <div className="divider-text">VS</div>
          <div className="divider-line"></div>
        </div>
        
        {/* Quantum Panel */}
        <div className="comparison-panel quantum">
          <div className="panel-header">
            <div className="panel-title">
              {/* <span className="panel-icon">⚛️</span> */}
              <h3>Quantum Cryptography</h3>
            </div>
            <div className="panel-tag">
              <span className="tag physical">Physical Security</span>
              <span className="tag secure">Quantum Resistant</span>
            </div>
          </div>
          <QuantumSimulator 
            simulationSpeed={simulationSpeed}
            showEavesdropper={showEavesdropper}
          />
        </div>
      </div>
      
      <div className="comparison-legend">
        <div className="legend-item">
          <div className="legend-color classical"></div>
          <span>Classical: Based on Computational Hardness</span>
        </div>
        <div className="legend-item">
          <div className="legend-color quantum"></div>
          <span>Quantum: Based on Physics Laws</span>
        </div>
        <div className="legend-item">
          <div className="legend-color attack"></div>
          <span>Eavesdropper Active: {showEavesdropper ? 'YES' : 'NO'}</span>
        </div>
      </div>
    </div>
  );
}

export default SideBySideComparison;