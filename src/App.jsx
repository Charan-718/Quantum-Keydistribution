// File: src/App.jsx
import React, { useState, useEffect } from 'react';
import LandingHeroPage from './components/landing/LandingHeroPage';
import Header from './components/shared/Header';
import SideBySideComparison from './components/comparison/SideBySideComparison';
import ControlPanel from './components/shared/ControlPanel';
import StatsDashboard from './components/comparison/StatsDashboard';
import ClassicalSimulator from './components/classical/ClassicalSimulator';
import QuantumSimulator from './components/quantum/QuantumSimulator';
import QuantumPointcloudViewer from './components/quantum/QuantumPointcloudViewer';
import Logo from './components/ui/Logo';
import {
  TermsOfServiceModal,
  PrivacyPolicyModal,
  ProtocolReferenceModal
} from './components/ui/LegalModals';
import {
  ShieldCheckIcon,
  ArrowUpIcon
} from './components/ui/Icons';
import './styles/App.css';
import './styles/variables.css';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const urlTab = new URLSearchParams(window.location.search).get('tab');
      if (urlTab) return urlTab;
    } catch (e) {}
    return 'comparison';
  });
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showEavesdropper, setShowEavesdropper] = useState(false);
  const [keySize, setKeySize] = useState(2048);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const urlTheme = new URLSearchParams(window.location.search).get('theme');
      if (urlTheme === 'dark' || urlTheme === 'light') return urlTheme;
    } catch (e) {
      // safe fallback
    }
    return 'light'; // 'light' (Silver BG + Cobalt Blue) | 'dark' (Deep Cobalt Obsidian + Silver)
  });
  const [showFloatingReturn, setShowFloatingReturn] = useState(false);
  const directSimView = (() => {
    try {
      return new URLSearchParams(window.location.search).get('view') === 'sim';
    } catch (e) {
      return false;
    }
  })();

  // Legal & Technical Modals
  const [showTosModal, setShowTosModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);

  // Handle optional initial scroll position from URL for testing & direct navigation
  useEffect(() => {
    try {
      const urlScroll = new URLSearchParams(window.location.search).get('scroll');
      if (urlScroll) {
        const targetY = parseInt(urlScroll, 10);
        const executeScroll = () => {
          window.scrollTo(0, targetY);
          window.dispatchEvent(new Event('scroll'));
        };
        executeScroll();
        const t1 = setTimeout(executeScroll, 100);
        const t2 = setTimeout(executeScroll, 300);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    } catch (e) {}
  }, []);

  // Monitor scroll for floating return button and dynamic 3D horizontal tilt & card-flip illustration
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowH = window.innerHeight;

          // When scrolled beyond ~150vh (inside the functioning simulator) or in directSimView
          if (scrollY > windowH * 1.5 || directSimView) {
            setShowFloatingReturn(true);
          } else {
            setShowFloatingReturn(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [directSimView]);

  const handleReturnToLanding = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleEnterSimulator = () => {
    const simSection = document.getElementById('functioning-simulator');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`app theme-${themeMode}`} data-theme={themeMode}>
      {/* PHASE 1: INITIAL 2-VIEWPORT 3D MODEL LANDING PAGE WITH TRIANGULAR PRINCIPLE */}
      {!directSimView && (
        <LandingHeroPage
          onEnterSimulator={handleEnterSimulator}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          onOpenReference={() => setShowReferenceModal(true)}
        />
      )}

      {/* PHASE 2: THE ACTUAL KEY-DISTRIBUTION FUNCTIONING PAGE */}
      <div id="functioning-simulator" className="functioning-simulator-wrapper">
        {/* Transitional Calibration Banner: Keypad Grid & Technical Matrix */}
        <div className="simulator-entrance-banner">
          <div className="entrance-badge">
            <span className="entrance-status-dot" />
            <ShieldCheckIcon size={14} color="var(--color-quantum-contrast)" />
            <span>TRIAD PROTOCOL MATRIX &bull; HARDWARE CRYPTOGRAPHIC LABORATORY</span>
          </div>
        </div>

        <Header 
          title="Quantum vs Classical Key Distribution Laboratory"
          subtitle="Information-Theoretic Security Evaluation & 3D Quantum Space"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          onOpenReference={() => setShowReferenceModal(true)}
          onReturnToLanding={handleReturnToLanding}
        />
        
        <ControlPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          simulationSpeed={simulationSpeed}
          setSimulationSpeed={setSimulationSpeed}
          showEavesdropper={showEavesdropper}
          setShowEavesdropper={setShowEavesdropper}
          keySize={keySize}
          setKeySize={setKeySize}
        />
        
        <main className="main-content">
          {activeTab === 'comparison' && (
            <SideBySideComparison
              simulationSpeed={simulationSpeed}
              showEavesdropper={showEavesdropper}
              keySize={keySize}
              onOpen3DModel={handleReturnToLanding}
            />
          )}
          
          {activeTab === 'classical' && (
            <div className="single-view">
              <ClassicalSimulator
                simulationSpeed={simulationSpeed}
                showEavesdropper={showEavesdropper}
                keySize={keySize}
              />
            </div>
          )}
          
          {activeTab === 'quantum' && (
            <div className="single-view">
              <QuantumSimulator
                simulationSpeed={simulationSpeed}
                showEavesdropper={showEavesdropper}
                onOpen3DModel={handleReturnToLanding}
              />
            </div>
          )}

          {/* Standalone 3D Quantum Pointcloud Model viewer */}
          {activeTab === 'model3d' && (
            <QuantumPointcloudViewer
              themeMode={themeMode}
              onReturnToSimulation={() => setActiveTab('comparison')}
            />
          )}
        </main>
        
        {activeTab !== 'model3d' && (
          <StatsDashboard
            showEavesdropper={showEavesdropper}
            keySize={keySize}
          />
        )}
        
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand-row">
              <Logo variant="mark" size={24} glow colorScheme={themeMode === 'light' ? 'vibrantBlue' : 'silver'} />
              <span>QENZIX &bull; Quantum Key Distribution Research Laboratory</span>
            </div>
            <p className="footer-tagline">
              BB84 Quantum Key Distribution &amp; Classical Asymmetric Simulation &bull; Governed by Heisenberg Uncertainty &amp; No-Cloning Theorem &bull; NIST FIPS 140-3 Benchmark Reference
            </p>
            <div className="footer-links-row">
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => setShowReferenceModal(true)}
              >
                Protocol Specifications
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => setShowTosModal(true)}
              >
                Terms of Service
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => setShowPrivacyModal(true)}
              >
                Privacy Policy
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                className="footer-link-btn"
              >
                Source Repository
              </a>
            </div>
            <div className="footer-copyright font-mono">
              &copy; {new Date().getFullYear()} QKD Laboratory &bull; Computational Hardness vs Information-Theoretic Security
            </div>
          </div>
        </footer>
      </div>

      {/* FLOATING QUICK-RETURN TO HERO SECTION BUTTON */}
      {showFloatingReturn && (
        <button
          className="floating-landing-return-btn"
          onClick={handleReturnToLanding}
          title="Back to Hero Section"
          aria-label="Back to Hero Section"
        >
          <ArrowUpIcon size={20} />
        </button>
      )}

      {/* Accessible Modals */}
      <TermsOfServiceModal
        isOpen={showTosModal}
        onClose={() => setShowTosModal(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <ProtocolReferenceModal
        isOpen={showReferenceModal}
        onClose={() => setShowReferenceModal(false)}
      />
    </div>
  );
}

export default App;
