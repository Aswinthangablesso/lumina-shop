import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Eye } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card glass-panel" onClick={handleCardClick}>
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.title} className="card-image" loading="lazy" />
        <div className="card-badges">
          {product.badge && <span className="badge badge-primary">{product.badge}</span>}
          {discountPercent > 0 && <span className="badge badge-sale">-{discountPercent}%</span>}
        </div>
        <button onClick={handleQuickView} className="quick-view-overlay-btn btn" aria-label={`Quick View ${product.title}`}>
          <Eye size={16} /> Quick View
        </button>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star size={14} className="star-icon" />
            <span className="rating-score">{product.rating}</span>
            <span className="review-count">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="card-title" title={product.title}>{product.title}</h3>

        <div className="card-footer">
          <div className="card-pricing">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-btn">
            <ShoppingBag size={16} /> <span className="btn-text">Add</span>
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
        }
        .product-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow), var(--shadow-glow);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 230px;
          overflow: hidden;
          background: var(--bg-tertiary);
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .card-image { transform: scale(1.08); }

        .card-badges {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          z-index: 2;
        }

        .quick-view-overlay-btn {
          position: absolute;
          bottom: 0.85rem;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
          padding: 0.5rem 1.1rem;
          font-size: 0.82rem;
          border-radius: var(--radius-full);
          background: var(--surface-glass);
          border: 1px solid var(--border);
          transition: var(--transition);
          z-index: 3;
        }
        .product-card:hover .quick-view-overlay-btn {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .card-body {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }
        .card-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
        .card-category { font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase; }
        .card-rating { display: flex; align-items: center; gap: 0.25rem; font-size: 0.82rem; }
        .star-icon { color: #f59e0b; fill: #f59e0b; }
        .rating-score { font-weight: 700; }
        .review-count { color: var(--text-muted); font-size: 0.75rem; }

        .card-title {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.35;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .current-price { font-size: 1.15rem; font-weight: 800; font-family: var(--font-heading); }
        .original-price { font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; }
        .add-to-cart-btn { padding: 0.45rem 0.85rem; font-size: 0.82rem; }
      `}</style>
    </div>
  );
};
