import { notFound } from "next/navigation";

import { courseData } from "@/app/lib/courseData";

interface Props {
  params: {
    id: string;
  };
}

export default function CoursePage({
  params,
}: Props) {
  const course = courseData.find(
    (c) => c.id === params.id
  );

  if (!course) {
    return notFound();
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-gray-700">
        {course.title}
      </h1>

      <p className="text-gray-500">
        {course.description}
      </p>

    </div>
  );
}




// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { courseData } from "@/app/lib/courseData";
// import { useUser } from "@/app/context/UseContext";
// import { supabase } from "@/app/lib/supabase";
// import toast from "react-hot-toast";
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

//   const course = courseData.find(
//     (c) => c.slug === params.slug
//   );

//   if (!course) {
//     return (
//       <div className="py-20 text-center">
//         Course not found.
//       </div>
//     );
//   }

//   async function startLearning() {
//     if (!user) {
//       toast.error("Please login first.");
//       return;
//     }

//     const { data } = await supabase
//       .from("student_courses")
//       .select("*")
//       .eq("student_id", user.id)
//       .eq("course_id", course.id);

//     if (!data?.length) {
//       await supabase
//         .from("student_courses")
//         .insert({
//           student_id: user.id,
//           course_id: course.id,
//           progress: 0,
//         });
//     }

//     router.push(
//       `/dashboard/courses/${course.id}/lesson/1`
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl space-y-8">

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

//             {course.lessons.length} Lessons

//           </div>

//         </div>

//         <button
//           onClick={startLearning}
//           className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
//         >
//           Start Learning
//         </button>

//       </div>

//       <div className="rounded-3xl bg-white p-8 shadow">

//         <h2 className="mb-6 text-2xl font-bold">
//           Course Curriculum
//         </h2>

//         <div className="space-y-4">

//           {course.lessons.map((lesson) => (

//             <div
//               key={lesson.id}
//               className="flex items-center justify-between rounded-xl border p-5 hover:border-blue-500"
//             >
//               <div className="flex items-center gap-4">

//                 <PlayCircle
//                   className="text-blue-600"
//                   size={22}
//                 />

//                 <span className="font-medium">

//                   Lesson {lesson.id} — {lesson.title}

//                 </span>

//               </div>

//               <a
//                 href={lesson.url}
//                 target="_blank"
//                 className="flex items-center gap-2 text-blue-600"
//               >
//                 Read

//                 <ExternalLink size={16} />
//               </a>

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }
// // "use client";

// // import { useParams } from "next/navigation";
// // import { courseData } from "@/app/lib/courseData";

// // export default function LessonPage() {
// //   const params = useParams();

// //   const slug = params.slug as string;
// //   const lessonId = Number(params.id);

// //   const course = courseData.find(
// //     (c) => c.slug === slug
// //   );

// //   if (!course) {
// //     return (
// //       <div className="p-10 text-center">
// //         Course not found.
// //       </div>
// //     );
// //   }

// //   const lesson = course.lessons.find(
// //     (l) => l.id === lessonId
// //   );

// //   if (!lesson) {
// //     return (
// //       <div className="p-10 text-center">
// //         Lesson not found.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-5xl space-y-8">

// //       <h1 className="text-4xl font-bold">
// //         {course.title}
// //       </h1>

// //       <div className="rounded-2xl bg-white p-8 shadow">

// //         <h2 className="text-2xl font-bold">
// //           Lesson {lesson.id}
// //         </h2>

// //         <p className="mt-4 text-xl">
// //           {lesson.title}
// //         </p>

// //         <a
// //           href={lesson.url}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white"
// //         >
// //           Open Lesson
// //         </a>

// //       </div>

// //     </div>
// //   );
// // }