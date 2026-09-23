import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Check, CreditCard, Truck, ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

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
  const [step, setStep] = useState(1);

  const [shippingData, setShippingData] = useState({
    fullName: currentUser ? currentUser.name : '',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    phone: '(555) 234-5678'
  });

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
        <div className="checkout-header">
          <div className="checkout-title-box">
            <Lock size={18} className="lock-icon" />
            <h3 className="checkout-title">256-Bit Encrypted Checkout</h3>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close checkout">
            <X size={20} />
          </button>
        </div>

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

        {step === 1 && (
          <form onSubmit={handleShippingSubmit} className="checkout-form-step">
            <h4 className="form-step-title"><Truck size={18} /> Delivery Address</h4>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" required value={shippingData.fullName} onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" required value={shippingData.phone} onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })} className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input type="text" required value={shippingData.address} onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })} className="form-input" />
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input type="text" required value={shippingData.city} onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <input type="text" required value={shippingData.state} onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP Code *</label>
                <input type="text" required value={shippingData.zipCode} onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })} className="form-input" />
              </div>
            </div>

            <div className="checkout-form-actions">
              <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary">Continue to Payment <ArrowRight size={16} /></button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="checkout-form-step">
            <h4 className="form-step-title"><CreditCard size={18} /> Payment Information</h4>

            <div className="form-group">
              <label className="form-label">Cardholder Name *</label>
              <input type="text" required value={paymentData.cardName} onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Card Number *</label>
              <input type="text" required value={paymentData.cardNumber} onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })} className="form-input" />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Expiry Date *</label>
                <input type="text" required placeholder="MM/YY" value={paymentData.expiry} onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">CVV *</label>
                <input type="text" required maxLength="4" value={paymentData.cvv} onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })} className="form-input" />
              </div>
            </div>

            <div className="checkout-form-actions">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary"><ArrowLeft size={16} /> Back</button>
              <button type="submit" className="btn btn-primary">Review Final Order <ArrowRight size={16} /></button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="checkout-form-step">
            <h4 className="form-step-title"><ShieldCheck size={18} /> Review & Place Order</h4>
            <div className="checkout-form-actions">
              <button type="button" onClick={() => setStep(2)} className="btn btn-secondary"><ArrowLeft size={16} /> Edit Payment</button>
              <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg flex-1">
                <Check size={18} /> Place Order (${getTotal().toFixed(2)})
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .checkout-backdrop {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;
        }
        .checkout-modal {
          width: 100%; max-width: 750px;
          background: var(--surface-card); border-radius: 20px; border: 1px solid var(--border);
          max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column;
        }
        .checkout-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.75rem; border-bottom: 1px solid var(--border); }
        .checkout-title-box { display: flex; align-items: center; gap: 0.5rem; }
        .lock-icon { color: var(--success); }

        .checkout-steps-bar { display: flex; align-items: center; justify-content: center; padding: 1rem 1.75rem; background: var(--surface); border-bottom: 1px solid var(--border); }
        .step-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text-muted); }
        .step-item.active { color: var(--text-primary); font-weight: 700; }
        .step-num { width: 24px; height: 24px; border-radius: 50%; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 0.78rem; }
        .step-item.active .step-num { background: var(--accent-gradient); color: #ffffff; }
        .step-line { flex: 1; max-width: 60px; height: 2px; background: var(--border); margin: 0 0.75rem; }

        .checkout-form-step { padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-label { font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); }
        .form-input { padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border); font-size: 0.9rem; }

        .checkout-form-actions { display: flex; justify-content: space-between; gap: 1rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); }
        .flex-1 { flex: 1; }
      `}</style>
    </div>
  );
};
