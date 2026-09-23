import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from '../components/CheckoutModal';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  CheckCircle2,
  Tag,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';

export const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    getDiscountAmount,
    getShippingFee,
    getTax,
    getTotal
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = getSubtotal();
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container empty-cart-page-root animate-fade-in">
        <div className="empty-cart-card glass-panel">
          <div className="cart-icon-circle">
            <ShoppingBag size={48} />
          </div>
          <h2>Your Cart is Currently Empty</h2>
          <p>Explore our premium technology collection to discover extraordinary audio gear, smart wearables, and devices.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Product Catalog <ArrowRight size={18} />
          </Link>
        </div>

        <style>{`
          .empty-cart-page-root {
            padding: 5rem 0;
          }
          .empty-cart-card {
            max-width: 550px;
            margin: 0 auto;
            padding: 3.5rem 2rem;
            border-radius: 24px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
          }
          .cart-icon-circle {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: var(--accent-light);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page-root animate-fade-in">
      <div className="container">
        {/* Page Title */}
        <div className="cart-page-header">
          <div>
            <h1 className="page-title">
              Shopping <span className="gradient-text">Cart</span>
            </h1>
            <p className="page-subtitle">Manage your selected items, apply promo codes, and complete your order.</p>
          </div>

          <button onClick={clearCart} className="clear-cart-link">
            <Trash2 size={16} /> Empty Entire Cart
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="free-shipping-banner glass-panel">
          <div className="banner-text">
            <Truck size={20} className="truck-icon" />
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more to your cart for <strong>FREE Express Shipping</strong>!</span>
            ) : (
              <span className="unlocked-text">
                <CheckCircle2 size={18} /> Congratulations! You have unlocked <strong>FREE Express Shipping</strong>.
              </span>
            )}
          </div>
          <div className="banner-progress-track">
            <div className="banner-progress-fill" style={{ width: `${freeShippingProgress}%` }}></div>
          </div>
        </div>

        {/* Cart Main Workspace Layout */}
        <div className="cart-workspace">
          {/* Left Column: Cart Items List */}
          <div className="cart-items-col">
            <div className="items-table-header glass-panel">
              <span className="th-item">Product</span>
              <span className="th-price">Price</span>
              <span className="th-qty">Quantity</span>
              <span className="th-subtotal">Subtotal</span>
              <span className="th-action"></span>
            </div>

            <div className="cart-rows-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-row-card glass-panel">
                  <div className="row-product-info">
                    <img src={item.image} alt={item.title} className="row-img" />
                    <div>
                      <span className="row-cat">{item.category}</span>
                      <Link to={`/product/${item.id}`} className="row-title">
                        {item.title}
                      </Link>
                    </div>
                  </div>

                  <div className="row-price">${item.price.toFixed(2)}</div>

                  <div className="row-qty">
                    <div className="qty-picker">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="row-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="row-action">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="row-remove-btn"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-bottom-actions">
              <Link to="/products" className="btn btn-secondary">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Promo Code */}
          <div className="cart-summary-col">
            <div className="summary-card glass-panel">
              <h3 className="summary-title">Order Summary</h3>

              {/* Promo Code Box */}
              <div className="promo-section">
                <label className="promo-label">Have a Promo Code?</label>
                {appliedPromo ? (
                  <div className="applied-promo-tag">
                    <div className="promo-info">
                      <Tag size={16} className="tag-icon" />
                      <span>CODE: <strong>{appliedPromo.code}</strong> (10% OFF)</span>
                    </div>
                    <button onClick={removePromo} className="remove-promo-btn" title="Remove promo">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="promo-form">
                    <input
                      type="text"
                      placeholder="Try 'LUMINA10'"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="promo-input"
                    />
                    <button type="submit" className="btn btn-secondary promo-btn">
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{getShippingFee() === 0 ? <strong className="text-success">FREE</strong> : `$${getShippingFee().toFixed(2)}`}</span>
                </div>
                {getDiscountAmount() > 0 && (
                  <div className="summary-line text-success">
                    <span>Discount (10%)</span>
                    <span>-${getDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-line">
                  <span>Estimated Tax (8%)</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="summary-line grand-total">
                  <span>Estimated Total</span>
                  <span className="total-amount">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn btn-primary btn-lg w-full checkout-btn"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div className="checkout-guarantee-note">
                🔒 256-Bit Encrypted Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Step Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      <style>{`
        .cart-page-root {
          padding: 2.5rem 0 4rem;
        }
        .cart-page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }
        .clear-cart-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          color: var(--danger);
          font-weight: 600;
          transition: var(--transition);
        }
        .clear-cart-link:hover {
          opacity: 0.8;
        }

        .free-shipping-banner {
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 2rem;
        }
        .banner-text {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }
        .unlocked-text {
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .banner-progress-track {
          width: 100%;
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .banner-progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          transition: width 0.4s ease;
        }

        .cart-workspace {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 2rem;
          align-items: start;
        }

        .items-table-header {
          display: grid;
          grid-template-columns: 3fr 1fr 1.2fr 1fr 40px;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .cart-rows-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .cart-row-card {
          display: grid;
          grid-template-columns: 3fr 1fr 1.2fr 1fr 40px;
          align-items: center;
          padding: 1rem 1.25rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
        }
        .row-product-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .row-img {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          background: var(--bg-tertiary);
        }
        .row-cat {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          display: block;
        }
        .row-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .row-title:hover {
          color: var(--accent);
        }
        .row-price, .row-item-subtotal {
          font-size: 1rem;
          font-weight: 700;
          font-family: var(--font-heading);
        }
        .row-remove-btn {
          color: var(--text-muted);
          transition: var(--transition);
        }
        .row-remove-btn:hover {
          color: var(--danger);
        }

        .cart-bottom-actions {
          display: flex;
          justify-content: space-between;
        }

        .summary-card {
          padding: 1.75rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .summary-title {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .promo-label {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
          display: block;
        }
        .promo-form {
          display: flex;
          gap: 0.5rem;
        }
        .promo-input {
          flex: 1;
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.88rem;
          text-transform: uppercase;
        }
        .applied-promo-tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(16, 185, 129, 0.15);
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }
        .promo-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .remove-promo-btn {
          color: var(--danger);
        }

        .summary-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }
        .summary-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .grand-total {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          border-top: 1px dashed var(--border);
          padding-top: 0.75rem;
          margin-top: 0.25rem;
        }
        .total-amount {
          font-family: var(--font-heading);
          color: var(--text-primary);
        }
        .checkout-guarantee-note {
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .cart-workspace {
            grid-template-columns: 1fr;
          }
          .items-table-header {
            display: none;
          }
          .cart-row-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};
