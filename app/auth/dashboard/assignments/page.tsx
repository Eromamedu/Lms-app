"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/app/lib/supabase";

interface Assignment {
  id: string;
  lesson_id: string;
  title: string;
  description: string | null;
}

interface Question {
  id: string;
  assignment_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
    marks: number;

}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<
  Record<string, string>
>({});
const [scores, setScores] = useState<
  Record<string, number>
>({});

const [submitted, setSubmitted] = useState<
  Record<string, boolean>
>({});

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    //----------------------------------
    // Completed lessons
    //----------------------------------

    const { data: progressRows } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("student_id", user.id)
      .eq("completed", true);

    if (!progressRows?.length) {
      setLoading(false);
      return;
    }

    const lessonIds = progressRows.map(
      (row) => row.lesson_id
    );

    //----------------------------------
    // Assignments
    //----------------------------------

    const { data: assignmentRows } = await supabase
      .from("assignments")
      .select("*")
      .in("lesson_id", lessonIds);

    if (!assignmentRows?.length) {
      setLoading(false);
      return;
    }

    setAssignments(assignmentRows);

    //----------------------------------
    // Questions
    //----------------------------------

    const assignmentIds = assignmentRows.map(
      (a) => a.id
    );

    const { data: questionRows } = await supabase
      .from("assignment_questions")
      .select("*")
      .in("assignment_id", assignmentIds);

    setQuestions(questionRows ?? []);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600">
        Loading assignments...
      </div>
    );
  }

  if (!assignments.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        Complete lessons to unlock assignments.
      </div>
    );
  }
function handleAnswer(
  questionId: string,
  answer: string
) {
  setAnswers((prev) => ({
    ...prev,
    [questionId]: answer,
  }));
}

function getOptionClass(
  question: Question,
  option: string,
  assignmentId: string
) {
  // Before submission, use normal styling
  if (!submitted[assignmentId]) {
    return "border-gray-300 hover:bg-gray-50";
  }

  const selected = answers[question.id];

  // Correct answer
  if (option === question.correct_answer) {
    return "border-green-600 bg-green-100 text-green-800";
  }

  // Wrong option selected
  if (
    option === selected &&
    selected !== question.correct_answer
  ) {
    return "border-red-600 bg-red-100 text-red-800";
  }

  // All other options
  return "border-gray-300 bg-white";
}


