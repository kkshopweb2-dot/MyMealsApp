// src/components/SalesByCategory.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../css/Card.css';

const SalesByCategory = () => {
  const series = [48.63, 36.08, 23.41];
  const options = {
    labels: ['Grocery', 'Electronics', 'Other'],
    colors: ['#00E396', '#FEB019', '#FF4560'],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="card">
      <h4>Sales by Category</h4>
      <ReactApexChart options={options} series={series} type="donut" height={250} />
    </div>
  );
};

export default SalesByCategory;
