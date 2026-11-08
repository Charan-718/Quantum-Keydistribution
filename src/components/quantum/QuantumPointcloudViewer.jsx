// File: src/components/quantum/QuantumPointcloudViewer.jsx
import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Logo from '../ui/Logo';
import QuantumLatticeLoader from '../ui/QuantumLatticeLoader';
import {
  RotateCcwIcon,
  MaximizeIcon,
  MinimizeIcon,
  ArrowRightIcon
} from '../ui/Icons';
import './QuantumPointcloudViewer.css';

const DEFAULT_SKETCHFAB_MODEL_ID = process.env.REACT_APP_SKETCHFAB_MODEL_ID || '5204389502ba46e293d619dde7b94c2b';

export default function QuantumPointcloudViewer({ onReturnToSimulation, isEmbedded = false, themeMode = 'dark' }) {
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [loadKey, setLoadKey] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Default to vibrant-blue in light mode, metallic-silver in dark mode
  const [spectralMode, setSpectralMode] = useState(themeMode === 'light' ? 'vibrant-blue' : 'metallic-silver');
  const containerRef = useRef(null);
  const viewerIframeRef = useRef(null);
  const viewerApiRef = useRef(null);

  useEffect(() => {
    setSpectralMode(themeMode === 'light' ? 'vibrant-blue' : 'metallic-silver');
  }, [themeMode]);

  // Safety fallback for coordinate space calibration
  useEffect(() => {
    setIsViewerReady(false);
    const timer = setTimeout(() => {
      setIsViewerReady(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, [loadKey]);

  // Frontal symmetric camera alignment
  useEffect(() => {
    let isMounted = true;
    const initViewer = () => {
      if (!window.Sketchfab || !viewerIframeRef.current) return;
      try {
        const client = new window.Sketchfab('1.12.1', viewerIframeRef.current);
        client.init(DEFAULT_SKETCHFAB_MODEL_ID, {
          autostart: 1,
          preload: 1,
          transparent: 1,
          ui_theme: 'dark',
          ui_watermark: 0,
          ui_watermark_link: 0,
          ui_infos: 0,
          ui_controls: 0,
          success: (api) => {
            if (!isMounted) return;
            viewerApiRef.current = api;
            api.start(() => {
              api.addEventListener('viewerready', () => {
                if (!isMounted) return;
                setIsViewerReady(true);
                api.setCameraLookAt([0, 12.292, 3.045], [0, 0, 0], 0, () => {});
              });
            });
          }
        });
      } catch (e) {
        console.warn('Sketchfab viewer init error:', e);
        if (isMounted) setIsViewerReady(true);
      }
    };

    if (window.Sketchfab) {
      initViewer();
    }
    return () => {
      isMounted = false;
      if (viewerApiRef.current?.stop) {
        try { viewerApiRef.current.stop(); } catch (e) {}
      }
    };
  }, [loadKey]);

  const handleReloadModel = () => {
    setIsViewerReady(false);
    setTimeout(() => {
      setLoadKey(Date.now());
    }, 150);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const sketchfabSrc = `https://sketchfab.com/models/${DEFAULT_SKETCHFAB_MODEL_ID}/embed?autostart=1&preload=1&transparent=1&ui_theme=dark&ui_watermark=0&ui_watermark_link=0&ui_infos=0&ui_controls=0`;

  return (
    <div
      ref={containerRef}
      className={`quantum-pointcloud-container ${isEmbedded ? 'embedded' : 'standalone'}`}
    >
      {/* Top Scientific Instrument Header */}
      <header className="pointcloud-header">
        <div className="pointcloud-header-left">
          <div className="pointcloud-icon-badge">
            <Logo variant="mark" size={24} glow colorScheme={themeMode === 'light' ? 'vibrantBlue' : 'silver'} />
          </div>

          <div>
            <div className="pointcloud-badge-row">
              <span className="pointcloud-suite-title">
                Pointcloud Quantum State Space
              </span>
              <Badge variant="quantum" size="sm" dot>
                BB84 BLOCH LATTICE
              </Badge>
            </div>
            <h2 className="pointcloud-model-title">
              Abstract pointcloud__1 <span className="pointcloud-subtitle-tag">(Photon Superposition Topology)</span>
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pointcloud-controls-group">
          {/* Spectral Mode Selector */}
          <div className="pointcloud-mode-toggle" role="radiogroup" aria-label="Spectral color filtering">
            <button
              onClick={() => setSpectralMode('vibrant-blue')}
              className={`mode-btn ${spectralMode === 'vibrant-blue' ? 'active-blue' : ''}`}
              type="button"
            >
              Vibrant Blue
            </button>
            <button
              onClick={() => setSpectralMode('metallic-silver')}
              className={`mode-btn ${spectralMode === 'metallic-silver' ? 'active-silver' : ''}`}
              type="button"
            >
              Metallic Silver
            </button>
            <button
              onClick={() => setSpectralMode('quantum-cyan')}
              className={`mode-btn ${spectralMode === 'quantum-cyan' ? 'active-cyan' : ''}`}
              type="button"
            >
              Cyan Polarized
            </button>
            <button
              onClick={() => setSpectralMode('monochrome')}
              className={`mode-btn ${spectralMode === 'monochrome' ? 'active-mono' : ''}`}
              type="button"
            >
              Monochrome
            </button>
          </div>

          {/* Reload Button */}
          <Button
            size="sm"
            variant="secondary"
            onClick={handleReloadModel}
            title="Reload 3D Pointcloud Model"
            leftIcon={<RotateCcwIcon size={14} />}
          >
            Reset
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            size="sm"
            variant="secondary"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <MinimizeIcon size={14} /> : <MaximizeIcon size={14} />}
          </Button>

          {/* Return to Simulation Button */}
          {onReturnToSimulation && (
            <Button
              size="sm"
              variant="quantum"
              onClick={onReturnToSimulation}
              title="Return to Key Distribution Simulation"
              rightIcon={<ArrowRightIcon size={14} />}
            >
              Return to Workbench
            </Button>
          )}
        </div>
      </header>

      {/* Main 3D Viewport */}
      <main className="pointcloud-viewport-main">
        <div className="sketchfab-embed-wrapper pointcloud-frame">
          {/* Futuristic Quantum Lattice Loader (replaces legacy spinner & hides Sketchfab default loading screen) */}
          {!isViewerReady && (
            <QuantumLatticeLoader
              title="CALIBRATING HILBERT COORDINATE SPACE"
              subtitle="QUANTUM BLOCH SPHERE &bull; EIGENSTATE LATTICE"
              colorScheme={spectralMode === 'vibrant-blue' ? 'vibrantBlue' : 'silver'}
            />
          )}

          <div
            className="pointcloud-iframe-container"
            style={{
              opacity: isViewerReady ? 1 : 0,
              transition: 'opacity 0.6s ease'
            }}
          >
            <iframe
              ref={viewerIframeRef}
              key={loadKey}
              title="Abstract pointcloud__1"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              src={sketchfabSrc}
              className={`pointcloud-iframe ${spectralMode}`}
            />

            {/* Spectral tint overlay */}
            {spectralMode === 'amber-spectral' && (
              <div className="pointcloud-overlay amber-multiply" />
            )}
            {spectralMode === 'quantum-cyan' && (
              <div className="pointcloud-overlay cyan-multiply" />
            )}
          </div>

          {/* Live Orbit Status Badge */}
          <div className="pointcloud-floating-badge">
            <span className="badge-pulse-dot" />
            <span className="font-mono">Hilbert State Space &bull; Live Orbit Mode</span>
          </div>
        </div>

        {/* Footer Attribution & Navigation Controls Legend */}
        <div className="pointcloud-footer-bar">
          <p className="pointcloud-attribution">
            3D Model:{' '}
            <a
              href="https://sketchfab.com/3d-models/abstract-pointcloud--1-5204389502ba46e293d619dde7b94c2b"
              target="_blank"
              rel="noreferrer nofollow"
              className="attr-model-link"
            >
              Abstract pointcloud__1
            </a>{' '}
            by{' '}
            <a
              href="https://sketchfab.com/federicagirola"
              target="_blank"
              rel="noreferrer nofollow"
              className="attr-author-link"
            >
              Federica Girola
            </a>{' '}
            via{' '}
            <a
              href="https://sketchfab.com"
              target="_blank"
              rel="noreferrer nofollow"
              className="attr-sketchfab-link"
            >
              Sketchfab
            </a>
          </p>

          <div className="pointcloud-controls-legend">
            <span>Primary Drag: Orbit</span>
            <span>Scroll: Zoom</span>
            <span>Secondary Drag: Pan</span>
          </div>
        </div>
      </main>
    </div>
  );
}
