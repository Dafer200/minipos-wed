import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
type Props = {
  data: {
    name: string;
    total: number;
  }[];
};
export default function ProductsChart({ data }: Props) {
  const chartData = {
    labels: data.map((x) => x.name),
    datasets: [
      {
        label: "Productos",
        data: data.map((x) => x.total),
        backgroundColor: [
          "rgba(14, 165, 233, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
      },
    ],
  };
  return <Doughnut data={chartData} />;
}
