"use client";

import { CircleCheck, Circle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Props {
  question: Question;
  answer: string | undefined;
  onSelect: (value: string) => void;
}

export default function QuestionCard({
  question,
  answer,
  onSelect,
}: Props) {
  const options = [
    {
      key: "A",
      text: question.option_a,
    },
    {
      key: "B",
      text: question.option_b,
    },
    {
      key: "C",
      text: question.option_c,
    },
    {
      key: "D",
      text: question.option_d,
    },
  ];

  return (
    <div className="lms-card group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      {/* Top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />

      {/* Question */}
      <div className="relative mb-8 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-sm font-bold text-cyan-400">
          ?
        </div>

        <h2 className="pt-1 text-xl font-bold leading-8 text-white sm:text-2xl">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="relative space-y-4">
        {options.map((option) => {
          const selected =
            answer === option.key;

          return (
            <label
              key={option.key}
              className={`group/option relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
                selected
                  ? "scale-[1.01] border-cyan-400/50 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 text-white shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                  : "border-white/10 bg-slate-900/60 text-slate-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-gradient-to-r hover:from-blue-600/10 hover:via-cyan-500/10 hover:to-purple-600/10 hover:text-white"
              }`}
            >
              {/* Shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover/option:translate-x-full" />

              {/* Hidden radio */}
              <input
                type="radio"
                name={question.id}
                value={option.key}
                checked={selected}
                onChange={() =>
                  onSelect(option.key)
                }
                className="sr-only"
              />

              {/* Letter */}
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                  selected
                    ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_0_18px_rgba(34,211,238,0.30)]"
                    : "bg-white/5 text-slate-500 group-hover/option:bg-cyan-400/10 group-hover/option:text-cyan-300"
                }`}
              >
                {option.key}
              </span>

              {/* Text */}
              <span className="relative z-10 flex-1 text-sm leading-6 sm:text-base">
                {option.text}
              </span>

              {/* Check */}
              {selected ? (
                <CircleCheck
                  size={22}
                  className="relative z-10 shrink-0 text-cyan-400"
                />
              ) : (
                <Circle
                  size={21}
                  className="relative z-10 shrink-0 text-slate-700 transition-colors group-hover/option:text-slate-500"
                />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}



// "use client";

// import Link from "next/link";
// import {
//   Clock,
//   Star,
//   PlayCircle,
//   Sparkles,
//   ArrowRight,
// } from "lucide-react";

// interface Props {
//   id: string;
//   title: string;
//   description: string | null;
//   timeLimit: number;
//   totalMarks: number;
// }

// export default function QuizCard({
//   id,
//   title,
//   description,
//   timeLimit,
//   totalMarks,
// }: Props) {
//   return (
//     <div className="lms-card group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
//       {/* Top glow */}
//       <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

//       {/* Ambient glow */}
//       <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />

//       {/* Animated shine */}
//       <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

//       {/* Header */}
//       <div className="relative flex items-start justify-between gap-4">
//         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20 shadow-[0_0_25px_rgba(59,130,246,0.12)]">
//           <Sparkles
//             size={22}
//             className="text-cyan-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
//           />
//         </div>

//         <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
//           Quiz
//         </span>
//       </div>

//       {/* Title */}
//       <div className="relative mt-6">
//         <h2 className="text-xl font-bold leading-7 text-white transition-colors duration-300 group-hover:text-cyan-300">
//           {title}
//         </h2>

//         <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-400">
//           {description ||
//             "Challenge yourself and test what you have learned."}
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="relative mt-7 grid grid-cols-2 gap-3">
//         <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 transition-all duration-300 group-hover:border-cyan-400/20">
//           <div className="flex items-center gap-2">
//             <Clock
//               size={17}
//               className="text-cyan-400"
//             />

//             <span className="text-xs text-slate-500">
//               Time
//             </span>
//           </div>

//           <p className="mt-2 text-sm font-semibold text-white">
//             {timeLimit} mins
//           </p>
//         </div>

//         <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 transition-all duration-300 group-hover:border-purple-400/20">
//           <div className="flex items-center gap-2">
//             <Star
//               size={17}
//               className="text-purple-400"
//             />

//             <span className="text-xs text-slate-500">
//               Marks
//             </span>
//           </div>

//           <p className="mt-2 text-sm font-semibold text-white">
//             {totalMarks}
//           </p>
//         </div>
//       </div>

//       {/* Start button */}
//       <Link
//         href={`/auth/dashboard/quizzes/${id}`}
//         className="group/button relative mt-7 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 py-3.5 font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
//       >
//         <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

//         <PlayCircle
//           size={19}
//           className="relative z-10 transition-transform duration-300 group-hover/button:scale-110"
//         />

//         <span className="relative z-10">
//           Start Quiz
//         </span>

//         <ArrowRight
//           size={16}
//           className="relative z-10 transition-transform duration-300 group-hover/button:translate-x-1"
//         />
//       </Link>
//     </div>
//   );
// }




// interface Question {
//   id: string;
//   question: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
// }

// interface Props {
//   question: Question;
//   answer: string | undefined;
//   onSelect: (value: string) => void;
// }

// export default function QuestionCard({
//   question,
//   answer,
//   onSelect,
// }: Props) {

//   const options = [
//     { key: "A", text: question.option_a },
//     { key: "B", text: question.option_b },
//     { key: "C", text: question.option_c },
//     { key: "D", text: question.option_d },
//   ];

//   return (

//     <div className="rounded-2xl bg-white p-8 shadow">

//       <h2 className="mb-8 text-2xl font-bold text-gray-700">
//         {question.question}
//       </h2>

//       <div className="space-y-4">

//         {options.map((option) => (

//           <label
//             key={option.key}
//             className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
//               answer === option.key
//                 ? "border-blue-600 bg-blue-50"
//                 : "hover:bg-gray-50"
//             }`}
//           >

//             <input
//               type="radio"
//               checked={answer === option.key}
//               onChange={() => onSelect(option.key)}
//             />

//             {option.text}

//           </label>

//         ))}

//       </div>

//     </div>

//   );
// }