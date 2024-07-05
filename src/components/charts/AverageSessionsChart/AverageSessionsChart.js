import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './AverageSessionsChart.css';

const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const AverageSessionsChart = ({ data }) => {
  return (
    <div className="chart-container-average">
      <div className="chart-wrapper-average">
      <div className="chart-header-average">
        <h2>Durée moyenne des <br />sessions</h2>
      </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 120, bottom: 5, left: 10 }}>
            <XAxis dataKey="day" tickFormatter={(tick) => daysOfWeek[tick - 1]} tick={{ fill: 'rgba(255, 255, 255, 1)', opacity: 0.6 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="sessionLength" stroke="rgba(255, 255, 255, 1)" strokeWidth={2} dot={false} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageSessionsChart;
