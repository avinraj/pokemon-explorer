"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { StatsData } from "../models/pokemon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PokemonStatsChart({
  statsData,
}: {
  statsData: StatsData[];
}) {
  const chartData = {
    labels: statsData.map((s) => s.name),
    datasets: [
      {
        label: "Base Stats",
        data: statsData.map((s) => s.value),
        backgroundColor: "rgb(24 60 184)",
        borderColor: "rgb(24 60 184)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          font: { size: 14 },
          color: "#333",
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { size: 14 },
          color: "#333",
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
