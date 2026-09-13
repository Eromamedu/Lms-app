"use client";

import { useEffect, useState } from "react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LockKeyhole,
  Sparkles,
  UserRound,
} from "lucide-react";

import { supabase } from "@/app/lib/supabase";

interface Course {
  id: string;
  title: string;
  instructor: string;
}

interface Certificate {
  course_id: string;
  issued_at: string;
}

export default function CertificatesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    //---------------------------------
    // Current user
    //---------------------------------

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    //---------------------------------
    // Student profile
    //---------------------------------

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    setStudentName(profile?.full_name ?? "Student");

    //---------------------------------
    // All courses
    //---------------------------------

    const { data: courseRows } = await supabase
      .from("courses")
      .select("id,title,instructor")
      .order("title");

    setCourses(courseRows ?? []);

    //---------------------------------
    // Earned certificates
    //---------------------------------

    const { data: certificateRows } = await supabase
      .from("certificates")
      .select("course_id, issued_at")
      .eq("student_id", user.id);

    setCertificates(certificateRows ?? []);

    setLoading(false);
  }

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <main className="lms-background relative min-h-screen overflow-hidden">
        {/* Ambient glows */}

        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex min-h-[70vh] items-center justify-center">
          <div className="text-center animate-fade-up">

            <div
              className="
                mx-auto flex h-20 w-20 items-center justify-center
                rounded-3xl
                border border-cyan-400/20
                bg-slate-950/80
                text-cyan-300
                shadow-[0_0_35px_rgba(34,211,238,0.15)]
                backdrop-blur-xl
              "
            >
              <Award
                size={38}
                className="animate-pulse"
              />
            </div>

            <p className="mt-5 text-lg font-semibold text-slate-300">
              Loading certificates
            </p>

            <div className="mt-3 flex justify-center gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
                style={{ animationDelay: "300ms" }}
              />
            </div>

          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <main className="lms-background relative min-h-screen overflow-hidden">

      {/* ======================================================== */}
      {/* AMBIENT BACKGROUND */}
      {/* ======================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Decorative orbit */}

      <div
        className="
          pointer-events-none absolute
          -right-40 top-10
          h-96 w-96
          rounded-full
          border border-cyan-400/5
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-28 top-22
          h-72 w-72
          rounded-full
          border border-purple-400/5
        "
      />

      {/* ======================================================== */}
      {/* CONTENT */}
      {/* ======================================================== */}

      <div className="relative z-10 space-y-10">

        {/* ====================================================== */}
        {/* PAGE HEADER */}
        {/* ====================================================== */}

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/10
            bg-gradient-to-br
            from-slate-950
            via-slate-900
            to-blue-950/40
            p-6 sm:p-8
            shadow-2xl
            backdrop-blur-xl
            animate-fade-up
          "
        >

          {/* Header glow */}

          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-64 w-64
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-20 -left-20
              h-56 w-56
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          {/* Light sweep */}

          <span
            className="
              pointer-events-none absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/5
              to-transparent
              transition-transform duration-1000
              hover:translate-x-full
            "
          />

          <div className="relative z-10 flex items-center gap-5">

            {/* Icon */}

            <div
              className="
                flex h-16 w-16 shrink-0
                items-center justify-center
                rounded-2xl
                border border-cyan-400/20
                bg-gradient-to-br
                from-blue-500/20
                via-cyan-500/10
                to-purple-500/20
                text-cyan-300
                shadow-[0_0_30px_rgba(34,211,238,0.12)]
                transition-all duration-500
                hover:scale-110
                hover:rotate-3
              "
            >
              <GraduationCap size={32} />
            </div>

            <div>

              <div className="mb-2 flex items-center gap-2">

                <Sparkles
                  size={14}
                  className="text-cyan-300"
                />

                <span
                  className="
                    text-xs font-bold
                    uppercase tracking-[0.25em]
                    text-cyan-300
                  "
                >
                  Achievements
                </span>

              </div>

              <h1
                className="
                  text-3xl font-extrabold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                My Certificates
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Your learning achievements and certificates earned throughout
                your LMS journey.
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* CERTIFICATE GRID */}
        {/* ====================================================== */}

        {courses.length === 0 ? (
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-slate-950/80
              p-12
              text-center
              shadow-2xl
              backdrop-blur-xl
              animate-fade-up
            "
          >
            <div
              className="
                mx-auto flex h-20 w-20
                items-center justify-center
                rounded-3xl
                border border-purple-400/20
                bg-purple-500/10
                text-purple-300
              "
            >
              <Award size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              No courses available
            </h2>

            <p className="mt-2 text-slate-400">
              Complete a course to start earning certificates.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">

            {courses.map((course, index) => {
              const earned = certificates.find(
                (certificate) =>
                  certificate.course_id === course.id
              );

              return (
                <div
                  key={course.id}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >
                  <CertificateCard
                    course={course}
                    earned={earned}
                    studentName={studentName}
                  />
                </div>
              );
            })}

          </div>
        )}

      </div>

    </main>
  );
}

