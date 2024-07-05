import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ScoreChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const remainingScore = 1 - data;

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
        cutout: '80%', 
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
            padding: 10, 
            lineHeight: 1.5, 
            align: 'start', 
            anchor: 'start',
            offset: { 
              y: 60 
            }
          }
        }
      }
    });

    if (textRef.current) {
      textRef.current.innerHTML = `<span style="color: black; white-space: nowrap;">${data * 100}%</span> <br/><span style="color: rgba(116, 121, 140, 1)">de votre</span> <br/><span style="color: rgba(116, 121, 140, 1)">objectif</span>`;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={chartRef} style={{ color: 'black', backgroundColor: 'rgba(251, 251, 251, 1)'}} />
      <div ref={textRef} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '26px',
        fontWeight: 'bold',
        textAlign: 'center',  
        lineHeight: '1.2',
        whiteSpace: 'nowrap',  
      }}></div>
    </div>
  );
};

export default ScoreChart;
