// File: src/components/ui/Modal.jsx
import React, { useEffect } from 'react';
import { XIcon } from './Icons';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '680px',
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ui-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        className="ui-modal-container"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-modal-header">
          <div className="ui-modal-header__text">
            <h2 id="modal-title" className="ui-modal-title">{title}</h2>
            {subtitle && <p className="ui-modal-subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="ui-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="ui-modal-body">
          {children}
        </div>

        <div className="ui-modal-footer">
          <button
            type="button"
            className="ui-modal-done-btn"
            onClick={onClose}
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}

