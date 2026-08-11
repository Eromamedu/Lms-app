"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import QuizCard from "@/app/components/Quiz/QuizCard";

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
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold text-gray-500">
        Loading quizzes...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      <div>

        <h1 className="text-4xl font-bold text-gray-700">
          Course Quizzes
        </h1>

        <p className="mt-2 text-gray-500">
          Test your knowledge and improve your mastery of each course.
        </p>

      </div>

      {quizzes.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center shadow">

          <h2 className="text-2xl font-semibold text-gray-700">
            No quizzes available.
          </h2>

          <p className="mt-2 text-gray-500">
            Add quizzes in Supabase to begin.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {quizzes.map((quiz) => (

            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              timeLimit={quiz.time_limit}
              totalMarks={quiz.total_marks}
            />

          ))}

        </div>

      )}

    </div>
  );
}
























// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";
// import QuizCard from "@/app/components/Quiz/QuizCard";

// interface Quiz {
//   id: string;
//   lesson_id: string;
//   title: string;
//   description: string | null;
//   time_limit: number;
//   total_marks: number;
// }

// export default function QuizzesPage() {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
// //   const [questions, setQuestions] = useState<Question[]>([]);
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // const [answers, setAnswers] = useState<
// //   Record<string, string>
// // >({});

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   async function loadQuizzes() {
//     setLoading(true);

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     //------------------------------------
//     // Completed lessons
//     //------------------------------------

//     const { data: completedLessons } = await supabase
//       .from("lesson_progress")
//       .select("lesson_id")
//       .eq("student_id", user.id)
//       .eq("completed", true);

//     if (!completedLessons?.length) {
//       setLoading(false);
//       return;
//     }

//     const lessonIds = completedLessons.map(
//       (lesson) => lesson.lesson_id
//     );

//     //------------------------------------
//     // Load quizzes
//     //------------------------------------

//     const { data } = await supabase
//       .from("quizzes")
//       .select("*")
//       .in("lesson_id", lessonIds);

//     setQuizzes(data ?? []);

//     setLoading(false);
//   }

//   if (loading) {
//     return (
//       <div className="py-12 text-center">
//         Loading quizzes...
//       </div>
//     );
//   }

//   if (!quizzes.length) {
//     return (
//       <div className="py-12 text-center text-gray-500">
//         Complete lessons to unlock quizzes.
//       </div>
//     );
//   }
// //   const question = questions[currentQuestion];
// if (!loading) {
//   return (
//     <div className="space-y-8">

//       <h1 className="text-3xl font-bold text-gray-700">
//         My Quizzes
//       </h1>

//       <div className="grid gap-6 md:grid-cols-2">

//         {quizzes.map((quiz) => (

//   <QuizCard
//     key={quiz.id}
//     id={quiz.id}
//     title={quiz.title}
//     description={quiz.description}
//     timeLimit={quiz.time_limit}
//     totalMarks={quiz.total_marks}
//   />
  
// ))}
//           {/* <div
//             key={quiz.id}
//             className="rounded-xl border bg-white p-6 shadow-sm"
//           >

//             <h2 className="text-xl font-semibold">
//               {quiz.title}
//             </h2>

//             <p className="mt-2 text-gray-500">
//               {quiz.description}
//             </p>

//             <div className="mt-6 flex justify-between text-sm text-gray-600">

//               <span>
//                 ⏱ {quiz.time_limit} mins
//               </span>

//               <span>
//                 ⭐ {quiz.total_marks} Marks
//               </span>

//             </div>

//             <button
//               className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
//             >
//               Start Quiz
//             </button>

//           </div> */}

        

//       </div>

//     </div>
//   );
// }
// }