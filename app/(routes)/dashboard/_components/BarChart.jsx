import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5">
      <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{
          top: 5,
          bottom: 5,
          left: 5,
          right: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#2563eb" />
        <Bar dataKey="amount" stackId="a" fill="#64b5f6" />
      </BarChart>
    </div>
  );
}

export default BarChartDashboard;
