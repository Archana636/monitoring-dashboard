import React from "react";
import {
  RECEIVED_COLOR,
  TRANSMITTED_COLOR,
} from "../../../utils/constants.util.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        boxWidth: 15,
        boxHeight: 15,
      },
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Airtel", "Jio", "Idea"];

export const data = {
  labels,
  datasets: [
    {
      label: "Transmitted",
      data: [10, 25, 20],
      backgroundColor: TRANSMITTED_COLOR,
    },
    {
      label: "Received",
      data: [29, 36, 56],
      backgroundColor: RECEIVED_COLOR,
    },
  ],
};

export function BarGraph(props) {
  return (
    <div className={props.className}>
      <Bar options={options} data={data} />
    </div>
  );
}
