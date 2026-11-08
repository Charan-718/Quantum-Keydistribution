// File: src/components/comparison/TimelineVisualization.jsx
import React, { useState, useEffect } from 'react';
import Badge from '../ui/Badge';
import {
  ActivityIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  InfoIcon
} from '../ui/Icons';
import '../../styles/shared.css';

function TimelineVisualization({ showEavesdropper }) {
  const [currentYear, setCurrentYear] = useState(2024);
  const [activeEvent, setActiveEvent] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const timelineEvents = [
    {
      year: 1976,
      title: 'Diffie-Hellman Published',
      description: 'First public-key cryptography protocol establishing asymmetric mathematics.',
      type: 'classical',
      impact: 'High',
      status: 'active'
    },
    {
      year: 1994,
      title: "Shor's Algorithm Formulated",
      description: 'Polynomial time quantum factoring proves classical RSA & ECC vulnerable.',
      type: 'quantum-threat',
      impact: 'Critical',
      status: 'future'
    },
    {
      year: 2000,
      title: 'AES Standardized (FIPS 197)',
      description: 'Symmetric block cipher standard; resilient against quantum attacks with 256-bit keys.',
      type: 'classical',
      impact: 'High',
      status: 'active'
    },
    {
      year: 2008,
      title: 'First Metropolitan QKD Network',
      description: 'Operational quantum key distribution deployed across fiber optic infrastructure.',
      type: 'quantum',
      impact: 'Medium',
      status: 'emerging'
    },
    {
      year: 2016,
      title: 'NIST Post-Quantum Cryptography Project',
      description: 'Global standardisation initiative for quantum-resistant lattice and hash algorithms.',
      type: 'transition',
      impact: 'High',
      status: 'active'
    },
    {
      year: 2022,
      title: 'Quantum Advantage Demonstrated',
      description: 'Superconducting processors demonstrate quantum computational speedup.',
      type: 'quantum-threat',
      impact: 'Critical',
      status: 'imminent'
    },
    {
      year: 2024,
      title: 'Hybrid Quantum-Safe Standards Released',
      description: 'FIPS 203, 204, and 205 finalized alongside active QKD fiber trunks.',
      type: 'transition',
      impact: 'High',
      status: 'current'
    },
    {
      year: 2030,
      title: 'Cryptographically Relevant Quantum System',
      description: 'Estimated arrival of fault-tolerant quantum hardware breaking legacy public keys.',
      type: 'quantum-threat',
      impact: 'Critical',
      status: 'future'
    },
    {
      year: 2035,
      title: 'Global Entanglement Quantum Internet',
      description: 'Satellite and fiber quantum repeater mesh providing unconditional key security.',
      type: 'quantum',
      impact: 'Transformative',
      status: 'future'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimelineProgress(prev => {
        const newProgress = prev + 0.5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const yearsRange = 2035 - 1976;
        const calcYear = 1976 + Math.floor((newProgress / 100) * yearsRange);
        setCurrentYear(calcYear);
        
        const active = timelineEvents.find(event => 
          Math.abs(event.year - calcYear) <= 2
        );
        if (active) setActiveEvent(active);
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const getEventColor = (type) => {
    switch(type) {
      case 'classical': return 'var(--color-classical-primary, #d97706)';
      case 'quantum': return 'var(--color-quantum-primary, #0284c7)';
      case 'quantum-threat': return 'var(--color-error, #dc2626)';
      case 'transition': return 'var(--color-warning, #d97706)';
      default: return 'var(--color-text-secondary, #64748b)';
    }
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'current':
        return <Badge variant="quantum" size="sm" dot>CURRENT</Badge>;
      case 'active':
        return <Badge variant="success" size="sm">ACTIVE</Badge>;
      case 'emerging':
        return <Badge variant="classical" size="sm">EMERGING</Badge>;
      case 'imminent':
        return <Badge variant="warning" size="sm">IMMINENT</Badge>;
      case 'future':
        return <Badge variant="neutral" size="sm">PROJECTED</Badge>;
      default:
        return <Badge variant="neutral" size="sm">HISTORIC</Badge>;
    }
  };

  return (
    <div className="timeline-visualization">
      <div className="timeline-header">
        <h3>Cryptographic Security Epoch Timeline</h3>
        <div className="current-year">
          <span className="year-label">Evaluation Horizon:</span>
          <span className="year-value font-mono">{currentYear}</span>
        </div>
      </div>
      
      {/* Timeline Visualization */}
      <div className="timeline-container">
        <div className="timeline-track">
          <div 
            className="timeline-progress"
            style={{ width: `${timelineProgress}%` }}
          />
          
          {/* Timeline Events */}
          {timelineEvents.map(event => (
            <div
              key={event.year}
              className={`timeline-event ${event.status} ${activeEvent?.year === event.year ? 'active' : ''}`}
              style={{
                left: `${((event.year - 1976) / (2035 - 1976)) * 100}%`,
                '--event-color': getEventColor(event.type)
              }}
              onMouseEnter={() => setActiveEvent(event)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              <div className="event-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>
              <div className="event-year font-mono">{event.year}</div>
              <div className="event-content">
                <div className="event-title">{event.title}</div>
                <div className="event-type font-mono">
                  {event.type.replace('-', ' ').toUpperCase()}
                </div>
              </div>
            </div>
          ))}
          
          {/* Current Position Indicator */}
          <div 
            className="current-position"
            style={{ left: `${timelineProgress}%` }}
          >
            <div className="position-indicator"></div>
            <div className="position-line"></div>
          </div>
        </div>
      </div>
      
      {/* Active Event Details */}
      <div className="event-details">
        {activeEvent ? (
          <>
            <div className="details-header">
              <div className="event-year-large font-mono">{activeEvent.year}</div>
              <div className="event-status">
                {renderStatusBadge(activeEvent.status)}
              </div>
            </div>
            <div className="details-title">{activeEvent.title}</div>
            <div className="details-description">{activeEvent.description}</div>
            <div className="details-metrics">
              <div className="metric">
                <span className="metric-label">System Impact:</span>
                <span className={`metric-value impact-${activeEvent.impact.toLowerCase()}`}>
                  {activeEvent.impact}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Category:</span>
                <span 
                  className="metric-value type font-mono"
                  style={{ color: getEventColor(activeEvent.type) }}
                >
                  {activeEvent.type.toUpperCase()}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Temporal Delta:</span>
                <span className="metric-value font-mono">
                  {activeEvent.year >= 2024 ? `+${activeEvent.year - 2024} Years` : `${activeEvent.year - 2024} Years`}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="no-event-selected">
            <div className="select-prompt">Hover over epoch nodes for cryptographic transition details</div>
          </div>
        )}
      </div>
      
      {/* Threat Timeline */}
      <div className="threat-timeline">
        <h4>Quantum Vulnerability Progression:</h4>
        <div className="threat-stages">
          <div className={`threat-stage ${currentYear >= 2022 ? 'active' : ''}`}>
            <div className="stage-year font-mono">2022</div>
            <div className="stage-title">Noisy Intermediate Scale Quantum</div>
            <div className="stage-desc">Supremacy demonstrations in synthetic benchmarks</div>
          </div>
          <div className={`threat-stage ${currentYear >= 2025 ? 'active' : ''}`}>
            <div className="stage-year font-mono">2025</div>
            <div className="stage-title">Harvest Now, Decrypt Later (HNDL)</div>
            <div className="stage-desc">Adversaries intercept and archive encrypted classical traffic</div>
          </div>
          <div className={`threat-stage ${currentYear >= 2030 ? 'active' : ''}`}>
            <div className="stage-year font-mono">2030</div>
            <div className="stage-title">Cryptographically Relevant Quantum Computer</div>
            <div className="stage-desc">Shor's algorithm breaks discrete log and prime factorization</div>
          </div>
          <div className={`threat-stage ${currentYear >= 2035 ? 'active' : ''}`}>
            <div className="stage-year font-mono">2035</div>
            <div className="stage-title">Information-Theoretic Quantum Supremacy</div>
            <div className="stage-desc">QKD and quantum-mesh networks become baseline standard</div>
          </div>
        </div>
        
        <div className="migration-recommendation">
          <div className="rec-content">
            <div className="rec-title">NIST Post-Quantum Migration Directive:</div>
            <div className="rec-text">
              {currentYear < 2025 
                ? 'Phase 1: Catalog asymmetric cryptographic inventory and deploy hybrid post-quantum cipher suites.' 
                : currentYear < 2030
                ? 'Phase 2: Deprecate RSA and finite-field Diffie-Hellman in favor of QKD links and ML-KEM standards.'
                : 'CRITICAL: Pure information-theoretic quantum key distribution required for top-secret boundaries.'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="timeline-legend">
        <div className="legend-title">Protocol Classification:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'var(--color-classical-primary, #d97706)' }}></div>
            <span>Classical Cryptography</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'var(--color-quantum-primary, #0284c7)' }}></div>
            <span>Quantum Key Distribution</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'var(--color-error, #dc2626)' }}></div>
            <span>Quantum Algorithmic Threat</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'var(--color-warning, #d97706)' }}></div>
            <span>Transition / Hybrid Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineVisualization;
