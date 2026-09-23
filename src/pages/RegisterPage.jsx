import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Sparkles, User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = register(formData);
    if (res.success) {
      showToast(`Account created! Welcome to Lumina, ${res.user.name}`, 'success');
      navigate('/');
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="auth-page-root animate-fade-in">
      <div className="auth-card glass-panel animate-slide-up">
        <div className="auth-header">
          <Link to="/" className="auth-brand-logo">
            <div className="logo-icon-wrapper">
              <Sparkles size={20} className="logo-sparkle" />
            </div>
          </Link>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Lumina Shop to track orders, save preferences, and access exclusive drops.</p>
        </div>

        {errorMessage && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                required
                placeholder="Alex Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="alex@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password (Min 6 characters) *</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full auth-submit-btn">
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Already have a Lumina account?</span>{' '}
          <Link to="/login" className="highlight-link">
            Log In
          </Link>
        </div>
      </div>

      <style>{`
        .auth-page-root {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
        }
        .auth-card {
          width: 100%;
          max-width: 480px;
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow), var(--shadow-glow);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .auth-brand-logo {
          display: inline-block;
          margin-bottom: 1rem;
        }
        .auth-title {
          font-size: 2rem;
          margin-bottom: 0.4rem;
        }
        .auth-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .auth-error-banner {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          margin-bottom: 1.5rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-muted);
        }
        .input-with-icon .form-input {
          width: 100%;
          padding-left: 2.6rem;
        }

        .auth-submit-btn {
          margin-top: 0.5rem;
        }
        .auth-footer-link {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .highlight-link {
          color: var(--accent);
          font-weight: 700;
        }
        .highlight-link:hover {
          text-decoration: underline;
        }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
};
