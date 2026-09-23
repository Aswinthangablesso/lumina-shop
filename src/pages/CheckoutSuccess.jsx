import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ArrowRight, Truck, Calendar, CreditCard } from 'lucide-react';

export const CheckoutSuccess = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem('lumina_last_order');
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder));
      }
    } catch (err) {
      console.error('Error loading last order:', err);
    }
  }, []);

  return (
    <div className="success-page-root animate-fade-in">
      <div className="container">
        <div className="success-card glass-panel animate-slide-up">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={64} className="success-icon" />
          </div>

          <span className="badge badge-new success-badge">Order Confirmed</span>
          <h1 className="success-title">Thank You for Your Order!</h1>
          <p className="success-desc">
            Your payment was processed successfully. We're currently assembling your premium technology items for express dispatch.
          </p>

          {order ? (
            <div className="order-details-box glass-panel">
              <div className="order-header-row">
                <div>
                  <span className="detail-label">ORDER NUMBER</span>
                  <div className="order-number-val">{order.orderNumber}</div>
                </div>
                <div className="text-right">
                  <span className="detail-label">ORDER DATE</span>
                  <div className="detail-val"><Calendar size={14} /> {order.date}</div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="order-info-grid">
                <div>
                  <span className="detail-label">SHIPPING TO</span>
                  <p className="detail-val"><strong>{order.shipping.fullName}</strong></p>
                  <p className="detail-val-sub">{order.shipping.address}</p>
                  <p className="detail-val-sub">{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                </div>
                <div>
                  <span className="detail-label">ESTIMATED DELIVERY</span>
                  <p className="detail-val"><Truck size={16} className="truck-icon" /> 2-3 Business Days</p>
                  <p className="detail-val-sub">Express Tracking Info sent to email</p>
                </div>
                <div>
                  <span className="detail-label">PAYMENT METHOD</span>
                  <p className="detail-val"><CreditCard size={16} /> Visa ending in •••• {order.paymentLast4}</p>
                  <p className="detail-val-sub">Total Paid: <strong>${order.total.toFixed(2)}</strong></p>
                </div>
              </div>
            </div>
          ) : (
            <div className="order-details-box glass-panel">
              <p>Demo Order ID: <strong>#LUM-849201</strong></p>
              <p>Estimated Delivery: 2-3 Business Days</p>
            </div>
          )}

          <div className="success-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .success-page-root {
          padding: 4rem 0;
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
        }
        .success-card {
          max-width: 680px;
          margin: 0 auto;
          padding: 3.5rem 2.5rem;
          border-radius: 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid var(--border);
          box-shadow: var(--shadow), var(--shadow-glow);
        }
        .success-icon-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          animation: pulseGlow 2s infinite;
        }
        .success-badge {
          margin-bottom: 0.75rem;
        }
        .success-title {
          font-size: 2.4rem;
          margin-bottom: 0.5rem;
        }
        .success-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 520px;
          margin-bottom: 2rem;
        }

        .order-details-box {
          width: 100%;
          padding: 1.75rem;
          border-radius: var(--radius);
          text-align: left;
          margin-bottom: 2rem;
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .order-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .detail-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.08em;
        }
        .order-number-val {
          font-size: 1.35rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }
        .text-right { text-align: right; }
        .divider {
          height: 1px;
          background: var(--border);
          margin: 1.25rem 0;
        }

        .order-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }
        .detail-val {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.2rem;
        }
        .truck-icon { color: var(--accent); }
        .detail-val-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .success-actions {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};
