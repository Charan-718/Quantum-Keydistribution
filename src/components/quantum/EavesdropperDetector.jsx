// File: src/components/quantum/EavesdropperDetector.jsx
import React, { useEffect, useState } from 'react';
import { AlertTriangleIcon, CheckCircleIcon, ActivityIcon } from '../ui/Icons';
import './EavesdropperDetector.css';

function EavesdropperDetector({ eavesdropperDetected, errorRate, showEavesdropper }) {
  const [detectionLevel, setDetectionLevel] = useState(0);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    if (showEavesdropper) {
      const interval = setInterval(() => {
        const simulatedError = 0.22 + Math.random() * 0.08;
        const level = Math.min(100, simulatedError * 380);
        setDetectionLevel(level);

        if (simulatedError > 0.11) {
          const anomaly = {
            id: Date.now(),
            type: 'QBER Threshold Exceeded',
            value: (simulatedError * 100).toFixed(1),
            time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
          };
          setAnomalies(prev => [anomaly, ...prev.slice(0, 4)]);
        }
      }, 1800);

      return () => clearInterval(interval);
    } else {
      setDetectionLevel(errorRate > 0 ? (errorRate / 25) * 100 : 0);
    }
  }, [showEavesdropper, errorRate]);

  const isCritical = eavesdropperDetected || detectionLevel > 50;

  return (
    <div className="eavesdropper-detector-card">
      <div className="detector-card-header">
        <h3 className="detector-title">QBER Intrusion Detection Core</h3>
        <span className={`detector-status-pill ${isCritical ? 'critical' : 'nominal'}`}>
          {isCritical ? (
            <>
              <AlertTriangleIcon size={13} />
              <span>INTERCEPTION DETECTED</span>
            </>
          ) : (
            <>
              <CheckCircleIcon size={13} />
              <span>CHANNEL INTEGRITY NOMINAL</span>
            </>
          )}
        </span>
      </div>

      {/* Detection Confidence Bar */}
      <div className="detection-confidence-block">
        <div className="confidence-header">
          <span className="confidence-label">Intrusion Confidence Level</span>
          <span className="confidence-score" style={{ color: isCritical ? 'var(--color-error)' : 'var(--color-success)' }}>
            {detectionLevel.toFixed(1)}%
          </span>
        </div>
        <div className="confidence-track">
          <div
            className="confidence-fill"
            style={{
              width: `${Math.min(100, Math.max(4, detectionLevel))}%`,
              backgroundColor: isCritical ? 'var(--color-error)' : 'var(--color-success)'
            }}
          />
        </div>
        <div className="confidence-thresholds">
          <span className="thresh-label">Baseline Noise (2-4%)</span>
          <span className="thresh-marker">Threshold Limit: 11.0%</span>
        </div>
      </div>

      {/* Live Telemetry Grid */}
      <div className="telemetry-grid">
        <div className="telemetry-box">
          <span className="tel-name">Current Error Rate</span>
          <span className="tel-val" style={{ color: errorRate > 11 ? 'var(--color-error)' : 'var(--color-success)' }}>
            {errorRate.toFixed(2)}%
          </span>
          <span className="tel-limit">Threshold: 11.00%</span>
        </div>

        <div className="telemetry-box">
          <span className="tel-name">Eve Induced Disturbance</span>
          <span className="tel-val">
            {showEavesdropper ? '+25.0%' : '0.0%'}
          </span>
          <span className="tel-limit">Wavefunction collapse</span>
        </div>

        <div className="telemetry-box">
          <span className="tel-name">Sifting Yield</span>
          <span className="tel-val">50.0%</span>
          <span className="tel-limit">Orthogonal basis match</span>
        </div>

        <div className="telemetry-box">
          <span className="tel-name">Action Policy</span>
          <span className="tel-val" style={{ color: isCritical ? 'var(--color-error)' : 'var(--color-quantum-contrast)' }}>
            {isCritical ? 'ABORT & FLUSH' : 'AMPLIFY KEY'}
          </span>
          <span className="tel-limit">Automated threshold rule</span>
        </div>
      </div>

      {/* Real-time Anomalies Log */}
      <div className="anomalies-log-panel">
        <div className="log-header">
          <ActivityIcon size={14} />
          <span>Real-time Telemetry Anomalies</span>
        </div>
        <div className="anomalies-list">
          {anomalies.length > 0 ? (
            anomalies.map(a => (
              <div key={a.id} className="anomaly-log-row">
                <span className="a-time">{a.time}</span>
                <span className="a-type">{a.type}</span>
                <span className="a-val">{a.value}% QBER</span>
              </div>
            ))
          ) : (
            <div className="log-empty-note">
              No state vector perturbations detected on the channel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EavesdropperDetector;