// ================================================================
// CERTIFICATE CARD
// ================================================================

function CertificateCard({
  course,
  earned,
  studentName,
}: {
  course: Course;
  earned?: Certificate;
  studentName: string;
}) {

  // ==============================================================
  // LOCKED CERTIFICATE
  // ==============================================================

  if (!earned) {
    return (
      <div
        className="
          group relative isolate overflow-hidden
          rounded-3xl
          border border-dashed border-white/15
          bg-slate-950/80
          p-7
          shadow-[0_20px_60px_rgba(0,0,0,0.3)]
          backdrop-blur-xl
          transition-all duration-500
          hover:-translate-y-2
          hover:border-purple-400/30
          hover:shadow-[0_25px_70px_rgba(168,85,247,0.12)]
        "
      >

        {/* Purple glow */}

        <div
          className="
            pointer-events-none absolute
            -right-16 -top-16
            h-40 w-40
            rounded-full
            bg-purple-500/10
            blur-3xl
            transition-all duration-700
            group-hover:scale-150
            group-hover:bg-purple-500/20
          "
        />

        {/* Blue glow */}

        <div
          className="
            pointer-events-none absolute
            -bottom-16 -left-16
            h-36 w-36
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          {/* Top */}

          <div className="flex items-start justify-between gap-4">

            <div
              className="
                flex h-14 w-14 shrink-0
                items-center justify-center
                rounded-2xl
                border border-purple-400/20
                bg-purple-500/10
                text-purple-300
                transition-all duration-500
                group-hover:scale-110
                group-hover:rotate-3
                group-hover:shadow-[0_0_25px_rgba(168,85,247,0.18)]
              "
            >
              <LockKeyhole size={26} />
            </div>

            <span
              className="
                flex items-center gap-2
                rounded-full
                border border-white/10
                bg-slate-900/80
                px-3 py-1.5
                text-xs font-bold
                uppercase tracking-wider
                text-slate-400
              "
            >
              <Clock3 size={13} />
              Locked
            </span>

          </div>

          {/* Course */}

          <h2
            className="
              mt-7
              text-2xl font-bold
              text-white
              transition-colors duration-300
              group-hover:text-purple-200
            "
          >
            {course.title}
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Complete all 7 lessons to unlock your official certificate
            for this course.
          </p>

          {/* Progress-style decoration */}

          <div className="mt-7">

            <div className="mb-2 flex justify-between text-xs">

              <span className="font-medium text-slate-500">
                Certificate progress
              </span>

              <span className="font-semibold text-purple-300">
                Locked
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full w-[8%] rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
            </div>

          </div>

          {/* Footer */}

          <div
            className="
              mt-7 flex items-center gap-3
              rounded-2xl
              border border-white/5
              bg-slate-900/60
              p-4
            "
          >

            <LockKeyhole
              size={18}
              className="text-purple-400"
            />

            <span className="text-sm text-slate-400">
              Keep learning to unlock this achievement.
            </span>

          </div>

        </div>

      </div>
    );
  }

  // ==============================================================
  // EARNED CERTIFICATE
  // ==============================================================
return (
   <div className="relative overflow-hidden rounded-3xl border-[12px] border-yellow-500 bg-white p-12 shadow-2xl">

     {/* Decorative Corners */}
     <div className="absolute left-0 top-0 h-24 w-24 rounded-br-full bg-yellow-100" />
     <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-yellow-100" />
     <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-yellow-100" />
     <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-yellow-100" />

    {/* Watermark */}
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <h1 className="text-[180px] font-black text-blue-700">
         LMS
       </h1>
     </div>

     <div className="relative z-10">

       <p className="text-center text-sm font-semibold uppercase tracking-[0.55em] text-gray-500">
         Certificate of Completion
       </p>

      <h1 className="mt-5 text-center text-5xl font-extrabold text-blue-700">
         🎓 LMS Academy
       </h1>

       <div className="mx-auto mt-8 h-1 w-40 rounded-full bg-yellow-500" />

       <p className="mt-12 text-center text-lg text-gray-600">
         This certificate is proudly presented to
       </p>

       <h2 className="mt-4 text-center text-5xl font-bold text-gray-900">
         {studentName}
       </h2>

       <p className="mt-12 text-center text-lg text-gray-700">
         for successfully completing the course
       </p>

       <h3 className="mt-4 text-center text-4xl font-bold text-blue-700">
         {course.title}
       </h3>

       <p className="mx-auto mt-8 max-w-2xl text-center text-gray-600 leading-8">
         This certificate recognizes the successful completion of all
         lessons, assignments, and learning objectives required for this
         course.
       </p>

       <div className="mt-16 grid grid-cols-2 gap-10">

         <div className="text-center text-gray-400">
           {/* <div className="border-t border-gray-500" /> */}

           <p className="mt-2 font-semibold">
             Instructor
           </p>

           <p>{course.instructor}</p>
         </div>

         <div className="text-center text-gray-400">
           {/* <div className="border-t border-gray-500" /> */}

           <p className="mt-2 font-semibold">
             Date Issued
           </p>

           <p>
             {new Date(
               earned.issued_at
             ).toLocaleDateString()}
           </p>
         </div>

      </div>

      <div className="mt-16 flex justify-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-yellow-500 bg-yellow-50 text-5xl shadow-lg">
          🏅
        </div>

      </div>

    </div>

  </div>
);
}

