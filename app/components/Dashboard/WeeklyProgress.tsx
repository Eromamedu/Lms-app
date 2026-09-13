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
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/20">

      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">

        <h2 className="mb-6 text-xl font-bold text-white">
          Weekly Learning
        </h2>

        <div className="h-72">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={data}>

              <XAxis
                dataKey="day"
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}
              />

              <Line
                type="monotone"
                dataKey="hours"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#22d3ee",
                }}
                activeDot={{
                  r: 6,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

// "use client";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
// } from "recharts";

// const data = [
//   { day: "Mon", hours: 2 },
//   { day: "Tue", hours: 4 },
//   { day: "Wed", hours: 3 },
//   { day: "Thu", hours: 6 },
//   { day: "Fri", hours: 5 },
//   { day: "Sat", hours: 7 },
//   { day: "Sun", hours: 4 },
// ];

// export default function WeeklyProgress() {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow-sm">
//       <h2 className="mb-6 text-xl font-bold text-gray-600">
//         Weekly Learning
//       </h2>

//       <div className="h-72">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <XAxis dataKey="day" />

//             <Tooltip />

//             <Line
//               dataKey="hours"
//               stroke="#2563EB"
//               strokeWidth={3}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }