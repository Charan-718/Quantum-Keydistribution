// File: src/components/ui/Logo.jsx
import React from 'react';

/**
 * Logo Component
 * Precision vector reproduction of the user-designed continuous Quantum Cryptographic Key logotype.
 * Recreates the exact dot-grid geometry:
 * - Left: Diamond Key Bow (< | >) with central spine and superposition diamond facet
 * - Transition: Parallel angled channel from the bow's bottom-right
 * - Shaft: Geometric Typeface (E - N - Z - I - X)
 * - Right: Key Bit Teeth (cross X with vertical closure bar and quantum photon node)
 */
export default function Logo({
  variant = 'mark', // 'mark' | 'full'
  size = 32,
  height,
  width,
  glow = true,
  colorScheme = 'silver', // 'silver' | 'vibrantBlue' | 'purple' | 'cyan'
  className = '',
  title = 'QENZIX Quantum Key'
}) {
  const filterId = `denzix-glow-${variant}-${colorScheme}`;
  const strokeGradId = `denzix-stroke-${variant}-${colorScheme}`;
  const accentGradId = `denzix-accent-${variant}-${colorScheme}`;

  // Color palette definitions
  const gradients = {
    silver: {
      stops: [
        { offset: '0%', color: '#ffffff' },
        { offset: '25%', color: '#f8fafc' },
        { offset: '65%', color: '#cbd5e1' },
        { offset: '100%', color: '#94a3b8' }
      ],
      accentStops: [
        { offset: '0%', color: '#38bdf8' },
        { offset: '50%', color: '#002aff' },
        { offset: '100%', color: '#001ce8' }
      ],
      coreFill: 'rgba(0, 42, 255, 0.20)',
      coreDot: '#002aff'
    },
    vibrantBlue: {
      stops: [
        { offset: '0%', color: '#38bdf8' },
        { offset: '35%', color: '#002aff' },
        { offset: '75%', color: '#001ce8' },
        { offset: '100%', color: '#051336' }
      ],
      accentStops: [
        { offset: '0%', color: '#ffffff' },
        { offset: '50%', color: '#cbd5e1' },
        { offset: '100%', color: '#94a3b8' }
      ],
      coreFill: 'rgba(255, 255, 255, 0.25)',
      coreDot: '#ffffff'
    },
    gold: {
      stops: [
        { offset: '0%', color: '#ffffff' },
        { offset: '30%', color: '#e2e8f0' },
        { offset: '70%', color: '#002aff' },
        { offset: '100%', color: '#051336' }
      ],
      accentStops: [
        { offset: '0%', color: '#38bdf8' },
        { offset: '50%', color: '#002aff' },
        { offset: '100%', color: '#0018a8' }
      ],
      coreFill: 'rgba(0, 42, 255, 0.20)',
      coreDot: '#002aff'
    },
    purple: {
      stops: [
        { offset: '0%', color: '#e0e7ff' },
        { offset: '25%', color: '#c4b5fd' },
        { offset: '60%', color: '#8b5cf6' },
        { offset: '100%', color: '#6d28d9' }
      ],
      accentStops: [
        { offset: '0%', color: '#a78bfa' },
        { offset: '50%', color: '#c084fc' },
        { offset: '100%', color: '#7c3aed' }
      ],
      coreFill: 'rgba(167, 139, 250, 0.18)',
      coreDot: '#a78bfa'
    },
    cyan: {
      stops: [
        { offset: '0%', color: '#ffffff' },
        { offset: '30%', color: '#cbd5e1' },
        { offset: '70%', color: '#38bdf8' },
        { offset: '100%', color: '#0284c7' }
      ],
      accentStops: [
        { offset: '0%', color: '#38bdf8' },
        { offset: '50%', color: '#002aff' },
        { offset: '100%', color: '#051336' }
      ],
      coreFill: 'rgba(56, 189, 248, 0.20)',
      coreDot: '#38bdf8'
    }
  };

  const activeTheme = gradients[colorScheme] || gradients.silver;

  if (variant === 'full') {
    const computedHeight = height || size || 40;
    const computedWidth = width || (typeof computedHeight === 'number' ? Math.round(computedHeight * 2.23) : undefined);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 980 440"
        width={computedWidth}
        height={computedHeight}
        fill="none"
        className={`denzix-logo denzix-logo--full ${className}`}
        aria-label={title}
        role="img"
      >
        <title>{title}</title>
        <defs>
          <linearGradient id={strokeGradId} gradientUnits="userSpaceOnUse" x1="30" y1="70" x2="950" y2="400">
            {activeTheme.stops.map((s, idx) => (
              <stop key={idx} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>

          <linearGradient id={accentGradId} gradientUnits="userSpaceOnUse" x1="30" y1="70" x2="950" y2="400">
            {activeTheme.accentStops.map((s, idx) => (
              <stop key={idx} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>

          {glow && (
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        <g filter={glow ? `url(#${filterId})` : undefined}>
          {/* 1. KEY BOW: Symmetric Diamond Q with central vertical spine < | >, base aligned to y=375 */}
          <polyline
            points="160,99 45,237 160,375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="160"
            y1="99"
            x2="160"
            y2="375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <polyline
            points="160,99 275,237 160,375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Superposition Diamond Facet - Perfectly Symmetric */}
          <polygon
            points="160,185 115,237 160,289 205,237"
            fill={activeTheme.coreFill}
            stroke={`url(#${accentGradId})`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="160" cy="237" r="5.5" fill={activeTheme.coreDot} />

          {/* 2. TRANSITION PARALLEL CHANNEL & LETTER E - Aligned to y=375 baseline */}
          <polyline
            points="160,375 240,375 337,237 433,237 410,306 364,306 318,375 433,375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. LETTER N */}
          <polyline
            points="433,375 510,237 579,375 648,237"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4. LETTER Z */}
          <polyline
            points="648,237 735,237 648,375 735,375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. LETTER I */}
          <line
            x1="772"
            y1="237"
            x2="772"
            y2="375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* 6. LETTER X & KEY BIT TEETH */}
          <line
            x1="810"
            y1="237"
            x2="900"
            y2="375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <line
            x1="810"
            y1="375"
            x2="900"
            y2="237"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <line
            x1="900"
            y1="237"
            x2="900"
            y2="375"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Quantum Photon Node at Key Tip */}
          <circle cx="900" cy="306" r="6" fill={activeTheme.coreDot} />
        </g>
      </svg>
    );
  }

  // DEFAULT / 'mark': 1:1 Diamond Key Bow Crest
  const markDim = typeof size === 'number' ? size : 32;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 360"
      width={width || markDim}
      height={height || markDim}
      fill="none"
      className={`denzix-logo denzix-logo--mark ${className}`}
      aria-label={title}
      role="img"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={strokeGradId} gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="300" y2="340">
          {activeTheme.stops.map((s, idx) => (
            <stop key={idx} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>

        <linearGradient id={accentGradId} gradientUnits="userSpaceOnUse" x1="90" y1="110" x2="230" y2="250">
          {activeTheme.accentStops.map((s, idx) => (
            <stop key={idx} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>

        {glow && (
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#${filterId})` : undefined}>
        {/* Left Chevron < */}
        <polyline
          points="160,20 25,180 160,340"
          stroke={`url(#${strokeGradId})`}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Spine | */}
        <line
          x1="160"
          y1="20"
          x2="160"
          y2="340"
          stroke={`url(#${strokeGradId})`}
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Right Chevron > */}
        <polyline
          points="160,20 295,180 160,340"
          stroke={`url(#${strokeGradId})`}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Superposition Diamond */}
        <polygon
          points="160,118 108,180 160,242 212,180"
          fill={activeTheme.coreFill}
          stroke={`url(#${accentGradId})`}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="160" cy="180" r="6" fill={activeTheme.coreDot} />
      </g>
    </svg>
  );
}