//   return (
//     <div
//       className="
//         group relative isolate overflow-hidden
//         rounded-[2rem]
//         border
//         border-yellow-400/30
//         bg-gradient-to-br
//         from-slate-950
//         via-slate-900
//         to-yellow-950/20
//         p-2
//         shadow-[0_25px_80px_rgba(0,0,0,0.45)]
//         transition-all duration-700
//         hover:-translate-y-2
//         hover:border-yellow-400/50
//         hover:shadow-[0_30px_100px_rgba(234,179,8,0.15)]
//         animate-fade-up
//       "
//     >

//       {/* ======================================================== */}
//       {/* OUTER GLOW */}
//       {/* ======================================================== */}

//       <div
//         className="
//           pointer-events-none absolute
//           -right-20 -top-20
//           h-64 w-64
//           rounded-full
//           bg-yellow-400/10
//           blur-3xl
//           transition-all duration-700
//           group-hover:scale-125
//           group-hover:bg-yellow-400/15
//         "
//       />

//       <div
//         className="
//           pointer-events-none absolute
//           -bottom-20 -left-20
//           h-64 w-64
//           rounded-full
//           bg-blue-500/10
//           blur-3xl
//         "
//       />

//       {/* ======================================================== */}
//       {/* LIGHT SWEEP */}
//       {/* ======================================================== */}

//       <span
//         className="
//           pointer-events-none absolute inset-0 z-30
//           -translate-x-full
//           bg-gradient-to-r
//           from-transparent
//           via-white/10
//           to-transparent
//           transition-transform duration-1000
//           group-hover:translate-x-full
//         "
//       />

//       {/* ======================================================== */}
//       {/* CERTIFICATE INNER */}
//       {/* ======================================================== */}

//       <div
//         className="
//           relative overflow-hidden
//           rounded-[1.5rem]
//           border
//           border-yellow-400/20
//           bg-slate-950/95
//           p-7 sm:p-10
//           backdrop-blur-xl
//         "
//       >

//         {/* Decorative corners */}

