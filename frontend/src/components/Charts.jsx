import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Charts = ({ data }) => {
  const dates = data.map((row) => row.Date);
  const opening = data.map((row) => row.Opening);
  const high = data.map((row) => row.High_Value);
  const low = data.map((row) => row.Low_Value);
  const highDiff = data.map((row) => row.High_Difference);
  const lowDiff = data.map((row) => row.Low_Difference);

  const lineData = {
    labels: dates,
    datasets: [
      { label: 'Opening', data: opening, borderColor: 'blue' },
      { label: 'High', data: high, borderColor: 'red' },
      { label: 'Low', data: low, borderColor: 'green' },
    ],
  };

  const barData = {
    labels: dates,
    datasets: [
      { label: 'High Diff', data: highDiff, backgroundColor: 'red' },
      { label: 'Low Diff', data: lowDiff, backgroundColor: 'green' },
    ],
  };

  return (
    <div className="charts">
      <div className="chart">
        <Line data={lineData} />
      </div>
      <div className="chart">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;