function gradeAssignment(
  assignmentId: string
) {
  const assignmentQuestions = questions.filter(
    (question) =>
      question.assignment_id === assignmentId
  );

  if (!assignmentQuestions.length) return;

  //-----------------------------------
  // Ensure every question is answered
  //-----------------------------------

  const unanswered = assignmentQuestions.find(
    (question) => !answers[question.id]
  );

  if (unanswered) {
    toast.error(
      "Please answer every question."
    );
    return;
  }

  //-----------------------------------
  // Calculate score
  //-----------------------------------

  let score = 0;

  assignmentQuestions.forEach((question) => {
    if (
      answers[question.id] ===
      question.correct_answer
    ) {
      score += question.marks ?? 1;
    }
  });
  

  //-----------------------------------
  // Save locally
  //-----------------------------------

  setScores((prev) => ({
    ...prev,
    [assignmentId]: score,
  }));

  setSubmitted((prev) => ({
    ...prev,
    [assignmentId]: true,
  }));

  toast.success(
    `You scored ${score}/${assignmentQuestions.length}`
  );
}

  return (
    <div className="space-y-8 text-gray-600">

      <h1 className="text-3xl font-bold">
        My Assignments
      </h1>

      {assignments.map((assignment) => {

        const assignmentQuestions =
          questions.filter(
            (q) =>
              q.assignment_id === assignment.id
          );

        return (

          <div
            key={assignment.id}
            className="rounded-xl border bg-white p-6 shadow"
          >

            <h2 className="text-2xl font-semibold">
              {assignment.title}
            </h2>

            <p className="mb-6 text-gray-500">
              {assignment.description}
            </p>

            {assignmentQuestions.map((question) => (

              <div
                key={question.id}
                className="mb-8"
              >
                <h3 className="mb-4 font-medium">
                  {question.question}
                </h3>

                <div className="space-y-3">

                  {/* <label className="flex gap-3 rounded-lg border p-3"> */}
                  <label
  className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
    question,
    "A",
    assignment.id
  )}`}
>
                    <input
                      type="radio"
                      name={question.id}
                        disabled={submitted[assignment.id]}
                       value="A"
    checked={answers[question.id] === "A"}
    onChange={() =>
      handleAnswer(question.id, "A")
    }
                    />
                    {question.option_a}
                  </label>

                  {/* <label className="flex gap-3 rounded-lg border p-3"> */}
                  <label
  className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
    question,
    "B",
    assignment.id
  )}`}
>
                    <input
                      type="radio"
                      name={question.id}
                        disabled={submitted[assignment.id]}
                      value="B"
    checked={answers[question.id] === "B"}
    onChange={() =>
      handleAnswer(question.id, "B")
    }
                    />
                    {question.option_b}
                  </label>

                  {/* <label className="flex gap-3 rounded-lg border p-3"> */}
                  <label
  className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
    question,
    "C",
    assignment.id
  )}`}
>
                    <input
                      type="radio"
                      name={question.id}
                        disabled={submitted[assignment.id]}
                       value="C"
    checked={answers[question.id] === "C"}
    onChange={() =>
      handleAnswer(question.id, "C")
    }
                    />
                    {question.option_c}
                  </label>

                  {/* <label className="flex gap-3 rounded-lg border p-3"> */}
                  <label
  className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
    question,
    "D",
    assignment.id
  )}`}
>
                    <input
                      type="radio"
                        disabled={submitted[assignment.id]}
                      name={question.id}
                       value="D"
    checked={answers[question.id] === "D"}
    onChange={() =>
      handleAnswer(question.id, "D")
    }

                    />
                    {question.option_d}
                  </label>

                </div>
                
              </div>

            ))}
<button
  onClick={() =>
    gradeAssignment(assignment.id)
  }
  disabled={submitted[assignment.id]}
  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
>
  {submitted[assignment.id]
    ? "Submitted"
    : "Submit Assignment"}
</button>

{submitted[assignment.id] && (
  <div className="mt-4 rounded-lg bg-green-50 p-4">

    <p className="font-semibold text-green-700">

      Score: {scores[assignment.id]} / {
        questions.filter(
          (q) =>
            q.assignment_id === assignment.id
        ).length
      }

    </p>

  </div>
)}


          </div>

        );

      })}
 
 
    </div>
  );
}


// "use client";
// import { submitAssignment } from "@/app/lib/submitAssignment";
// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";
// import toast from "react-hot-toast";

// interface Assignment {
//   id: string;
//   lesson_id: string;
//   question: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_answer: string;
// }

// export default function AssignmentsPage() {
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [loading, setLoading] = useState(true);

// //   const [answers, setAnswers] = useState<
// //     Record<string, string>
// //   >({});
// const [answers, setAnswers] = useState<string[]>([]);

//   const [submitted, setSubmitted] = useState<
//     Record<string, boolean>
//   >({});

//   useEffect(() => {
//     loadAssignments();
//   }, []);

//   async function loadAssignments() {
//     setLoading(true);

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     //----------------------------------------
//     // Completed lessons
//     //----------------------------------------

//     const { data: progressRows } = await supabase
//       .from("lesson_progress")
//       .select("lesson_id")
//       .eq("student_id", user.id)
//       .eq("completed", true);

//     if (!progressRows?.length) {
//       setAssignments([]);
//       setLoading(false);
//       return;
//     }

//     const lessonIds = progressRows.map(
//       (row) => row.lesson_id
//     );

