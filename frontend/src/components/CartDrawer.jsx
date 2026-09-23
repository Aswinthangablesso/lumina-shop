import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';

export const CartDrawer = ({ onOpenCheckout }) => {
  const {
    cartItems,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getShippingFee,
    getTotal
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCartDrawerOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCartDrawerOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const subtotal = getSubtotal();
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    if (onOpenCheckout) {
      onOpenCheckout();
    } else {
      navigate('/cart');
    }
  };

  const handleViewCartClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="drawer-overlay glass-panel animate-fade-in" onClick={() => setIsCartDrawerOpen(false)}>
      <div className="drawer-panel glass-panel animate-slide-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="drawer-icon" />
            <h3 className="drawer-title">Shopping Cart</h3>
            <span className="badge badge-primary">{cartItems.length}</span>
          </div>
          <button onClick={() => setIsCartDrawerOpen(false)} className="btn-icon" aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>

        <div className="shipping-progress-box">
          <div className="shipping-progress-header">
            <Truck size={16} className="truck-icon" />
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Shipping</strong>!</span>
            ) : (
              <span className="free-shipping-unlocked">
                <CheckCircle2 size={15} /> You unlocked <strong>FREE Express Shipping</strong>!
              </span>
            )}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${freeShippingProgress}%` }}></div>
          </div>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-drawer-state">
              <div className="empty-cart-icon-box"><ShoppingBag size={36} /></div>
              <p className="empty-cart-title">Your cart is empty</p>
              <button onClick={() => { setIsCartDrawerOpen(false); navigate('/products'); }} className="btn btn-primary">
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card glass-panel">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <span className="cart-item-cat">{item.category}</span>
                    <h4 className="cart-item-title">{item.title}</h4>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>

                    <div className="cart-item-controls">
                      <div className="qty-picker-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn-sm"><Minus size={12} /></button>
                        <span className="qty-val-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn-sm"><Plus size={12} /></button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="remove-item-btn"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer glass-panel">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-val">${getTotal().toFixed(2)}</span>
            </div>

            <div className="drawer-cta-group">
              <button onClick={handleCheckoutClick} className="btn btn-primary w-full btn-lg">
                Checkout Now <ArrowRight size={18} />
              </button>
              <button onClick={handleViewCartClick} className="btn btn-secondary w-full">
                View & Edit Full Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .drawer-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          z-index: 2500;
          display: flex;
          justify-content: flex-end;
        }
        .drawer-panel {
          width: 100%;
          max-width: 440px;
          height: 100%;
          background: var(--surface-card);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
        .drawer-title-group { display: flex; align-items: center; gap: 0.6rem; }
        .drawer-title { font-size: 1.2rem; font-weight: 700; }

        .shipping-progress-box { background: var(--surface); padding: 0.85rem 1.5rem; border-bottom: 1px solid var(--border); font-size: 0.82rem; }
        .shipping-progress-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .progress-track { width: 100%; height: 6px; background: var(--bg-tertiary); border-radius: var(--radius-full); overflow: hidden; }
        .progress-fill { height: 100%; background: var(--accent-gradient); transition: width 0.4s ease; }

        .drawer-body { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem; }
        .empty-drawer-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; }
        .empty-cart-icon-box { width: 70px; height: 70px; border-radius: 50%; background: var(--accent-light); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }

        .cart-items-list { display: flex; flex-direction: column; gap: 1rem; }
        .cart-item-card { display: flex; gap: 1rem; padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border); }
        .cart-item-img { width: 72px; height: 72px; object-fit: cover; border-radius: var(--radius-sm); }
        .cart-item-info { flex: 1; display: flex; flex-direction: column; }
        .cart-item-cat { font-size: 0.7rem; font-weight: 700; color: var(--accent); text-transform: uppercase; }
        .cart-item-title { font-size: 0.88rem; font-weight: 600; line-height: 1.3; }

        .cart-item-controls { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .qty-picker-sm { display: flex; align-items: center; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 6px; }
        .qty-btn-sm { padding: 0.2rem 0.4rem; color: var(--text-primary); }
        .qty-val-sm { padding: 0 0.4rem; font-size: 0.8rem; font-weight: 700; }
        .remove-item-btn { color: var(--text-muted); }

        .drawer-footer { padding: 1.25rem 1.5rem; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.6rem; }
        .summary-row { display: flex; justify-content: space-between; font-size: 0.88rem; }
        .total-row { font-size: 1.1rem; font-weight: 800; border-top: 1px dashed var(--border); padding-top: 0.5rem; }
        .drawer-cta-group { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem; }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
};
