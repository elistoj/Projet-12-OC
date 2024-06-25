import React from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend } from 'recharts';
import XAxisWrapper from '../../Axis/XAxisWrapper';
import YAxisWrapper from '../../Axis/YAxisWrapper';
import './ActivityChart.css';

const ActivityChart = ({ data }) => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
      </div>
      <div className="chart">
        <BarChart
          width={835}
          height={320}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxisWrapper dataKey="day" />
          <YAxisWrapper />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="kilogram"
            stackId="a"
            fill="black"
            name="Poids (kg)"
            barSize={7}
          />
          <Bar
            dataKey="calories"
            stackId="b"
            fill="red"
            name="Calories brûlées (kCal)"
            barSize={7}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default ActivityChart;
