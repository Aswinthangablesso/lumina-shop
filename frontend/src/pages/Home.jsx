import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, ShieldCheck, Zap, Quote } from 'lucide-react';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featuredProducts = PRODUCTS.slice(0, 6);

  const testimonials = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Audio Engineer & Producer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content: "The Lumina H1 Pro headphones have replaced my studio monitors for mobile mixing. The noise cancellation is completely invisible and the soundstage is astonishingly wide.",
      rating: 5
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Tech Journalist & Reviewer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: "Lumina Shop delivers a level of build quality and customer concierge that rival luxury fashion houses. The Horizon X Pro is hands down the phone of the year.",
      rating: 5
    },
    {
      id: 3,
      name: "David Chen",
      role: "Senior Software Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      content: "Ordering was effortless and my Pulse Ultra smartwatch arrived in custom magnetic packaging within 24 hours. Phenomenal battery life and sleek aesthetics.",
      rating: 5
    }
  ];

  return (
    <div className="home-page-root animate-fade-in">
      <Hero />
      <CategoryFilter />

      <section className="featured-products-section">
        <div className="container">
          <div className="section-title-row">
            <div>
              <div className="badge badge-primary title-badge">Curated Selection</div>
              <h2 className="section-title">Best-Selling Hardware</h2>
              <p className="section-subtitle">Discover our highest rated devices engineered for peak performance.</p>
            </div>
            <Link to="/products" className="btn btn-secondary view-all-link">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid-home">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card glass-panel">
            <div className="promo-content">
              <span className="promo-tag">Architectural Audio</span>
              <h2 className="promo-heading">Immerse in Acoustic Purity</h2>
              <p className="promo-desc">
                Engineered with aerospace titanium acoustic chambers and customized 40mm drivers for uncompromised fidelity.
              </p>
              <div className="promo-features-list">
                <div className="promo-feat-item"><Sparkles size={16} /> 40-Hour Battery Life</div>
                <div className="promo-feat-item"><Zap size={16} /> Ultra-low 1ms Latency</div>
                <div className="promo-feat-item"><ShieldCheck size={16} /> 2-Year Full Warranty</div>
              </div>
              <Link to="/products?category=Audio" className="btn btn-primary btn-lg promo-cta">
                Explore Audio Gear <ArrowRight size={18} />
              </Link>
            </div>

            <div className="promo-visual">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
                alt="Audio Promo"
                className="promo-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-title-center">
            <div className="badge badge-primary title-badge">Verified Reviews</div>
            <h2 className="section-title">Loved by Enthusiasts Worldwide</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <div key={item.id} className="testimonial-card glass-panel">
                <Quote size={32} className="quote-icon" />
                <div className="stars-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-quote">"{item.content}"</p>
                <div className="testimonial-author">
                  <img src={item.avatar} alt={item.name} className="author-avatar" />
                  <div>
                    <h4 className="author-name">{item.name}</h4>
                    <span className="author-role">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <style>{`
        .featured-products-section { padding: 4rem 0; }
        .section-title-row { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2.5rem; gap: 1rem; }
        .title-badge { margin-bottom: 0.6rem; }
        .products-grid-home { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.75rem; }

        .promo-banner-section { padding: 4rem 0; }
        .promo-banner-card {
          border-radius: 28px;
          padding: 3.5rem;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 3rem;
          background: linear-gradient(135deg, var(--surface-card) 0%, var(--bg-tertiary) 100%);
        }
        .promo-tag { font-size: 0.82rem; font-weight: 700; color: var(--accent); text-transform: uppercase; }
        .promo-heading { font-size: 2.5rem; margin: 0.5rem 0 1rem; }
        .promo-desc { color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 1.75rem; }
        .promo-features-list { display: flex; gap: 1.5rem; margin-bottom: 2.25rem; flex-wrap: wrap; }
        .promo-feat-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 600; }
        .promo-visual img { width: 100%; border-radius: 20px; object-fit: cover; }

        .testimonials-section { padding: 4rem 0; }
        .section-title-center { text-align: center; max-width: 600px; margin: 0 auto 3rem; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .testimonial-card { padding: 2rem; border-radius: var(--radius); position: relative; }
        .quote-icon { color: var(--accent-light); position: absolute; top: 1.5rem; right: 1.5rem; }
        .stars-row { display: flex; gap: 0.25rem; margin-bottom: 1rem; }
        .testimonial-quote { font-size: 0.98rem; color: var(--text-secondary); margin-bottom: 1.75rem; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 0.85rem; }
        .author-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent); }
        .author-name { font-size: 0.95rem; font-weight: 700; }
        .author-role { font-size: 0.8rem; color: var(--text-muted); }

        @media (max-width: 900px) {
          .promo-banner-card { grid-template-columns: 1fr; padding: 2rem; }
          .section-title-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};
