import React, { useState, useEffect } from "react";
import {
  RECEIVED_COLOR,
  TRANSMITTED_COLOR,
  TEXT_COLOR,
} from "../../../utils/constants.util.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  color: TEXT_COLOR(1),
  scales: {
    x: {
      grid: {
        color: TEXT_COLOR(0.1),
      },
      ticks: {
        color: TEXT_COLOR(1),
      },
    },
    y: {
      grid: {
        color: TEXT_COLOR(0.1),
      },
      ticks: {
        color: TEXT_COLOR(1),
        // Include a dollar sign in the ticks
        callback: function (value) {
          // return "$" + value;
          value = value * 8;
          var magabitdata = value / 1000000; // covert bit to Megabit
          if (magabitdata < 1) {
            value = magabitdata * 1000; // covert Megabit to Kilobit
            return parseFloat(value.toFixed(2)) + " kbps";
          } else if (magabitdata > 1000) {
            value = magabitdata / 1000; // covert Megabit to Gigabit
            return parseFloat(value.toFixed(2)) + " Gbps";
          } else {
            value = magabitdata;
            return parseFloat(value.toFixed(2)) + " Mbps";
          }
        },
      },
    },
  },
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
    },
    subtitle: {
      display: true,
      text: "Custom Chart Subtitle",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            let value = context.parsed.y * 8;
            let magabitdata = value / 1000000; // covert bit to Megabit
            if (magabitdata < 1) {
              // covert Megabit to Kilobit
              value = parseFloat((magabitdata * 1000).toFixed(2)) + " Kbps";
            } else if (magabitdata > 1000) {
              // covert Megabit to Gigabit
              value = parseFloat((magabitdata / 1000).toFixed(2)) + " Gbps";
            } else {
              value = parseFloat(magabitdata.toFixed(2)) + " Mbps";
            }
            label += value;
          }
          return label;
        },
      },
    },
  },
  layout: {
    autoPadding: false,
  },
};

export function LineGraph(props) {
  const { time, recived: received, transmited: transmitted } = props;

  const data = {
    labels: time,
    datasets: [
      {
        label: "Received (per seconds)",
        data: received,
        borderColor: RECEIVED_COLOR,
        backgroundColor: RECEIVED_COLOR,
      },
      {
        label: "Transmitted (per seconds)",
        data: transmitted,
        borderColor: TRANSMITTED_COLOR,
        backgroundColor: TRANSMITTED_COLOR,
      },
    ],
  };
  return (
    <div className={props.className}>
      <Line options={options} data={data} />
    </div>
  );
}
