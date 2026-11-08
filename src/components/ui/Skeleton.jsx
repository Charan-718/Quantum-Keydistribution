// File: src/components/ui/Skeleton.jsx
import React from 'react';
import './Skeleton.css';

export function Skeleton({
  variant = 'text', // 'text' | 'rect' | 'circle' | 'bits'
  width,
  height,
  className = '',
  style = {},
  ...props
}) {
  const customStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  return (
    <div
      className={`ui-skeleton ui-skeleton--${variant} ${className}`}
      style={customStyles}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonBitSequence({ count = 20, className = '' }) {
  return (
    <div className={`ui-skeleton-bit-sequence ${className}`} aria-label="Loading quantum bits...">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ui-skeleton ui-skeleton--bit" />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`ui-skeleton-card ${className}`} aria-hidden="true">
      <div className="ui-skeleton-card__header">
        <Skeleton variant="circle" width="36px" height="36px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton variant="text" width="40%" height="12px" />
          <Skeleton variant="text" width="70%" height="16px" />
        </div>
      </div>
      <div className="ui-skeleton-card__body">
        <Skeleton variant="text" width="100%" height="14px" />
        <Skeleton variant="text" width="90%" height="14px" />
        <Skeleton variant="text" width="60%" height="14px" />
      </div>
    </div>
  );
}

