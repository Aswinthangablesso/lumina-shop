import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Star, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-grid">
        {/* Left Column: Messaging & CTAs */}
        <div className="hero-content animate-slide-up">
          <div className="hero-badge badge badge-primary">
            <Sparkles size={14} /> Next-Gen Technology Release
          </div>
          <h1 className="hero-title">
            Technology, <span className="gradient-text">Refined.</span>
          </h1>
          <p className="hero-subtitle">
            Discover premium technology designed for the way you live. Engineered with precision acoustic drivers, aerospace materials, and seamless intelligence.
          </p>

          <div className="hero-cta-group">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Collection <ArrowRight size={18} />
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              Explore Products
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">50k+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">4.9 ★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Authentic Gear</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Hero Showcase Visual */}
        <div className="hero-visual-wrapper animate-fade-in">
          <div className="glass-card main-showcase-card">
            <div className="showcase-badge badge badge-sale">Limited Edition</div>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
              alt="Lumina H1 Pro Wireless Headphones"
              className="showcase-img"
            />
            <div className="showcase-info">
              <div>
                <span className="showcase-category">Audio Gear</span>
                <h3 className="showcase-title">Lumina H1 Pro ANC</h3>
              </div>
              <div className="showcase-price-tag">
                <span className="price">$349.99</span>
                <span className="old-price">$399.99</span>
              </div>
            </div>
          </div>

          {/* Floating Glass Pill 1 */}
          <div className="floating-pill pill-top-left glass-panel">
            <Zap size={16} className="pill-icon text-amber" />
            <div>
              <div className="pill-label">Fast Wireless Charge</div>
              <div className="pill-val">15 Min = 5 Hrs</div>
            </div>
          </div>

          {/* Floating Glass Pill 2 */}
          <div className="floating-pill pill-bottom-right glass-panel">
            <div className="avatar-stack">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Customer" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Customer" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Customer" />
            </div>
            <div>
              <div className="pill-val">4.9 / 5 Stars</div>
              <div className="pill-label">Over 1,200 Reviews</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding: 4.5rem 0 3.5rem;
          overflow: hidden;
        }
        .hero-bg-glow {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.1) 40%, rgba(0, 0, 0, 0) 70%);
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
        }
        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 3.5rem;
        }
        .hero-badge {
          margin-bottom: 1.25rem;
        }
        .hero-title {
          font-size: 3.6rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 1.25rem;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.25rem;
          max-width: 540px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .btn-lg {
          padding: 0.9rem 2rem;
          font-size: 1.05rem;
          border-radius: var(--radius);
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }
        .stat-label {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .stat-divider {
          width: 1px;
          height: 35px;
          background: var(--border);
        }

        .hero-visual-wrapper {
          position: relative;
        }
        .main-showcase-card {
          position: relative;
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 1.75rem;
          box-shadow: var(--shadow), var(--shadow-glow);
          transition: var(--transition);
        }
        .main-showcase-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-hover);
        }
        .showcase-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 2;
        }
        .showcase-img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          border-radius: 16px;
          margin-bottom: 1.25rem;
        }
        .showcase-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .showcase-category {
          font-size: 0.78rem;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .showcase-title {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .showcase-price-tag {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .price {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .old-price {
          font-size: 0.95rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .floating-pill {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.1rem;
          border-radius: 16px;
          font-size: 0.85rem;
          z-index: 5;
          animation: float 4s ease-in-out infinite;
        }
        .pill-top-left {
          top: -20px;
          left: -30px;
        }
        .pill-bottom-right {
          bottom: -20px;
          right: -20px;
          animation-delay: 2s;
        }
        .pill-icon {
          color: #f59e0b;
        }
        .pill-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .pill-val {
          font-weight: 700;
          color: var(--text-primary);
        }
        .avatar-stack {
          display: flex;
        }
        .avatar-stack img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid var(--surface-card);
          margin-left: -8px;
        }
        .avatar-stack img:first-child {
          margin-left: 0;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .floating-pill {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
