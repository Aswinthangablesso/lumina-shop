import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Star, ShoppingBag, Truck, ShieldCheck, Check, Plus, Minus, ArrowLeft } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(product ? product.image : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!product) {
    return (
      <div className="container not-found-container animate-fade-in">
        <div className="not-found-card glass-panel">
          <h2>Product Not Found</h2>
          <p>The device or accessory you are looking for does not exist.</p>
          <Link to="/products" className="btn btn-primary"><ArrowLeft size={16} /> Back to Catalog</Link>
        </div>
      </div>
    );
  }

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = selectedImage || product.image;

  const handleAddToCart = () => { addToCart(product, quantity); };
  const handleBuyNow = () => { addToCart(product, quantity); setIsCartDrawerOpen(true); };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="detail-page-root animate-fade-in">
      <div className="container">
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span className="active">{product.title}</span>
        </div>

        <div className="product-main-grid">
          <div className="gallery-col">
            <div className="main-image-box glass-panel">
              <img src={activeImage} alt={product.title} className="main-image" />
              {product.badge && <span className="badge badge-primary main-badge">{product.badge}</span>}
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

          <div className="info-col">
            <span className="info-category">{product.category}</span>
            <h1 className="info-title">{product.title}</h1>

            <div className="rating-stock-row">
              <div className="rating-box">
                <Star size={16} className="star-icon" />
                <span className="rating-val">{product.rating}</span>
                <span className="reviews-count">({product.reviewCount} Reviews)</span>
              </div>
              <span className="stock-badge"><Check size={14} /> In Stock ({product.stock} units)</span>
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

            <div className="actions-wrapper">
              <div className="qty-selector-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-lg-btn"><Minus size={16} /></button>
                <span className="qty-lg-val">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="qty-lg-btn"><Plus size={16} /></button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary btn-lg flex-1">
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn btn-secondary btn-lg">Buy Now</button>
            </div>

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

        {relatedProducts.length > 0 && (
          <section className="related-section">
            <h3 className="related-title">Complete Your Lumina Setup</h3>
            <div className="related-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} onQuickView={(p) => setQuickViewProduct(p)} />
              ))}
            </div>
          </section>
        )}
      </div>

      {quickViewProduct && <ProductModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}

      <style>{`
        .detail-page-root { padding: 2rem 0 4rem; }
        .breadcrumb-nav { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 2rem; }
        .product-main-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 3.5rem; margin-bottom: 4rem; }

        .main-image-box { position: relative; border-radius: 20px; overflow: hidden; background: var(--bg-tertiary); height: 440px; display: flex; align-items: center; justify-content: center; }
        .main-image { width: 100%; height: 100%; object-fit: cover; }
        .main-badge { position: absolute; top: 1.25rem; left: 1.25rem; }

        .thumbnails-row { display: flex; gap: 1rem; margin-top: 1rem; }
        .thumb-btn { width: 80px; height: 80px; border-radius: var(--radius-sm); overflow: hidden; border: 2px solid var(--border); }
        .thumb-btn img { width: 100%; height: 100%; object-fit: cover; }

        .info-category { font-size: 0.82rem; font-weight: 700; color: var(--accent); text-transform: uppercase; }
        .info-title { font-size: 2.2rem; margin: 0.4rem 0 0.8rem; }
        .rating-stock-row { display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .star-icon { color: #f59e0b; fill: #f59e0b; }
        .pricing-box { display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.5rem; }
        .price-current { font-size: 2.4rem; font-weight: 800; font-family: var(--font-heading); }
        .price-old { font-size: 1.2rem; color: var(--text-muted); text-decoration: line-through; }

        .actions-wrapper { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .qty-selector-lg { display: flex; align-items: center; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.3rem; }
        .qty-lg-btn { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; }
        .qty-lg-val { width: 44px; text-align: center; font-weight: 700; }
        .flex-1 { flex: 1; }

        .guarantees-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; padding: 1.25rem; border-radius: var(--radius); }
        .guarantee-item { display: flex; align-items: center; gap: 0.85rem; }
        .g-icon { color: var(--accent); }

        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.75rem; }

        @media (max-width: 900px) {
          .product-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
