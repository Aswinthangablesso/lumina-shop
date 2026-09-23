import React from 'react';
import { CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal, RotateCcw, Star, Check } from 'lucide-react';

export const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  onClearFilters,
  activeFilterCount
}) => {
  return (
    <aside className="filter-sidebar glass-panel">
      <div className="filter-header">
        <div className="filter-title-box">
          <SlidersHorizontal size={18} className="filter-icon" />
          <h3 className="filter-heading">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="badge badge-primary active-count-badge">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button onClick={onClearFilters} className="clear-btn" title="Clear all filters">
            <RotateCcw size={14} /> Clear All
          </button>
        )}
      </div>

      <div className="filter-group">
        <label className="filter-label">Search Keywords</label>
        <div className="filter-search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Categories</label>
        <div className="category-list">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`category-item ${selectedCategory === 'All' ? 'active' : ''}`}
          >
            <span>All Categories</span>
            {selectedCategory === 'All' && <Check size={14} />}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`category-item ${selectedCategory === cat.name ? 'active' : ''}`}
            >
              <span>{cat.name}</span>
              {selectedCategory === cat.name && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Price Range ($)</label>
        <div className="price-inputs-row">
          <div className="price-field">
            <span className="field-prefix">$</span>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="price-input"
            />
          </div>
          <span className="price-dash">-</span>
          <div className="price-field">
            <span className="field-prefix">$</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="price-input"
            />
          </div>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort Products By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="relevance">Relevance / Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: Highest First</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      <style>{`
        .filter-sidebar {
          padding: 1.5rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .filter-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .filter-title-box { display: flex; align-items: center; gap: 0.5rem; }
        .filter-icon { color: var(--accent); }
        .filter-heading { font-size: 1.15rem; font-weight: 700; }
        .clear-btn { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 600; color: var(--danger); }

        .filter-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .filter-label { font-size: 0.82rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); }

        .filter-search-wrapper { position: relative; display: flex; align-items: center; }
        .filter-search-wrapper .search-icon { position: absolute; left: 0.75rem; color: var(--text-muted); }
        .filter-search-input { width: 100%; padding: 0.55rem 0.75rem 0.55rem 2.2rem; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border); font-size: 0.88rem; }

        .category-list { display: flex; flex-direction: column; gap: 0.35rem; }
        .category-item { display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.88rem; color: var(--text-secondary); }
        .category-item.active { background: var(--accent-light); color: var(--accent); font-weight: 700; }

        .price-inputs-row { display: flex; align-items: center; gap: 0.5rem; }
        .price-field { position: relative; flex: 1; display: flex; align-items: center; }
        .field-prefix { position: absolute; left: 0.6rem; font-size: 0.85rem; color: var(--text-muted); }
        .price-input { width: 100%; padding: 0.45rem 0.5rem 0.45rem 1.4rem; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border); font-size: 0.85rem; }

        .sort-select { width: 100%; padding: 0.6rem 0.75rem; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border); font-size: 0.88rem; color: var(--text-primary); }
      `}</style>
    </aside>
  );
};
