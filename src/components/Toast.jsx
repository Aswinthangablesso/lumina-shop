import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast, hideToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={20} className="toast-icon error" />;
      case 'info':
        return <Info size={20} className="toast-icon info" />;
      default:
        return <CheckCircle2 size={20} className="toast-icon success" />;
    }
  };

  return (
    <div className={`toast-container toast-${toast.type || 'success'} animate-fade-in`}>
      {getIcon()}
      <span className="toast-message">{toast.message}</span>
      <button onClick={hideToast} className="toast-close" aria-label="Close notification">
        <X size={16} />
      </button>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.25rem;
          border-radius: var(--radius);
          background: var(--surface-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow), var(--shadow-glow);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 500;
          max-width: 380px;
          backdrop-filter: blur(16px);
        }
        .toast-icon.success { color: var(--success); }
        .toast-icon.error { color: var(--danger); }
        .toast-icon.info { color: var(--accent); }
        .toast-message { flex: 1; }
        .toast-close {
          color: var(--text-muted);
          transition: var(--transition);
          padding: 0.2rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
        }
        .toast-close:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }
      `}</style>
    </div>
  );
};
