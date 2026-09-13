"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Button from "../ui/button";
import CourseProgress from "./CourseProgress";

import { supabase } from "@/app/lib/supabase";

import {
  BookOpen,
  Clock3,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Props {
  courseData: {
    id: string;
    title: string;
    instructor: string;
    lessons: {
      id: string;
      title: string;
      url: string;
    }[];
    duration: string;
    progress: number;
    image: string;
    slug: string;
  };
}

export default function CourseCard({ courseData }: Props) {
  const router = useRouter();

  async function startLearning() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login first.");
      return;
    }

    const { error } = await supabase
      .from("student_courses")
      .upsert(
        {
          student_id: user.id,
          course_id: courseData.id,
          progress: 0,
        },
        {
          onConflict: "student_id,course_id",
        }
      );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Course added successfully!");

    router.push(
      `/auth/dashboard/courses/${courseData.slug}`
    );
  }

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/25 hover:shadow-blue-950/40">

      {/* =================================
          Ambient Card Glows
      ================================= */}

      <div
        className="pointer-events-none absolute -right-20 -top-20 z-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-20 -left-20 z-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-700 group-hover:bg-purple-500/15"
        aria-hidden="true"
      />

      {/* =================================
          Course Image
      ================================= */}

      <div className="relative h-56 overflow-hidden">

        <Image
          src={courseData.image}
          alt={courseData.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark image overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Blue color overlay */}

        <div className="absolute inset-0 bg-blue-950/10 transition-colors duration-500 group-hover:bg-blue-950/5" />

        {/* Course label */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-blue-300 shadow-lg backdrop-blur-md">

          <GraduationCap size={14} />

          Course

        </div>

        {/* Sparkle */}

        <Sparkles
          size={18}
          className="absolute right-4 top-4 animate-pulse text-cyan-300 drop-shadow-lg"
        />

        {/* Bottom image title */}

        <div className="absolute bottom-4 left-5 right-5">

          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
            Start your journey
          </p>

          <h2 className="line-clamp-2 text-xl font-black leading-tight text-white drop-shadow-lg">
            {courseData.title}
          </h2>

        </div>

      </div>

      {/* =================================
          Card Content
      ================================= */}

      <div className="relative space-y-5 p-6">

        {/* Instructor */}

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10 text-blue-400">
            <GraduationCap size={17} />
          </div>

          <div className="min-w-0">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Instructor
            </p>

            <p className="mt-0.5 truncate text-sm font-medium text-slate-300">
              {courseData.instructor}
            </p>

          </div>

        </div>

        {/* Course information */}

        <div className="grid grid-cols-2 gap-3">

          {/* Lessons */}

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition-all duration-300 hover:border-blue-400/15 hover:bg-blue-400/[0.04]">

            <div className="flex items-center gap-2">

              <BookOpen
                size={15}
                className="text-blue-400"
              />

              <span className="text-xs text-slate-500">
                Lessons
              </span>

            </div>

            <p className="mt-1 text-sm font-bold text-slate-200">
              {courseData.lessons.length}
            </p>

          </div>

          {/* Duration */}

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition-all duration-300 hover:border-cyan-400/15 hover:bg-cyan-400/[0.04]">

            <div className="flex items-center gap-2">

              <Clock3
                size={15}
                className="text-cyan-400"
              />

              <span className="text-xs text-slate-500">
                Duration
              </span>

            </div>

            <p className="mt-1 truncate text-sm font-bold text-slate-200">
              {courseData.duration}
            </p>

          </div>

        </div>

        {/* =================================
            Progress
        ================================= */}

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-xs font-medium text-slate-500">
              Course Progress
            </span>

            <span className="text-xs font-bold text-cyan-400">
              {courseData.progress}%
            </span>

          </div>

          <CourseProgress
            value={courseData.progress}
          />

        </div>

        {/* =================================
            Start Learning Button
        ================================= */}

        <div className="flex justify-center">

          <Button
            onClick={startLearning}
            className="group/button flex w-full items-center justify-center gap-2"
          >
            <span>
              Start Learning
            </span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/button:translate-x-1"
            />

          </Button>

        </div>

      </div>

    </div>
  );
}


// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import Button from "../ui/button";

// import CourseProgress from "./CourseProgress";

