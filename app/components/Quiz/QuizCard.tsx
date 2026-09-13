"use client";

import Link from "next/link";
import {
  Clock,
  Star,
  PlayCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Props {
  id: string;
  title: string;
  description: string | null;
  timeLimit: number;
  totalMarks: number;
}

export default function QuizCard({
  id,
  title,
  description,
  timeLimit,
  totalMarks,
}: Props) {
  return (
    <div
      className="
        group relative isolate overflow-hidden rounded-3xl
        border border-white/10
        bg-slate-950/90
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        transition-all duration-500 ease-out
        hover:-translate-y-3
        hover:border-cyan-400/30
        hover:shadow-[0_25px_80px_rgba(59,130,246,0.18)]
        animate-fade-up
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-40 w-40
          rounded-full
          bg-cyan-500/10
          blur-3xl
          transition-all duration-700
          group-hover:scale-150
          group-hover:bg-cyan-400/20
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-20 -left-20
          h-44 w-44
          rounded-full
          bg-purple-600/10
          blur-3xl
          transition-all duration-700
          group-hover:scale-125
          group-hover:bg-purple-500/20
        "
      />

      {/* ========================================================= */}
      {/* ANIMATED LIGHT SWEEP */}
      {/* ========================================================= */}

      <span
        className="
          pointer-events-none absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          transition-transform duration-1000
          group-hover:translate-x-full
        "
      />

      {/* ========================================================= */}
      {/* TOP CONTENT */}
      {/* ========================================================= */}

      <div className="relative z-10">

        {/* Quiz badge */}

        <div className="mb-5 flex items-center justify-between">

          <div
            className="
              flex items-center gap-2
              rounded-full
              border border-cyan-400/20
              bg-gradient-to-r
              from-blue-500/10
              via-cyan-500/10
              to-purple-500/10
              px-3 py-1.5
              text-xs font-bold
              uppercase tracking-wider
              text-cyan-300
              shadow-[0_0_20px_rgba(34,211,238,0.08)]
              transition-all duration-300
              group-hover:border-cyan-400/40
              group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
            "
          >
            <Sparkles
              size={14}
              className="
                text-cyan-300
                transition-transform duration-500
                group-hover:rotate-12
                group-hover:scale-125
              "
            />

            Quiz
          </div>

          {/* Small decorative indicator */}

          <div
            className="
              flex items-center gap-1.5
              opacity-60
              transition-all duration-300
              group-hover:opacity-100
            "
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500/50" />
          </div>

        </div>

        {/* ========================================================= */}
        {/* TITLE */}
        {/* ========================================================= */}

        <h2
          className="
            text-xl font-bold leading-tight
            text-white
            transition-all duration-300
            group-hover:text-cyan-100
          "
        >
          {title}
        </h2>

        {/* ========================================================= */}
        {/* DESCRIPTION */}
        {/* ========================================================= */}

        <p
          className="
            mt-3
            min-h-[48px]
            text-sm leading-6
            text-slate-400
            transition-colors duration-300
            group-hover:text-slate-300
          "
        >
          {description || "Test your knowledge and strengthen your understanding of this course."}
        </p>

        {/* ========================================================= */}
        {/* QUIZ INFORMATION */}
        {/* ========================================================= */}

        <div className="mt-7 grid grid-cols-2 gap-3">

          {/* Time */}

          <div
            className="
              group/stat
              rounded-2xl
              border border-white/10
              bg-slate-900/70
              p-3
              transition-all duration-300
              hover:border-cyan-400/20
              hover:bg-cyan-400/5
            "
          >
            <div className="flex items-center gap-2">

              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  border border-cyan-400/20
                  bg-cyan-400/10
                  text-cyan-300
                  transition-all duration-300
                  group-hover/stat:scale-110
                  group-hover/stat:shadow-[0_0_15px_rgba(34,211,238,0.2)]
                "
              >
                <Clock size={17} />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Time
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  {timeLimit} mins
                </p>
              </div>

            </div>
          </div>

          {/* Marks */}

          <div
            className="
              group/stat
              rounded-2xl
              border border-white/10
              bg-slate-900/70
              p-3
              transition-all duration-300
              hover:border-purple-400/20
              hover:bg-purple-400/5
            "
          >
            <div className="flex items-center gap-2">

              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  border border-purple-400/20
                  bg-purple-400/10
                  text-purple-300
                  transition-all duration-300
                  group-hover/stat:scale-110
                  group-hover/stat:rotate-6
                  group-hover/stat:shadow-[0_0_15px_rgba(168,85,247,0.2)]
                "
              >
                <Star size={17} />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Total
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  {totalMarks} Marks
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* START QUIZ BUTTON */}
        {/* ========================================================= */}

        <Link
          href={`/auth/dashboard/quizzes/${id}`}
          className="
            relative mt-6 flex
            items-center justify-center
            gap-3 overflow-hidden
            rounded-2xl
            border border-cyan-400/20
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-purple-600
            py-3.5
            font-semibold
            text-white
            shadow-[0_0_25px_rgba(59,130,246,0.15)]
            transition-all duration-300
            hover:scale-[1.02]
            hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
            active:scale-[0.98]
          "
        >

          {/* Button shine */}

          <span
            className="
              pointer-events-none absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              transition-transform duration-700
              group-hover:translate-x-full
            "
          />

          {/* Button content */}

          <PlayCircle
            size={20}
            className="
              relative z-10
              transition-transform duration-300
              group-hover:scale-110
              group-hover:rotate-3
            "
          />

          <span className="relative z-10">
            Start Quiz
          </span>

          <ArrowRight
            size={18}
            className="
              relative z-10
              transition-all duration-300
              group-hover:translate-x-1
            "
          />

        </Link>

      </div>

      {/* ========================================================= */}
      {/* BOTTOM DECORATIVE LINE */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none absolute
          bottom-0 left-1/2
          h-[2px] w-0
          -translate-x-1/2
          bg-gradient-to-r
          from-blue-500
          via-cyan-400
          to-purple-500
          opacity-0
          transition-all duration-500
          group-hover:w-2/3
          group-hover:opacity-100
        "
      />
    </div>
  );
}



// "use client";

// import Link from "next/link";
// import {
//   Clock,
//   Star,
//   PlayCircle,
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
//     <div className="group rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl">

//       <div className="flex items-center justify-between">

//         <h2 className="text-xl font-bold text-gray-700">
//           {title}
//         </h2>

//         <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
//           Quiz
//         </span>

//       </div>

//       <p className="mt-4 text-gray-500">
//         {description}
//       </p>

//       <div className="mt-8 flex justify-between">

//         <div className="flex items-center gap-2 text-gray-600">

//           <Clock size={18} />

//           {timeLimit} mins

//         </div>

//         <div className="flex items-center gap-2 text-gray-600">

//           <Star size={18} />

//           {totalMarks} Marks

//         </div>

//       </div>

//       <Link
//         href={`/auth/dashboard/quizzes/${id}`}
//         className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
//       >

//         <PlayCircle size={20} />

//         Start Quiz

//       </Link>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import {
//   Clock,
//   Star,
//   PlayCircle,
//   CheckCircle,
// } from "lucide-react";

// interface QuizCardProps {
//   id: string;
//   title: string;
//   description: string | null;
//   timeLimit: number;
//   totalMarks: number;
//   completed?: boolean;
//   score?: number;
// }

// export default function QuizCard({
//   id,
//   title,
//   description,
//   timeLimit,
//   totalMarks,
//   completed = false,
//   score,
// }: QuizCardProps) {
//   return (
//     <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

//       <div className="flex items-center justify-between">

//         <h2 className="text-xl font-bold text-gray-700">
//           {title}
//         </h2>

//         {completed ? (
//           <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
//             <CheckCircle size={16} />
//             Completed
//           </span>
//         ) : (
//           <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
//             New
//           </span>
//         )}

//       </div>

//       <p className="mt-3 text-gray-500">
//         {description}
//       </p>

//       <div className="mt-6 flex justify-between text-sm text-gray-600">

//         <div className="flex items-center gap-2">
//           <Clock size={18} />
//           {timeLimit} mins
//         </div>

//         <div className="flex items-center gap-2">
//           <Star size={18} />
//           {totalMarks} Marks
//         </div>

//       </div>

//       {completed && score !== undefined && (
//         <div className="mt-4 rounded-lg bg-green-50 p-3 text-green-700">
//           Your Score: <strong>{score}</strong>
//         </div>
//       )}

//       <Link
//         href={`/auth/dashboard/quizzes/${id}`}
//         className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
//       >
//         <PlayCircle size={20} />

//         {completed ? "Review Quiz" : "Start Quiz"}

//       </Link>

//     </div>
//   );
// }