"use client";
import AnswerReview from "@/app/components/Quiz/AnswerReview";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import QuizHeader from "@/app/components/Quiz/QuizHeader";
import ProgressBar from "@/app/components/Quiz/ProgressBar";
import Timer from "@/app/components/Quiz/QuizzTimer";
import QuestionCard from "@/app/components/Quiz/QuestionCard";
import ResultCard from "@/app/components/Quiz/ResultCard";
import toast from "react-hot-toast";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  time_limit: number;
  total_marks: number;
}

interface Question {
  id: string;
  quiz_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string | null;
  marks: number;
}

export default function QuizPage() {
  const params = useParams();

  console.log("Params:", params);

  const quizId =
    typeof params.quizId === "string"
      ? params.quizId
      : "";

  console.log("Quiz ID:", quizId);

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

const [score, setScore] = useState(0);

const [percentage, setPercentage] = useState(0);

const [grade, setGrade] = useState("");

  const [answers, setAnswers] = useState<
    Record<string, string>
  >({});

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!quizId) return;

    loadQuiz();
  }, [quizId]);

  async function loadQuiz() {
    try {
      setLoading(true);

      console.log("Loading quiz:", quizId);

      //------------------------------------
      // Load quiz
      //------------------------------------

      const {
        data: quizData,
        error: quizError,
      } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", quizId)
        .single();

      console.log("Quiz Data:", quizData);
      console.log("Quiz Error:", quizError);

      if (quizError) {
        throw quizError;
      }

      setQuiz(quizData);

      //------------------------------------
      // Load questions
      //------------------------------------

      const {
        data: questionData,
        error: questionError,
      } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId)
        .order("created_at", {
          ascending: true,
        });

      console.log("Questions:", questionData);
      console.log(
        "Question Error:",
        questionError
      );

      if (questionError) {
        throw questionError;
      }

      setQuestions(questionData ?? []);

      setTimeLeft(
        (quizData.time_limit ?? 15) * 60
      );
    } catch (error) {
      console.error(
        "LOAD QUIZ FAILED:",
        error
      );
    } finally {
      setLoading(false);
    }
  }
  function calculateGrade(percent: number) {
  if (percent >= 75) return "A";

  if (percent >= 60) return "B";

  if (percent >= 50) return "C";

  if (percent >= 40) return "E";

    if (percent <= 39) return "F";


  return "F";
}
  async function submitQuiz() {
  if (!quiz) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  let earnedMarks = 0;

  let totalMarks = 0;

  questions.forEach((question) => {
    totalMarks += question.marks;

    if (
      answers[question.id] ===
      question.correct_answer
    ) {
      earnedMarks += question.marks;
    }
  });

  const percent =
    Math.round(
      (earnedMarks / totalMarks) * 100
    ) || 0;

  const grade = calculateGrade(percent);

  //---------------------------------------
  // Prevent multiple submissions
  //---------------------------------------

  const { data: existing } =
    await supabase
      .from("quiz_submissions")
      .select("id")
      .eq("student_id", user.id)
      .eq("quiz_id", quiz.id)
      .maybeSingle();

  if (existing) {
    toast.error("You already submitted this quiz.");
    return;
  }

  //---------------------------------------
  // Save Submission
  //---------------------------------------

  const { data: submission, error } =
    await supabase
      .from("quiz_submissions")
      .insert({
        student_id: user.id,
        quiz_id: quiz.id,
        score: earnedMarks,
        total_marks: totalMarks,
        percentage: percent,
        grade,
        time_taken:
          quiz.time_limit * 60 - timeLeft,
      })
      .select()
      .single();

  if (error || !submission) {
    toast.error("Failed to save quiz.");
    console.log(error);
    return;
  }

  //---------------------------------------
  // Save Answers
  //---------------------------------------

  const answerRows = questions.map(
    (question) => ({
      submission_id: submission.id,

      question_id: question.id,

      selected_answer:
        answers[question.id] ?? null,

      is_correct:
        answers[question.id] ===
        question.correct_answer,
    })
  );

  await supabase
    .from("quiz_answers")
    .insert(answerRows);

  //---------------------------------------

  setScore(earnedMarks);

  setPercentage(percent);

  setGrade(grade);

  setQuizFinished(true);

  toast.success("Quiz submitted!");
}

  // useEffect(() => {
  //   if (loading) return;

  //   if (timeLeft <= 0) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [loading, timeLeft]);
  useEffect(() => {
  if (loading || quizFinished) return;

  if (timeLeft <= 0) {
    submitQuiz();
  
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);

}, [loading, quizFinished, timeLeft]);

  if (loading) {
    return (
      <div className="py-24 text-center text-xl text-gray-600">
        Loading Quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="py-24 text-center text-xl">
        Quiz not found.
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="py-24 text-center text-xl">
        No questions found.
      </div>
    );
  }

  const question = questions[currentQuestion];
