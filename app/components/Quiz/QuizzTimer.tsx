"use client";

import {
  Clock3,
  AlertTriangle,
} from "lucide-react";

interface Props {
  seconds: number;
}

export default function Timer({
  seconds,
}: Props) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const danger = seconds <= 60;

  return (
    <div
      className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border px-5 py-3 backdrop-blur-xl transition-all duration-300 ${
        danger
          ? "border-red-400/40 bg-red-500/10 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.20)]"
          : "border-cyan-400/20 bg-slate-950/80 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.10)]"
      }`}
    >
      <span
        className={`absolute inset-0 ${
          danger
            ? "animate-pulse bg-red-500/5"
            : "bg-cyan-500/5"
        }`}
      />

      {danger ? (
        <AlertTriangle
          size={19}
          className="relative z-10 animate-pulse"
        />
      ) : (
        <Clock3
          size={19}
          className="relative z-10"
        />
      )}

      <span className="relative z-10 font-mono text-lg font-bold">
        {minutes}:
        {secs.toString().padStart(2, "0")}
      </span>
    </div>
  );
}


// interface Props {
//   seconds: number;
// }

// export default function Timer({
//   seconds,
// }: Props) {

//   const minutes = Math.floor(seconds / 60);

//   const secs = seconds % 60;

//   return (

//     <div
//       className={`rounded-xl px-5 py-3 text-lg font-bold text-white ${
//         seconds <= 60
//           ? "bg-red-600"
//           : "bg-blue-600"
//       }`}
//     >

//       {minutes}:
//       {secs.toString().padStart(2, "0")}

//     </div>

//   );
// }