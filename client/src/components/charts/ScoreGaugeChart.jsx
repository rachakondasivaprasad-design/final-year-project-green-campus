import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ScoreGaugeChart = ({ score = 82 }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];

  const getColor = (val) => {
    if (val >= 80) return '#10b981'; // Emerald
    if (val >= 65) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  const scoreColor = getColor(score);
  const COLORS = [scoreColor, 'rgba(255, 255, 255, 0.08)'];

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius={75}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
          {score}
        </div>
        <span style={{ fontSize: '0.8rem', color: scoreColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {score >= 80 ? 'EXCELLENT' : score >= 65 ? 'GOOD' : 'NEEDS ATTENTION'}
        </span>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>OUT OF 100</p>
      </div>
    </div>
  );
};

export default ScoreGaugeChart;
