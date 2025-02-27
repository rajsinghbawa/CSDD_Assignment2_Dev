import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PriceComparisonChart = ({ actualPrices, predictedPrices }) => {
  const data = {
    labels: actualPrices.map((_, index) => `Property ${index + 1}`), // X-axis labels
    datasets: [
      {
        label: "Actual Prices",
        data: actualPrices,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)", // Slight fill effect
        borderWidth: 3,
        pointRadius: 5,
        fill: true,
      },
      {
        label: "Predicted Prices",
        data: predictedPrices,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderWidth: 3,
        pointRadius: 5,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows flexible resizing
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "index",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Properties",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
        📊 Predicted vs. Actual Prices
      </h2>
      <div className="h-80"> {/* Adjust height */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PriceComparisonChart;
