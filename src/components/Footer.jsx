import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, ShieldCheck, Truck, RotateCcw, Headphones, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing to Lumina Insider!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="footer-root">
      {/* Value Proposition Perks */}
      <div className="footer-perks-bar">
        <div className="container perks-grid">
          <div className="perk-item">
            <div className="perk-icon"><Truck size={22} /></div>
            <div>
              <h4 className="perk-title">Free Express Shipping</h4>
              <p className="perk-desc">On all US orders over $50</p>
            </div>
          </div>
          <div className="perk-item">
            <div className="perk-icon"><ShieldCheck size={22} /></div>
            <div>
              <h4 className="perk-title">2-Year Lumina Warranty</h4>
              <p className="perk-desc">Comprehensive hardware protection</p>
            </div>
          </div>
          <div className="perk-item">
            <div className="perk-icon"><RotateCcw size={22} /></div>
            <div>
              <h4 className="perk-title">30-Day Money Back</h4>
              <p className="perk-desc">Hassle-free return policy</p>
            </div>
          </div>
          <div className="perk-item">
            <div className="perk-icon"><Headphones size={22} /></div>
            <div>
              <h4 className="perk-title">24/7 Expert Support</h4>
              <p className="perk-desc">Dedicated tech concierge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-content">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo">
              <div className="logo-icon-wrapper">
                <Sparkles size={18} className="logo-sparkle" />
              </div>
              <span className="logo-text">
                Lumina <span className="gradient-text">Shop</span>
              </span>
            </Link>
            <p className="brand-tagline">
              Curating next-generation consumer electronics, personal audio, and smart ecosystem devices designed for modern living.
            </p>
            <div className="newsletter-box">
              <h5 className="newsletter-title">Subscribe to Lumina Insider</h5>
              <p className="newsletter-desc">Receive exclusive previews, VIP discounts, and tech insights.</p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="btn btn-primary newsletter-btn" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Catalog Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Audio">Acoustic Audio</Link></li>
              <li><Link to="/products?category=Wearables">Smart Wearables</Link></li>
              <li><Link to="/products?category=Smartphones">Flagship Phones</Link></li>
              <li><Link to="/products?category=Gaming">Gaming Gear</Link></li>
              <li><Link to="/products?category=Smart Home">Smart Home Hubs</Link></li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/products">Browse All Products</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/login">User Account</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#help">Help & Support Center</a></li>
              <li><a href="#shipping">Shipping & Tracking</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Lumina Shop. All rights reserved. Crafted with <Heart size={14} className="heart-icon" /> for tech enthusiasts.
          </p>
          <div className="payment-badges">
            <span className="payment-pill">VISA</span>
            <span className="payment-pill">MC</span>
            <span className="payment-pill">AMEX</span>
            <span className="payment-pill">Apple Pay</span>
            <span className="payment-pill">PayPal</span>
            <span className="payment-pill ssl-pill">🔒 256-Bit SSL</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          margin-top: 5rem;
          color: var(--text-secondary);
        }
        .footer-perks-bar {
          border-bottom: 1px solid var(--border);
          padding: 2.5rem 0;
          background: var(--surface);
        }
        .perks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .perk-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .perk-icon {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-sm);
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .perk-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .perk-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-content {
          padding-top: 4rem;
          padding-bottom: 2rem;
        }
        .footer-main-grid {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 3rem;
          margin-bottom: 3.5rem;
        }
        .brand-tagline {
          margin: 1rem 0 1.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 380px;
          line-height: 1.6;
        }
        .newsletter-box {
          background: var(--surface);
          padding: 1.25rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          max-width: 400px;
        }
        .newsletter-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .newsletter-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }
        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          border: 1px solid var(--border);
          font-size: 0.85rem;
        }
        .newsletter-input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .newsletter-btn {
          padding: 0.55rem 1rem;
        }

        .footer-heading {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.2rem;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          font-size: 0.9rem;
        }
        .footer-links a:hover {
          color: var(--accent);
          transform: translateX(3px);
          display: inline-block;
          transition: var(--transition);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
        }
        .heart-icon {
          color: #ef4444;
          display: inline;
          vertical-align: middle;
        }
        .payment-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .payment-pill {
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .ssl-pill {
          color: var(--success);
          border-color: rgba(16, 185, 129, 0.3);
        }

        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};
