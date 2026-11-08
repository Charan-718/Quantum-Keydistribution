// File: src/components/ui/Button.jsx
import React from 'react';
import './Button.css';

export default function Button({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'ghost' | 'destructive' | 'quantum' | 'classical'
  size = 'md',          // 'sm' | 'md' | 'lg'
  icon = null,
  iconRight = null,
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={`ui-btn ui-btn--${variant} ui-btn--${size} ${isLoading ? 'is-loading' : ''} ${className}`}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      {isLoading && (
        <span className="ui-btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
          </svg>
        </span>
      )}
      {!isLoading && icon && <span className="ui-btn__icon ui-btn__icon--left">{icon}</span>}
      <span className="ui-btn__label">{children}</span>
      {!isLoading && iconRight && <span className="ui-btn__icon ui-btn__icon--right">{iconRight}</span>}
    </button>
  );
}

