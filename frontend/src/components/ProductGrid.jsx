import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageSearch, RotateCcw } from 'lucide-react';

export const ProductGrid = ({ products, onQuickView, onResetFilters }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-catalog-state glass-panel animate-fade-in">
        <div className="empty-icon-wrapper">
          <PackageSearch size={40} className="empty-icon" />
        </div>
        <h3 className="empty-title">No products found</h3>
        <p className="empty-desc">
          We couldn't find any products matching your current search terms or filter criteria.
        </p>
        {onResetFilters && (
          <button onClick={onResetFilters} className="btn btn-primary">
            <RotateCcw size={16} /> Reset All Filters
          </button>
        )}

        <style>{`
          .empty-catalog-state {
            padding: 4rem 2rem;
            text-align: center;
            border-radius: var(--radius);
            margin: 2rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .empty-icon-wrapper {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: var(--accent-light);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
          }
          .empty-title { font-size: 1.5rem; margin-bottom: 0.5rem; }
          .empty-desc { color: var(--text-secondary); font-size: 0.95rem; max-width: 420px; margin-bottom: 1.75rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="products-responsive-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      <style>{`
        .product-grid-container { width: 100%; }
        .products-responsive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
};
