"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 5 },
  { day: "Sat", hours: 7 },
  { day: "Sun", hours: 4 },
];

export default function WeeklyProgress() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-600">
        Weekly Learning
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />

            <Tooltip />

            <Line
              dataKey="hours"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}