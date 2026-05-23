import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

//Coincide con el nombre de tu archivo
export default function ProductsLineChart() {
  const chartData = {
    labels: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
      "Junio", "Julio", "Agosto", "Septiembre", "Octubre"
    ],
    datasets: [
      {
        label: "Rotación Histórica y Ondas de Stock",
        data: [85, 15, 90, 10, 75, 5, 95, 20, 80, 12], 
        borderColor: "rgba(249, 115, 22, 1)",       
        tension: 0.45,                              
        fill: true,                                 
        backgroundColor: "rgba(249, 115, 22, 0.15)", 
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgba(249, 115, 22, 1)",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}