import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const TrendLineChart = ({ data = [] }) => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis dataKey="period" stroke="#9ca3af" fontSize={12} tickLine={false} />
          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '0.82rem', paddingTop: '10px' }} />
          <Area
            type="monotone"
            dataKey="electricity"
            name="Electricity (kWh)"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorElectricity)"
          />
          <Area
            type="monotone"
            dataKey="water"
            name="Water (Liters / 10)"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorWater)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
