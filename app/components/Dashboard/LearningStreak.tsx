"use client";

import { Flame, Sparkles, TrendingUp } from "lucide-react";

export default function LearningStreak() {
  return (
    <div className="group relative h-full min-h-[250px] overflow-hidden rounded-2xl border border-orange-400/10 bg-slate-950/80 p-6 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-400/25 hover:shadow-orange-950/30">

      {/* Main orange glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl transition-all duration-700 group-hover:bg-orange-500/25"
        aria-hidden="true"
      />

      {/* Secondary glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Decorative ring */}
      <div
        className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-full border border-orange-400/10"
        aria-hidden="true"
      />

      <div className="relative">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/10">

            <Flame
              size={25}
              className="animate-pulse"
            />

          </div>

          <TrendingUp
            size={18}
            className="text-emerald-400"
          />

        </div>

        {/* Streak */}
        <div className="mt-8">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
            Learning streak
          </p>

          <div className="mt-2 flex items-end gap-2">

            <h2 className="text-4xl font-black tracking-tight text-white">
              18
            </h2>

            <span className="mb-1 text-lg font-semibold text-slate-400">
              Days
            </span>

          </div>

          <p className="mt-2 text-sm text-slate-500">
            Keep the momentum going.
          </p>

        </div>

        {/* Bottom status */}
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-orange-400/10 bg-orange-500/[0.05] px-4 py-3">

          <Sparkles
            size={15}
            className="text-orange-400"
          />

          <span className="text-xs font-semibold text-slate-400">
            You&apos;re on fire! Keep learning.
          </span>

        </div>

      </div>

    </div>
  );
}


// import { Flame } from "lucide-react";

// export default function LearningStreak() {
//   return (
//     <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-sm">

//       <Flame
//         size={40}
//       />

//       <h2 className="mt-5 text-3xl font-bold">

//         18 Days

//       </h2>

//       <p>

//         Current Learning Streak

//       </p>

//     </div>
//   );
// }