// File: src/components/quantum/PhotonVisualization.jsx
import React, { useEffect, useState } from 'react';
import { QuantumAtomIcon, ShieldCheckIcon, EyeIcon } from '../ui/Icons';
import './PhotonVisualization.css';

function PhotonVisualization({
  photons,
  transmissionPhase,
  showEavesdropper,
  simulationSpeed = 1
}) {
  const [animatedPhotons, setAnimatedPhotons] = useState([]);

  useEffect(() => {
    if (transmissionPhase === 'transmitting' && photons.length > 0) {
      const newAnimatedPhotons = photons.slice(0, 18).map((photon, index) => ({
        ...photon,
        id: index,
        x: 40,
        y: 40 + (index % 6) * 36,
        targetX: 680,
        progress: 0,
        isMeasured: false,
        isDisturbed: false
      }));
      setAnimatedPhotons(newAnimatedPhotons);
    }
  }, [photons, transmissionPhase]);

  useEffect(() => {
    if (transmissionPhase !== 'transmitting' || animatedPhotons.length === 0) return;

    const interval = setInterval(() => {
      setAnimatedPhotons(prev =>
        prev.map(photon => {
          const newProgress = photon.progress + 0.015 * simulationSpeed;
          const isDisturbed = showEavesdropper && Math.random() < 0.28 && newProgress > 0.35;

          return {
            ...photon,
            progress: newProgress >= 1 ? 1 : newProgress,
            x: 40 + (640 - 40) * Math.min(1, newProgress),
            isDisturbed: photon.isDisturbed || isDisturbed,
            isMeasured: newProgress >= 0.75
          };
        }).filter(photon => photon.progress < 1.05)
      );
    }, 40);

    return () => clearInterval(interval);
  }, [transmissionPhase, animatedPhotons.length, simulationSpeed, showEavesdropper]);

  const getPolarizationGlyph = (photon) => {
    if (photon.polarization === 'vertical') return '|';
    if (photon.polarization === 'horizontal') return '—';
    if (photon.polarization === '45deg') return '/';
    return '\\';
  };

  return (
    <div className="photon-visualization-card">
      <div className="viz-card-header">
        <h3 className="viz-card-title">Single-Photon Quantum Channel (BB84)</h3>
        <div className="viz-card-tags">
          <span className="vtag">Phase: {transmissionPhase}</span>
          <span className="vtag">Active Pulses: {animatedPhotons.length}</span>
        </div>
      </div>

      <div className="quantum-channel-stage">
        {/* Optical Fiber Core Axis */}
        <div className="channel-fiber-core" aria-hidden="true">
          <div className="channel-fiber-axis" />
        </div>

        {/* Alice Emitter Station */}
        <div className="channel-station alice-station">
          <div className="station-icon alice-icon">
            <QuantumAtomIcon size={16} />
          </div>
          <span className="station-name">Alice</span>
          <span className="station-role">Laser Pulses</span>
        </div>

        {/* Photons in Flight */}
        {animatedPhotons.map(photon => (
          <div
            key={photon.id}
            className={`photon-node ${photon.basis} ${photon.isDisturbed ? 'is-disturbed' : ''}`}
            style={{
              left: `${photon.x}px`,
              top: `${photon.y}px`,
            }}
            title={`Bit: ${photon.bit}, Basis: ${photon.basis}, Pol: ${photon.polarization}`}
          >
            <span className="photon-glyph">{getPolarizationGlyph(photon)}</span>
            {photon.isDisturbed && (
              <span className="disturbed-pulse-halo" aria-hidden="true" />
            )}
          </div>
        ))}

        {/* Eve Intrusion Detector */}
        {showEavesdropper && (
          <div className="eve-intercept-marker">
            <EyeIcon size={14} className="eve-marker-icon" />
            <span className="eve-marker-label">Eve Measurement</span>
          </div>
        )}

        {/* Bob Detector Station */}
        <div className="channel-station bob-station">
          <div className="station-icon bob-icon">
            <ShieldCheckIcon size={16} />
          </div>
          <span className="station-name">Bob</span>
          <span className="station-role">APD Detector</span>
        </div>
      </div>

      {/* Polarization Legend */}
      <div className="polarization-legend-bar">
        <span className="legend-heading">Polarization Basis States:</span>
        <div className="legend-items-list">
          <div className="legend-item">
            <span className="basis-glyph-box rect">|</span>
            <span>Rectilinear Vertical (90° / Bit 1)</span>
          </div>
          <div className="legend-item">
            <span className="basis-glyph-box rect">—</span>
            <span>Rectilinear Horizontal (0° / Bit 0)</span>
          </div>
          <div className="legend-item">
            <span className="basis-glyph-box diag">/</span>
            <span>Diagonal 45° (|+⟩ / Bit 1)</span>
          </div>
          <div className="legend-item">
            <span className="basis-glyph-box diag">\</span>
            <span>Diagonal 135° (|-⟩ / Bit 0)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotonVisualization;
