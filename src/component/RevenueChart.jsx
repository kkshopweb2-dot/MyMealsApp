// src/components/RevenueChart.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../css/Card.css';

const RevenueChart = () => {
  const series = [
    {
      name: 'Page Views',
      data: [23, 45, 56, 65, 45, 23, 43, 78, 56, 78, 43, 67],
    },
    {
      name: 'Clicks',
      data: [12, 32, 45, 23, 56, 42, 12, 53, 24, 35, 25, 30],
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 200,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };

  return (
    <div className="card">
      <h4>Revenue</h4>
      <ReactApexChart options={options} series={series} type="line" height={250} />
    </div>
  );
};

export default RevenueChart;
