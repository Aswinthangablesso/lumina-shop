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

      {/* Search Input */}
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

      {/* Category List */}
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

      {/* Price Range */}
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
        <div className="price-slider-box">
          <input
            type="range"
            min="0"
            max="1200"
            step="50"
            value={maxPrice || 1200}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-slider"
          />
          <div className="slider-labels">
            <span>$0</span>
            <span>$1,200+</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <label className="filter-label">Minimum Rating</label>
        <div className="rating-options-list">
          {[
            { label: 'All Ratings', value: 0 },
            { label: '4.5 ★ & Above', value: 4.5 },
            { label: '4.0 ★ & Above', value: 4.0 }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setMinRating(item.value)}
              className={`rating-option ${minRating === item.value ? 'active' : ''}`}
            >
              <div className="rating-stars-inline">
                <Star size={14} className="star-icon" />
                <span>{item.label}</span>
              </div>
              {minRating === item.value && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By Dropdown */}
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
          height: fit-content;
        }
        .filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .filter-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-icon {
          color: var(--accent);
        }
        .filter-heading {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .active-count-badge {
          font-size: 0.7rem;
          padding: 0.15rem 0.45rem;
        }
        .clear-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--danger);
          transition: var(--transition);
        }
        .clear-btn:hover {
          opacity: 0.8;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .filter-label {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .filter-search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .filter-search-wrapper .search-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-muted);
        }
        .filter-search-input {
          width: 100%;
          padding: 0.55rem 0.75rem 0.55rem 2.2rem;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.88rem;
        }
        .filter-search-input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .category-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: var(--transition);
          text-align: left;
        }
        .category-item:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
        }
        .category-item.active {
          background: var(--accent-light);
          color: var(--accent);
          font-weight: 700;
        }

        .price-inputs-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .price-field {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }
        .field-prefix {
          position: absolute;
          left: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .price-input {
          width: 100%;
          padding: 0.45rem 0.5rem 0.45rem 1.4rem;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.85rem;
        }
        .price-dash {
          color: var(--text-muted);
        }
        .price-slider-box {
          margin-top: 0.5rem;
        }
        .price-slider {
          width: 100%;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .rating-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .rating-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .rating-option:hover {
          background: var(--surface-hover);
        }
        .rating-option.active {
          background: var(--accent-light);
          color: var(--accent);
          font-weight: 700;
        }
        .rating-stars-inline {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sort-select {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.88rem;
          color: var(--text-primary);
          cursor: pointer;
        }
        .sort-select:focus {
          outline: none;
          border-color: var(--accent);
        }
      `}</style>
    </aside>
  );
};