//         <div
//           className="
//             pointer-events-none absolute
//             left-0 top-0
//             h-24 w-24
//             rounded-br-full
//             bg-yellow-400/5
//           "
//         />

//         <div
//           className="
//             pointer-events-none absolute
//             right-0 top-0
//             h-24 w-24
//             rounded-bl-full
//             bg-yellow-400/5
//           "
//         />

//         <div
//           className="
//             pointer-events-none absolute
//             bottom-0 left-0
//             h-24 w-24
//             rounded-tr-full
//             bg-yellow-400/5
//           "
//         />

//         <div
//           className="
//             pointer-events-none absolute
//             bottom-0 right-0
//             h-24 w-24
//             rounded-tl-full
//             bg-yellow-400/5
//           "
//         />

//         {/* ====================================================== */}
//         {/* WATERMARK */}
//         {/* ====================================================== */}

//         <div
//           className="
//             pointer-events-none absolute inset-0
//             flex items-center justify-center
//             overflow-hidden
//           "
//         >
//           <span
//             className="
//               select-none
//               text-[9rem]
//               font-black
//               tracking-tighter
//               text-yellow-400/[0.025]
//               sm:text-[12rem]
//             "
//           >
//             LMS
//           </span>
//         </div>

//         {/* ====================================================== */}
//         {/* CONTENT */}
//         {/* ====================================================== */}

//         <div className="relative z-10">

//           {/* Certificate icon */}

//           <div className="flex justify-center">

//             <div
//               className="
//                 relative flex h-20 w-20
//                 items-center justify-center
//                 rounded-full
//                 border-4 border-yellow-400/50
//                 bg-gradient-to-br
//                 from-yellow-300/20
//                 via-yellow-500/10
//                 to-orange-500/10
//                 text-yellow-300
//                 shadow-[0_0_35px_rgba(234,179,8,0.2)]
//                 transition-all duration-700
//                 group-hover:scale-110
//                 group-hover:rotate-6
//                 group-hover:shadow-[0_0_50px_rgba(234,179,8,0.3)]
//               "
//             >
//               <Award
//                 size={38}
//                 className="transition-transform duration-500 group-hover:scale-110"
//               />

//               <span
//                 className="
//                   pointer-events-none absolute inset-0
//                   rounded-full
//                   border border-yellow-300/20
//                   animate-ping
//                 "
//               />

//             </div>

//           </div>

//           {/* Small label */}

//           <div className="mt-7 text-center">

//             <div
//               className="
//                 inline-flex items-center gap-2
//                 rounded-full
//                 border border-yellow-400/20
//                 bg-yellow-400/5
//                 px-4 py-1.5
//                 text-[10px] font-bold
//                 uppercase tracking-[0.35em]
//                 text-yellow-300
//               "
//             >
//               <CheckCircle2 size={13} />
//               Achievement Unlocked
//             </div>

//           </div>

//           {/* Certificate title */}

//           <p
//             className="
//               mt-6 text-center
//               text-xs font-semibold
//               uppercase tracking-[0.4em]
//               text-slate-500
//               sm:text-sm
//             "
//           >
//             Certificate of Completion
//           </p>

//           <h1
//             className="
//               mt-5 text-center
//               text-3xl font-black
//               text-transparent
//               bg-clip-text
//               bg-gradient-to-r
//               from-yellow-200
//               via-yellow-400
//               to-orange-300
//               sm:text-5xl
//             "
//           >
//             LMS Academy
//           </h1>

//           {/* Divider */}

//           <div className="mx-auto mt-7 flex items-center justify-center gap-3">

//             <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/50" />

//             <Sparkles
//               size={18}
//               className="text-yellow-400"
//             />

//             <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/50" />

//           </div>

//           {/* Presented to */}

//           <p className="mt-9 text-center text-sm text-slate-500">
//             This certificate is proudly presented to
//           </p>

//           <h2
//             className="
//               mt-3 text-center
//               text-3xl font-bold
//               text-white
//               sm:text-4xl
//             "
//           >
//             {studentName}
//           </h2>

//           {/* Course */}

//           <p className="mt-9 text-center text-sm text-slate-500">
//             for successfully completing the course
//           </p>

