import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KpiCard = ({ title, value, unit, change, icon: Icon, color = '#10b981' }) => {
  const isPositiveChange = change > 0;
  const isNegativeChange = change < 0;

  return (
    <div className="glass-card glass-card-interactive" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: `${color}18`,
            border: `1px solid ${color}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{unit}</span>}
      </div>

      {change !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 600 }}>
          <span style={{
            color: isNegativeChange ? '#34d399' : isPositiveChange ? '#f87171' : 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}>
            {isNegativeChange ? <TrendingDown size={14} /> : isPositiveChange ? <TrendingUp size={14} /> : <Minus size={14} />}
            {Math.abs(change)}%
          </span>
          <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