// import { supabase } from "@/app/lib/supabase";

// interface Props {
//   courseData: {
//     id: string;
//     title: string;
//     instructor: string;
//      lessons: {  
//       id: string;
//       title: string;
//       url: string;
//     }[];
//     duration: string;
//     // students: number;
//     progress: number;
//     image: string;
//     slug: string;
//   };
// }

// export default function CourseCard({ courseData }: Props) {
//   const router = useRouter();

//   async function startLearning() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       toast.error("Please login first.");
//       return;
//     }

//     // const { error } = await supabase
//     //   .from("student_courses")
//     //   .upsert({
//     //     student_id: user.id,
//     //     course_id: courseData.id,
//     //     progress: 0,
//     //   });
//     const { error } = await supabase
//   .from("student_courses")
//   .upsert(
//     {
//       student_id: user.id,
//       course_id: courseData.id,
//       progress: 0,
//     },
//     {
//       onConflict: "student_id,course_id",
//     }
//   );

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success("Course added successfully!");

//     router.push(`/auth/dashboard/courses/${courseData.slug}`);
//   }

//   return (
//     <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
//       <div className="relative h-56">
//         <Image
//           src={courseData.image}
//           alt={courseData.title}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="space-y-5 p-6">
//         <div>
//           <h2 className="text-xl font-bold">
//             {courseData.title}
//           </h2>

//           <p className="mt-2 text-slate-500">
//             {courseData.instructor}
//           </p>
//         </div>

//         <div className="flex justify-between text-sm text-slate-500">
//           <span>{courseData.lessons.length} Lessons</span>

//           <span>{courseData.duration}</span>
//         </div>

//         <CourseProgress value={courseData.progress} />

//         <Button onClick={startLearning}>
//           Start Learning
//         </Button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import Button from "../ui/button";

// import CourseProgress from "./CourseProgress";

// import { supabase } from "@/app/lib/supabase";

// interface Props {
//   course: {
//     id: string;
//     title: string;
//     instructor: string;
//     lessons: number;
//     duration: string;
//     students: number;
//     progress: number;
//     image: string;
//   };
// }

// export default function CourseCard({ course }: Props) {
//   const router = useRouter();

//   async function startLearning() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       toast.error("Please login first.");
//       return;
//     }

//     const { error } = await supabase
//       .from("student_courses")
//       .upsert({
//         student_id: user.id,
//         course_id: course.id,
//         progress: 0,
//       });

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success("Course added successfully!");

//     router.push(`/dashboard/courses/${course.id}`);
//   }

//   return (
//     <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
//       <div className="relative h-56">
//         <Image
//           src={course.image}
//           alt={course.title}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="space-y-5 p-6">
//         <div>
//           <h2 className="text-xl font-bold">
//             {course.title}
//           </h2>

//           <p className="mt-2 text-slate-500">
//             {course.instructor}
//           </p>
//         </div>

//         <div className="flex justify-between text-sm text-slate-500">
//           <span>{course.lessons} Lessons</span>

//           <span>{course.duration}</span>
//         </div>

//         <CourseProgress value={course.progress} />

//         <Button onClick={startLearning}>
//           Start Learning
//         </Button>
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";
// import Button from "../ui/button";
// import CourseProgress from "./CourseProgress";

// interface Props {
//   course: {
//     title: string;
//     instructor: string;
//     lessons: number;
//     duration: string;
//     students: number;
//     progress: number;
//     image: string;
//   };
// }

// export default function CourseCard({
//   course,
// }: Props) {
//   return (
//     <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

//       <div className="relative h-56">

//         <Image
//           src={course.image}
//           alt={course.title}
//           fill
//           className="object-cover"
//         />

//       </div>

//       <div className="space-y-5 p-6">
//         <div>

//           <h2 className="text-xl font-bold">

//             {course.title}

//           </h2>

//           <p className="mt-2 text-slate-500">

//             {course.instructor}

//           </p>

//         </div>

//         <div className="flex justify-between text-sm text-slate-500">

//           <span>{course.lessons} Lessons</span>

//           <span>{course.duration}</span>

//         </div>

//         <CourseProgress
//           value={course.progress}
//         />

//         <Button>

//           Continue Learning

//         </Button>

//       </div>

//     </div>
//   );
// }