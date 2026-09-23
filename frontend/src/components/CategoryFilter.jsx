import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { Headphones, Watch, Smartphone, Gamepad2, Home, ArrowUpRight } from 'lucide-react';

export const CategoryFilter = () => {
  const navigate = useNavigate();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Headphones': return <Headphones size={26} />;
      case 'Watch': return <Watch size={26} />;
      case 'Smartphone': return <Smartphone size={26} />;
      case 'Gamepad2': return <Gamepad2 size={26} />;
      case 'Home': return <Home size={26} />;
      default: return <Headphones size={26} />;
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Explore by Category</h2>
            <p className="section-subtitle">Precision technology tailored across five specialized hardware ecosystems.</p>
          </div>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="category-card glass-panel"
            >
              <div className="category-icon-box">
                {getCategoryIcon(cat.icon)}
              </div>
              <div className="category-info">
                <span className="category-count">{cat.count} Products</span>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.desc}</p>
              </div>
              <div className="category-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .categories-section { padding: 3.5rem 0; }
        .section-header { margin-bottom: 2.25rem; }
        .section-title { font-size: 2.2rem; margin-bottom: 0.4rem; }
        .section-subtitle { color: var(--text-secondary); font-size: 1rem; }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .category-card {
          position: relative;
          padding: 1.75rem 1.5rem;
          border-radius: var(--radius);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 200px;
        }
        .category-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow), var(--shadow-glow);
        }
        .category-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: var(--transition);
        }
        .category-card:hover .category-icon-box {
          background: var(--accent-gradient);
          color: #ffffff;
        }
        .category-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
        }
        .category-name { font-size: 1.2rem; margin: 0.2rem 0; }
        .category-desc { font-size: 0.82rem; color: var(--text-muted); }
        .category-arrow { position: absolute; top: 1.5rem; right: 1.5rem; color: var(--text-muted); }
      `}</style>
    </section>
  );
};
