// File: src/components/shared/Header.jsx
import React from 'react';
import Logo from '../ui/Logo';
import {
  QuantumAtomIcon,
  ShieldCheckIcon,
  CompareIcon,
  SunIcon,
  MoonIcon,
  FileTextIcon
} from '../ui/Icons';
import './Header.css';

function Header({
  activeTab,
  setActiveTab,
  onReturnToLanding,
  themeMode,
  setThemeMode,
  onOpenReference,
  onOpenTos,
  onOpenPrivacy
}) {
  const isLight = themeMode === 'light';

  const toggleTheme = () => {
    setThemeMode(isLight ? 'dark' : 'light');
  };

  return (
    <header className="app-header" id="simulator-header">
      <div className="header-brand-group">
        <div className="header-logo-badge" aria-hidden="true">
          <Logo variant="mark" size={26} glow colorScheme={themeMode === 'light' ? 'vibrantBlue' : 'silver'} />
        </div>
        <div className="header-title-block">
          <div className="header-brand-overline">
            <span className="overline-tag">QENZIX QUANTUM SUITE</span>
            <span className="overline-dot">•</span>
            <span className="overline-protocol">BB84 & Asymmetric Evaluation</span>
          </div>
          <h1 className="header-main-title">Quantum vs Classical Key Distribution</h1>
        </div>
      </div>

      <nav className="header-nav-tabs" aria-label="Simulator views">
        <button
          type="button"
          className={`header-tab-btn ${activeTab === 'comparison' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('comparison')}
          aria-selected={activeTab === 'comparison'}
          role="tab"
        >
          <CompareIcon size={15} />
          <span>Dual Comparison</span>
        </button>

        <button
          type="button"
          className={`header-tab-btn ${activeTab === 'quantum' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('quantum')}
          aria-selected={activeTab === 'quantum'}
          role="tab"
        >
          <QuantumAtomIcon size={15} />
          <span>BB84 Quantum</span>
        </button>

        <button
          type="button"
          className={`header-tab-btn ${activeTab === 'classical' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('classical')}
          aria-selected={activeTab === 'classical'}
          role="tab"
        >
          <ShieldCheckIcon size={15} />
          <span>Classical (RSA/DH)</span>
        </button>
      </nav>

      <div className="header-actions-group">
        {/* Reference Documentation Trigger */}
        {onOpenReference && (
          <button
            type="button"
            className="header-action-btn"
            onClick={onOpenReference}
            title="Open BB84 & Classical Protocol Reference"
            aria-label="Protocol Reference"
          >
            <FileTextIcon size={15} />
            <span className="action-btn-text">Reference</span>
          </button>
        )}

        {/* Dark/Light Theme Toggle */}
        <button
          type="button"
          className="header-action-btn theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
          aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
        >
          {isLight ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </button>

        {/* Live Security Status */}
        <div className="header-security-status" role="status" aria-live="polite">
          <span className="status-dot active" aria-hidden="true" />
          <span className="status-label">Channel Active</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
