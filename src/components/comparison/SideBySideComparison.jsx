// File: src/components/comparison/SideBySideComparison.jsx
import React from 'react';
import ClassicalSimulator from '../classical/ClassicalSimulator';
import QuantumSimulator from '../quantum/QuantumSimulator';
import { QuantumAtomIcon } from '../ui/Icons';
import './SideBySideComparison.css';

function SideBySideComparison({ simulationSpeed, showEavesdropper, keySize, onOpen3DModel }) {
  // Default is stacked flow: Stage 01 and Stage 02 are stacked with full width and zero clipping
  const layoutMode = 'stacked';

  return (
    <div className={`comparison-container layout-${layoutMode}`}>
      {/* MARQUEE BANNER: Level 1 Main Dashboard Panel */}
      <div className="comparison-header-bar">
        <div className="header-text-block">
          <div className="header-badge-row">
            <span className="section-kicker">DUAL SIMULATION ENGINE</span>
            <span className="phi-tag">&phi; = 1.618 GOLDEN LATTICE</span>
          </div>
          <h2 className="comparison-title">Real-Time Security Evaluation</h2>
          <p className="comparison-subtitle">
            Simultaneous real-time evaluation: computational hardness (RSA/DH) vs physical laws (Heisenberg uncertainty and no-cloning)
          </p>
        </div>
      </div>

      {/* DUAL ENGINE GRID / STACK */}
      <div className={`comparison-grid is-${layoutMode}`}>
        {/* STAGE 1: Classical Cryptography (Diffie-Hellman / RSA-2048) */}
        <div className="comparison-column classical-column">
          <div className="column-banner classical">
            <div className="banner-title-group">
              <span className="column-stage-pill">STAGE 01</span>
              <span className="column-title">Classical Asymmetric Cryptography</span>
            </div>
            <span className="column-pill">Computational Hardness</span>
          </div>
          <ClassicalSimulator
            simulationSpeed={simulationSpeed}
            showEavesdropper={showEavesdropper}
            keySize={keySize}
          />
        </div>

        {/* PARADIGM TRANSITION CONDUIT (Active in Stacked Mode) */}
        {layoutMode === 'stacked' && (
          <div className="paradigm-transition-conduit" aria-hidden="true">
            <div className="conduit-line left-line" />
            <div className="conduit-center-hull">
              {/* Central Pulsing Kyte Glyph representing Qenzix Q */}
              <div className="conduit-kyte-node">
                <div className="kyte-outer-frame">
                  <div className="kyte-inner-facet">
                    <QuantumAtomIcon size={20} color="#ffffff" />
                  </div>
                </div>
              </div>

              <div className="conduit-content-block">
                <span className="conduit-kicker">PARADIGM CONDUIT &bull; QUANTUM LEAP</span>
                <span className="conduit-desc">
                  Computational Factoring Vulnerability <span className="conduit-accent">&rarr;</span> Physical Axiom Immunity
                </span>
                <div className="conduit-chevrons-stream">
                  <span className="chevron-arrow">&#9660;</span>
                  <span className="chevron-arrow">&#9660;</span>
                  <span className="chevron-arrow">&#9660;</span>
                </div>
              </div>
            </div>
            <div className="conduit-line right-line" />
          </div>
        )}

        {/* STAGE 2: Quantum Key Distribution (BB84 Protocol) */}
        <div className="comparison-column quantum-column">
          <div className="column-banner quantum">
            <div className="banner-title-group">
              <span className="column-stage-pill quantum">STAGE 02</span>
              <span className="column-title">Quantum Key Distribution (BB84)</span>
            </div>
            <span className="column-pill">Physical Security Axiom</span>
          </div>
          <QuantumSimulator
            simulationSpeed={simulationSpeed}
            showEavesdropper={showEavesdropper}
            onOpen3DModel={onOpen3DModel}
          />
        </div>
      </div>

      {/* Comparison Legend Bar */}
      <div className="comparison-legend-bar">
        <div className="legend-chip">
          <span className="chip-indicator classical" />
          <span>Classical: RSA / Diffie-Hellman Modular Arithmetic &bull; Computational Hardness</span>
        </div>
        <div className="legend-chip">
          <span className="chip-indicator quantum" />
          <span>Quantum: Single-Photon Conjugate Basis Polarization &bull; Heisenberg Certainty</span>
        </div>
        <div className="legend-chip">
          <span className={`chip-indicator ${showEavesdropper ? 'attack-active' : 'attack-idle'}`} />
          <span>Eve Interceptor: {showEavesdropper ? 'ACTIVE (+25% QBER STATE COLLAPSE)' : 'IDLE (ZERO CHANNEL INTRUSION)'}</span>
        </div>
      </div>
    </div>
  );
}

export default SideBySideComparison;