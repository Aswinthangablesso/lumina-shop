import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Check, CreditCard, Truck, ShieldCheck, ShoppingBag, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const {
    cartItems,
    getSubtotal,
    getShippingFee,
    getTax,
    getDiscountAmount,
    getTotal,
    clearCart,
    showToast
  } = useCart();

  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    fullName: currentUser ? currentUser.name : '',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    phone: '(555) 234-5678'
  });

  // Payment Form State
  const [paymentData, setPaymentData] = useState({
    cardName: currentUser ? currentUser.name : 'Alex Rivera',
    cardNumber: '4532 •••• •••• 8892',
    expiry: '08/28',
    cvv: '882'
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setShippingData(prev => ({ ...prev, fullName: currentUser.name }));
      setPaymentData(prev => ({ ...prev, cardName: currentUser.name }));
    }
  }, [currentUser]);

  // Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const { fullName, address, city, state, zipCode, phone } = shippingData;
    if (!fullName || !address || !city || !state || !zipCode || !phone) {
      setFormError('Please fill out all required shipping fields.');
      return;
    }
    setFormError('');
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const { cardName, cardNumber, expiry, cvv } = paymentData;
    if (!cardName || !cardNumber || !expiry || !cvv) {
      setFormError('Please complete all payment details.');
      return;
    }
    setFormError('');
    setStep(3);
  };

  const handlePlaceOrder = () => {
    const orderNumber = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cartItems,
      shipping: shippingData,
      total: getTotal(),
      paymentLast4: paymentData.cardNumber.slice(-4) || '8892'
    };

    localStorage.setItem('lumina_last_order', JSON.stringify(orderDetails));
    clearCart();
    onClose();
    showToast(`Order ${orderNumber} placed successfully!`, 'success');
    navigate('/checkout-success');
  };

  return (
    <div className="checkout-backdrop glass-panel animate-fade-in" onClick={onClose}>
      <div className="checkout-modal glass-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-title-box">
            <Lock size={18} className="lock-icon" />
            <h3 className="checkout-title">256-Bit Encrypted Checkout</h3>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close checkout">
            <X size={20} />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="checkout-steps-bar">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-num">{step > 1 ? <Check size={14} /> : '1'}</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-num">{step > 2 ? <Check size={14} /> : '2'}</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        {formError && <div className="checkout-error-banner">{formError}</div>}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <form onSubmit={handleShippingSubmit} className="checkout-form-step">
            <h4 className="form-step-title"><Truck size={18} /> Delivery Address</h4>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={shippingData.phone}
                  onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input
                type="text"
                required
                value={shippingData.address}
                onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  required
                  value={shippingData.city}
                  onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">State / Province *</label>
                <input
                  type="text"
                  required
                  value={shippingData.state}
                  onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP / Postal Code *</label>
                <input
                  type="text"
                  required
                  value={shippingData.zipCode}
                  onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="checkout-form-actions">
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Simulation */}
        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="checkout-form-step">
            <h4 className="form-step-title"><CreditCard size={18} /> Payment Information (Simulation)</h4>

            <div className="simulated-card-preview glass-panel">
              <div className="card-chip"></div>
              <div className="card-number-preview">{paymentData.cardNumber}</div>
              <div className="card-bottom-row">
                <div>
                  <span className="card-sub">CARDHOLDER</span>
                  <div className="card-name-preview">{paymentData.cardName || 'YOUR NAME'}</div>
                </div>
                <div>
                  <span className="card-sub">EXPIRES</span>
                  <div className="card-exp-preview">{paymentData.expiry}</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Cardholder Name *</label>
              <input
                type="text"
                required
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Card Number *</label>
              <input
                type="text"
                required
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Expiry Date (MM/YY) *</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={paymentData.expiry}
                  onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVV *</label>
                <input
                  type="text"
                  required
                  maxLength="4"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="checkout-form-actions">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" className="btn btn-primary">
                Review Final Order <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Review */}
        {step === 3 && (
          <div className="checkout-form-step">
            <h4 className="form-step-title"><ShieldCheck size={18} /> Review & Place Order</h4>

            <div className="review-summary-grid">
              {/* Left Column: Items */}
              <div className="review-items-list">
                <h5 className="review-subheading">Items in Order ({cartItems.length})</h5>
                {cartItems.map((item) => (
                  <div key={item.id} className="review-item-row">
                    <img src={item.image} alt={item.title} className="review-item-thumb" />
                    <div className="review-item-info">
                      <p className="review-item-title">{item.title}</p>
                      <span className="review-item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                    </div>
                    <span className="review-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Right Column: Address & Pricing Summary */}
              <div className="review-meta-box glass-panel">
                <div className="review-address-card">
                  <h6 className="meta-card-title">Shipping To</h6>
                  <p className="meta-val"><strong>{shippingData.fullName}</strong></p>
                  <p className="meta-val">{shippingData.address}</p>
                  <p className="meta-val">{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                  <p className="meta-val">{shippingData.phone}</p>
                </div>

                <div className="review-price-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Shipping</span>
                    <span>{getShippingFee() === 0 ? 'FREE' : `$${getShippingFee().toFixed(2)}`}</span>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div className="breakdown-row text-success">
                      <span>Promo Discount</span>
                      <span>-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="breakdown-row">
                    <span>Tax (8%)</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row grand-total-row">
                    <span>Grand Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-form-actions">
              <button type="button" onClick={() => setStep(2)} className="btn btn-secondary">
                <ArrowLeft size={16} /> Edit Payment
              </button>
              <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg place-order-btn">
                <Check size={18} /> Place Order Now (${getTotal().toFixed(2)})
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .checkout-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .checkout-modal {
          width: 100%;
          max-width: 750px;
          background: var(--surface-card);
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow), var(--shadow-glow);
          overflow: hidden;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .checkout-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border);
        }
        .checkout-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lock-icon { color: var(--success); }
        .checkout-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .checkout-steps-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.75rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .step-item.active {
          color: var(--text-primary);
          font-weight: 700;
        }
        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
        }
        .step-item.active .step-num {
          background: var(--accent-gradient);
          color: #ffffff;
        }
        .step-line {
          flex: 1;
          max-width: 60px;
          height: 2px;
          background: var(--border);
          margin: 0 0.75rem;
        }

        .checkout-error-banner {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          padding: 0.75rem 1.75rem;
          font-size: 0.88rem;
          border-bottom: 1px solid rgba(239, 68, 68, 0.3);
        }

        .checkout-form-step {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-step-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-input {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.9rem;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .simulated-card-preview {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          margin-bottom: 1rem;
        }
        .card-chip {
          width: 40px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          margin-bottom: 1.25rem;
        }
        .card-number-preview {
          font-family: monospace;
          font-size: 1.25rem;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
        }
        .card-bottom-row {
          display: flex;
          justify-content: space-between;
        }
        .card-sub {
          font-size: 0.65rem;
          opacity: 0.7;
          letter-spacing: 0.05em;
        }
        .card-name-preview, .card-exp-preview {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .review-summary-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.5rem;
        }
        .review-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 280px;
          overflow-y: auto;
        }
        .review-subheading {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }
        .review-item-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: var(--surface);
          border-radius: var(--radius-sm);
        }
        .review-item-thumb {
          width: 46px;
          height: 46px;
          border-radius: 6px;
          object-fit: cover;
        }
        .review-item-info {
          flex: 1;
        }
        .review-item-title {
          font-size: 0.82rem;
          font-weight: 600;
          line-height: 1.2;
        }
        .review-item-qty {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .review-item-total {
          font-size: 0.88rem;
          font-weight: 700;
        }

        .review-meta-box {
          padding: 1.25rem;
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .meta-card-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.3rem;
        }
        .meta-val {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .review-price-breakdown {
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .grand-total-row {
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary);
          padding-top: 0.5rem;
          border-top: 1px dashed var(--border);
        }

        .checkout-form-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .place-order-btn {
          flex: 1;
        }

        @media (max-width: 650px) {
          .review-summary-grid, .form-grid-2, .form-grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
