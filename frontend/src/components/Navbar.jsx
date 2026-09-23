import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  Search,
  ShoppingBag,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout, theme, toggleTheme } = useAuth();
  const { getCartCount, cartBump, setIsCartDrawerOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const cartCount = getCartCount();

  return (
    <header className="navbar-header glass-panel">
      <div className="container navbar-container">
        <button
          className="mobile-menu-btn btn-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="brand-logo">
          <div className="logo-icon-wrapper">
            <Sparkles size={20} className="logo-sparkle" />
          </div>
          <span className="logo-text">
            Lumina <span className="gradient-text">Shop</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
          <Link to="/products?category=Audio" className="nav-link">Audio</Link>
          <Link to="/products?category=Wearables" className="nav-link">Wearables</Link>
          <Link to="/products?category=Smartphones" className="nav-link">Smartphones</Link>
        </nav>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              placeholder="Search premium tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="btn-icon theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className={`btn-icon cart-trigger-btn ${cartBump ? 'cart-badge-bump' : ''}`}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={21} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {currentUser ? (
            <div className="user-dropdown-container">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-profile-btn"
                aria-expanded={isUserMenuOpen}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
                <span className="user-name-desktop">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`chevron-icon ${isUserMenuOpen ? 'open' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown-menu glass-panel animate-slide-up">
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">{currentUser.name}</p>
                    <p className="dropdown-user-email">{currentUser.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/cart" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    <ShoppingBag size={16} /> My Shopping Cart
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="dropdown-item logout-item"
                  >
                    <LogOut size={16} /> Logout Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons-group">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-drawer glass-panel animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
          <nav className="mobile-nav-links">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
            <Link to="/products?category=Audio" onClick={() => setIsMobileMenuOpen(false)}>Audio Gear</Link>
            <Link to="/products?category=Wearables" onClick={() => setIsMobileMenuOpen(false)}>Wearables</Link>
            <Link to="/products?category=Smartphones" onClick={() => setIsMobileMenuOpen(false)}>Smartphones</Link>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid var(--border);
          transition: var(--transition);
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 1.5rem;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
        }
        .logo-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-sparkle { color: #ffffff; }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .nav-link:hover, .nav-link.active { color: var(--text-primary); }

        .search-form { flex: 1; max-width: 320px; }
        .search-input-wrapper { position: relative; display: flex; align-items: center; }
        .search-icon { position: absolute; left: 0.85rem; color: var(--text-muted); }
        .search-input {
          width: 100%;
          padding: 0.55rem 1rem 0.55rem 2.4rem;
          border-radius: var(--radius-full);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.88rem;
        }

        .header-actions { display: flex; align-items: center; gap: 0.8rem; }
        .cart-trigger-btn { position: relative; }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--accent-gradient);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-dropdown-container { position: relative; }
        .user-profile-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.6rem 0.3rem 0.3rem;
          border-radius: var(--radius-full);
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .user-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .user-name-desktop { font-size: 0.88rem; font-weight: 600; }
        .chevron-icon { transition: var(--transition); color: var(--text-muted); }
        .chevron-icon.open { transform: rotate(180deg); }

        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 230px;
          padding: 0.75rem;
          border-radius: var(--radius);
          z-index: 100;
        }
        .dropdown-header { padding: 0.4rem 0.5rem; }
        .dropdown-user-name { font-weight: 700; font-size: 0.92rem; }
        .dropdown-user-email { font-size: 0.78rem; color: var(--text-muted); }
        .dropdown-divider { height: 1px; background: var(--border); margin: 0.5rem 0; }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.55rem 0.75rem;
          font-size: 0.88rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .dropdown-item:hover { background: var(--surface-hover); color: var(--text-primary); }
        .logout-item { color: var(--danger); }

        .btn-sm { padding: 0.45rem 1rem; font-size: 0.85rem; }
        .mobile-menu-btn { display: none; }

        @media (max-width: 900px) {
          .desktop-nav, .search-form, .user-name-desktop { display: none; }
          .mobile-menu-btn { display: inline-flex; }
        }
      `}</style>
    </header>
  );
};
