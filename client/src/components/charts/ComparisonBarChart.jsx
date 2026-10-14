import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const ComparisonBarChart = ({ data = [], entityA = 'Entity A', entityB = 'Entity B' }) => {
  return (
    <div style={{ width: '100%', height: '320px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
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
          <Bar dataKey="valueA" name={entityA} fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="valueB" name={entityB} fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonBarChart;