//           <h3
//             className="
//               mt-3 text-center
//               text-2xl font-bold
//               text-cyan-300
//               sm:text-3xl
//               transition-all duration-300
//               group-hover:text-cyan-200
//             "
//           >
//             {course.title}
//           </h3>

//           {/* Description */}

//           <p
//             className="
//               mx-auto mt-7
//               max-w-2xl
//               text-center
//               text-sm leading-7
//               text-slate-400
//             "
//           >
//             This certificate recognizes the successful completion of all
//             lessons, assignments, and learning objectives required for this
//             course.
//           </p>

//           {/* ==================================================== */}
//           {/* META INFORMATION */}
//           {/* ==================================================== */}

//           <div className="mt-10 grid gap-4 sm:grid-cols-2">

//             {/* Instructor */}

//             <div
//               className="
//                 rounded-2xl
//                 border border-white/10
//                 bg-slate-900/70
//                 p-4
//                 text-center
//                 transition-all duration-300
//                 hover:border-cyan-400/20
//                 hover:bg-cyan-400/5
//               "
//             >

//               <div className="flex justify-center">

//                 <div
//                   className="
//                     flex h-10 w-10
//                     items-center justify-center
//                     rounded-xl
//                     bg-cyan-400/10
//                     text-cyan-300
//                   "
//                 >
//                   <UserRound size={19} />
//                 </div>

//               </div>

//               <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
//                 Instructor
//               </p>

//               <p className="mt-1 font-semibold text-white">
//                 {course.instructor}
//               </p>

//             </div>

//             {/* Date */}

//             <div
//               className="
//                 rounded-2xl
//                 border border-white/10
//                 bg-slate-900/70
//                 p-4
//                 text-center
//                 transition-all duration-300
//                 hover:border-purple-400/20
//                 hover:bg-purple-400/5
//               "
//             >

//               <div className="flex justify-center">

//                 <div
//                   className="
//                     flex h-10 w-10
//                     items-center justify-center
//                     rounded-xl
//                     bg-purple-400/10
//                     text-purple-300
//                   "
//                 >
//                   <CalendarDays size={19} />
//                 </div>

//               </div>

//               <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
//                 Date Issued
//               </p>

//               <p className="mt-1 font-semibold text-white">
//                 {new Date(earned.issued_at).toLocaleDateString()}
//               </p>

//             </div>

//           </div>

//           {/* ==================================================== */}
//           {/* BOTTOM BADGE */}
//           {/* ==================================================== */}

//           <div className="mt-10 flex justify-center">

//             <div
//               className="
//                 relative flex h-24 w-24
//                 items-center justify-center
//                 rounded-full
//                 border-8 border-yellow-400/50
//                 bg-gradient-to-br
//                 from-yellow-300/20
//                 via-yellow-500/10
//                 to-orange-500/10
//                 shadow-[0_0_35px_rgba(234,179,8,0.15)]
//                 transition-all duration-500
//                 group-hover:scale-110
//               "
//             >

//               <span className="text-4xl">
//                 🏅
//               </span>

//               <div
//                 className="
//                   pointer-events-none absolute
//                   inset-[-8px]
//                   rounded-full
//                   border border-yellow-400/20
//                 "
//               />

//             </div>

//           </div>

//           {/* Bottom label */}

//           <div className="mt-5 text-center">

//             <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400/70">
//               Official LMS Achievement
//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// interface Course {
//   id: string;
//   title: string;
//   instructor: string;
// }

// interface Certificate {
//   course_id: string;
//   issued_at: string;
// }

// export default function CertificatesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [studentName, setStudentName] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   async function loadData() {
//     setLoading(true);

//     //---------------------------------
//     // Current user
//     //---------------------------------

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     //---------------------------------
//     // Student profile
//     //---------------------------------

//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("full_name")
//       .eq("id", user.id)
//       .single();

//     setStudentName(profile?.full_name ?? "Student");

//     //---------------------------------
//     // All courses
//     //---------------------------------

//     const { data: courseRows } = await supabase
//       .from("courses")
//       .select("id,title,instructor")
//       .order("title");

