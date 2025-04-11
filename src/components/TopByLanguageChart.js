// components/TopByLanguageChart.js
"use client";
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const COLORS = {
  Hindi: "#FFC107",
  Tamil: "#F44336",
  Telugu: "#2196F3",
  Kannada: "#9C27B0",
  Malayalam: "#4CAF50",
  Bengali: "#00BCD4",
  Punjabi: "#E91E63",
  Odia: "#3F51B5",
  Gujarati: "#FF5722",
  Other: "#9E9E9E",
};

const TopByLanguageChart = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Top Songs by Language</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="language" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.language] || "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopByLanguageChart;
