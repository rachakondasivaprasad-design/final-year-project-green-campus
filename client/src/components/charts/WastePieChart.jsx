import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const WastePieChart = ({ recycled = 750, nonRecycled = 350 }) => {
  const data = [
    { name: 'Recycled Waste', value: recycled, color: '#10b981' },
    { name: 'Non-Recycled Waste', value: nonRecycled, color: '#f43f5e' }
  ];

  return (
    <div style={{ width: '100%', height: '240px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '0.82rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WastePieChart;
