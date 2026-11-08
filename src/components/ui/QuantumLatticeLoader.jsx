// File: src/components/ui/QuantumLatticeLoader.jsx
import React from 'react';
import Logo from './Logo';
import './QuantumLatticeLoader.css';

/**
 * QuantumLatticeLoader
 * Futuristic mechanical 3D keycap loader that replaces all legacy spinners.
 * Features rotating Bloch sphere orbits, a glowing central quantum photon core,
 * an animated laser gauge scanner, and telemetry status indicator.
 */
export default function QuantumLatticeLoader({
  title = 'INITIALIZING 3D QUANTUM LATTICE',
  subtitle = 'BB84 POLARIZATION VECTOR • |ψ⟩ = α|0⟩ + β|1⟩',
  colorScheme = 'vibrantBlue',
  compact = false,
  className = ''
}) {
  return (
    <div
      className={`quantum-lattice-loader ${compact ? 'is-compact' : ''} ${className}`}
      aria-label={title}
      role="status"
    >
      <div className="loader-keycap-housing">
        <div className="loader-bloch-orbit orbit-1" />
        <div className="loader-bloch-orbit orbit-2" />
        <div className="loader-bloch-orbit orbit-3" />
        <div className="loader-center-photon">
          <Logo
            variant="mark"
            size={compact ? 24 : 32}
            glow
            colorScheme={colorScheme}
          />
        </div>
      </div>

      <div className="loader-telemetry-cluster">
        <div className="loader-status-kicker">
          <span className="loader-himawari-dot" />
          <span>{title}</span>
        </div>
        <div className="loader-gauge-rail">
          <div className="loader-gauge-fill" />
        </div>
        {subtitle && (
          <div className="loader-state-notation">
            <span>{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}
