"use client";

import {
  CheckCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string | null;
}

interface Props {
  questions: Question[];
  answers: Record<string, string>;
}

export default function AnswerReview({
  questions,
  answers,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Answer Review
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review your answers and learn from each
          question.
        </p>
      </div>

      {questions.map((question, index) => {
        const correct =
          answers[question.id] ===
          question.correct_answer;

        return (
          <div
            key={question.id}
            className={`group relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:p-8 ${
              correct
                ? "border-emerald-400/20 bg-emerald-500/5 hover:border-emerald-400/30"
                : "border-red-400/20 bg-red-500/5 hover:border-red-400/30"
            }`}
          >
            {/* Glow */}
            <div
              className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl ${
                correct
                  ? "bg-emerald-500/10"
                  : "bg-red-500/10"
              }`}
            />

            {/* Header */}
            <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {correct ? (
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                    <CheckCircle
                      size={25}
                      className="text-emerald-400"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                    <XCircle
                      size={25}
                      className="text-red-400"
                    />
                  </div>
                )}

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Question {index + 1}
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      correct
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                  >
                    {correct
                      ? "Correct Answer"
                      : "Incorrect Answer"}
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            <h3 className="relative mb-6 text-lg font-bold leading-7 text-white">
              {question.question}
            </h3>

            {/* Options */}
            <div className="relative space-y-3">
              {[
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
              ].map((option) => {
                const isCorrect =
                  option.key ===
                  question.correct_answer;

                const isChosen =
                  option.key ===
                  answers[question.id];

                return (
                  <div
                    key={option.key}
                    className={`flex items-center gap-3 rounded-2xl border p-4 transition-all duration-300 ${
                      isCorrect
                        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                        : isChosen
                          ? "border-red-400/30 bg-red-500/10 text-red-200"
                          : "border-white/5 bg-slate-900/50 text-slate-500"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        isCorrect
                          ? "bg-emerald-500/20 text-emerald-300"
                          : isChosen
                            ? "bg-red-500/20 text-red-300"
                            : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {option.key}
                    </span>

                    <span className="flex-1 text-sm leading-6">
                      {option.text}
                    </span>

                    {isCorrect && (
                      <CheckCircle
                        size={18}
                        className="shrink-0 text-emerald-400"
                      />
                    )}

                    {isChosen && !isCorrect && (
                      <XCircle
                        size={18}
                        className="shrink-0 text-red-400"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Answer summary */}
            <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Your Answer
                </p>

                <p
                  className={`mt-2 font-bold ${
                    correct
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}
                >
                  {answers[question.id] ??
                    "No Answer"}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Correct Answer
                </p>

                <p className="mt-2 font-bold text-emerald-300">
                  {question.correct_answer}
                </p>
              </div>
            </div>

            {/* Explanation */}
            {question.explanation && (
              <div className="relative mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                    <Lightbulb
                      size={18}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-cyan-300">
                      Explanation
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


// "use client";

// import {
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// interface Question {
//   id: string;
//   question: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_answer: string;
//   explanation: string | null;
// }

// interface Props {
//   questions: Question[];

//   answers: Record<string, string>;
// }

// export default function AnswerReview({
//   questions,
//   answers,
// }: Props) {
//   return (
//     <div className="space-y-8">

//       {questions.map((question, index) => {
//         const correct =
//           answers[question.id] ===
//           question.correct_answer;

//         return (
//           <div
//             key={question.id}
//             className={`rounded-2xl border-2 p-6 shadow-sm text-gray-600

//             ${
//               correct
//                 ? "border-green-400 bg-green-50"
//                 : "border-red-400 bg-red-50"
//             }`}
//           >
//             <div className="mb-4 flex items-center gap-3">

//               {correct ? (
//                 <CheckCircle
//                   className="text-green-600"
//                   size={28}
//                 />
//               ) : (
//                 <XCircle
//                   className="text-red-600"
//                   size={28}
//                 />
//               )}

//               <h2 className="text-xl font-bold">

//                 Question {index + 1}

//               </h2>

//             </div>

//             <h3 className="mb-6 text-lg font-semibold">

//               {question.question}

//             </h3>

//             <div className="space-y-3">

//               {[
//                 {
//                   key: "A",
//                   text: question.option_a,
//                 },
//                 {
//                   key: "B",
//                   text: question.option_b,
//                 },
//                 {
//                   key: "C",
//                   text: question.option_c,
//                 },
//                 {
//                   key: "D",
//                   text: question.option_d,
//                 },
//               ].map((option) => {
//                 const isCorrect =
//                   option.key ===
//                   question.correct_answer;

//                 const isChosen =
//                   option.key ===
//                   answers[question.id];

//                 return (
//                   <div
//                     key={option.key}
//                     className={`rounded-xl border p-4

//                     ${
//                       isCorrect
//                         ? "border-green-500 bg-green-100"
//                         : isChosen
//                         ? "border-red-500 bg-red-100"
//                         : "bg-white"
//                     }`}
//                   >
//                     <strong>
//                       {option.key}.
//                     </strong>{" "}
//                     {option.text}
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-6">

//               <p className="font-semibold">

//                 Your Answer:

//                 <span
//                   className={`ml-2

//                   ${
//                     correct
//                       ? "text-green-700"
//                       : "text-red-700"
//                   }`}
//                 >
//                   {answers[question.id] ??
//                     "No Answer"}
//                 </span>

//               </p>

//               <p className="mt-2 font-semibold text-green-700">

//                 Correct Answer:

//                 <span className="ml-2">
//                   {question.correct_answer}
//                 </span>

//               </p>

//               {question.explanation && (
//                 <div className="mt-5 rounded-xl bg-white p-4">

//                   <h4 className="mb-2 font-bold">

//                     Explanation

//                   </h4>

//                   <p className="text-gray-600">

//                     {question.explanation}

//                   </p>

//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }