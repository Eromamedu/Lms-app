"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Button from "../ui/button";

import CourseProgress from "./CourseProgress";

import { supabase } from "@/app/lib/supabase";

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
    // students: number;
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

    // const { error } = await supabase
    //   .from("student_courses")
    //   .upsert({
    //     student_id: user.id,
    //     course_id: courseData.id,
    //     progress: 0,
    //   });
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

    router.push(`/auth/dashboard/courses/${courseData.slug}`);
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-56">
        <Image
          src={courseData.image}
          alt={courseData.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">
            {courseData.title}
          </h2>

          <p className="mt-2 text-slate-500">
            {courseData.instructor}
          </p>
        </div>

        <div className="flex justify-between text-sm text-slate-500">
          <span>{courseData.lessons.length} Lessons</span>

          <span>{courseData.duration}</span>
        </div>

        <CourseProgress value={courseData.progress} />

        <Button onClick={startLearning}>
          Start Learning
        </Button>
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