//     setCourses(courseRows ?? []);

//     //---------------------------------
//     // Earned certificates
//     //---------------------------------

//     const { data: certificateRows } = await supabase
//       .from("certificates")
//       .select("course_id, issued_at")
//       .eq("student_id", user.id);

//     setCertificates(certificateRows ?? []);

//     setLoading(false);
//   }

//   if (loading) {
//     return (
//       <div className="py-10 text-center text-gray-600">
//         Loading certificates...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">

//       <h1 className="text-3xl font-bold text-gray-800">
//         My Certificates
//       </h1>

//       <div className="grid gap-8 md:grid-cols-2">

//         {courses.map((course) => {

//           const earned = certificates.find(
//             (certificate) =>
//               certificate.course_id === course.id
//           );

//           return (
//             <CertificateCard
//               key={course.id}
//               course={course}
//               earned={earned}
//               studentName={studentName}
//             />
//           );
//         })}

//       </div>

//     </div>
//   );
// }

// function CertificateCard({
//   course,
//   earned,
//   studentName,
// }: {
//   course: Course;
//   earned?: Certificate;
//   studentName: string;
// }) {
//   if (!earned) {
//     return (
//       <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-8 opacity-70">

//         <h2 className="text-2xl font-bold text-gray-700">
//           {course.title}
//         </h2>

//         <p className="mt-6 text-gray-500">
//           🔒 Certificate Locked
//         </p>

//         <p className="mt-2 text-sm text-gray-500">
//           Complete all 7 lessons to unlock this certificate.
//         </p>

//       </div>
//     );
//   }

// //   
// return (
//   <div className="relative overflow-hidden rounded-3xl border-[12px] border-yellow-500 bg-white p-12 shadow-2xl">

//     {/* Decorative Corners */}
//     <div className="absolute left-0 top-0 h-24 w-24 rounded-br-full bg-yellow-100" />
//     <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-yellow-100" />
//     <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-yellow-100" />
//     <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-yellow-100" />

//     {/* Watermark */}
//     <div className="absolute inset-0 flex items-center justify-center opacity-5">
//       <h1 className="text-[180px] font-black text-blue-700">
//         LMS
//       </h1>
//     </div>

//     <div className="relative z-10">

//       <p className="text-center text-sm font-semibold uppercase tracking-[0.55em] text-gray-500">
//         Certificate of Completion
//       </p>

//       <h1 className="mt-5 text-center text-5xl font-extrabold text-blue-700">
//         🎓 LMS Academy
//       </h1>

//       <div className="mx-auto mt-8 h-1 w-40 rounded-full bg-yellow-500" />

//       <p className="mt-12 text-center text-lg text-gray-600">
//         This certificate is proudly presented to
//       </p>

//       <h2 className="mt-4 text-center text-5xl font-bold text-gray-900">
//         {studentName}
//       </h2>

//       <p className="mt-12 text-center text-lg text-gray-700">
//         for successfully completing the course
//       </p>

//       <h3 className="mt-4 text-center text-4xl font-bold text-blue-700">
//         {course.title}
//       </h3>

//       <p className="mx-auto mt-8 max-w-2xl text-center text-gray-600 leading-8">
//         This certificate recognizes the successful completion of all
//         lessons, assignments, and learning objectives required for this
//         course.
//       </p>

//       <div className="mt-16 grid grid-cols-2 gap-10">

//         <div className="text-center text-gray-400">
//           {/* <div className="border-t border-gray-500" /> */}

//           <p className="mt-2 font-semibold">
//             Instructor
//           </p>

//           <p>{course.instructor}</p>
//         </div>

//         <div className="text-center text-gray-400">
//           {/* <div className="border-t border-gray-500" /> */}

//           <p className="mt-2 font-semibold">
//             Date Issued
//           </p>

//           <p>
//             {new Date(
//               earned.issued_at
//             ).toLocaleDateString()}
//           </p>
//         </div>

//       </div>

//       <div className="mt-16 flex justify-center">

//         <div className="flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-yellow-500 bg-yellow-50 text-5xl shadow-lg">
//           🏅
//         </div>

//       </div>

//     </div>

//   </div>
// );
// }}}