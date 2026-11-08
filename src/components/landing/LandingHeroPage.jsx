// File: src/components/landing/LandingHeroPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import QuantumWarpCanvas from './QuantumWarpCanvas';
import QuantumTriadCards from './QuantumTriadCards';
import Logo from '../ui/Logo';
import QuantumLatticeLoader from '../ui/QuantumLatticeLoader';
import './LandingHeroPage.css';

/**
 * LandingHeroPage
 * Implements the 2-viewport initial landing experience with:
 * - 3D Pointcloud Model placed prominently in upper center.
 * - Interactive Qenzix Logo acting as Light/Dark Mode toggler.
 * - Three-line mechanical 3D keycap title (QUANTUM / KEY / DISTRIBUTION) placed below the 3D model.
 * - Unique futuristic Quantum Lattice Loader for 3D model initialization.
 * - Clean bottom horizon without any Sketchfab toolbar/controls.
 * - Quick smooth scroll directly into the simulator once cards reach center view.
 */
export default function LandingHeroPage({
  onEnterSimulator,
  themeMode = 'dark',
  setThemeMode
}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const iframeRef = useRef(null);
  const apiRef = useRef(null);
  const urlProgressParam = useRef(() => {
    try {
      const urlProg = new URLSearchParams(window.location.search).get('progress');
      return urlProg !== null ? parseFloat(urlProg) : null;
    } catch (e) {
      return null;
    }
  });

  const [scrollProgress, setScrollProgress] = useState(() => {
    try {
      const urlProg = new URLSearchParams(window.location.search).get('progress');
      if (urlProg !== null) return parseFloat(urlProg);
    } catch (e) {}
    return 0;
  });

  // 3D Model color state: 'vibrant-blue' vs 'metallic-silver'
  const [modelColor, setModelColor] = useState(themeMode === 'light' ? 'vibrant-blue' : 'metallic-silver');
  // Futuristic Quantum Loader state for main model and wave horizon
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isWaveLoaded, setIsWaveLoaded] = useState(false);

  // Keep synced with theme mode changes
  useEffect(() => {
    setModelColor(themeMode === 'light' ? 'vibrant-blue' : 'metallic-silver');
  }, [themeMode]);

  // Safety fallback to dismiss model loader after warm-up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModelLoaded(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Safety fallback to dismiss wave loader after warm-up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaveLoaded(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Sketchfab 3D Model with Frontal Symmetric Camera Angle
  useEffect(() => {
    let isMounted = true;

    const setupCameraOnReady = (api) => {
      api.addEventListener('viewerready', () => {
        if (!isMounted) return;
        setIsModelLoaded(true);
        // Position camera directly on centerline (X = 0) for exact frontal horizontal symmetry
        api.setCameraLookAt([0, 12.292, 3.045], [0, 0, 0], 0, () => {});
      });
    };

    const initViewer = () => {
      if (!window.Sketchfab || !iframeRef.current) return;
      try {
        const client = new window.Sketchfab('1.12.1', iframeRef.current);
        client.init('5204389502ba46e293d619dde7b94c2b', {
          autostart: 1,
          preload: 1,
          transparent: 1,
          ui_theme: 'dark',
          ui_watermark: 0,
          ui_watermark_link: 0,
          ui_infos: 0,
          ui_controls: 0,
          ui_stop: 0,
          ui_settings: 0,
          ui_help: 0,
          ui_vr: 0,
          ui_fullscreen: 0,
          ui_annotations: 0,
          ui_inspector: 0,
          ui_hint: 0,
          ui_ar: 0,
          scrollwheel: 0,
          autospin: 0.35,
          success: (api) => {
            if (!isMounted) return;
            apiRef.current = api;
            api.start(() => {
              setupCameraOnReady(api);
            });
          },
          error: (err) => {
            console.warn('Sketchfab viewer init error:', err);
            if (isMounted) setIsModelLoaded(true);
          }
        });
      } catch (e) {
        console.warn('Sketchfab client exception:', e);
        if (isMounted) setIsModelLoaded(true);
      }
    };

    if (window.Sketchfab) {
      initViewer();
    } else {
      const script = document.createElement('script');
      script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
      script.async = true;
      script.onload = () => {
        if (isMounted) initViewer();
      };
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (apiRef.current?.stop) {
        try { apiRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  // Track scroll position across the landing track
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = (fromScrollEvent = false) => {
      const fixedProg = typeof urlProgressParam.current === 'function' ? urlProgressParam.current() : urlProgressParam.current;
      let targetProgress = fixedProg;
      if (fixedProg === null || fromScrollEvent) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;
        const currentScrolled = -rect.top;
        targetProgress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));
      }
      setScrollProgress(targetProgress);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress(true);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(false);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 1. Hero Content & 3D Model Move Upward when scrolling starts
  const textExitThreshold = 0.18;
  const textFlightNorm = Math.min(1, scrollProgress / textExitThreshold);
  const heroTranslateY = -textFlightNorm * 750;
  const isTextPastTop = scrollProgress > 0.19;
  const heroOpacity = isTextPastTop ? 0 : 1;

  const modelFlightThreshold = 0.16;
  const modelFlightNorm = Math.min(1, scrollProgress / modelFlightThreshold);
  const modelLaunchY = -Math.pow(modelFlightNorm, 1.2) * 980;
  const modelOpacity = scrollProgress > 0.18 ? 0 : 1;

  // 2. The 5 Triad Cards emerge one row at a time across 3 rows:
  const areCardsVisible = scrollProgress >= 0.16;
  const cardsOpacity = scrollProgress >= 0.16 ? 1 : 0;
  const cardsTranslateY = 0;

  // 3. Wave Model: Anchored firmly at the bottom horizon - static constant so theme toggles never reload iframe
  const waveParticlesTranslateY = 0;
  const waveParticlesOpacity = 1;

  const modelId = process.env.REACT_APP_SKETCHFAB_MODEL_ID || '5204389502ba46e293d619dde7b94c2b';
  const waveId = process.env.REACT_APP_SKETCHFAB_WAVE_ID || '27528a65990c412eae734d5f4b14da04';

  const sketchfabSrc = `https://sketchfab.com/models/${modelId}/embed?autostart=1&preload=1&transparent=1&ui_theme=dark&ui_watermark=0&ui_watermark_link=0&ui_infos=0&ui_controls=0&ui_stop=0&ui_settings=0&ui_help=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_inspector=0&ui_hint=0&ui_ar=0&ui_loading=0&scrollwheel=0&autospin=0.35`;

  // Static wave particles URL so toggling theme mode NEVER causes re-fetch or reload
  const waveParticlesSrc = `https://sketchfab.com/models/${waveId}/embed?autostart=1&preload=1&transparent=1&ui_theme=dark&ui_watermark=0&ui_watermark_link=0&ui_infos=0&ui_controls=0&ui_stop=0&ui_settings=0&ui_help=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_inspector=0&ui_hint=0&ui_ar=0&ui_loading=0&scrollwheel=0`;

  const toggleTheme = () => {
    setThemeMode?.(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <section ref={containerRef} className="landing-scroll-track" id="landing-hero-track">
      <div
        ref={stageRef}
        className={`landing-sticky-stage ${modelColor === 'vibrant-blue' ? 'stage-silver-canvas' : 'stage-charcoal-canvas'}`}
      >
        {/* Dynamic HTML5 Canvas Background Particle Lattice */}
        <QuantumWarpCanvas zoomProgress={scrollProgress} themeMode={modelColor === 'vibrant-blue' ? 'light' : 'dark'} />

        {/* Guilloche Diamond Texture Overlay */}
        <div className="landing-guilloche-bg" />

        {/* Architectural Diagonal Gold Ribbons */}
        <div className="landing-ribbon-left" />
        <div className="landing-ribbon-right" />

        {/* Radiant Cyan & Aquamarine Light Bursts */}
        <div className="landing-cyan-burst left" />
        <div className="landing-cyan-burst right" />

        {/* Ambient Central Aura */}
        <div className="landing-central-aura" />

        {/* TOP HERO HEADER: QENZIX 3D Keycap Card + Text placed BETWEEN Qenzix and 3D Model */}
        <div 
          className="hero-top-header-cluster"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px)`,
            pointerEvents: isTextPastTop ? 'none' : 'auto',
          }}
        >
          <div
            className="hero-logo-interactive keycap-card keycap-key"
            onClick={toggleTheme}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
            title={`Click key to switch to ${themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}`}
            aria-label={`Toggle Theme Mode (Current: ${themeMode} mode)`}
          >
            <Logo variant="full" height={32} glow colorScheme={modelColor === 'vibrant-blue' ? 'vibrantBlue' : 'silver'} />
          </div>

          {/* Kicker badge and Subtitle text positioned cleanly BETWEEN Qenzix and the 3D model */}
          <div className="hero-kicker-badge">
            <span className="sparkle-gem" />
            <span>NEXT-GENERATION QUANTUM INFORMATION-THEORETIC DEFENSE</span>
            <span className="sparkle-gem" />
          </div>

          <p className="hero-subtitle">
            Unconditional security governed by quantum superposition and photon polarization. 
            Any measurement irrevocably alters the quantum state, rendering eavesdropping physically impossible to hide.
          </p>
        </div>

        {/* 3D Model Viewport Stage (Prominently in upper-middle area) - INCREASED SIZE & CLIPPED UI */}
        <div
          className="model-stage-viewport"
          style={{
            transform: `translateY(${modelLaunchY}px)`,
            opacity: modelOpacity,
            pointerEvents: scrollProgress > 0.08 ? 'none' : 'auto',
          }}
        >
          <div className="model-fullscreen-frame">
            <div className="model-iframe-wrapper">
              {/* Futuristic Quantum Calibration Loader (replaces default Sketchfab loader splash) */}
              {!isModelLoaded && (
                <QuantumLatticeLoader
                  title="INITIALIZING 3D QUANTUM LATTICE"
                  subtitle="BB84 POLARIZATION VECTOR • |ψ⟩ = α|0⟩ + β|1⟩"
                  colorScheme={modelColor === 'vibrant-blue' ? 'vibrantBlue' : 'silver'}
                />
              )}

              <iframe
                ref={iframeRef}
                title="Quantum Lattice Pointcloud"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={sketchfabSrc}
                className={`model-iframe ${modelColor}`}
                style={{
                  pointerEvents: 'auto',
                  opacity: isModelLoaded ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* HERO TITLE OVERLAY: ONLY QUANTUM KEY DISTRIBUTION KEYCAPS BELOW 3D MODEL */}
        <div
          className="hero-headline-overlay placed-below-model"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px)`,
            pointerEvents: isTextPastTop ? 'none' : 'auto',
          }}
        >
          {/* Three-Line 3D Mechanical Keycaps: QUANTUM (all silver) / KEY (all blue) / DISTRIBUTION (all silver) */}
          <h1 className="hero-main-title three-lines" aria-label="Quantum Key Distribution">
            <div className="hero-keycap-line line-quantum" aria-label="QUANTUM">
              <span className="hero-keycap hero-keycap-silver">Q</span>
              <span className="hero-keycap hero-keycap-silver">U</span>
              <span className="hero-keycap hero-keycap-silver">A</span>
              <span className="hero-keycap hero-keycap-silver">N</span>
              <span className="hero-keycap hero-keycap-silver">T</span>
              <span className="hero-keycap hero-keycap-silver">U</span>
              <span className="hero-keycap hero-keycap-silver">M</span>
            </div>

            <div className="hero-keycap-line line-key" aria-label="KEY">
              <span className="hero-keycap hero-keycap-blue">K</span>
              <span className="hero-keycap hero-keycap-blue">E</span>
              <span className="hero-keycap hero-keycap-blue">Y</span>
            </div>

            <div className="hero-keycap-line line-distribution" aria-label="DISTRIBUTION">
              <span className="hero-keycap hero-keycap-silver">D</span>
              <span className="hero-keycap hero-keycap-silver">I</span>
              <span className="hero-keycap hero-keycap-silver">S</span>
              <span className="hero-keycap hero-keycap-silver">T</span>
              <span className="hero-keycap hero-keycap-silver">R</span>
              <span className="hero-keycap hero-keycap-silver">I</span>
              <span className="hero-keycap hero-keycap-silver">B</span>
              <span className="hero-keycap hero-keycap-silver">U</span>
              <span className="hero-keycap hero-keycap-silver">T</span>
              <span className="hero-keycap hero-keycap-silver">I</span>
              <span className="hero-keycap hero-keycap-silver">O</span>
              <span className="hero-keycap hero-keycap-silver">N</span>
            </div>
          </h1>
        </div>

        {/* WAVE PARTICLES 3D AMBIENT HORIZON (Embedded at bottom of hero section) */}
        <div
          className="hero-wave-particles-wrapper"
          style={{
            opacity: waveParticlesOpacity,
            transform: `translateY(${waveParticlesTranslateY}px)`,
            pointerEvents: 'none',
          }}
        >
          <div className="sketchfab-embed-wrapper wave-particles-frame">
            {/* Futuristic Quantum Wave Dynamics Loader (prevents default Sketchfab loading splash) */}
            {!isWaveLoaded && (
              <div className="wave-lattice-loader" aria-label="Calibrating Quantum Harmonic Wave">
                <div className="wave-loader-telemetry">
                  <div className="wave-loader-kicker">
                    <span className="loader-himawari-dot" />
                    <span>CALIBRATING QUANTUM WAVE DYNAMICS</span>
                  </div>
                  <div className="loader-gauge-rail">
                    <div className="loader-gauge-fill" />
                  </div>
                </div>
              </div>
            )}

            <iframe
              title="Wave Particles"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              src={waveParticlesSrc}
              onLoad={() => setIsWaveLoaded(true)}
              className={`wave-particles-iframe ${modelColor}`}
              style={{
                opacity: isWaveLoaded ? 0.95 : 0,
                transition: 'opacity 0.6s ease',
              }}
            />
          </div>
        </div>

        {/* VIEWPORT 2: THE CRYPTOGRAPHIC TRIAD CARDS */}
        <div
          className="triad-cards-overlay"
          style={{
            opacity: cardsOpacity,
            transform: `translateY(${cardsTranslateY}px)`,
            pointerEvents: cardsOpacity < 0.2 ? 'none' : 'auto',
          }}
        >
          <QuantumTriadCards isVisible={areCardsVisible} scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}
