"use client";

import CourseCard from "./CourseCard";
import { useCourses } from "@/app/hooks/useCourses";
import { BookOpen, Sparkles } from "lucide-react";

export default function CourseGrid() {
  const { courses, loading } = useCourses();

  /* -----------------------------
     Loading State
  ----------------------------- */

  if (loading) {
    return (
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl backdrop-blur-xl">

        {/* Ambient glow */}

        <div
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative text-center">

          {/* Animated icon */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10">

            <BookOpen
              size={25}
              className="animate-pulse"
            />

          </div>

          {/* Loading text */}

          <p className="mt-5 text-sm font-semibold text-slate-300">
            Loading courses...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Preparing your learning experience
          </p>

          {/* Loading dots */}

          <div className="mt-5 flex justify-center gap-1.5">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />

            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"
              style={{ animationDelay: "150ms" }}
            />

            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"
              style={{ animationDelay: "300ms" }}
            />

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="relative">

      {/* Decorative glow behind course grid */}

      <div
        className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Course cards */}

      <div className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {courses.map((course, index) => (
          <div
            key={course.id}
            className="animate-fade-up"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <CourseCard
              courseData={course}
            />
          </div>
        ))}

      </div>

      {/* Empty state */}

      {courses.length === 0 && (
        <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-12 text-center shadow-2xl backdrop-blur-xl">

          <div
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <BookOpen size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              No courses available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are no courses available right now.
              Check back later for new learning opportunities.
            </p>

            <Sparkles
              size={18}
              className="mx-auto mt-5 animate-pulse text-cyan-400"
            />

          </div>

        </div>
      )}

    </div>
  );
}

// "use client";

// import CourseCard from "./CourseCard";
// import { useCourses } from "@/app/hooks/useCourses";

// export default function CourseGrid() {
//   const { courses, loading } = useCourses();

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-gray-600">
//         Loading courses...
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 text-gray-600">
//       {courses.map((course) => (
//         <CourseCard
//           key={course.id}
//           courseData={course}
//         />
//       ))}
//     </div>
//   );
// }




// // import CourseCard from "./CourseCard";
// // import { courseData } from "@/app/lib/courseData";

// // export default function CourseGrid() {
// //   return (
// //     <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 text-gray-600">

// //       {courseData.map((course) => (
// //         <CourseCard
// //           key={course.id}
// //           courseData={course}
// //         />
// //       ))}

// //     </div>
// //   );
// // }