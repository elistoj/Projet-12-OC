import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ScoreChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Calculate remaining score
    const remainingScore = 1 - data;

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Remaining', 'Achieved'],
        datasets: [{
          data: [remainingScore * 100, data * 100],
          backgroundColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 0, 0, 1)'],
          borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 0, 0, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        cutout: '80%', // Adjust doughnut hole size here
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
          title: {
            display: true,
            text: 'Score',
            font: { weight: 'bold', size: 16 },
            position: 'top',
            padding: 10, // Add padding to title
            lineHeight: 1.5, // Adjust line height for title
            align: 'start', // Align title to the left
            anchor: 'start', // Anchor title to the left
            offset: { // Offset title to move it down
              y: 60 // Adjust as needed for lower positioning
            }
          }
        }
      }
    });

    // Update external text element
    if (textRef.current) {
      textRef.current.innerHTML = `<span style="color: black">${data * 100}%</span> <br/><span style="color: rgba(116, 121, 140, 1)">de votre</span> <br/><span style="color: rgba(116, 121, 140, 1)">objectif</span>`;
    }

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={chartRef} style={{ color: 'black' }} />
      <div ref={textRef} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '26px',
        fontWeight: 'bold',
        textAlign: 'center', // Center align text
        lineHeight: '1.2'    // Adjust line height for spacing between lines
      }}></div>
    </div>
  );
};

export default ScoreChart;
