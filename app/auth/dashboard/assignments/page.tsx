"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/app/lib/supabase";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  BookOpen,
  Send,
  Clock3,
  CircleHelp,
} from "lucide-react";

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

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [scores, setScores] = useState<Record<string, number>>({});

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

    // ----------------------------------
    // Completed lessons
    // ----------------------------------

    const { data: progressRows } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("student_id", user.id)
      .eq("completed", true);

    if (!progressRows?.length) {
      setAssignments([]);
      setLoading(false);
      return;
    }

    const lessonIds = progressRows.map(
      (row) => row.lesson_id
    );

    // ----------------------------------
    // Assignments
    // ----------------------------------

    const { data: assignmentRows } = await supabase
      .from("assignments")
      .select("*")
      .in("lesson_id", lessonIds);

    if (!assignmentRows?.length) {
      setAssignments([]);
      setLoading(false);
      return;
    }

    setAssignments(assignmentRows);

    // ----------------------------------
    // Questions
    // ----------------------------------

    const assignmentIds = assignmentRows.map(
      (assignment) => assignment.id
    );

    const { data: questionRows } = await supabase
      .from("assignment_questions")
      .select("*")
      .in("assignment_id", assignmentIds);

    setQuestions(questionRows ?? []);

    setLoading(false);
  }

  // ----------------------------------
  // Handle answer
  // ----------------------------------

  function handleAnswer(
    questionId: string,
    answer: string
  ) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  // ----------------------------------
  // Option styling
  // ----------------------------------

  function getOptionClass(
    question: Question,
    option: string,
    assignmentId: string
  ) {
    // Before submission
    if (!submitted[assignmentId]) {
      if (answers[question.id] === option) {
        return `
          border-blue-400/60
          bg-gradient-to-r
          from-blue-600/20
          via-cyan-500/10
          to-purple-600/20
          text-white
          shadow-[0_0_20px_rgba(59,130,246,0.18)]
          scale-[1.01]
        `;
      }

      return `
        border-white/10
        bg-slate-900/60
        text-slate-300
        hover:border-cyan-400/40
        hover:bg-gradient-to-r
        hover:from-blue-600/10
        hover:via-cyan-500/10
        hover:to-purple-600/10
        hover:text-white
        hover:scale-[1.01]
        hover:shadow-[0_0_20px_rgba(34,211,238,0.10)]
      `;
    }

    const selected = answers[question.id];

    // Correct answer
    if (option === question.correct_answer) {
      return `
        border-emerald-400/50
        bg-emerald-500/10
        text-emerald-300
        shadow-[0_0_20px_rgba(16,185,129,0.15)]
      `;
    }

    // Wrong selected answer
    if (
      option === selected &&
      selected !== question.correct_answer
    ) {
      return `
        border-red-400/50
        bg-red-500/10
        text-red-300
        shadow-[0_0_20px_rgba(239,68,68,0.15)]
      `;
    }

    // Other options
    return `
      border-white/5
      bg-slate-950/40
      text-slate-500
    `;
  }

  // ----------------------------------
  // Grade assignment
  // ----------------------------------

  function gradeAssignment(
    assignmentId: string
  ) {
    const assignmentQuestions =
      questions.filter(
        (question) =>
          question.assignment_id === assignmentId
      );

    if (!assignmentQuestions.length) return;

    // ----------------------------------
    // Ensure every question is answered
    // ----------------------------------

    const unanswered =
      assignmentQuestions.find(
        (question) => !answers[question.id]
      );

    if (unanswered) {
      toast.error(
        "Please answer every question."
      );
      return;
    }

    // ----------------------------------
    // Calculate score
    // ----------------------------------

    let score = 0;

    assignmentQuestions.forEach((question) => {
      if (
        answers[question.id] ===
        question.correct_answer
      ) {
        score += question.marks ?? 1;
      }
    });

    // ----------------------------------
    // Save score locally
    // ----------------------------------

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

  // ----------------------------------
  // Loading
  // ----------------------------------

  if (loading) {
    return (
      <main className="lms-background relative min-h-screen overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-40 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-400/20 bg-slate-950/80 shadow-[0_0_35px_rgba(59,130,246,0.20)] backdrop-blur-xl">
              <ClipboardList
                size={34}
                className="animate-pulse text-cyan-400"
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Loading assignments
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your learning activities...
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

  // ----------------------------------
  // Empty state
  // ----------------------------------

  if (!assignments.length) {
    return (
      <main className="lms-background relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative flex min-h-[65vh] items-center justify-center px-4">
          <div className="lms-glass animate-fade-up w-full max-w-xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20 shadow-[0_0_35px_rgba(59,130,246,0.15)]">
              <BookOpen
                size={36}
                className="text-cyan-400"
              />
            </div>

            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles
                size={17}
                className="text-purple-400"
              />

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Keep Learning
              </span>

              <Sparkles
                size={17}
                className="text-blue-400"
              />
            </div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              No assignments yet
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
              Complete your lessons to unlock assignments
              and test what you have learned.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ----------------------------------
  // Main page
  // ----------------------------------

  return (
    <main className="lms-background relative min-h-screen overflow-hidden">
      {/* ================================
          AMBIENT BACKGROUND
      ================================= */}

      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[-180px] top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-180px] left-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* ================================
          CONTENT
      ================================= */}

      <div className="relative space-y-8">
        {/* =================================
            PAGE HEADER
        ================================= */}

        <section className="animate-fade-up">
          <div className="lms-glass relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-8">
            {/* Header glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20">
                    <ClipboardList
                      size={19}
                      className="text-cyan-400"
                    />
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Learning Center
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  My Assignments
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Test your knowledge, complete your
                  assignments, and track your learning
                  progress.
                </p>
              </div>

              {/* Assignment count */}
              <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 shadow-lg backdrop-blur-xl md:self-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                  <ClipboardList
                    size={21}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">
                    {assignments.length}
                  </p>

                  <p className="text-xs text-slate-500">
                    Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================
            ASSIGNMENTS
        ================================= */}

        <div className="space-y-8">
          {assignments.map(
            (assignment, assignmentIndex) => {
              const assignmentQuestions =
                questions.filter(
                  (question) =>
                    question.assignment_id ===
                    assignment.id
                );

              const isSubmitted =
                submitted[assignment.id];

              const score =
                scores[assignment.id] ?? 0;

              const totalQuestions =
                assignmentQuestions.length;

              const percentage =
                totalQuestions > 0
                  ? Math.round(
                      (score / totalQuestions) * 100
                    )
                  : 0;

              return (
                <section
                  key={assignment.id}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${
                      assignmentIndex * 120
                    }ms`,
                  }}
                >
                  <div className="lms-card group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-blue-400/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
                    {/* Top gradient line */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    {/* =================================
                        ASSIGNMENT HEADER
                    ================================= */}

                    <div className="relative border-b border-white/10 p-6 sm:p-8">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20 shadow-[0_0_25px_rgba(59,130,246,0.12)]">
                            <BookOpen
                              size={22}
                              className="text-cyan-400"
                            />
                          </div>

                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
                                Assignment{" "}
                                {assignmentIndex + 1}
                              </span>

                              {isSubmitted && (
                                <span className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                                  <CheckCircle2
                                    size={12}
                                  />
                                  Completed
                                </span>
                              )}
                            </div>

                            <h2 className="text-xl font-bold text-white sm:text-2xl">
                              {assignment.title}
                            </h2>

                            {assignment.description && (
                              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                                {
                                  assignment.description
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Question count */}
                        <div className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-400">
                          <CircleHelp
                            size={15}
                            className="text-purple-400"
                          />

                          {totalQuestions}{" "}
                          {totalQuestions === 1
                            ? "Question"
                            : "Questions"}
                        </div>
                      </div>
                    </div>

                    {/* =================================
                        QUESTIONS
                    ================================= */}

                    <div className="relative space-y-8 p-6 sm:p-8">
                      {assignmentQuestions.map(
                        (
                          question,
                          questionIndex
                        ) => (
                          <div
                            key={question.id}
                            className="relative"
                          >
                            {/* Question number */}
                            <div className="mb-4 flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-xs font-bold text-cyan-400">
                                {questionIndex + 1}
                              </div>

                              <h3 className="pt-1 text-sm font-semibold leading-6 text-white sm:text-base">
                                {question.question}
                              </h3>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 pl-0 sm:pl-11">
                              {[
                                {
                                  key: "A",
                                  value:
                                    question.option_a,
                                },
                                {
                                  key: "B",
                                  value:
                                    question.option_b,
                                },
                                {
                                  key: "C",
                                  value:
                                    question.option_c,
                                },
                                {
                                  key: "D",
                                  value:
                                    question.option_d,
                                },
                              ].map(
                                (option) => {
                                  const selected =
                                    answers[
                                      question.id
                                    ] ===
                                    option.key;

                                  const correct =
                                    isSubmitted &&
                                    option.key ===
                                      question.correct_answer;

                                  const wrong =
                                    isSubmitted &&
                                    selected &&
                                    option.key !==
                                      question.correct_answer;

                                  return (
                                    <label
                                      key={
                                        option.key
                                      }
                                      className={`group/option relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${getOptionClass(
                                        question,
                                        option.key,
                                        assignment.id
                                      )} ${
                                        isSubmitted
                                          ? "cursor-default"
                                          : "cursor-pointer"
                                      }`}
                                    >
                                      {/* Hover shine */}
                                      {!isSubmitted && (
                                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover/option:translate-x-full" />
                                      )}

                                      {/* Radio */}
                                      <input
                                        type="radio"
                                        name={
                                          question.id
                                        }
                                        value={
                                          option.key
                                        }
                                        disabled={
                                          isSubmitted
                                        }
                                        checked={
                                          selected
                                        }
                                        onChange={() =>
                                          handleAnswer(
                                            question.id,
                                            option.key
                                          )
                                        }
                                        className="relative z-10 h-4 w-4 accent-cyan-400"
                                      />

                                      {/* Letter */}
                                      <span
                                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${
                                          correct
                                            ? "bg-emerald-500/20 text-emerald-300"
                                            : wrong
                                              ? "bg-red-500/20 text-red-300"
                                              : selected
                                                ? "bg-cyan-400/20 text-cyan-300"
                                                : "bg-white/5 text-slate-500 group-hover/option:bg-cyan-400/10 group-hover/option:text-cyan-300"
                                        }`}
                                      >
                                        {
                                          option.key
                                        }
                                      </span>

                                      <span className="relative z-10 flex-1 text-sm leading-6">
                                        {
                                          option.value
                                        }
                                      </span>

                                      {/* Result icon */}
                                      {correct && (
                                        <CheckCircle2
                                          size={19}
                                          className="relative z-10 shrink-0 text-emerald-400"
                                        />
                                      )}

                                      {wrong && (
                                        <XCircle
                                          size={19}
                                          className="relative z-10 shrink-0 text-red-400"
                                        />
                                      )}
                                    </label>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )
                      )}

                      {/* =================================
                          SUBMIT AREA
                      ================================= */}

                      <div className="border-t border-white/10 pt-7">
                        {!isSubmitted ? (
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <Clock3
                                size={16}
                                className="text-cyan-400"
                              />

                              <span>
                                Answer all questions
                                before submitting
                              </span>
                            </div>

                            <button
                              onClick={() =>
                                gradeAssignment(
                                  assignment.id
                                )
                              }
                              className="group/submit relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(59,130,246,0.40)] sm:w-auto"
                            >
                              {/* Shine */}
                              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/submit:translate-x-full" />

                              <Send
                                size={17}
                                className="relative z-10 transition-transform duration-300 group-hover/submit:translate-x-1"
                              />

                              <span className="relative z-10">
                                Submit Assignment
                              </span>
                            </button>
                          </div>
                        ) : (
                          /* =================================
                              SCORE RESULT
                          ================================= */

                          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-blue-500/10 p-5 shadow-[0_0_30px_rgba(16,185,129,0.08)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />

                            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
                                  <Trophy
                                    size={24}
                                    className="text-emerald-400"
                                  />
                                </div>

                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
                                    Assignment Complete
                                  </p>

                                  <p className="mt-1 text-sm text-slate-300">
                                    You scored{" "}
                                    <span className="font-bold text-white">
                                      {score}
                                    </span>{" "}
                                    out of{" "}
                                    <span className="font-bold text-white">
                                      {
                                        totalQuestions
                                      }
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                                  <div
                                    className="h-full rounded-full bg-blue-500"
                                    style={{
                                      width: `${percentage}%`,
                                    }}
                                  />
                                </div>

                                <span className="text-lg font-bold text-emerald-300">
                                  {percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { supabase } from "@/app/lib/supabase";

// interface Assignment {
//   id: string;
//   lesson_id: string;
//   title: string;
//   description: string | null;
// }

// interface Question {
//   id: string;
//   assignment_id: string;
//   question: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_answer: string;
//     marks: number;

// }

// export default function AssignmentsPage() {
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [answers, setAnswers] = useState<
//   Record<string, string>
// >({});
// const [scores, setScores] = useState<
//   Record<string, number>
// >({});

// const [submitted, setSubmitted] = useState<
//   Record<string, boolean>
// >({});

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

//     //----------------------------------
//     // Completed lessons
//     //----------------------------------

//     const { data: progressRows } = await supabase
//       .from("lesson_progress")
//       .select("lesson_id")
//       .eq("student_id", user.id)
//       .eq("completed", true);

//     if (!progressRows?.length) {
//       setLoading(false);
//       return;
//     }

//     const lessonIds = progressRows.map(
//       (row) => row.lesson_id
//     );

//     //----------------------------------
//     // Assignments
//     //----------------------------------

//     const { data: assignmentRows } = await supabase
//       .from("assignments")
//       .select("*")
//       .in("lesson_id", lessonIds);

//     if (!assignmentRows?.length) {
//       setLoading(false);
//       return;
//     }

//     setAssignments(assignmentRows);

//     //----------------------------------
//     // Questions
//     //----------------------------------

//     const assignmentIds = assignmentRows.map(
//       (a) => a.id
//     );

//     const { data: questionRows } = await supabase
//       .from("assignment_questions")
//       .select("*")
//       .in("assignment_id", assignmentIds);

//     setQuestions(questionRows ?? []);

//     setLoading(false);
//   }

//   if (loading) {
//     return (
//       <div className="py-10 text-center text-gray-600">
//         Loading assignments...
//       </div>
//     );
//   }

//   if (!assignments.length) {
//     return (
//       <div className="py-10 text-center text-gray-500">
//         Complete lessons to unlock assignments.
//       </div>
//     );
//   }
// function handleAnswer(
//   questionId: string,
//   answer: string
// ) {
//   setAnswers((prev) => ({
//     ...prev,
//     [questionId]: answer,
//   }));
// }

// function getOptionClass(
//   question: Question,
//   option: string,
//   assignmentId: string
// ) {
//   // Before submission, use normal styling
//   if (!submitted[assignmentId]) {
//     return "border-gray-300 hover:bg-gray-50";
//   }

//   const selected = answers[question.id];

//   // Correct answer
//   if (option === question.correct_answer) {
//     return "border-green-600 bg-green-100 text-green-800";
//   }

//   // Wrong option selected
//   if (
//     option === selected &&
//     selected !== question.correct_answer
//   ) {
//     return "border-red-600 bg-red-100 text-red-800";
//   }

//   // All other options
//   return "border-gray-300 bg-white";
// }


// function gradeAssignment(
//   assignmentId: string
// ) {
//   const assignmentQuestions = questions.filter(
//     (question) =>
//       question.assignment_id === assignmentId
//   );

//   if (!assignmentQuestions.length) return;

//   //-----------------------------------
//   // Ensure every question is answered
//   //-----------------------------------

//   const unanswered = assignmentQuestions.find(
//     (question) => !answers[question.id]
//   );

//   if (unanswered) {
//     toast.error(
//       "Please answer every question."
//     );
//     return;
//   }

//   //-----------------------------------
//   // Calculate score
//   //-----------------------------------

//   let score = 0;

//   assignmentQuestions.forEach((question) => {
//     if (
//       answers[question.id] ===
//       question.correct_answer
//     ) {
//       score += question.marks ?? 1;
//     }
//   });
  

//   //-----------------------------------
//   // Save locally
//   //-----------------------------------

//   setScores((prev) => ({
//     ...prev,
//     [assignmentId]: score,
//   }));

//   setSubmitted((prev) => ({
//     ...prev,
//     [assignmentId]: true,
//   }));

//   toast.success(
//     `You scored ${score}/${assignmentQuestions.length}`
//   );
// }

//   return (
//     <div className="space-y-8 text-gray-600">

//       <h1 className="text-3xl font-bold">
//         My Assignments
//       </h1>

//       {assignments.map((assignment) => {

//         const assignmentQuestions =
//           questions.filter(
//             (q) =>
//               q.assignment_id === assignment.id
//           );

//         return (

//           <div
//             key={assignment.id}
//             className="rounded-xl border bg-white p-6 shadow"
//           >

//             <h2 className="text-2xl font-semibold">
//               {assignment.title}
//             </h2>

//             <p className="mb-6 text-gray-500">
//               {assignment.description}
//             </p>

//             {assignmentQuestions.map((question) => (

//               <div
//                 key={question.id}
//                 className="mb-8"
//               >
//                 <h3 className="mb-4 font-medium">
//                   {question.question}
//                 </h3>

//                 <div className="space-y-3">

//                   {/* <label className="flex gap-3 rounded-lg border p-3"> */}
//                   <label
//   className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
//     question,
//     "A",
//     assignment.id
//   )}`}
// >
//                     <input
//                       type="radio"
//                       name={question.id}
//                         disabled={submitted[assignment.id]}
//                        value="A"
//     checked={answers[question.id] === "A"}
//     onChange={() =>
//       handleAnswer(question.id, "A")
//     }
//                     />
//                     {question.option_a}
//                   </label>

//                   {/* <label className="flex gap-3 rounded-lg border p-3"> */}
//                   <label
//   className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
//     question,
//     "B",
//     assignment.id
//   )}`}
// >
//                     <input
//                       type="radio"
//                       name={question.id}
//                         disabled={submitted[assignment.id]}
//                       value="B"
//     checked={answers[question.id] === "B"}
//     onChange={() =>
//       handleAnswer(question.id, "B")
//     }
//                     />
//                     {question.option_b}
//                   </label>

//                   {/* <label className="flex gap-3 rounded-lg border p-3"> */}
//                   <label
//   className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
//     question,
//     "C",
//     assignment.id
//   )}`}
// >
//                     <input
//                       type="radio"
//                       name={question.id}
//                         disabled={submitted[assignment.id]}
//                        value="C"
//     checked={answers[question.id] === "C"}
//     onChange={() =>
//       handleAnswer(question.id, "C")
//     }
//                     />
//                     {question.option_c}
//                   </label>

//                   {/* <label className="flex gap-3 rounded-lg border p-3"> */}
//                   <label
//   className={`flex gap-3 rounded-lg border p-3 transition-all ${getOptionClass(
//     question,
//     "D",
//     assignment.id
//   )}`}
// >
//                     <input
//                       type="radio"
//                         disabled={submitted[assignment.id]}
//                       name={question.id}
//                        value="D"
//     checked={answers[question.id] === "D"}
//     onChange={() =>
//       handleAnswer(question.id, "D")
//     }

//                     />
//                     {question.option_d}
//                   </label>

//                 </div>
                
//               </div>

//             ))}
// <button
//   onClick={() =>
//     gradeAssignment(assignment.id)
//   }
//   disabled={submitted[assignment.id]}
//   className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
// >
//   {submitted[assignment.id]
//     ? "Submitted"
//     : "Submit Assignment"}
// </button>

// {submitted[assignment.id] && (
//   <div className="mt-4 rounded-lg bg-green-50 p-4">

//     <p className="font-semibold text-green-700">

//       Score: {scores[assignment.id]} / {
//         questions.filter(
//           (q) =>
//             q.assignment_id === assignment.id
//         ).length
//       }

//     </p>

//   </div>
// )}


//           </div>

//         );

//       })}
 
 
//     </div>
//   );
// }


// // "use client";
// // import { submitAssignment } from "@/app/lib/submitAssignment";
// // import { useEffect, useState } from "react";
// // import { supabase } from "@/app/lib/supabase";
// // import toast from "react-hot-toast";

// // interface Assignment {
// //   id: string;
// //   lesson_id: string;
// //   question: string;
// //   option_a: string;
// //   option_b: string;
// //   option_c: string;
// //   option_d: string;
// //   correct_answer: string;
// // }

// // export default function AssignmentsPage() {
// //   const [assignments, setAssignments] = useState<Assignment[]>([]);
// //   const [loading, setLoading] = useState(true);

// // //   const [answers, setAnswers] = useState<
// // //     Record<string, string>
// // //   >({});
// // const [answers, setAnswers] = useState<string[]>([]);

// //   const [submitted, setSubmitted] = useState<
// //     Record<string, boolean>
// //   >({});

// //   useEffect(() => {
// //     loadAssignments();
// //   }, []);

// //   async function loadAssignments() {
// //     setLoading(true);

// //     const {
// //       data: { user },
// //     } = await supabase.auth.getUser();

// //     if (!user) {
// //       setLoading(false);
// //       return;
// //     }

// //     //----------------------------------------
// //     // Completed lessons
// //     //----------------------------------------

// //     const { data: progressRows } = await supabase
// //       .from("lesson_progress")
// //       .select("lesson_id")
// //       .eq("student_id", user.id)
// //       .eq("completed", true);

// //     if (!progressRows?.length) {
// //       setAssignments([]);
// //       setLoading(false);
// //       return;
// //     }

// //     const lessonIds = progressRows.map(
// //       (row) => row.lesson_id
// //     );

// //     //----------------------------------------
// //     // Assignments for those lessons
// //     //----------------------------------------

// //     const { data } = await supabase
// //       .from("assignments")
// //       .select("*")
// //       .in("lesson_id", lessonIds)
// //       .order("created_at");

// //     setAssignments(data ?? []);
// // function handleAnswer(index: number, answer: string) {
// //   const updated = [...answers];
// //   updated[index] = answer;
// //   setAnswers(updated);
// // }

    
// //     //----------------------------------------
// //     // Already submitted assignments
// //     //----------------------------------------

// //     const { data: submissions } = await supabase
// //       .from("assignment_submissions")
// //       .select("assignment_id")
// //       .eq("student_id", user.id);

// //     const completed: Record<string, boolean> = {};

// //     submissions?.forEach((item) => {
// //       completed[item.assignment_id] = true;
// //     });

// //     setSubmitted(completed);

// //     setLoading(false);
// //   }

// //   async function submitAssignment(
// //     assignment: Assignment
// //   ) {
// //     const {
// //       data: { user },
// //     } = await supabase.auth.getUser();

// //     if (!user) return;

// //     const answer = answers[assignment.id];

// //     if (!answer) {
// //       toast.error("Please choose an answer.");
// //       return;
// //     }

// //     const isCorrect =
// //       answer === assignment.correct_answer;

// //     const { error } = await supabase
// //       .from("assignment_submissions")
// //       .upsert(
// //         {
// //           assignment_id: assignment.id,
// //           student_id: user.id,
// //           answer,
// //           is_correct: isCorrect,
// //         },
// //         {
// //           onConflict: "assignment_id,student_id",
// //         }
// //       );

// //     if (error) {
// //       toast.error(error.message);
// //       return;
// //     }

// //     toast.success(
// //       isCorrect
// //         ? "Correct answer!"
// //         : "Submitted successfully."
// //     );

// //     setSubmitted((prev) => ({
// //       ...prev,
// //       [assignment.id]: true,
// //     }));
// //   }

// //   if (loading) {
// //     return (
// //       <div className="py-10 text-center text-gray-500">
// //         Loading assignments...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-8">

// //       <h1 className="text-3xl font-bold text-gray-700">
// //         My Assignments
// //       </h1>

// //       {assignments.length === 0 && (
// //         <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
// //           Complete a lesson to unlock assignments.
// //         </div>
// //       )}

// //       {assignments.map((assignment) => (
// //         <div
// //           key={assignment.id}
// //           className="rounded-xl border bg-white p-6 shadow-sm"
// //         >
// //           <h2 className="mb-6 text-lg font-semibold">
// //             {assignment.question}
// //           </h2>

// //           <div className="space-y-3">

// //             {[
// //               {
// //                 key: "A",
// //                 value: assignment.option_a,
// //               },
// //               {
// //                 key: "B",
// //                 value: assignment.option_b,
// //               },
// //               {
// //                 key: "C",
// //                 value: assignment.option_c,
// //               },
// //               {
// //                 key: "D",
// //                 value: assignment.option_d,
// //               },
// //             ].map((option) => (
// //               <label
// //                 key={option.key}
// //                 className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
// //               >
// //                 <input
// //                   type="radio"
// //                   name={assignment.id}
// //                   value={option.key}
// //                   onChange={() => handleAnswer(index, "A")}
// //                   disabled={
// //                     submitted[assignment.id]
// //                   }
// //                   checked={
// //                     answers[assignment.id] ===
// //                     option.key
// //                   }
// //                   onChange={(e) =>
// //                     setAnswers((prev) => ({
// //                       ...prev,
// //                       [assignment.id]:
// //                         e.target.value,
// //                     }))
// //                   }
// //                 />

// //                 {option.value}
// //               </label>
// //             ))}

// //           </div>

// //           {/* <button
// //             onClick={() =>
// //               submitAssignment(assignment)
// //             }
// //             disabled={submitted[assignment.id]}
// //             className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
// //           >
// //             {submitted[assignment.id]
// //               ? "Submitted"
// //               : "Submit Answer"}
// //           </button> */}
// //           <button
// //   onClick={async () => {
// //     const result = await submitAssignment(
// //       lessonId,
// //       answers
// //     );

// //     if (!result) return;

// //     alert(
// //       `You scored ${result.score}/${result.total}`
// //     );
// //   }}
// //   className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
// // >
// //   Submit Assignment
// // </button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }