import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Sparkles, Mail, Lock, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login, loginDemo } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(email, password);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate('/');
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleDemoClick = () => {
    const res = loginDemo();
    if (res.success) {
      showToast('Logged in as Demo User!', 'success');
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your Lumina account to manage orders and access VIP perks.</p>
        </div>

        {/* Demo Login Banner */}
        <div className="demo-login-box">
          <div className="demo-text">
            <span className="demo-badge">Quick Testing</span>
            <p className="demo-credentials">Demo: <strong>demo@lumina.shop</strong> / <strong>demo123</strong></p>
          </div>
          <button onClick={handleDemoClick} className="btn btn-outline btn-sm">
            <UserCheck size={16} /> 1-Click Demo Login
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full auth-submit-btn">
            Sign In to Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Don't have a Lumina account?</span>{' '}
          <Link to="/register" className="highlight-link">
            Create Account
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
          max-width: 460px;
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

        .demo-login-box {
          background: var(--surface);
          border: 1px dashed var(--accent);
          padding: 0.9rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 0.75rem;
        }
        .demo-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          display: block;
        }
        .demo-credentials {
          font-size: 0.78rem;
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
          gap: 1.25rem;
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
