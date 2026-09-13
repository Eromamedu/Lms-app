"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import QuizCard from "@/app/components/Quiz/QuizCard";
import {
  Brain,
  Sparkles,
  Trophy,
  ClipboardCheck,
} from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  time_limit: number;
  total_marks: number;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    setLoading(true);

    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at");

    if (!error && data) {
      setQuizzes(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="lms-background relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative flex min-h-[65vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_0_35px_rgba(59,130,246,0.2)] backdrop-blur-xl">
              <Brain
                size={36}
                className="animate-pulse text-cyan-400"
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Loading quizzes
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your assessments...
            </p>

            <div className="mt-5 flex justify-center gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="lms-background relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[-180px] top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-180px] left-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative space-y-8">
        {/* Header */}
        <section className="animate-fade-up">
          <div className="lms-glass relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20">
                    <Brain
                      size={21}
                      className="text-cyan-400"
                    />
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    <Sparkles size={14} />
                    Knowledge Center
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Course Quizzes
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Test your knowledge, challenge yourself,
                  and improve your mastery of each course.
                </p>
              </div>

              {/* Quiz count */}
              <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 shadow-lg backdrop-blur-xl md:self-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                  <ClipboardCheck
                    size={21}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">
                    {quizzes.length}
                  </p>

                  <p className="text-xs text-slate-500">
                    Available Quizzes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty state */}
        {quizzes.length === 0 ? (
          <div className="animate-fade-up flex min-h-[40vh] items-center justify-center">
            <div className="lms-glass w-full max-w-xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20">
                <Trophy
                  size={36}
                  className="text-cyan-400"
                />
              </div>

              <h2 className="text-2xl font-bold text-white">
                No quizzes available
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Add quizzes in Supabase to begin testing
                your knowledge.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="animate-fade-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <QuizCard
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  timeLimit={quiz.time_limit}
                  totalMarks={quiz.total_marks}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";
// import QuizCard from "@/app/components/Quiz/QuizCard";

// interface Quiz {
//   id: string;
//   title: string;
//   description: string | null;
//   time_limit: number;
//   total_marks: number;
// }

// export default function QuizzesPage() {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   async function loadQuizzes() {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("quizzes")
//       .select("*")
//       .order("created_at");

//     if (!error && data) {
//       setQuizzes(data);
//     }

//     setLoading(false);
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-xl font-semibold text-gray-500">
//         Loading quizzes...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10">

//       <div>

//         <h1 className="text-4xl font-bold text-gray-700">
//           Course Quizzes
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Test your knowledge and improve your mastery of each course.
//         </p>

//       </div>

//       {quizzes.length === 0 ? (

//         <div className="rounded-xl bg-white p-10 text-center shadow">

//           <h2 className="text-2xl font-semibold text-gray-700">
//             No quizzes available.
//           </h2>

//           <p className="mt-2 text-gray-500">
//             Add quizzes in Supabase to begin.
//           </p>

//         </div>

//       ) : (

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

//           {quizzes.map((quiz) => (

//             <QuizCard
//               key={quiz.id}
//               id={quiz.id}
//               title={quiz.title}
//               description={quiz.description}
//               timeLimit={quiz.time_limit}
//               totalMarks={quiz.total_marks}
//             />

//           ))}

//         </div>

//       )}

//     </div>
//   );
// }
























// // "use client";

// // import { useEffect, useState } from "react";
// // import { supabase } from "@/app/lib/supabase";
// // import QuizCard from "@/app/components/Quiz/QuizCard";

// // interface Quiz {
// //   id: string;
// //   lesson_id: string;
// //   title: string;
// //   description: string | null;
// //   time_limit: number;
// //   total_marks: number;
// // }

// // export default function QuizzesPage() {
// //   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
// //   const [loading, setLoading] = useState(true);
// // //   const [questions, setQuestions] = useState<Question[]>([]);
// // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // const [answers, setAnswers] = useState<
// // //   Record<string, string>
// // // >({});

// //   useEffect(() => {
// //     loadQuizzes();
// //   }, []);

// //   async function loadQuizzes() {
// //     setLoading(true);

// //     const {
// //       data: { user },
// //     } = await supabase.auth.getUser();

// //     if (!user) {
// //       setLoading(false);
// //       return;
// //     }

// //     //------------------------------------
// //     // Completed lessons
// //     //------------------------------------

// //     const { data: completedLessons } = await supabase
// //       .from("lesson_progress")
// //       .select("lesson_id")
// //       .eq("student_id", user.id)
// //       .eq("completed", true);

// //     if (!completedLessons?.length) {
// //       setLoading(false);
// //       return;
// //     }

// //     const lessonIds = completedLessons.map(
// //       (lesson) => lesson.lesson_id
// //     );

// //     //------------------------------------
// //     // Load quizzes
// //     //------------------------------------

// //     const { data } = await supabase
// //       .from("quizzes")
// //       .select("*")
// //       .in("lesson_id", lessonIds);

// //     setQuizzes(data ?? []);

// //     setLoading(false);
// //   }

// //   if (loading) {
// //     return (
// //       <div className="py-12 text-center">
// //         Loading quizzes...
// //       </div>
// //     );
// //   }

// //   if (!quizzes.length) {
// //     return (
// //       <div className="py-12 text-center text-gray-500">
// //         Complete lessons to unlock quizzes.
// //       </div>
// //     );
// //   }
// // //   const question = questions[currentQuestion];
// // if (!loading) {
// //   return (
// //     <div className="space-y-8">

// //       <h1 className="text-3xl font-bold text-gray-700">
// //         My Quizzes
// //       </h1>

// //       <div className="grid gap-6 md:grid-cols-2">

// //         {quizzes.map((quiz) => (

// //   <QuizCard
// //     key={quiz.id}
// //     id={quiz.id}
// //     title={quiz.title}
// //     description={quiz.description}
// //     timeLimit={quiz.time_limit}
// //     totalMarks={quiz.total_marks}
// //   />
  
// // ))}
// //           {/* <div
// //             key={quiz.id}
// //             className="rounded-xl border bg-white p-6 shadow-sm"
// //           >

// //             <h2 className="text-xl font-semibold">
// //               {quiz.title}
// //             </h2>

// //             <p className="mt-2 text-gray-500">
// //               {quiz.description}
// //             </p>

// //             <div className="mt-6 flex justify-between text-sm text-gray-600">

// //               <span>
// //                 ⏱ {quiz.time_limit} mins
// //               </span>

// //               <span>
// //                 ⭐ {quiz.total_marks} Marks
// //               </span>

// //             </div>

// //             <button
// //               className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
// //             >
// //               Start Quiz
// //             </button>

// //           </div> */}

        

// //       </div>

// //     </div>
// //   );
// // }
// // }