//   if (quizFinished) {

//   return (

//     <ResultCard
//       score={score}
//       total={quiz.total_marks}
//       percentage={percentage}
//       grade={grade}
//     />

//   );
//  <AnswerReview
//         questions={questions}
//         answers={answers}
//       />

// }

if (quizFinished) {
  return (
    <div className="space-y-8">

      <ResultCard
        score={score}
        total={quiz.total_marks}
        percentage={percentage}
        grade={grade}
      />

      <AnswerReview
        questions={questions}
        answers={answers}
      />

    </div>
  );
}

  return (
    <div className="mx-auto max-w-5xl space-y-8 text-gray-500">

      <QuizHeader
        title={quiz.title}
        description={quiz.description}
      />

      <div className="flex items-center justify-between">

        <ProgressBar
          current={currentQuestion + 1}
          total={questions.length}
        />

        <Timer seconds={timeLeft} />

      </div>

      <QuestionCard
        question={question}
        answer={answers[question.id]}
        onSelect={(value) =>
          setAnswers((prev) => ({
            ...prev,
            [question.id]: value,
          }))
        }
      />

      <div className="flex justify-between">

        <button
          disabled={currentQuestion === 0}
          onClick={() =>
            setCurrentQuestion((prev) => prev - 1)
          }
          className="rounded-lg bg-gray-200 px-6 py-3 disabled:opacity-40 text-gray-600"
        >
          Previous
        </button>

        {/* <button
          disabled={
            currentQuestion ===
            questions.length - 1
          }
          onClick={() =>
            setCurrentQuestion((prev) => prev + 1)
          }
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
        >
          Next
        </button> */}
        <button
  onClick={() => {

    if (
      currentQuestion ===
      questions.length - 1
    ) {

      submitQuiz();

    } else {

      setCurrentQuestion((prev) => prev + 1);

    }

  }}
  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
>

  {currentQuestion ===
  questions.length - 1
    ? "Submit Quiz"
    : "Next"}

</button>

      </div>

    </div>
  );
}

// "use client";

// export default function QuizPage() {
//   return (
//     <div className="p-10">
//       <h1>Quiz Page Works 🎉</h1>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { supabase } from "@/app/lib/supabase";

// import QuizHeader from "@/app/components/Quiz/QuizHeader";
// import ProgressBar from "@/app/components/Quiz/ProgressBar";
// import Timer from "@/app/components/Quiz/QuizzTimer";
// import QuestionCard from "@/app/components/Quiz/QuestionCard";

// interface Quiz {
//   id: string;
//   title: string;
//   description: string | null;
//   time_limit: number;
//   total_marks: number;
// }

// interface Question {
//   id: string;
//   quiz_id: string;
//   question: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_answer: string;
//   explanation: string | null;
//   marks: number;
// }

// export default function QuizPage() {
//   const params = useParams();

//   const quizId =
//     typeof params.quizId === "string"
//       ? params.quizId
//       : "";
//       console.log("Params:", params);
// console.log("Quiz ID:", quizId);

//   const [loading, setLoading] = useState(true);

//   const [quiz, setQuiz] = useState<Quiz | null>(null);

//   const [questions, setQuestions] = useState<Question[]>([]);

//   const [currentQuestion, setCurrentQuestion] =
//     useState(0);

//   const [answers, setAnswers] = useState<
//     Record<string, string>
//   >({});

//   const [timeLeft, setTimeLeft] = useState(0);

//   //------------------------------------------
//   // Load Quiz
//   //------------------------------------------

//   useEffect(() => {
//     if (!quizId) return;

//     loadQuiz();
//   }, [quizId]);

// async function loadQuiz() {
//   console.log("Loading quiz:", quizId);

//   setLoading(true);

//   //----------------------------------
//   // Load Quiz
//   //----------------------------------

//   const { data: quizData, error: quizError } =
//     await supabase
//       .from("quizzes")
//       .select("*")
//       .eq("id", quizId)
//       .single();

//   console.log("Quiz Data:", quizData);
//   console.log("Quiz Error:", quizError);

//   if (quizError) {
//     setLoading(false);
//     return;
//   }

//   setQuiz(quizData);

//   //----------------------------------
//   // Load Questions
//   //----------------------------------

//   const {
//     data: questionData,
//     error: questionError,
//   } = await supabase
//     .from("quiz_questions")
//     .select("*")
//     .eq("quiz_id", quizId);

