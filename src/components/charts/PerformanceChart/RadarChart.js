import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

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
    
    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Sort data to ensure the labels are in the desired order
    const sortedData = data.sort((a, b) => b.kind - a.kind);

    // Custom plugin to draw dashed lines
    const dashedLinePlugin = {
      id: 'dashedLinePlugin',
      beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
        ctx.save();

        // Set properties for dashed line
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;

        // Draw vertical dashed line
        ctx.beginPath();
        ctx.moveTo(chartArea.width / 2 + chartArea.left, chartArea.top);
        ctx.lineTo(chartArea.width / 2 + chartArea.left, chartArea.bottom);
        ctx.stroke();

        // Draw horizontal dashed line
        ctx.beginPath();
        ctx.moveTo(chartArea.left, chartArea.height / 2 + chartArea.top);
        ctx.lineTo(chartArea.right, chartArea.height / 2 + chartArea.top);
        ctx.stroke();

        ctx.restore();
      }
    };

    // Create a new chart instance
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
          },
          dashedLinePlugin: {}  // Activate the custom plugin
        },
        scales: {
          r: {
            grid: {
              color: 'white'
            },
            pointLabels: {
              color: 'white'
            },
            ticks: {
              display: false,
              maxTicksLimit: 5  // Limit the number of grid lines to 5
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            left: 20,
            right: 20,
            bottom: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
      plugins: [dashedLinePlugin]  // Add the custom plugin to the chart
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{
        position: 'absolute',
        top: '40px', // Adjust this value to move the title lower
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white'
      }}>
        {title}
      </div>
      <canvas ref={chartRef} style={{ backgroundColor: 'black', width: 'auto', height: '263px' }} />
    </div>
  );
};

export default RadarChart;
