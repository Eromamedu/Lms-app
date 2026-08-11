"use client";

import Link from "next/link";
import {
  Clock,
  Star,
  PlayCircle,
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
    <div className="group rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-gray-700">
          {title}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          Quiz
        </span>

      </div>

      <p className="mt-4 text-gray-500">
        {description}
      </p>

      <div className="mt-8 flex justify-between">

        <div className="flex items-center gap-2 text-gray-600">

          <Clock size={18} />

          {timeLimit} mins

        </div>

        <div className="flex items-center gap-2 text-gray-600">

          <Star size={18} />

          {totalMarks} Marks

        </div>

      </div>

      <Link
        href={`/auth/dashboard/quizzes/${id}`}
        className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >

        <PlayCircle size={20} />

        Start Quiz

      </Link>

    </div>
  );
}









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