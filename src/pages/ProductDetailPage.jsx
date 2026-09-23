import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import {
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Heart
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(product ? product.image : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'reviews'
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // If product not found
  if (!product) {
    return (
      <div className="container not-found-container animate-fade-in">
        <div className="not-found-card glass-panel">
          <h2>Product Not Found</h2>
          <p>The device or accessory you are looking for does not exist or has been discontinued.</p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        <style>{`
          .not-found-container {
            padding: 5rem 0;
            text-align: center;
          }
          .not-found-card {
            max-width: 500px;
            margin: 0 auto;
            padding: 3rem 2rem;
            border-radius: var(--radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        `}</style>
      </div>
    );
  }

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = selectedImage || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartDrawerOpen(true);
  };

  // Related Products (same category excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="detail-page-root animate-fade-in">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to={`/products?category=${product.category}`}>{product.category}</Link> / <span className="active">{product.title}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="product-main-grid">
          {/* Left Column: Image Gallery */}
          <div className="gallery-col">
            <div className="main-image-box glass-panel">
              <img src={activeImage} alt={product.title} className="main-image" />
              {product.badge && (
                <span className="badge badge-primary main-badge">{product.badge}</span>
              )}
            </div>

            {imagesList.length > 1 && (
              <div className="thumbnails-row">
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                  >
                    <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="info-col">
            <span className="info-category">{product.category}</span>
            <h1 className="info-title">{product.title}</h1>

            <div className="rating-stock-row">
              <div className="rating-box">
                <Star size={16} className="star-icon" />
                <span className="rating-val">{product.rating}</span>
                <span className="reviews-count">({product.reviewCount} Reviews)</span>
              </div>
              <span className="row-divider">|</span>
              <span className="stock-badge">
                <Check size={14} /> In Stock ({product.stock} units ready to ship)
              </span>
            </div>

            <div className="pricing-box">
              <span className="price-current">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="price-old">${product.originalPrice.toFixed(2)}</span>
                  <span className="badge badge-sale">Save ${ (product.originalPrice - product.price).toFixed(2) } ({discountPercent}%)</span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Quantity Selector & Action Buttons */}
            <div className="actions-wrapper">
              <div className="qty-selector-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-lg-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-lg-val">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-lg-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary btn-lg flex-1">
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn btn-secondary btn-lg">
                Buy Now
              </button>
            </div>

            {/* Value Guarantees Box */}
            <div className="guarantees-grid glass-panel">
              <div className="guarantee-item">
                <Truck size={20} className="g-icon" />
                <div>
                  <h5 className="g-title">Free Express Delivery</h5>
                  <p className="g-desc">Dispatched within 24 hours</p>
                </div>
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={20} className="g-icon" />
                <div>
                  <h5 className="g-title">2-Year Lumina Warranty</h5>
                  <p className="g-desc">Complete hardware protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications & Customer Reviews */}
        <div className="product-tabs-section glass-panel">
          <div className="tabs-header">
            <button
              onClick={() => setActiveTab('specs')}
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            >
              Hardware Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            >
              Verified Customer Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'specs' && product.specs && (
              <div className="specs-table-wrapper animate-fade-in">
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <td className="spec-label-td">{key}</td>
                        <td className="spec-val-td">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-wrapper animate-fade-in">
                <div className="reviews-summary">
                  <div className="overall-score-box">
                    <span className="big-score">{product.rating}</span>
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="star-icon" />
                      ))}
                    </div>
                    <span className="summary-reviews-text">Based on {product.reviewCount} ratings</span>
                  </div>
                </div>

                <div className="sample-reviews-list">
                  <div className="review-card glass-panel">
                    <div className="review-card-header">
                      <span className="reviewer-name">Samantha Reed</span>
                      <span className="review-date">Verified Purchase • 2 days ago</span>
                    </div>
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="star-icon" />
                      ))}
                    </div>
                    <p className="review-comment">
                      "Exceeded all expectations! Build quality feels ultra premium and integration was instant. Lumina's customer service is second to none."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Slider / Grid */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <h3 className="related-title">Complete Your Lumina Setup</h3>
            <div className="related-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <style>{`
        .detail-page-root {
          padding: 2rem 0 4rem;
        }
        .breadcrumb-nav {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .breadcrumb-nav a {
          color: var(--text-secondary);
        }
        .breadcrumb-nav a:hover {
          color: var(--accent);
        }
        .breadcrumb-nav .active {
          color: var(--text-primary);
          font-weight: 600;
        }

        .product-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 3.5rem;
          margin-bottom: 4rem;
        }

        .main-image-box {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: var(--bg-tertiary);
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .main-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
        }

        .thumbnails-row {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .thumb-btn {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid var(--border);
          transition: var(--transition);
        }
        .thumb-btn.active, .thumb-btn:hover {
          border-color: var(--accent);
        }
        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-category {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .info-title {
          font-size: 2.2rem;
          margin: 0.4rem 0 0.8rem;
          line-height: 1.25;
        }

        .rating-stock-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .rating-box {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 700;
        }
        .reviews-count {
          color: var(--text-muted);
          font-weight: 400;
        }
        .row-divider {
          color: var(--border);
        }
        .stock-badge {
          color: var(--success);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .pricing-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .price-current {
          font-size: 2.4rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }
        .price-old {
          font-size: 1.2rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .product-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .actions-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .qty-selector-lg {
          display: flex;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.3rem;
        }
        .qty-lg-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          border-radius: 6px;
        }
        .qty-lg-btn:hover {
          background: var(--surface-hover);
        }
        .qty-lg-val {
          width: 44px;
          text-align: center;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .flex-1 { flex: 1; }

        .guarantees-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          padding: 1.25rem;
          border-radius: var(--radius);
        }
        .guarantee-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .g-icon { color: var(--accent); }
        .g-title {
          font-size: 0.88rem;
          font-weight: 700;
        }
        .g-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .product-tabs-section {
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 4rem;
        }
        .tabs-header {
          display: flex;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.75rem;
        }
        .tab-btn {
          padding: 0.75rem 0;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-muted);
          position: relative;
          transition: var(--transition);
        }
        .tab-btn.active {
          color: var(--text-primary);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-gradient);
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
        }
        .specs-table tr {
          border-bottom: 1px solid var(--border);
        }
        .specs-table td {
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
        }
        .spec-label-td {
          font-weight: 700;
          color: var(--text-secondary);
          width: 35%;
        }
        .spec-val-td {
          color: var(--text-primary);
        }

        .reviews-summary {
          margin-bottom: 2rem;
        }
        .overall-score-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .big-score {
          font-size: 3rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }
        .review-card {
          padding: 1.25rem;
          border-radius: var(--radius-sm);
        }
        .review-card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .reviewer-name {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .review-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .review-comment {
          margin-top: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .related-section {
          margin-top: 4rem;
        }
        .related-title {
          font-size: 1.6rem;
          margin-bottom: 1.75rem;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.75rem;
        }

        @media (max-width: 900px) {
          .product-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
