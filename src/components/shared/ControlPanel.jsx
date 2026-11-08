// File: src/components/shared/ControlPanel.jsx
import React from 'react';
import {
  SlidersIcon,
  EyeIcon,
  PlayIcon,
  RotateCcwIcon,
  AlertTriangleIcon,
  KeyIcon
} from '../ui/Icons';
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
  const keySizes = [
    { bits: 512, label: '512-bit', grade: 'Deprecated', color: 'var(--color-error)' },
    { bits: 1024, label: '1024-bit', grade: 'Legacy', color: 'var(--color-warning)' },
    { bits: 2048, label: '2048-bit', grade: 'NIST Standard', color: 'var(--color-quantum-contrast)' },
    { bits: 3072, label: '3072-bit', grade: 'High Security', color: 'var(--color-success)' },
    { bits: 4096, label: '4096-bit', grade: 'Maximum Classical', color: 'var(--color-classical-contrast)' },
  ];

  const activeKeyMeta = keySizes.find(s => s.bits === keySize) || keySizes[2];

  return (
    <section className="control-panel" aria-label="Simulator Control Configuration">
      {/* 1. Channel Dynamics & Interception */}
      <div className="panel-section">
        <div className="panel-section-header">
          <span className="panel-section-icon" aria-hidden="true"><SlidersIcon size={15} /></span>
          <h2 className="panel-section-title">Channel Dynamics</h2>
        </div>

        <div className="control-field">
          <div className="field-header">
            <label htmlFor="speed-slider" className="field-label">Simulation Speed</label>
            <span className="speed-readout">{simulationSpeed.toFixed(1)}x</span>
          </div>
          <input
            id="speed-slider"
            type="range"
            min="0.2"
            max="4.0"
            step="0.2"
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
            className="ui-slider"
            aria-label="Simulation rate multiplier"
          />
          <div className="slider-ticks" aria-hidden="true">
            <span>0.2x</span>
            <span>1.0x</span>
            <span>2.0x</span>
            <span>4.0x</span>
          </div>
        </div>

        <div className="control-field">
          <label className="eavesdropper-toggle-label">
            <input
              type="checkbox"
              checked={showEavesdropper}
              onChange={() => setShowEavesdropper(!showEavesdropper)}
              className="toggle-checkbox"
            />
            <span className="toggle-switch-ui" aria-hidden="true">
              <span className="toggle-switch-handle" />
            </span>
            <div className="toggle-label-content">
              <span className="toggle-title">Eve Interceptor</span>
              <span className={`toggle-subtitle ${showEavesdropper ? 'is-active' : ''}`}>
                {showEavesdropper ? 'Active Basis Measurement (QBER +25%)' : 'Channel Untapped'}
              </span>
            </div>
            <EyeIcon size={16} className={`toggle-eye-icon ${showEavesdropper ? 'is-active' : ''}`} />
          </label>
        </div>
      </div>

      {/* 3. Cryptographic Parameters */}
      <div className="panel-section">
        <div className="panel-section-header">
          <span className="panel-section-icon" aria-hidden="true"><KeyIcon size={15} /></span>
          <h2 className="panel-section-title">Classical Asymmetric Key</h2>
        </div>

        <div className="control-field">
          <div className="key-size-grid" role="radiogroup" aria-label="Key bit length">
            {keySizes.map(size => (
              <button
                key={size.bits}
                type="button"
                role="radio"
                aria-checked={keySize === size.bits}
                className={`key-size-pill ${keySize === size.bits ? 'is-selected' : ''}`}
                onClick={() => setKeySize(size.bits)}
              >
                <span className="key-size-bits">{size.label}</span>
                <span className="key-size-grade">{size.grade}</span>
              </button>
            ))}
          </div>

          <div className="key-strength-track" aria-hidden="true">
            <div
              className="key-strength-fill"
              style={{
                width: `${Math.min(100, Math.max(12, ((keySize - 512) / (4096 - 512)) * 100))}%`,
                backgroundColor: activeKeyMeta.color
              }}
            />
          </div>
          <div className="key-strength-caption">
            <span>Shor Vulnerability: {keySize < 2048 ? 'High' : 'Theoretical'}</span>
            <span style={{ color: activeKeyMeta.color }}>{activeKeyMeta.grade}</span>
          </div>
        </div>
      </div>

      {/* 4. Tactical Actions */}
      <div className="panel-section panel-section--actions">
        <div className="panel-section-header">
          <span className="panel-section-icon" aria-hidden="true"><PlayIcon size={15} /></span>
          <h2 className="panel-section-title">Simulation Control</h2>
        </div>

        <div className="action-buttons-stack">
          <button
            type="button"
            className="action-control-btn primary"
            onClick={() => setActiveTab('comparison')}
          >
            <PlayIcon size={15} />
            <span>Dual Transmission Run</span>
          </button>

          <button
            type="button"
            className={`action-control-btn ${showEavesdropper ? 'intercept-active' : 'intercept-idle'}`}
            onClick={() => setShowEavesdropper(!showEavesdropper)}
          >
            <AlertTriangleIcon size={15} />
            <span>{showEavesdropper ? 'Deactivate Eve Interceptor' : 'Inject Eve Interception'}</span>
          </button>

          <button
            type="button"
            className="action-control-btn secondary"
            onClick={() => {
              // Trigger a fast speed reset or channel clear
              setSimulationSpeed(1.0);
            }}
            title="Reset speed to 1.0x baseline"
          >
            <RotateCcwIcon size={14} />
            <span>Reset Speed (1.0x)</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ControlPanel;