//   console.log("Questions:", questionData);
//   console.log("Question Error:", questionError);

//   setQuestions(questionData ?? []);

//   setTimeLeft((quizData.time_limit ?? 15) * 60);

//   setLoading(false);
// }



// //   async function loadQuiz() {
// //     setLoading(true);

// //     const { data: quizData, error } =
// //       await supabase
// //         .from("quizzes")
// //         .select("*")
// //         .eq("id", quizId)
// //         .single();

// //     if (error) {
// //       console.log(error);
// //       setLoading(false);
// //       return;
// //     }

// //     setQuiz(quizData);

// //     const { data: questionData } =
// //       await supabase
// //         .from("quiz_questions")
// //         .select("*")
// //         .eq("quiz_id", quizId)
// //         .order("created_at", {
// //           ascending: true,
// //         });

// //     setQuestions(questionData ?? []);

// //     setTimeLeft(quizData.time_limit * 60);

// //     setLoading(false);
// //   }

//   //------------------------------------------
//   // Timer
//   //------------------------------------------

//   useEffect(() => {
//     if (loading) return;

//     if (timeLeft <= 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [loading, timeLeft]);

//   //------------------------------------------

//   if (loading) {
//     return (
//       <div className="py-24 text-center text-xl">
//         Loading Quiz...
//       </div>
//     );
//   }

