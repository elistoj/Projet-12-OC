import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './RadarChart.css'

const kindMapping = {
  "1": "cardio",
  "2": "energy",
  "3": "endurance",
  "4": "strength",
  "5": "speed",
  "6": "intensity"
};

const RadarChart = ({ data, title }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const sortedData = data.sort((a, b) => b.kind - a.kind);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: sortedData.map(d => kindMapping[d.kind]),
        datasets: [{
          data: sortedData.map(d => d.value),
          backgroundColor: 'rgba(255, 1, 1, 0.7)',
          borderColor: 'rgba(255, 1, 1, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            grid: {
              color: 'white'
            },
            pointLabels: {
              color: 'white',
              font: {
                size: 12  
              }
            },
            ticks: {
              display: false,
              maxTicksLimit: 5
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container-radar">
      <div className="chart-title-radar">{title}</div>
      <div className="chart-wrapper-radar">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default RadarChart;
