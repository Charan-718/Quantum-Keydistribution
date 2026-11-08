// File: src/components/landing/QuantumTriadCards.jsx
import React, { useState } from 'react';
import Logo from '../ui/Logo';
import { AlertTriangleIcon } from '../ui/Icons';
import './QuantumTriadCards.css';

/**
 * QuantumTriadCards
 * Implements the 3D Mechanical Keyboard Cluster layout:
 * - CENTER: Vibrant Electric Blue Keycap containing "The Cryptographic Triad" header text.
 * - TOP: White Keycap (Apex: Heisenberg & No-Cloning Axiom)
 * - LEFT: White Keycap (Alice: Transmitter)
 * - RIGHT: White Keycap (Bob: Receiver)
 * - BOTTOM: White Keycap (Eve: Interceptor)
 * Surrounding cards have compact, crisp content and realistic mechanical keycap physics.
 */
export default function QuantumTriadCards({
  isVisible = false,
  scrollProgress = 0,
  onSelectPrinciple
}) {
  const [activeKey, setActiveKey] = useState('center');

  // Progressive reveal: One row at a time across 3 rows
  // Row 1 (Top: Axiomatic Apex): reveals first (scroll 0.16 to 0.28)
  const row1Progress = Math.max(0, Math.min(1, (scrollProgress - 0.16) / 0.12));
  const row1Opacity = scrollProgress >= 0.16 ? row1Progress : 0;
  const row1TranslateY = (1 - row1Progress) * 45;

  // Row 2 (Middle: Alice, Center Key, Bob): reveals second (scroll 0.28 to 0.42)
  const row2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.28) / 0.14));
  const row2Opacity = scrollProgress >= 0.28 ? row2Progress : 0;
  const row2TranslateY = (1 - row2Progress) * 45;

  // Row 3 (Bottom: Eve Interceptor): reveals third (scroll 0.42 to 0.56)
  const row3Progress = Math.max(0, Math.min(1, (scrollProgress - 0.42) / 0.14));
  const row3Opacity = scrollProgress >= 0.42 ? row3Progress : 0;
  const row3TranslateY = (1 - row3Progress) * 45;

  return (
    <div className={`triad-keyboard-cluster ${isVisible ? 'is-stagger-active' : ''}`}>
      {/* 1. TOP CARD (ROW 1): Foundational Axiom (Heisenberg Uncertainty & No-Cloning) */}
      <div
        className={`keycap-card triad-cluster-card card-top ${activeKey === 'apex' ? 'is-active' : ''}`}
        style={{
          opacity: row1Opacity,
          transform: `translateY(${row1TranslateY}px)`,
          pointerEvents: row1Opacity < 0.2 ? 'none' : 'auto',
          transition: 'box-shadow 0.15s ease, border-bottom-width 0.15s ease',
        }}
        onMouseEnter={() => setActiveKey('apex')}
        onClick={() => onSelectPrinciple?.('apex')}
        role="button"
        tabIndex={0}
        aria-label="Heisenberg Uncertainty and No-Cloning Theorem Axiom"
      >
        <div className="keycap-top-dish">
          <div className="card-header-compact">
            <div className="keycap-key-badge cobalt">
              <span className="key-letter">Q</span>
            </div>
            <span className="card-kicker">AXIOMATIC APEX</span>
            <span className="card-badge cobalt-pill">PHYSICAL AXIOM</span>
          </div>

          <h3 className="card-title-compact">Heisenberg &amp; No-Cloning Theorem</h3>

          <div className="card-quantum-formula-compact">
            <code>|&psi;&rang; &rarr; |&psi;&rang;|&psi;&rang; &empty; [PROHIBITED]</code>
          </div>

          <div className="card-footer-metrics-compact">
            <div className="metric-pill">
              <span className="m-label">Basis:</span>
              <span className="m-val">4 States</span>
            </div>
            <div className="metric-pill highlight">
              <span className="m-label">Cloning Fidelity:</span>
              <span className="m-val">F &le; 5/6</span>
            </div>
            <div className="metric-pill">
              <span className="m-label">Security:</span>
              <span className="m-val">Info-Theoretic</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LEFT CARD (ROW 2): Alice (Transmitter) */}
      <div
        className={`keycap-card triad-cluster-card card-left ${activeKey === 'alice' ? 'is-active' : ''}`}
        style={{
          opacity: row2Opacity,
          transform: `translateY(${row2TranslateY}px)`,
          pointerEvents: row2Opacity < 0.2 ? 'none' : 'auto',
          transition: 'box-shadow 0.15s ease, border-bottom-width 0.15s ease',
        }}
        onMouseEnter={() => setActiveKey('alice')}
        onClick={() => onSelectPrinciple?.('alice')}
        role="button"
        tabIndex={0}
        aria-label="Alice State Preparation Transmitter"
      >
        <div className="keycap-top-dish">
          <div className="card-header-compact">
            <div className="keycap-key-badge silver">
              <span className="key-letter">A</span>
            </div>
            <span className="card-kicker">VERTEX A &bull; TRANSMITTER</span>
            <span className="card-badge cyan-pill">EMITTER</span>
          </div>

          <h3 className="card-title-compact">Alice: State Preparation</h3>

          <div className="basis-diagram-compact">
            <span className="basis-tag rect">+ Rectilinear</span>
            <span className="basis-tag diag">&times; Diagonal</span>
          </div>

          <p className="card-desc-compact">
            Encodes random bitstream into single photons polarized along conjugate bases.
          </p>

          <div className="card-footer-metrics-compact">
            <div className="metric-pill">
              <span className="m-label">Pulse:</span>
              <span className="m-val">&mu; &lt; 0.1</span>
            </div>
            <div className="metric-pill highlight">
              <span className="m-label">Channel:</span>
              <span className="m-val">1550nm Fiber</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CENTER CARD (ROW 2): The Vibrant Blue Central Keycap (The Cryptographic Triad Text) */}
      <div
        className={`keycap-card keycap-cobalt triad-cluster-card card-center-blue ${activeKey === 'center' ? 'is-active' : ''}`}
        style={{
          opacity: row2Opacity,
          transform: `translateY(${row2TranslateY}px)`,
          pointerEvents: row2Opacity < 0.2 ? 'none' : 'auto',
          transition: 'box-shadow 0.15s ease, border-bottom-width 0.15s ease',
        }}
        onMouseEnter={() => setActiveKey('center')}
        role="region"
        aria-label="The Cryptographic Triad Core Principles"
      >
        <div className="keycap-top-dish center-dish">
          <div className="center-brand-glyph">
            <Logo variant="mark" size={30} glow colorScheme="vibrantBlue" />
          </div>

          <div className="triad-center-kicker">
            <span className="sparkle-gem" />
            <span>BB84 QUANTUM ARCHITECTURE</span>
            <span className="sparkle-gem" />
          </div>

          <h2 className="triad-center-title">The Cryptographic Triad</h2>

          <p className="triad-center-desc">
            Three harmonic vertices governing unconditional physical security: Transmitter Alice, 
            Receiver Bob, and the irreversible quantum state collapse triggered by Interceptor Eve.
          </p>

          <div className="center-status-indicator">
            <span className="center-dot pulse-active" />
            <span>QUANTUM HARMONIC EQUILIBRIUM &bull; ZERO LATENT LEAKAGE</span>
          </div>
        </div>
      </div>

      {/* 4. RIGHT CARD (ROW 2): Bob (Receiver) */}
      <div
        className={`keycap-card triad-cluster-card card-right ${activeKey === 'bob' ? 'is-active' : ''}`}
        style={{
          opacity: row2Opacity,
          transform: `translateY(${row2TranslateY}px)`,
          pointerEvents: row2Opacity < 0.2 ? 'none' : 'auto',
          transition: 'box-shadow 0.15s ease, border-bottom-width 0.15s ease',
        }}
        onMouseEnter={() => setActiveKey('bob')}
        onClick={() => onSelectPrinciple?.('bob')}
        role="button"
        tabIndex={0}
        aria-label="Bob Measurement and Sifting Receiver"
      >
        <div className="keycap-top-dish">
          <div className="card-header-compact">
            <div className="keycap-key-badge silver">
              <span className="key-letter">B</span>
            </div>
            <span className="card-kicker">VERTEX B &bull; RECEIVER</span>
            <span className="card-badge gold-pill">DETECTOR</span>
          </div>

          <h3 className="card-title-compact">Bob: Detection &amp; Sifting</h3>

          <div className="basis-diagram-compact">
            <span className="basis-tag rect">+ Random Filter</span>
            <span className="basis-tag diag">&times; Sift Reconcile</span>
          </div>

          <p className="card-desc-compact">
            Measures photons with conjugate filters and compares bases publicly to distill identical raw key.
          </p>

          <div className="card-footer-metrics-compact">
            <div className="metric-pill">
              <span className="m-label">Sift Yield:</span>
              <span className="m-val">&asymp; 50%</span>
            </div>
            <div className="metric-pill highlight">
              <span className="m-label">Privacy Amp:</span>
              <span className="m-val">Toeplitz Hash</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM CARD (ROW 3): Eve (Interceptor) */}
      <div
        className={`keycap-card triad-cluster-card card-bottom ${activeKey === 'eve' ? 'is-active' : ''}`}
        style={{
          opacity: row3Opacity,
          transform: `translateY(${row3TranslateY}px)`,
          pointerEvents: row3Opacity < 0.2 ? 'none' : 'auto',
          transition: 'box-shadow 0.15s ease, border-bottom-width 0.15s ease',
        }}
        onMouseEnter={() => setActiveKey('eve')}
        onClick={() => onSelectPrinciple?.('eve')}
        role="button"
        tabIndex={0}
        aria-label="Eve Quantum Disturbance Eavesdropper"
      >
        <div className="keycap-top-dish">
          <div className="card-header-compact">
            <div className="keycap-key-badge alert-key">
              <AlertTriangleIcon size={14} color="#fcc800" />
            </div>
            <span className="card-kicker">TRIANGULATION &bull; INTRUDER</span>
            <span className="card-badge alert-pill">INTERCEPTOR</span>
          </div>

          <h3 className="card-title-compact">Eve: Quantum Collapse Disturbance</h3>

          <div className="qber-meter-compact">
            <div className="qber-meter-track">
              <div className="qber-fill" style={{ width: '45%' }} />
            </div>
            <span className="qber-label-compact">Intrusion forces +25% QBER</span>
          </div>

          <div className="card-footer-metrics-compact">
            <div className="metric-pill highlight alert">
              <span className="m-label">Intrusion Detect:</span>
              <span className="m-val">100% Certain</span>
            </div>
            <div className="metric-pill highlight alert">
              <span className="m-label">Abort Threshold:</span>
              <span className="m-val">QBER &gt; 11.0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