//   if (!quiz) {
//     return (
//       <div className="py-24 text-center text-xl">
//         Quiz not found.
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return (
//       <div className="py-24 text-center text-xl">
//         No questions found.
//       </div>
//     );
//   }

//   const question = questions[currentQuestion];

//   //------------------------------------------
// if (!loading){
//   return (
//     <div className="mx-auto max-w-5xl space-y-8">

//       <QuizHeader
//         title={quiz.title}
//         description={quiz.description}
//       />

//       <div className="flex items-center justify-between">

//         <ProgressBar
//           current={currentQuestion + 1}
//           total={questions.length}
//         />

//         <Timer seconds={timeLeft} />

//       </div>

//       <QuestionCard
//         question={question}
//         answer={answers[question.id]}
//         onSelect={(value) =>
//           setAnswers((prev) => ({
//             ...prev,
//             [question.id]: value,
//           }))
//         }
//       />

//       <div className="flex justify-between">

//         <button
//           disabled={currentQuestion === 0}
//           onClick={() =>
//             setCurrentQuestion((prev) => prev - 1)
//           }
//           className="rounded-lg bg-gray-200 px-6 py-3 disabled:opacity-40"
//         >
//           Previous
//         </button>

//         <button
//           disabled={
//             currentQuestion ===
//             questions.length - 1
//           }
//           onClick={() =>
//             setCurrentQuestion((prev) => prev + 1)
//           }
//           className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// }
// }




























// // "use client";
// // import toast from "react-hot-toast";
// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { supabase } from "@/app/lib/supabase";

// // interface Quiz {
// //   id: string;
// //   title: string;
// //   description: string | null;
// //   time_limit: number;
// //   total_marks: number;
// // }

// // interface Question {
// //   id: string;
// //   quiz_id: string;
// //   question: string;
// //   option_a: string;
// //   option_b: string;
// //   option_c: string;
// //   option_d: string;
// //   correct_answer: string;
// //   marks: number;
// //   explanation: string | null;
// // }

// // export default function QuizPage() {
// // //   const params = useParams();

// // //   const quizId = params.quizId as string;
// // //   console.log("Quiz ID:", quizId);
// // const params = useParams();

// // const quizId =
// //   typeof params.quizId === "string"
// //     ? params.quizId
// //     : "";

// //   const [quiz, setQuiz] = useState<Quiz | null>(null);
// //   const [questions, setQuestions] = useState<Question[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [timeLeft, setTimeLeft] = useState(0);

// // const [quizStarted, setQuizStarted] = useState(false);
// // const [quizFinished, setQuizFinished] = useState(false);

// // const [finalScore, setFinalScore] = useState(0);

// // const [totalMarks, setTotalMarks] = useState(0);

// // const [percentage, setPercentage] = useState(0);

// // const [answers, setAnswers] = useState<
// //   Record<string, string>
// // >({});

// //   useEffect(() => {
// //       if (!quizId) return;

// //     loadQuiz();
// //   }, [quizId]);
// // //   useEffect(() => {
// // //   if (!quizStarted || quizFinished) return;

// // // //   if (timeLeft <= 0) {
// // // //     return;
// // // //   }


// // //   const timer = setInterval(() => {
// // //     setTimeLeft((prev) => prev - 1);
// // //   }, 1000);

// // //   return () => clearInterval(timer);

// // // }, [quizStarted, timeLeft]);

// // useEffect(() => {
// //   if (!quizStarted || quizFinished) return;

// //   if (timeLeft <= 0) {
// //     submitQuiz();
// //     return;
// //   }

// //   const timer = setInterval(() => {
// //     setTimeLeft((prev) => prev - 1);
// //   }, 1000);

// //   return () => clearInterval(timer);

// // }, [quizStarted, quizFinished, timeLeft]);

// //   async function loadQuiz() {
// //      if (!quizId) return;

// //   console.log("Loading quiz:", quizId);
// //     setLoading(true);

// //     //----------------------------------
// //     // Load Quiz
// //     //----------------------------------

// //     const { data: quizData } = await supabase
// //       .from("quizzes")
// //       .select("*")
// //       .eq("id", quizId)
// //       .single();

// //     setQuiz(quizData);

// //     //----------------------------------
// //     // Load Questions
// //     //----------------------------------

// //     const { data: questionData } = await supabase
// //       .from("quiz_questions")
// //       .select("*")
// //       .eq("quiz_id", quizId);

// //     setQuestions(questionData ?? []);
// //     if (quizData) {
// //   setTimeLeft(quizData.time_limit * 60);
// //   setQuizStarted(true);
// // }

// //     setLoading(false);
// //   }
// //   async function submitQuiz() {
// //   if (!quiz) return;

// //   const {
// //     data: { user },
// //   } = await supabase.auth.getUser();

// //   if (!user) return;

// //   let score = 0;
// //   let marks = 0;

// //   questions.forEach((question) => {
// //     marks += question.marks;

// //     if (
// //       answers[question.id] ===
// //       question.correct_answer
// //     ) {
// //       score += question.marks;
// //     }
// //   });

// //   const percent =
// //     marks === 0
// //       ? 0
// //       : Math.round((score / marks) * 100);

// //   //----------------------------------
// //   // Save quiz submission
// //   //----------------------------------
// // const { data: existing } = await supabase
// //   .from("quiz_submissions")
// //   .select("id")
// //   .eq("quiz_id", quiz.id)
// //   .eq("student_id", user.id)
// //   .maybeSingle();

// // if (existing) {
// //   toast.error(
// //     "You have already taken this quiz."
// //   );
// //   return;
// // }
// //   const { error } = await supabase
// //     .from("quiz_submissions")
// //     .insert({
// //       quiz_id: quiz.id,
// //       student_id: user.id,
// //       score,
// //       total_marks: marks,
// //       percentage: percent,
// //     });

// //   if (error) {
// //     toast.error(error.message);
// //     return;
// //   }

// //   //----------------------------------
// //   // Save every answer
// //   //----------------------------------

// //   const answerRows = questions.map(
// //     (question) => ({
// //       quiz_id: quiz.id,
// //       question_id: question.id,
// //       student_id: user.id,
// //       selected_answer:
// //         answers[question.id] ?? null,
// //       is_correct:
// //         answers[question.id] ===
// //         question.correct_answer,
// //     })
// //   );

// //   await supabase
// //     .from("quiz_answers")
// //     .insert(answerRows);

// //   setFinalScore(score);

// //   setTotalMarks(marks);

// //   setPercentage(percent);

// //   setQuizFinished(true);

// //   toast.success("Quiz submitted!");
// // }
// // // if (timeLeft <= 0) {
// // //   submitQuiz();
// // //   return;
// // // }

// //   if (loading) {
// //     return (
// //       <div className="py-20 text-center">
// //         Loading Quiz...
// //       </div>
// //     );
// //   }

// //   if (!quiz) {
// //     return (
// //       <div className="py-20 text-center">
// //         Quiz not found.
// //       </div>
// //     );
// //   }
// //   const question = questions[currentQuestion];
// //   const minutes = Math.floor(timeLeft / 60);

// // const seconds = timeLeft % 60;
// // const progress =
// //   ((currentQuestion + 1) /
// //     questions.length) *
// //   100;
// //   if (quizFinished) {
// //   return (
// //     <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 shadow">

// //       <h1 className="mb-8 text-center text-4xl font-bold text-green-600">

// //         Quiz Completed 🎉

// //       </h1>

// //       <div className="space-y-6">

// //         <div className="rounded-xl bg-blue-50 p-6">

// //           <h2 className="text-xl font-semibold">

// //             Final Score

// //           </h2>

// //           <p className="mt-2 text-5xl font-bold text-blue-700">

// //             {finalScore} / {totalMarks}

// //           </p>

// //         </div>

// //         <div className="rounded-xl bg-green-50 p-6">

// //           <h2 className="text-xl font-semibold">

// //             Percentage

// //           </h2>

// //           <p className="mt-2 text-5xl font-bold text-green-700">

// //             {percentage}%

// //           </p>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// //   return (
// //     <div className="mx-auto max-w-4xl">

// //       <h1 className="text-4xl font-bold text-gray-700">
// //         {quiz.title}
// //       </h1>

// //       <p className="mt-3 text-gray-500">
// //         {quiz.description}
// //       </p>

// //       {/* <div className="mt-8 rounded-xl bg-white p-8 shadow">

// //         <h2 className="text-xl font-semibold">
// //           {questions.length} Questions
// //         </h2>

// //         <p className="mt-2">
// //           Time Limit: {quiz.time_limit} minutes
// //         </p>

// //         <p>
// //           Total Marks: {quiz.total_marks}
// //         </p>

// //       </div> */}
// //       <div className="mt-8 rounded-xl bg-white p-8 shadow">
// // <div className="mb-8">

// //   <div className="mb-4 flex items-center justify-between">

// //     <div>

// //       <h2 className="text-2xl font-bold">

// //         Question {currentQuestion + 1}

// //       </h2>

// //       <p className="text-gray-500">

// //         of {questions.length}

// //       </p>

// //     </div>

// //     <div
// //       className={`rounded-xl px-5 py-3 font-bold text-white

// //       ${
// //         timeLeft <= 60
// //           ? "bg-red-600"
// //           : "bg-blue-600"
// //       }`}
// //     >

// //       {minutes}:
// //       {seconds
// //         .toString()
// //         .padStart(2, "0")}

// //     </div>

// //   </div>

// //   <div className="h-3 overflow-hidden rounded-full bg-gray-200">

// //     <div
// //       className="h-full rounded-full bg-blue-600 transition-all duration-500"
// //       style={{
// //         width: `${progress}%`,
// //       }}
// //     />

// //   </div>

// // </div>
// //   {/* <div className="mb-6 flex items-center justify-between">

// //     <h2 className="text-xl font-bold">

// //       Question {currentQuestion + 1} of{" "}
// //       {questions.length}

// //     </h2>

// //     <span className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700">

// //       {quiz.time_limit} mins

// //     </span>

// //   </div> */}

// //   <h3 className="mb-8 text-2xl font-semibold text-gray-700">

// //     {question?.question}

// //   </h3>

// //   <div className="space-y-4">

// //     {[
// //       {
// //         key: "A",
// //         text: question?.option_a,
// //       },
// //       {
// //         key: "B",
// //         text: question?.option_b,
// //       },
// //       {
// //         key: "C",
// //         text: question?.option_c,
// //       },
// //       {
// //         key: "D",
// //         text: question?.option_d,
// //       },
// //     ].map((option) => (

// //       <label
// //         key={option.key}
// //         className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition

// //         ${
// //           answers[question.id] === option.key
// //             ? "border-blue-600 bg-blue-50"
// //             : "hover:bg-gray-50"
// //         }`}
// //       >

// //         <input
// //           type="radio"
// //           name={question.id}
// //           value={option.key}
// //           checked={
// //             answers[question.id] === option.key
// //           }
// //           onChange={() =>
// //             setAnswers((prev) => ({
// //               ...prev,
// //               [question.id]: option.key,
// //             }))
// //           }
// //         />

// //         {option.text}

// //       </label>

// //     ))}

// //   </div>

// // </div>
// // <div className="mt-8 flex justify-between">

// //   <button
// //     disabled={currentQuestion === 0}
// //     onClick={() =>
// //       setCurrentQuestion((prev) => prev - 1)
// //     }
// //     className="rounded-lg bg-gray-200 px-6 py-3 disabled:opacity-40"
// //   >
// //     Previous
// //   </button>

// //   <button
// //     // disabled={
// //     //   currentQuestion === questions.length - 1
// //     // }
// //     disabled={false}
// //     // onClick={() =>
// //     //   setCurrentQuestion((prev) => prev + 1)
// //     // }
// //     onClick={() => {

// // if (
// // currentQuestion ===
// // questions.length - 1
// // ) {

// // submitQuiz();

// // } else {

// // setCurrentQuestion((prev) => prev + 1);

// // }

// // }}
// //     className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-40"
// //   >
// //     {currentQuestion ===
// // questions.length - 1
// // ? "Submit Quiz"
// // : "Next"}
// //     {/* Next */}
// //   </button>

// // </div>

// //     </div>
// //   );
// // }