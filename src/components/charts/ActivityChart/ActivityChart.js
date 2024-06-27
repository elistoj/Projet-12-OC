import React from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis } from 'recharts';
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
    return <div>Loading...</div>; // Gérer l'état de chargement ou le scénario de données vides
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
        <Legend 
          verticalAlign="middle" 
          align="right" 
          iconType="circle" 
          formatter={(value, entry) => (
            <span style={{ color: entry.color }}>
              {value === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}
            </span>
          )}
        />
      </div>
      <div className="chart">
          <BarChart
             width={835}
             height={300}
            data={data}
            margin={{ top: 20, right: -30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              label={{ position: 'insideBottom', offset: -5 }} 
              tick={{ fontSize: 14,   fontweight: 500, fontfamily: "Roboto",  color: "black"} }
              tickLine={false}
              stroke="#DEDEDE"
            />
            <YAxis
              yAxisId="left"
              dataKey="kilogram"
              orientation='right'
              domain={[69, 'auto']}
              allowDecimals={false}
              label={{  angle: -90, position: 'insideRight', offset: 0 }}
              tick={{  fontSize: 14,   fontweight: 500, fontfamily: "Roboto",  color: "black"}}
              tickLine={false}
              axisLine={false}
              stroke="#DEDEDE"
            />
            <YAxis
              yAxisId="right"
              dataKey="calories"
              orientation="left"
              allowDecimals={false}
              hide
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              height={36}
              iconSize={10}   
              formatter={(value, entry, index) => (
                <span style={{ color: entry.color }}>
                  {value === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}
                </span>
              )}
            />
            <Bar 
              yAxisId="left" 
              dataKey="kilogram" 
              fill="black" 
              name="Poids (kg)" 
              barSize={7} 
              radius={[10, 10, 0, 0]} 
            />
            <Bar 
              yAxisId="right" 
              dataKey="calories" 
              fill="red" 
              name="Calories brûlées (kCal)" 
              barSize={7} 
              radius={[10, 10, 0, 0]} 
            />
          </BarChart>
      </div>
    </div>
  );
};

export default ActivityChart;
