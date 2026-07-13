"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ReadingActivityData {
  id: string;
  date: string;
  minutes: number;
}

export function ReadingActivityChart({
  data,
}: {
  data: ReadingActivityData[];
}) {
  const chartData = data.map((entry) => {
    const date = new Date(entry.date);
    return {
      day: date.getDate().toString(),
      minutes: entry.minutes,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1E293B",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value} min`, "Reading"]}
          labelFormatter={(label) => `Day ${label}`}
        />
        <Bar dataKey="minutes" fill="#3B82F6" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
