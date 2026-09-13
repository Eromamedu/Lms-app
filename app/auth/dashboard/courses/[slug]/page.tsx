"use client";

import { completeLesson } from "@/app/lib/completeLesson";
import { useParams, useRouter } from "next/navigation";
import { useCourse } from "@/app/hooks/useCourse";
import { useUser } from "@/app/context/UseContext";
import { supabase } from "@/app/lib/supabase";
import toast from "react-hot-toast";

import {
  Clock,
  BookOpen,
  User,
  PlayCircle,
  ExternalLink,
  Sparkles,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  const {
    course,
    lessons,
    loading,
  } = useCourse(params.slug as string);

  /* -----------------------------
     Loading
  ----------------------------- */

  if (loading) {
    return (
      <main className="lms-background relative min-h-screen overflow-hidden">
        <div className="flex min-h-screen items-center justify-center">
          <div className="lms-glass animate-fade-up rounded-2xl border border-white/10 px-8 py-6 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-blue-400/20 border-t-blue-400" />

            <p className="text-sm font-medium text-slate-400">
              Loading course...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* -----------------------------
     Course not found
  ----------------------------- */

  if (!course) {
    return (
      <main className="lms-background relative min-h-screen overflow-hidden">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="lms-glass animate-fade-up rounded-3xl border border-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-400">
              <BookOpen size={25} />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-white">
              Course not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The course you're looking for doesn't exist.
            </p>

          </div>
        </div>
      </main>
    );
  }

  /* -----------------------------
     Start Learning
  ----------------------------- */

  async function startLearning() {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    const { error } = await supabase
      .from("student_courses")
      .upsert(
        {
          student_id: user.id,
          course_id: course?.id,
          progress: 0,
        },
        {
          onConflict: "student_id,course_id",
        }
      )
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    router.push(`auth/dashboard/courses/${course?.slug}`);
  }

  /* -----------------------------
     Complete Lesson
  ----------------------------- */

  async function markLessonComplete(
    lessonId: string,
    url: string
  ) {
    if (!user) {
      toast.error("Please login.");
      return;
    }

    if (!course) return;

    await completeLesson(
      lessonId,
      course.id,
      url
    );
  }

  return (
    <main className="lms-background relative min-h-screen overflow-hidden">

      {/* =================================
          Ambient Background Effects
      ================================= */}

      <div
        className="lms-orbit lms-orbit-1 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="lms-orbit lms-orbit-2 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="lms-orbit lms-orbit-3 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="lms-glow-blue pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="lms-glow-purple pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="lms-glow-cyan pointer-events-none"
        aria-hidden="true"
      />

      {/* Small floating particles */}

      <div
        className="dashboard-particle dashboard-particle-1 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="dashboard-particle dashboard-particle-2 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="dashboard-particle dashboard-particle-3 pointer-events-none"
        aria-hidden="true"
      />

      {/* =================================
          Main Content
      ================================= */}

      <div className="relative z-10 mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================
            Course Hero
        ================================= */}

        <section className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-blue-400/20 hover:shadow-blue-950/30 sm:p-8 lg:p-10">

          {/* Hero glow */}

          <div
            className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">

            {/* Small label */}

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10 transition-transform duration-500 group-hover:scale-105">
                <GraduationCap size={23} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Course Details
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>Learning Program</span>

                  <span className="h-1 w-1 rounded-full bg-slate-700" />

                  <span>{lessons.length} Lessons</span>
                </div>
              </div>

              <Sparkles
                size={18}
                className="ml-auto animate-pulse text-cyan-400"
              />

            </div>

            {/* Course title */}

            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white transition-all duration-500 sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {course.description}
            </p>

            {/* Course metadata */}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">

              {/* Instructor */}

              <div className="group/meta flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Instructor
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {course.instructor}
                  </p>
                </div>

              </div>

              {/* Duration */}

              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Clock size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {course.duration}
                  </p>
                </div>

              </div>

              {/* Lessons */}

              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-purple-400/20 hover:bg-purple-400/[0.04]">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <BookOpen size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Curriculum
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {lessons.length} Lessons
                  </p>
                </div>

              </div>

            </div>

            {/* Start learning */}

            <button
              onClick={startLearning}
              className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-7 py-3.5 text-sm font-bold text-blue-300 shadow-lg shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/20 hover:text-white hover:shadow-blue-500/20"
            >
              <PlayCircle size={18} />

              Start Learning

              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </div>
        </section>

        {/* =================================
            Curriculum
        ================================= */}

        <section className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-purple-400/20 hover:shadow-purple-950/20 sm:p-8">

          {/* Ambient glow */}

          <div
            className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">

            {/* Curriculum header */}

            <div className="mb-7 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-400">
                <BookOpen size={19} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Course Curriculum
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {lessons.length} lessons available
                </p>
              </div>

            </div>

            {/* Lessons */}

            <div className="space-y-3">

              {lessons.map((lesson, index) => (

                <div
                  key={lesson.lesson_number}
                  className="group/lesson flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-blue-400/[0.04] hover:shadow-lg hover:shadow-blue-950/20 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >

                  {/* Left side */}

                  <div className="flex min-w-0 items-center gap-4">

                    {/* Lesson number / play button */}

                    <button
                      onClick={() =>
                        markLessonComplete(
                          lesson.id,
                          lesson.video_url ?? "#"
                        )
                      }
                      aria-label={`Play Lesson ${lesson.lesson_number}`}
                      className="group/play flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 transition-all duration-300 hover:scale-105 hover:border-blue-400/40 hover:bg-blue-500/20 hover:text-cyan-300 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <PlayCircle
                        size={21}
                        className="transition-transform duration-300 group-hover/play:scale-110"
                      />
                    </button>

                    {/* Lesson information */}

                    <div className="min-w-0">

                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        Lesson {lesson.lesson_number}
                      </p>

                      <span className="block truncate text-sm font-semibold text-slate-200 transition-colors duration-300 group-hover/lesson:text-white sm:text-base">
                        {lesson.title}
                      </span>

                    </div>

                  </div>

                  {/* Read button */}

                  <button
                    onClick={() =>
                      markLessonComplete(
                        lesson.id,
                        lesson.url
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-400 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-300 sm:flex-shrink-0"
                  >
                    Read

                    <ExternalLink
                      size={15}
                      className="transition-transform duration-300 group-hover/lesson:translate-x-0.5"
                    />
                  </button>

                </div>

              ))}

            </div>

            {/* Empty state */}

            {lessons.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">

                <BookOpen
                  size={30}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm text-slate-500">
                  No lessons have been added to this course yet.
                </p>

              </div>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}

// "use client";
// import { completeLesson } from "@/app/lib/completeLesson";
// import { useParams, useRouter } from "next/navigation";
// // import { courseData } from "@/app/lib/courseData";
// import { useCourse } from "@/app/hooks/useCourse";
// // import { courseData } from "@/app/lib/courseData";
// import { useUser } from "@/app/context/UseContext";
// import { supabase } from "@/app/lib/supabase";
// import toast from "react-hot-toast";
// // import { completeLesson } from "@/app/lib/progress";
// import {
//   Clock,
//   BookOpen,
//   User,
//   PlayCircle,
//   ExternalLink,
// } from "lucide-react";

// export default function CourseDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { user } = useUser();

// //   const course = courseData.find(
// //     (c) => c.slug === params.slug
// //   );
// const {
//   course,
//   lessons,
//   loading,
// } = useCourse(params.slug as string);

// if (loading) {
//   return (
//     <div className="py-20 text-center text-gray-500">
//       Loading course...
//     </div>
//   );
// }
//   if (!course) {
//     return (
//       <div className="py-20 text-center">
//         Course not found.
//       </div>
//     );
//   }
//   async function startLearning() {
//   if (!user) {
//     toast.error("Please login first.");
//     return;
//   }

//   const { data, error } = await supabase
//     .from("student_courses")
//     .upsert(
//   {
//     student_id: user.id,
//     course_id: course?.id,
//     progress: 0,
//   },
//   {
//     onConflict: "student_id,course_id",
//   }
// )
//     // .insert({
//     //   student_id: user.id,
//     //   course_id: course?.id,
//     //   progress: 0,
//     // })
//     .select();

// //   console.log("DATA:", data);
// //   console.log("ERROR:", error);
// // console.log("Course ID:", course?.id);
// // console.log("User ID:", user.id);
// // console.log("Insert data:", data);
// // console.log("Insert error:", error);

//   if (error) {
//     toast.error(error.message);
//     return;
//   }
// // const { data, error } = await supabase
// //   .from("student_courses")
// //   .insert({
// //     student_id: user.id,
// //     course_id: course.id,
// //     progress: 0,
// //   })
// //   .select();

// // console.log("ERROR OBJECT:", JSON.stringify(error, null, 2));

// // if (error) {
// //   alert(JSON.stringify(error, null, 2));
// //   return;
// // }
//   router.push(`auth/dashboard/courses/${course?.slug}`);
// }
// //   async function startLearning() {
// //   if (!user) {
// //     toast.error("Please login first.");
// //     return;
// //   }

// //   console.log("User ID:", user.id);
// //   console.log("Course ID:", course.id);

// //   const { data, error } = await supabase
// //     .from("student_courses")
// //     .insert({
// //       student_id: user.id,
// //       course_id: course.id,
// //       progress: 0,
// //     })
// //     .select();

// //   console.log("Insert data:", data);
// //   console.log("Insert error:", error);

// //   if (error) {
// //     // toast.error(error.message);
// //       alert(JSON.stringify(error, null, 2));
// //     return;
// //   }

// //   router.push(`/dashboard/courses/${course.slug}/lesson/${course.lessons[0].id}`);
// // }

// //   async function startLearning() {
// //     if (!user) {
// //       toast.error("Please login first.");
// //       return;
// //     }

// //     const { data } = await supabase
// //       .from("student_courses")
// //       .select("*")
// //       .eq("student_id", user.id)
// //       .eq("course_id", course?.id);

// //     if (!data?.length) {
// //       await supabase
// //         .from("student_courses")
// //         .insert({
// //           student_id: user.id,
// //           course_id: course?.id,
// //           progress: 0,
// //         });
// //     }

// //     router.push(
// //       `/dashboard/courses/${course?.slug}/lesson/1`
// //     );
// //   }
// // async function markLessonComplete(
// //   lessonId: string,
// //   url: string
// // ) {
// //   if (!user) {
// //     toast.error("Please login.");
// //     return;
// //   }
// //   if (!course) {
// //     return;
// //   }


// //   await completeLesson(
// //     user.id,
// //     lessonId,
// //     course.id
// //   );

// //   window.open(url, "_blank");
// // }
// async function markLessonComplete(
//   lessonId: string,
//   url: string
// ) {
//   if (!user) {
//     toast.error("Please login.");
//     return;
//   }

//   if (!course) return;

//   await completeLesson(
//     lessonId,
//     course.id,
//     url
//   );
// }




//   return (
//     <div className="mx-auto max-w-6xl space-y-8 text-gray-600">

//       <div className="rounded-3xl bg-white p-8 shadow">

//         <h1 className="text-4xl font-bold text-gray-800">
//           {course.title}
//         </h1>

//         <p className="mt-4 text-gray-600 leading-8">
//           {course.description}
//         </p>

//         <div className="mt-6 flex flex-wrap gap-8">

//           <div className="flex items-center gap-2">

//             <User size={18} />

//             {course.instructor}

//           </div>

//           <div className="flex items-center gap-2">

//             <Clock size={18} />

//             {course.duration}

//           </div>

//           <div className="flex items-center gap-2">

//             <BookOpen size={18} />

//             {lessons.length} Lessons

//           </div>

//         </div>

//         {/* <button
//           onClick={startLearning}
//           className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
//         >
//           Start Learning
//         </button> */}

//       </div>

//       <div className="rounded-3xl bg-white p-8 shadow">

//         <h2 className="mb-6 text-2xl font-bold">
//           Course Curriculum
//         </h2>

//         <div className="space-y-4">

//           {lessons.map((lesson) => (

//             <div
//               key={lesson.lesson_number}
//               className="flex items-center justify-between rounded-xl border p-5 hover:border-blue-500"
//             >
//               <div className="flex items-center gap-4">

//                 {/* <PlayCircle
//                   className="text-blue-600"
//                   size={22}
//                 /> */}
//                 {/* <a
//   href={lesson.video_url ?? "#"}
//   target="_blank"
//   rel="noopener noreferrer"
// > */}
//     {/* <button
//     // markLessonComplete(
//     //   lesson.id,
//     //   lesson.video_url || "#"
//     // )
//     onClick={() =>
//     completeLesson(
//       lesson.id,
//       course.id,
//       lesson.video_url ?? "#"
//     )
//   }
// >

    
//   <PlayCircle
//     className="cursor-pointer text-blue-600 hover:text-red-600"
//     size={22}
//   />
//   </button> */}
// <button
//   onClick={() =>
//     markLessonComplete(
//       lesson.id,
//       lesson.video_url ?? "#"
//     )
//   }
// >
//   <PlayCircle
//     className="cursor-pointer text-blue-600 hover:text-red-600"
//     size={22}
//   />
// </button>


// {/* </a> */}

//                 <span className="font-medium">

//                   {/* Lesson {lesson.id} — {lesson.title} */}
//                   Lesson {lesson.lesson_number} — {lesson.title}

//                 </span>

//               </div>

//               {/* <a
//                 href={lesson.url}
//                 target="_blank"
//                 className="flex items-center gap-2 text-blue-600"
//               > */}
//               {/* <a
//   href={lesson.url}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
// >
//                 Read

//                 <ExternalLink size={16} />
//               </a> */}
//               {/* <button
//   onClick={() =>
//     markLessonComplete(
//       lesson.id,
//       lesson.url
//     )
//   }
//   className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
// >
//   Read

//   <ExternalLink size={16} />
// </button> */}

// <button
//   onClick={() =>
//     markLessonComplete(
//       lesson.id,
//       lesson.url
//     )
//   }
//   className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
// >
//   Read
//   <ExternalLink size={16} />
// </button>
// {/* <button
//   onClick={() =>
//     completeLesson(
//       lesson.id,
//       course.id,
//       lesson.url
//     )
//   }
//   className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
// >
//   Read
//   <ExternalLink size={16} />
// </button> */}
//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }