// File: src/components/comparison/TimelineVisualization.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/shared.css';

function TimelineVisualization({ showEavesdropper }) {
  const [currentYear, setCurrentYear] = useState(2024);
  const [activeEvent, setActiveEvent] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const timelineEvents = [
    {
      year: 1976,
      title: 'Diffie-Hellman Published',
      description: 'First public-key cryptography protocol',
      type: 'classical',
      impact: 'High',
      status: 'active'
    },
    {
      year: 1994,
      title: 'Shor\'s Algorithm',
      description: 'Quantum algorithm breaks RSA/DH',
      type: 'quantum-threat',
      impact: 'Critical',
      status: 'future'
    },
    {
      year: 2000,
      title: 'AES Standardized',
      description: 'Advanced Encryption Standard adopted',
      type: 'classical',
      impact: 'High',
      status: 'active'
    },
    {
      year: 2008,
      title: 'First QKD Network',
      description: 'Secure communication using quantum keys',
      type: 'quantum',
      impact: 'Medium',
      status: 'emerging'
    },
    {
      year: 2016,
      title: 'NIST Post-Quantum Competition',
      description: 'Search for quantum-resistant algorithms',
      type: 'transition',
      impact: 'High',
      status: 'active'
    },
    {
      year: 2022,
      title: 'First Quantum Advantage',
      description: 'Quantum computers surpass classical',
      type: 'quantum-threat',
      impact: 'Critical',
      status: 'imminent'
    },
    {
      year: 2024,
      title: 'Hybrid Cryptography Deployed',
      description: 'Classical + Post-quantum in production',
      type: 'transition',
      impact: 'High',
      status: 'current'
    },
    {
      year: 2030,
      title: 'Cryptographically Relevant Quantum Computer',
      description: 'Quantum computers break current crypto',
      type: 'quantum-threat',
      impact: 'Critical',
      status: 'future'
    },
    {
      year: 2035,
      title: 'Quantum Internet',
      description: 'Global quantum-secure network',
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
        
        // Update current year based on progress
        const yearsRange = 2035 - 1976;
        const currentYear = 1976 + Math.floor((newProgress / 100) * yearsRange);
        setCurrentYear(currentYear);
        
        // Find active event
        const active = timelineEvents.find(event => 
          Math.abs(event.year - currentYear) <= 2
        );
        if (active) setActiveEvent(active);
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const getEventColor = (type) => {
    switch(type) {
      case 'classical': return '#4DABFF';
      case 'quantum': return '#00E5FF';
      case 'quantum-threat': return '#FF2E5C';
      case 'transition': return '#FFA726';
      default: return '#8B9CB0';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'current': return '⚡';
      case 'active': return '✅';
      case 'emerging': return '🌱';
      case 'imminent': return '⚠️';
      case 'future': return '🔮';
      default: return '📅';
    }
  };

  return (
    <div className="timeline-visualization">
      <div className="timeline-header">
        <h3>Cryptographic Evolution Timeline</h3>
        <div className="current-year">
          <span className="year-label">Current Year:</span>
          <span className="year-value">{currentYear}</span>
        </div>
      </div>
      
      {/* Timeline Visualization */}
      <div className="timeline-container">
        <div className="timeline-track">
          <div 
            className="timeline-progress"
            style={{ width: `${timelineProgress}%` }}
          ></div>
          
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
              <div className="event-year">{event.year}</div>
              <div className="event-content">
                <div className="event-icon">{getStatusIcon(event.status)}</div>
                <div className="event-title">{event.title}</div>
                <div className="event-type" style={{ backgroundColor: getEventColor(event.type) }}>
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
              <div className="event-year-large">{activeEvent.year}</div>
              <div className="event-status">
                <span className="status-icon">{getStatusIcon(activeEvent.status)}</span>
                <span className="status-text">{activeEvent.status.toUpperCase()}</span>
              </div>
            </div>
            <div className="details-title">{activeEvent.title}</div>
            <div className="details-description">{activeEvent.description}</div>
            <div className="details-metrics">
              <div className="metric">
                <span className="metric-label">Impact:</span>
                <span className={`metric-value impact-${activeEvent.impact.toLowerCase()}`}>
                  {activeEvent.impact}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Type:</span>
                <span 
                  className="metric-value type"
                  style={{ color: getEventColor(activeEvent.type) }}
                >
                  {activeEvent.type.toUpperCase()}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Years from now:</span>
                <span className="metric-value">
                  {activeEvent.year - 2024} years
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="no-event-selected">
            <div className="select-prompt">Hover over timeline events for details</div>
            {/* <div className="select-icon">👆</div> */}
          </div>
        )}
      </div>
      
      {/* Threat Timeline */}
      <div className="threat-timeline">
        <h4>Quantum Threat Timeline:</h4>
        <div className="threat-stages">
          <div className={`threat-stage ${currentYear >= 2022 ? 'active' : ''}`}>
            <div className="stage-year">2022</div>
            <div className="stage-title">Quantum Advantage</div>
            <div className="stage-desc">Quantum supremacy demonstrated</div>
          </div>
          <div className={`threat-stage ${currentYear >= 2025 ? 'active' : ''}`}>
            <div className="stage-year">2025</div>
            <div className="stage-title">Store Now, Decrypt Later</div>
            <div className="stage-desc">Data harvesting begins</div>
          </div>
          <div className={`threat-stage ${currentYear >= 2030 ? 'active' : ''}`}>
            <div className="stage-year">2030</div>
            <div className="stage-title">Cryptographically Relevant</div>
            <div className="stage-desc">Current crypto broken</div>
          </div>
          <div className={`threat-stage ${currentYear >= 2035 ? 'active' : ''}`}>
            <div className="stage-year">2035</div>
            <div className="stage-title">Quantum Dominance</div>
            <div className="stage-desc">Complete quantum transition</div>
          </div>
        </div>
        
        <div className="migration-recommendation">
          {/* <div className="rec-icon">🚨</div> */}
          <div className="rec-content">
            <div className="rec-title">Migration Urgency:</div>
            <div className="rec-text">
              {currentYear < 2025 
                ? 'Begin planning post-quantum migration' 
                : currentYear < 2030
                ? 'Actively migrating to quantum-resistant systems'
                : 'CRITICAL: Complete migration immediately'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="timeline-legend">
        <div className="legend-title">Event Types:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4DABFF' }}></div>
            <span>Classical Cryptography</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#00E5FF' }}></div>
            <span>Quantum Cryptography</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FF2E5C' }}></div>
            <span>Quantum Threats</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FFA726' }}></div>
            <span>Transition Period</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineVisualization;