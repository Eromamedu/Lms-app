"use client";

import { Target } from "lucide-react";

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: Props) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target
            size={17}
            className="text-cyan-400"
          />

          <span className="text-sm font-semibold text-white">
            Question {current}{" "}
            <span className="text-slate-500">
              of {total}
            </span>
          </span>
        </div>

        <span className="text-xs font-semibold text-cyan-400">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-slate-900/80 shadow-inner">
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        >
          <span className="absolute inset-0 animate-pulse bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// interface Props {
//   current: number;
//   total: number;
// }

// export default function ProgressBar({
//   current,
//   total,
// }: Props) {

//   const progress = (current / total) * 100;

//   return (

//     <div>

//       <div className="mb-2 flex justify-between">

//         <span className="font-semibold">
//           Question {current} of {total}
//         </span>

//         {/* <span>{Math.round(progress)}%</span> */}

//       </div>

//       <div className="h-3 overflow-hidden rounded-full bg-gray-200">

//         <div
//           className="h-full rounded-full bg-blue-600 transition-all duration-500"
//           style={{
//             width: `${progress}%`,
//           }}
//         />

//       </div>

//     </div>

//   );
// }