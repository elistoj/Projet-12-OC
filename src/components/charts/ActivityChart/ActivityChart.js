import React from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './ActivityChart.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}kg`}</p>
        <p className="label">{`${payload[1].value}kCal`}</p>
      </div>
    );
  }

  return null;
};

const ActivityChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const minKilogram = Math.min(...data.map(item => item.kilogram));

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 14, fontWeight: 500, fontFamily: "Roboto", color: "rgba(155, 158, 172, 1)" }} tickLine={false} stroke="#DEDEDE" />
          <YAxis yAxisId="left" dataKey="kilogram" orientation='right' domain={[minKilogram - 2, 'auto']} allowDecimals={false} tick={{ fontSize: 14, fontWeight: 500, fontFamily: "Roboto", color: "rgba(155, 158, 172, 1)" }} tickLine={false} axisLine={false} stroke="#DEDEDE" />
          <YAxis yAxisId="right" dataKey="calories" orientation="left" allowDecimals={false} hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" iconType="circle" height={36} iconSize={10} formatter={(value, entry, index) => <span style={{ color: 'rgba(155, 158, 172, 1)' }}>{value === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}</span>} />
          <Bar yAxisId="left" dataKey="kilogram" fill="black" name="Poids (kg)" barSize={7} radius={[10, 10, 0, 0]} />
          <Bar yAxisId="right" dataKey="calories" fill="red" name="Calories brûlées (kCal)" barSize={7} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
