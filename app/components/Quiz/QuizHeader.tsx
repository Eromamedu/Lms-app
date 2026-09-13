"use client";

import {
  Brain,
  Sparkles,
} from "lucide-react";

interface Props {
  title: string;
  description: string | null;
}

export default function QuizHeader({
  title,
  description,
}: Props) {
  return (
    <div className="lms-glass group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />

      <div className="pointer-events-none absolute -left-20 bottom-[-80px] h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
          <Brain
            size={27}
            className="text-white transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Quiz Challenge
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// interface Props {
//   title: string;
//   description: string | null;
// }

// export default function QuizHeader({
//   title,
//   description,
// }: Props) {
//   return (
//     <div className="rounded-2xl bg-white p-8 shadow">

//       <h1 className="text-4xl font-bold text-gray-700">
//         {title}
//       </h1>

//       <p className="mt-3 text-gray-500">
//         {description}
//       </p>

//     </div>
//   );
// }