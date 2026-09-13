"use client";

import {
  Trophy,
  Sparkles,
  Target,
  Award,
} from "lucide-react";

interface Props {
  score: number;
  total: number;
  percentage: number;
  grade: string;
}

export default function ResultCard({
  score,
  total,
  percentage,
  grade,
}: Props) {
  return (
    <div className="lms-glass group relative overflow-hidden rounded-3xl border border-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-1/2 top-[-100px] h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-[-80px] h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Trophy */}
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 shadow-[0_0_45px_rgba(59,130,246,0.30)]">
        <Trophy
          size={42}
          className="text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        />

        <Sparkles
          size={18}
          className="absolute -right-2 -top-2 animate-pulse text-cyan-300"
        />
      </div>

      {/* Title */}
      <div className="relative mt-7">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          <Sparkles size={14} />
          Quiz Complete
          <Sparkles size={14} />
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Excellent Work! 🎉
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
          You have completed this quiz. Review your
          answers below and keep building your knowledge.
        </p>
      </div>

      {/* Results */}
      <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
        {/* Score */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-400/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <Target
              size={21}
              className="text-cyan-400"
            />
          </div>

          <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">
            Score
          </p>

          <p className="mt-2 text-4xl font-bold text-white">
            {score}
            <span className="text-lg text-slate-500">
              /{total}
            </span>
          </p>
        </div>

        {/* Percentage */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:border-emerald-400/20 hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <Sparkles
              size={21}
              className="text-emerald-400"
            />
          </div>

          <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">
            Percentage
          </p>

          <p className="mt-2 text-4xl font-bold text-emerald-300">
            {percentage}%
          </p>
        </div>

        {/* Grade */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:border-purple-400/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.08)]">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
            <Award
              size={21}
              className="text-purple-400"
            />
          </div>

          <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">
            Grade
          </p>

          <p className="mt-2 text-5xl font-black text-purple-300">
            {grade}
          </p>
        </div>
      </div>
    </div>
  );
}

// //  import AnswerReview from "@/app/components/Quiz/AnswerReview";
//  interface Props {
//   score: number;
//   total: number;
//   percentage: number;
//   grade: string;
// }

// export default function ResultCard({
//   score,
//   total,
//   percentage,
//   grade,
// }: Props) {

//   return (

//     <div className="rounded-2xl bg-white p-10 text-center shadow text-gray-600">

//       <h1 className="text-4xl font-bold text-green-600">
//         Quiz Completed 🎉
//       </h1>

//       <div className="mt-10 space-y-6">

//         <div>

//           <h2 className="text-xl font-semibold">
//             Score
//           </h2>

//           <p className="text-5xl font-bold text-blue-700">
//             {score}/{total}
//           </p>

//         </div>

//         <div>

//           <h2 className="text-xl font-semibold">
//             Percentage
//           </h2>

//           <p className="text-5xl font-bold text-green-700">
//             {percentage}%
//           </p>

//         </div>

//         <div>

//           <h2 className="text-xl font-semibold">
//             Grade
//           </h2>

//           <p className="text-6xl font-bold text-purple-700">
//             {grade}
//           </p>

//         </div>

//       </div>

//     </div>

//   );
// }