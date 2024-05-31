import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, selectDate }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 
  const [selectedRange, setSelectedRange] = useState('full'); // Estado para acompanhar a seleção do usuário

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const selectedRange = 20; 

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: selectedRange === 'full' ? data?.map((_, index) => index) : data?.slice(-selectedRange), // Determina os rótulos com base na seleção do usuário
          datasets: [
            {
              label: 'Variação de preços',
              data: selectedRange === 'full' ? data : data?.slice(-selectedRange), // Determina os dados com base na seleção do usuário
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data, selectedRange]); 

  const handleChange = (e) => {
    setSelectedRange(e.target.value);
  };

  return (
    <div className='mt-8'>
      <canvas ref={chartRef} />
      {selectDate &&
        <div className="ml-5">
        Selecione o intervalo:
        <select value={selectedRange} onChange={handleChange}>
          <option value="1">Último dia</option>
          <option value="3">Últimos 3 dias</option>
          <option value="full">Histórico completo</option>
        </select>
      </div>}   
    </div>
  );
};

export default LineChart;
