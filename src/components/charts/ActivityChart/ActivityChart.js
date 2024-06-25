import React from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis } from 'recharts';
import './ActivityChart.css';

const ActivityChart = ({ data }) => {

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
      </div>
      <div className="chart">
        <BarChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}  
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickCount={data.length} label={{   position: 'insideBottom' }} />
          <YAxis orientation="right" label={{   angle: -90, position: 'insideRight' }} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="kilogram" stackId="a" fill="black" name="Poids (kg)" barSize={20} />
          <Bar dataKey="calories" stackId="b" fill="red" name="Calories brûlées (kCal)" barSize={20} />
        </BarChart>
      </div>
    
    </div>
  );
};

export default ActivityChart;
