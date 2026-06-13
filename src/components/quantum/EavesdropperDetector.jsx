// File: src/components/quantum/EavesdropperDetector.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/quantum.css';

import './EavesdropperDetector.css'; // In EavesdropperDetector.jsx

function EavesdropperDetector({ eavesdropperDetected, errorRate, showEavesdropper }) {
  const [detectionLevel, setDetectionLevel] = useState(0);
  const [alertHistory, setAlertHistory] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    if (showEavesdropper) {
      // Simulate real-time monitoring
      const interval = setInterval(() => {
        const newDataPoint = {
          time: Date.now(),
          errorRate: Math.random() * 0.2,
          photonCount: Math.floor(Math.random() * 100) + 50,
          basisMismatch: Math.random() * 0.15
        };
        
        setRealTimeData(prev => {
          const newData = [...prev, newDataPoint].slice(-50);
          return newData;
        });
        
        // Check for anomalies
        if (newDataPoint.errorRate > 0.11 || newDataPoint.basisMismatch > 0.12) {
          const anomaly = {
            id: Date.now(),
            type: newDataPoint.errorRate > 0.11 ? 'error-rate' : 'basis-anomaly',
            severity: newDataPoint.errorRate > 0.15 ? 'critical' : 'warning',
            value: newDataPoint.errorRate > 0.11 ? newDataPoint.errorRate : newDataPoint.basisMismatch,
            time: new Date().toLocaleTimeString()
          };
          
          setAnomalies(prev => [anomaly, ...prev.slice(0, 10)]);
          
          // Add to alert history
          if (newDataPoint.errorRate > 0.11) {
            setAlertHistory(prev => [
              {
                id: Date.now(),
                message: `Error rate spike detected: ${(newDataPoint.errorRate * 100).toFixed(1)}%`,
                severity: anomaly.severity,
                time: new Date().toLocaleTimeString()
              },
              ...prev.slice(0, 5)
            ]);
          }
        }
        
        // Update detection level
        const level = Math.min(100, (newDataPoint.errorRate * 500) + (newDataPoint.basisMismatch * 300));
        setDetectionLevel(level);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [showEavesdropper]);

  const getDetectionColor = () => {
    if (detectionLevel > 70) return '#FF2E5C';
    if (detectionLevel > 40) return '#FFA726';
    return '#00FF9D';
  };

  const getDetectionStatus = () => {
    if (eavesdropperDetected || detectionLevel > 70) return 'EAVESDROPPER CONFIRMED';
    if (detectionLevel > 40) return 'SUSPICIOUS ACTIVITY';
    return 'NO EAVESDROPPER DETECTED';
  };

  return (
    <div className="eavesdropper-detector">
      <div className="detector-header">
        <h3>Quantum Eavesdropper Detection System</h3>
        <div 
          className="detection-status"
          style={{ 
            backgroundColor: eavesdropperDetected ? 'rgba(255, 46, 92, 0.2)' : 'rgba(0, 255, 157, 0.2)',
            borderColor: getDetectionColor()
          }}
        >
          <div className="status-icon">
            {eavesdropperDetected ? '🚨' : '✅'}
          </div>
          <div className="status-text">{getDetectionStatus()}</div>
        </div>
      </div>
      
      {/* Detection Meter */}
      <div className="detection-meter">
        <div className="meter-header">
          <div className="meter-title">Eavesdropper Detection Confidence</div>
          <div className="meter-value" style={{ color: getDetectionColor() }}>
            {detectionLevel.toFixed(1)}%
          </div>
        </div>
        <div className="meter-bar">
          <div 
            className="meter-fill"
            style={{ 
              width: `${detectionLevel}%`,
              backgroundColor: getDetectionColor()
            }}
          ></div>
          <div className="meter-thresholds">
            <div className="threshold safe" style={{ left: '11%' }}>
              <div className="threshold-line"></div>
              <div className="threshold-label">Safe (11%)</div>
            </div>
            <div className="threshold warning" style={{ left: '25%' }}>
              <div className="threshold-line"></div>
              <div className="threshold-label">Warning</div>
            </div>
            <div className="threshold critical" style={{ left: '70%' }}>
              <div className="threshold-line"></div>
              <div className="threshold-label">Critical</div>
            </div>
          </div>
        </div>
        <div className="meter-explanation">
          Quantum detection based on error rate analysis. Any value above 11% indicates potential eavesdropping.
        </div>
      </div>
      
      {/* Real-time Monitoring */}
      <div className="real-time-monitor">
        <h4>Real-time Quantum Channel Monitoring:</h4>
        <div className="monitor-grid">
          <div className="monitor-metric">
            <div className="metric-name">Current Error Rate</div>
            <div 
              className="metric-value"
              style={{ color: errorRate > 11 ? '#FF2E5C' : '#00FF9D' }}
            >
              {errorRate.toFixed(2)}%
            </div>
            <div className="metric-threshold">
              Threshold: 11%
              {errorRate > 11 && <span className="exceeded"> EXCEEDED</span>}
            </div>
          </div>
          <div className="monitor-metric">
            <div className="metric-name">Basis Mismatch Rate</div>
            <div className="metric-value">
              {(realTimeData.length > 0 ? realTimeData[realTimeData.length - 1].basisMismatch * 100 : 0).toFixed(2)}%
            </div>
            <div className="metric-threshold">Expected: 50%</div>
          </div>
          <div className="monitor-metric">
            <div className="metric-name">Photon Count</div>
            <div className="metric-value">
              {realTimeData.length > 0 ? realTimeData[realTimeData.length - 1].photonCount : 0}
            </div>
            <div className="metric-threshold">Per second</div>
          </div>
          <div className="monitor-metric">
            <div className="metric-name">Quantum Bit Error Rate</div>
            <div className="metric-value">
              {(errorRate / 100).toFixed(4)}
            </div>
            <div className="metric-threshold">QBER</div>
          </div>
        </div>
        
        {/* Real-time Chart */}
        <div className="real-time-chart">
          <div className="chart-header">Error Rate Over Time</div>
          <div className="chart-container">
            {realTimeData.map((point, index) => (
              <div
                key={index}
                className="chart-point"
                style={{
                  left: `${(index / realTimeData.length) * 100}%`,
                  bottom: `${point.errorRate * 500}px`,
                  backgroundColor: point.errorRate > 0.11 ? '#FF2E5C' : '#00E5FF'
                }}
                title={`Error: ${(point.errorRate * 100).toFixed(1)}%`}
              ></div>
            ))}
            {/* Threshold Line */}
            <div className="chart-threshold" style={{ bottom: '55px' }}>
              <div className="threshold-line"></div>
              <div className="threshold-label">11% Threshold</div>
            </div>
          </div>
          <div className="chart-labels">
            <span>Time →</span>
            <span>Error Rate %</span>
          </div>
        </div>
      </div>
      
      {/* Anomaly Detection */}
      <div className="anomaly-detection">
        <h4>Anomaly Detection Log:</h4>
        <div className="anomalies-list">
          {anomalies.length > 0 ? (
            anomalies.map(anomaly => (
              <div key={anomaly.id} className={`anomaly ${anomaly.severity}`}>
                <div className="anomaly-time">{anomaly.time}</div>
                <div className="anomaly-content">
                  <div className="anomaly-icon">
                    {anomaly.severity === 'critical' ? '🚨' : '⚠️'}
                  </div>
                  <div className="anomaly-text">
                    {anomaly.type === 'error-rate' 
                      ? `Error rate anomaly: ${(anomaly.value * 100).toFixed(1)}%`
                      : `Basis mismatch anomaly: ${(anomaly.value * 100).toFixed(1)}%`
                    }
                  </div>
                </div>
                <div className={`anomaly-severity ${anomaly.severity}`}>
                  {anomaly.severity.toUpperCase()}
                </div>
              </div>
            ))
          ) : (
            <div className="no-anomalies">
              {/* <div className="no-anomalies-icon">✅</div> */}
              <div className="no-anomalies-text">No anomalies detected in quantum channel</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Alert History */}
      <div className="alert-history">
        <h4>Alert History:</h4>
        <div className="alerts-list">
          {alertHistory.length > 0 ? (
            alertHistory.map(alert => (
              <div key={alert.id} className={`alert ${alert.severity}`}>
                <div className="alert-time">{alert.time}</div>
                <div className="alert-message">{alert.message}</div>
                <div className={`alert-severity ${alert.severity}`}>
                  {alert.severity.toUpperCase()}
                </div>
              </div>
            ))
          ) : (
            <div className="no-alerts">
              {/* <div className="no-alerts-icon">📊</div> */}
              <div className="no-alerts-text">No security alerts generated</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quantum Principles */}
      <div className="quantum-principles">
        <h4>Quantum Detection Principles:</h4>
        <div className="principles-grid">
          <div className="principle">
            {/* <div className="principle-icon">⚛️</div> */}
            <div className="principle-content">
              <div className="principle-title">No-Cloning Theorem</div>
              <div className="principle-desc">Quantum states cannot be copied, forcing eavesdroppers to measure</div>
            </div>
          </div>
          <div className="principle">
            {/* <div className="principle-icon">📊</div> */}
            <div className="principle-content">
              <div className="principle-title">Error Rate Analysis</div>
              <div className="principle-desc">Any measurement increases error rate above threshold</div>
            </div>
          </div>
          <div className="principle">
            {/* <div className="principle-icon">🔍</div> */}
            <div className="principle-content">
              <div className="principle-title">Basis Reconciliation</div>
              <div className="principle-desc">Mismatch patterns reveal interception attempts</div>
            </div>
          </div>
          <div className="principle">
            {/* <div className="principle-icon">🛡️</div> */}
            <div className="principle-content">
              <div className="principle-title">Information Theoretic</div>
              <div className="principle-desc">Detection based on physics, not computational assumptions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EavesdropperDetector;