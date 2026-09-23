import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';

export const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleNavigateDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="modal-backdrop glass-panel animate-fade-in" onClick={onClose}>
      <div className="modal-container glass-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn btn-icon" aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-col">
            <img src={product.image} alt={product.title} className="modal-product-img" />
            {product.badge && (
              <span className="modal-badge badge badge-primary">{product.badge}</span>
            )}
          </div>

          <div className="modal-info-col">
            <div className="modal-category">{product.category}</div>
            <h2 className="modal-title">{product.title}</h2>

            <div className="modal-rating-row">
              <div className="rating-stars">
                <Star size={16} className="star-icon" />
                <span className="rating-score">{product.rating}</span>
              </div>
              <span className="rating-divider">•</span>
              <span className="review-text">{product.reviewCount} Verified Reviews</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="modal-original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-action-row">
              <div className="qty-picker">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn" aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="qty-btn" aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary modal-add-btn">
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>

            <button onClick={handleNavigateDetails} className="btn btn-secondary view-full-btn">
              View Full Product Details <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .modal-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          background: var(--surface-card);
          border-radius: 20px;
          border: 1px solid var(--border);
          overflow: hidden;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem; }
        .modal-image-col { position: relative; border-radius: var(--radius); overflow: hidden; background: var(--bg-tertiary); }
        .modal-product-img { width: 100%; max-height: 420px; object-fit: cover; }
        .modal-badge { position: absolute; top: 1rem; left: 1rem; }

        .modal-info-col { display: flex; flex-direction: column; }
        .modal-category { font-size: 0.8rem; font-weight: 700; color: var(--accent); text-transform: uppercase; }
        .modal-title { font-size: 1.6rem; margin: 0.25rem 0 0.75rem; }
        .modal-rating-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; margin-bottom: 1rem; }
        .star-icon { color: #f59e0b; fill: #f59e0b; }
        .modal-price-row { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem; }
        .modal-current-price { font-size: 1.8rem; font-weight: 800; font-family: var(--font-heading); }
        .modal-original-price { font-size: 1.1rem; color: var(--text-muted); text-decoration: line-through; }
        .modal-desc { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem; }

        .modal-action-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .qty-picker { display: flex; align-items: center; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.25rem; }
        .qty-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
        .qty-value { width: 36px; text-align: center; font-weight: 700; }
        .modal-add-btn { flex: 1; }
        .view-full-btn { width: 100%; }

        @media (max-width: 768px) {
          .modal-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
