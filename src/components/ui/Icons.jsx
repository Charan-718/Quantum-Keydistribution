// File: src/components/ui/Icons.jsx
import React from 'react';

/**
 * Standard Icon wrapper enforcing consistent stroke, size, and accessibility
 */
function BaseIcon({ children, size = 16, className = '', strokeWidth = 1.75, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ui-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// Quantum / Physics Icons
export function QuantumAtomIcon(props) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
    </BaseIcon>
  );
}

export function PhotonWaveIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M2 12c2.5-4 5.5-4 8 0s5.5 4 8 0 4-4 4-4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </BaseIcon>
  );
}

export function ShieldLockIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
      <path d="M12 11v4" />
    </BaseIcon>
  );
}

export function ShieldCheckIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </BaseIcon>
  );
}

export function ShieldAlertIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </BaseIcon>
  );
}

export function LockIcon(props) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </BaseIcon>
  );
}

export function UnlockIcon(props) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 019.9-1" />
    </BaseIcon>
  );
}

export function KeyIcon(props) {
  return (
    <BaseIcon {...props}>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M21 2l-9.6 9.6" />
      <path d="M15.5 7.5l3 3" />
      <path d="M18.5 4.5l3 3" />
    </BaseIcon>
  );
}

export function ActivityIcon(props) {
  return (
    <BaseIcon {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </BaseIcon>
  );
}

export function PlayIcon(props) {
  return (
    <BaseIcon {...props}>
      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.2" />
    </BaseIcon>
  );
}

export function RotateCcwIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </BaseIcon>
  );
}

export function CompareIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M16 3h5v5" />
      <path d="M4 20L21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </BaseIcon>
  );
}

export function Sphere3DIcon(props) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </BaseIcon>
  );
}

export function EyeIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </BaseIcon>
  );
}

export function AlertTriangleIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </BaseIcon>
  );
}

export function CheckCircleIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </BaseIcon>
  );
}

export function InfoIcon(props) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props) {
  return (
    <BaseIcon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </BaseIcon>
  );
}

export function ArrowDownIcon(props) {
  return (
    <BaseIcon {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </BaseIcon>
  );
}

export function ArrowUpIcon(props) {
  return (
    <BaseIcon {...props}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </BaseIcon>
  );
}

export function SlidersIcon(props) {
  return (
    <BaseIcon {...props}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </BaseIcon>
  );
}

export function CpuIcon(props) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </BaseIcon>
  );
}

export function TerminalIcon(props) {
  return (
    <BaseIcon {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </BaseIcon>
  );
}

export function FileTextIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </BaseIcon>
  );
}

export function SunIcon(props) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </BaseIcon>
  );
}

export function MoonIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </BaseIcon>
  );
}

export function MaximizeIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
    </BaseIcon>
  );
}

export function MinimizeIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M4 14h6v6m10-10h-6V4m0 16v-6h6M4 4h6v6" />
    </BaseIcon>
  );
}

export function ExternalLinkIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </BaseIcon>
  );
}

export function CopyIcon(props) {
  return (
    <BaseIcon {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </BaseIcon>
  );
}

export function CheckIcon(props) {
  return (
    <BaseIcon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </BaseIcon>
  );
}

export function XIcon(props) {
  return (
    <BaseIcon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </BaseIcon>
  );
}

export function UserIcon(props) {
  return (
    <BaseIcon {...props}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </BaseIcon>
  );
}

export function ServerIcon(props) {
  return (
    <BaseIcon {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </BaseIcon>
  );
}

