// File: src/components/shared/Header.jsx
import React from 'react';
// import '../../styles/shared.css';
import './Header.css';

function Header({ title, subtitle }) {
  return (
    <header className="app-header">
      <div className="agency-badge">
        {/* <div className="badge-icon">🔒</div> */}
        <div className="badge-text">
          <span className="classification">TOP SECRET // CRYPTO</span>
          <span className="codename">OPERATION QUANTUM SHIELD</span>
        </div>
      </div>
      
      <div className="header-main">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      
      <div className="security-status">
        <div className="status-indicator active"></div>
        <span className="status-text">SIMULATION ACTIVE</span>
      </div>
    </header>
  );
}

export default Header;