//     //----------------------------------------
//     // Assignments for those lessons
//     //----------------------------------------

//     const { data } = await supabase
//       .from("assignments")
//       .select("*")
//       .in("lesson_id", lessonIds)
//       .order("created_at");

//     setAssignments(data ?? []);
// function handleAnswer(index: number, answer: string) {
//   const updated = [...answers];
//   updated[index] = answer;
//   setAnswers(updated);
// }

    
//     //----------------------------------------
//     // Already submitted assignments
//     //----------------------------------------

//     const { data: submissions } = await supabase
//       .from("assignment_submissions")
//       .select("assignment_id")
//       .eq("student_id", user.id);

//     const completed: Record<string, boolean> = {};

//     submissions?.forEach((item) => {
//       completed[item.assignment_id] = true;
//     });

//     setSubmitted(completed);

//     setLoading(false);
//   }

//   async function submitAssignment(
//     assignment: Assignment
//   ) {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return;

//     const answer = answers[assignment.id];

//     if (!answer) {
//       toast.error("Please choose an answer.");
//       return;
//     }

//     const isCorrect =
//       answer === assignment.correct_answer;

//     const { error } = await supabase
//       .from("assignment_submissions")
//       .upsert(
//         {
//           assignment_id: assignment.id,
//           student_id: user.id,
//           answer,
//           is_correct: isCorrect,
//         },
//         {
//           onConflict: "assignment_id,student_id",
//         }
//       );

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success(
//       isCorrect
//         ? "Correct answer!"
//         : "Submitted successfully."
//     );

//     setSubmitted((prev) => ({
//       ...prev,
//       [assignment.id]: true,
//     }));
//   }

//   if (loading) {
//     return (
//       <div className="py-10 text-center text-gray-500">
//         Loading assignments...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">

//       <h1 className="text-3xl font-bold text-gray-700">
//         My Assignments
//       </h1>

//       {assignments.length === 0 && (
//         <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
//           Complete a lesson to unlock assignments.
//         </div>
//       )}

//       {assignments.map((assignment) => (
//         <div
//           key={assignment.id}
//           className="rounded-xl border bg-white p-6 shadow-sm"
//         >
//           <h2 className="mb-6 text-lg font-semibold">
//             {assignment.question}
//           </h2>

//           <div className="space-y-3">

//             {[
//               {
//                 key: "A",
//                 value: assignment.option_a,
//               },
//               {
//                 key: "B",
//                 value: assignment.option_b,
//               },
//               {
//                 key: "C",
//                 value: assignment.option_c,
//               },
//               {
//                 key: "D",
//                 value: assignment.option_d,
//               },
//             ].map((option) => (
//               <label
//                 key={option.key}
//                 className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
//               >
//                 <input
//                   type="radio"
//                   name={assignment.id}
//                   value={option.key}
//                   onChange={() => handleAnswer(index, "A")}
//                   disabled={
//                     submitted[assignment.id]
//                   }
//                   checked={
//                     answers[assignment.id] ===
//                     option.key
//                   }
//                   onChange={(e) =>
//                     setAnswers((prev) => ({
//                       ...prev,
//                       [assignment.id]:
//                         e.target.value,
//                     }))
//                   }
//                 />

//                 {option.value}
//               </label>
//             ))}

//           </div>

//           {/* <button
//             onClick={() =>
//               submitAssignment(assignment)
//             }
//             disabled={submitted[assignment.id]}
//             className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//           >
//             {submitted[assignment.id]
//               ? "Submitted"
//               : "Submit Answer"}
//           </button> */}
//           <button
//   onClick={async () => {
//     const result = await submitAssignment(
//       lessonId,
//       answers
//     );

//     if (!result) return;

//     alert(
//       `You scored ${result.score}/${result.total}`
//     );
//   }}
//   className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
// >
//   Submit Assignment
// </button>
//         </div>
//       ))}
//     </div>
//   );
// }