// File: src/components/quantum/PhotonVisualization.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/quantum.css';

import './PhotonVisualization.css'; // In PhotonVisualization.jsx

function PhotonVisualization({ 
  photons, 
  transmissionPhase, 
  showEavesdropper, 
  simulationSpeed 
}) {
  const [animatedPhotons, setAnimatedPhotons] = useState([]);
  const [interferencePattern, setInterferencePattern] = useState([]);

  useEffect(() => {
    if (transmissionPhase === 'transmitting' && photons.length > 0) {
      // Create animated photons
      const newAnimatedPhotons = photons.map((photon, index) => ({
        ...photon,
        id: index,
        x: 0,
        y: 50 + (index % 10) * 40,
        targetX: 800,
        progress: 0,
        isMeasured: false,
        isDisturbed: false
      }));
      setAnimatedPhotons(newAnimatedPhotons);
      
      // Generate interference pattern if eavesdropper
      if (showEavesdropper) {
        const pattern = [];
        for (let i = 0; i < 20; i++) {
          pattern.push({
            x: Math.random() * 800,
            y: Math.random() * 400,
            intensity: Math.random()
          });
        }
        setInterferencePattern(pattern);
      }
    }
  }, [photons, transmissionPhase, showEavesdropper]);

  useEffect(() => {
    if (transmissionPhase !== 'transmitting' || animatedPhotons.length === 0) return;
    
    const interval = setInterval(() => {
      setAnimatedPhotons(prev => 
        prev.map(photon => {
          const newProgress = photon.progress + 0.01 * simulationSpeed;
          const isDisturbed = showEavesdropper && Math.random() < 0.3 && newProgress > 0.3;
          
          return {
            ...photon,
            progress: newProgress >= 1 ? 1 : newProgress,
            x: 0 + (800 - 0) * newProgress,
            isDisturbed,
            isMeasured: newProgress >= 0.7
          };
        }).filter(photon => photon.progress < 1.1)
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [transmissionPhase, animatedPhotons.length, simulationSpeed, showEavesdropper]);

  const getPhotonStyle = (photon) => {
    let rotation = 0;
    if (photon.polarization === 'vertical') rotation = 90;
    if (photon.polarization === '45deg') rotation = 45;
    if (photon.polarization === '135deg') rotation = 135;
    
    return {
      left: `${photon.x}px`,
      top: `${photon.y}px`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      opacity: photon.progress > 0.95 ? 0 : 1,
      filter: photon.isDisturbed ? 'drop-shadow(0 0 10px #FF2E5C)' : 'none'
    };
  };

  return (
    <div className="photon-visualization">
      <div className="viz-header">
        <h3>Quantum Photon Transmission</h3>
        <div className="viz-stats">
          <span className="stat">Photons: {animatedPhotons.length}</span>
          <span className="stat">Basis: Random</span>
          <span className="stat">Phase: {transmissionPhase}</span>
        </div>
      </div>
      
      <div className="quantum-channel">
        {/* Channel Background */}
        <div className="channel-tube">
          <div className="tube-glow"></div>
        </div>
        
        {/* Interference Pattern (if eavesdropper) */}
        {showEavesdropper && interferencePattern.map((point, index) => (
          <div
            key={index}
            className="interference-point"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              opacity: point.intensity * 0.5
            }}
          />
        ))}
        
        {/* Photons */}
        {animatedPhotons.map(photon => (
          <div
            key={photon.id}
            className={`photon-particle ${photon.basis} ${photon.isDisturbed ? 'disturbed' : ''}`}
            style={getPhotonStyle(photon)}
            title={`Bit: ${photon.bit}, Basis: ${photon.basis}, Pol: ${photon.polarization}`}
          >
            <div className="photon-core"></div>
            <div className="photon-trail"></div>
            {photon.isDisturbed && (
              <div className="disturbance-effect">
                <div className="disturbance-ring"></div>
                <div className="disturbance-text">MEASURED</div>
              </div>
            )}
          </div>
        ))}
        
        {/* Endpoints */}
        <div className="channel-endpoint source">
          {/* <div className="endpoint-icon">⚛️</div> */}
          <div className="endpoint-label">Alice <br/>(Source)</div>
          <div className="endpoint-status">
            {transmissionPhase === 'transmitting' ? 'EMITTING' : 'READY'}
          </div>
        </div>
        
        <div className="channel-endpoint detector">
          {/* <div className="endpoint-icon">🔬</div> */}
          <div className="endpoint-label">Bob <br/>(Detector)</div>
          <div className="endpoint-status">
            {transmissionPhase === 'transmitting' ? 'DETECTING' : 'READY'}
          </div>
        </div>
        
        {/* Eavesdropper */}
        {showEavesdropper && (
          <div className="eavesdropper-probe">
            {/* <div className="probe-icon">👁️</div> */}
            <div className="probe-label">Eve's Measurement</div>
            <div className="probe-status">INTERCEPTING</div>
          </div>
        )}
      </div>
      
      <div className="polarization-legend">
        <div className="legend-title">Photon Polarization States:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-symbol rect vertical">↕️</div>
            <span>Rectilinear Basis: | (Vertical) / — (Horizontal)</span>
          </div>
          <div className="legend-item">
            <div className="legend-symbol diag deg45">↗️</div>
            <span>Diagonal Basis: ↗ (45°) / ↖ (135°)</span>
          </div>
          <div className="legend-item">
            <div className="legend-symbol disturbed">💥</div>
            <span>Disturbed: Eavesdropper measurement detected</span>
          </div>
        </div>
      </div>
      
      <div className="quantum-principle">
        <h4>Quantum Principle in Action:</h4>
        <p>
          <strong>Heisenberg Uncertainty Principle:</strong> It is impossible to measure both 
          the polarization and the basis of a photon simultaneously without disturbing it.
        </p>
        <p>
          <strong>No-Cloning Theorem:</strong> Quantum states cannot be copied. Any attempt 
          to intercept and measure photons introduces detectable disturbances.
        </p>
        {showEavesdropper && (
          <div className="principle-warning">
            Eavesdropper's measurements collapse photon states, creating detectable errors
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotonVisualization;