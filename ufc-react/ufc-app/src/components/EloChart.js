import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../styles/EloChart.css";

const EloChart = ({ eloHistory, eloChange }) => {
  if (!eloHistory || eloHistory.length === 0) return null;

  let eloColor = "#aaa";

  if (eloChange !== null) {
    const numericChange = parseFloat(eloChange);
    eloColor = numericChange > 0 ? "#4caf50" : numericChange < 0 ? "#f44336" : "#aaa";
  }

  return (
    <div className="elo-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={eloHistory}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #ccc",
                borderRadius: "6px",
                color: "#ccc",
                fontSize: "0.9rem",
                padding: "0.5rem",
            }}
            itemStyle={{
                color: "#81c784",
                fontSize: "0.9rem",
            }}
            labelStyle={{
                color: "#ccc",
                marginBottom: "0.25rem",
                fontWeight: "bold",
            }}
            />
          <Line type="monotone" dataKey="elo" stroke={eloColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EloChart;