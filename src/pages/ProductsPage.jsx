import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { ProductModal } from '../components/ProductModal';
import { SlidersHorizontal, X } from 'lucide-react';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync state with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCategory !== 'All') count++;
    if (minPrice !== '') count++;
    if (maxPrice !== '') count++;
    if (minRating > 0) count++;
    if (sortBy !== 'relevance') count++;
    return count;
  }, [searchQuery, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setSortBy('relevance');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      // 2. Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // 3. Min Price
      if (minPrice !== '' && product.price < parseFloat(minPrice)) {
        return false;
      }

      // 4. Max Price
      if (maxPrice !== '' && product.price > parseFloat(maxPrice)) {
        return false;
      }

      // 5. Min Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0; // Default relevance
    });
  }, [searchQuery, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  return (
    <div className="products-page-root animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Product <span className="gradient-text">Catalog</span>
            </h1>
            <p className="page-subtitle">
              Browse our complete collection of luxury audio gear, smart wearables, devices, and accessories.
            </p>
          </div>

          <div className="catalog-meta-bar">
            <span className="products-count-badge">
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} Devices
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-secondary mobile-filter-btn"
            >
              <SlidersHorizontal size={18} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>
        </div>

        {/* Main Catalog Workspace Layout */}
        <div className="catalog-workspace">
          {/* Desktop Filter Sidebar */}
          <div className="desktop-sidebar-col">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearFilters={handleClearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Product Grid Area */}
          <div className="products-grid-col">
            <ProductGrid
              products={filteredProducts}
              onQuickView={(p) => setQuickViewProduct(p)}
              onResetFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="mobile-filter-modal glass-panel animate-fade-in" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="mobile-filter-content glass-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <h3>Catalog Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="btn-icon">
                <X size={20} />
              </button>
            </div>
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearFilters={handleClearFilters}
              activeFilterCount={activeFilterCount}
            />
            <button onClick={() => setIsMobileFilterOpen(false)} className="btn btn-primary w-full apply-mobile-btn">
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <style>{`
        .products-page-root {
          padding: 2.5rem 0 4rem;
        }
        .page-header {
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .page-title {
          font-size: 2.5rem;
          margin-bottom: 0.3rem;
        }
        .page-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .catalog-meta-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .products-count-badge {
          font-size: 0.9rem;
          color: var(--text-muted);
          background: var(--surface);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
        }
        .mobile-filter-btn {
          display: none;
        }

        .catalog-workspace {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: start;
        }

        .mobile-filter-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          z-index: 2500;
          display: flex;
          justify-content: flex-end;
        }
        .mobile-filter-content {
          width: 100%;
          max-width: 400px;
          height: 100%;
          background: var(--surface-card);
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .mobile-filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .apply-mobile-btn {
          margin-top: 1rem;
        }
        .w-full { width: 100%; }

        @media (max-width: 900px) {
          .catalog-workspace {
            grid-template-columns: 1fr;
          }
          .desktop-sidebar-col {
            display: none;
          }
          .mobile-filter-btn {
            display: inline-flex;
          }
        }
      `}</style>
    </div>
  );
};
