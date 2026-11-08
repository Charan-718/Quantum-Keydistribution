// File: src/components/ui/Badge.jsx
import React from 'react';
import './Badge.css';

export default function Badge({
  children,
  variant = 'neutral', // 'quantum' | 'classical' | 'success' | 'warning' | 'error' | 'neutral'
  size = 'md',          // 'sm' | 'md'
  dot = false,
  className = '',
  icon = null,
  ...props
}) {
  return (
    <span className={`ui-badge ui-badge--${variant} ui-badge--${size} ${className}`} {...props}>
      {dot && <span className="ui-badge__dot" aria-hidden="true" />}
      {icon && <span className="ui-badge__icon">{icon}</span>}
      <span className="ui-badge__label">{children}</span>
    </span>
  );
}

