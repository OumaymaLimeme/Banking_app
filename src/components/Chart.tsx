"use client";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ accounts } : DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [500, 600, 700],
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
      },
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3'],
  };

  return (
    <Doughnut
     data={data}
     options={{
        cutout:'60%'
     }
     } />
  );
};

export default Chart;
