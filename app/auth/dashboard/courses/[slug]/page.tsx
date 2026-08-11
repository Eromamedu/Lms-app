"use client";
import { completeLesson } from "@/app/lib/completeLesson";
import { useParams, useRouter } from "next/navigation";
// import { courseData } from "@/app/lib/courseData";
import { useCourse } from "@/app/hooks/useCourse";
// import { courseData } from "@/app/lib/courseData";
import { useUser } from "@/app/context/UseContext";
import { supabase } from "@/app/lib/supabase";
import toast from "react-hot-toast";
// import { completeLesson } from "@/app/lib/progress";
import {
  Clock,
  BookOpen,
  User,
  PlayCircle,
  ExternalLink,
} from "lucide-react";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

//   const course = courseData.find(
//     (c) => c.slug === params.slug
//   );
const {
  course,
  lessons,
  loading,
} = useCourse(params.slug as string);

if (loading) {
  return (
    <div className="py-20 text-center text-gray-500">
      Loading course...
    </div>
  );
}
  if (!course) {
    return (
      <div className="py-20 text-center">
        Course not found.
      </div>
    );
  }
  async function startLearning() {
  if (!user) {
    toast.error("Please login first.");
    return;
  }

  const { data, error } = await supabase
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
    // .insert({
    //   student_id: user.id,
    //   course_id: course?.id,
    //   progress: 0,
    // })
    .select();

//   console.log("DATA:", data);
//   console.log("ERROR:", error);
// console.log("Course ID:", course?.id);
// console.log("User ID:", user.id);
// console.log("Insert data:", data);
// console.log("Insert error:", error);

  if (error) {
    toast.error(error.message);
    return;
  }
// const { data, error } = await supabase
//   .from("student_courses")
//   .insert({
//     student_id: user.id,
//     course_id: course.id,
//     progress: 0,
//   })
//   .select();

// console.log("ERROR OBJECT:", JSON.stringify(error, null, 2));

// if (error) {
//   alert(JSON.stringify(error, null, 2));
//   return;
// }
  router.push(`auth/dashboard/courses/${course?.slug}`);
}
//   async function startLearning() {
//   if (!user) {
//     toast.error("Please login first.");
//     return;
//   }

//   console.log("User ID:", user.id);
//   console.log("Course ID:", course.id);

//   const { data, error } = await supabase
//     .from("student_courses")
//     .insert({
//       student_id: user.id,
//       course_id: course.id,
//       progress: 0,
//     })
//     .select();

//   console.log("Insert data:", data);
//   console.log("Insert error:", error);

//   if (error) {
//     // toast.error(error.message);
//       alert(JSON.stringify(error, null, 2));
//     return;
//   }

//   router.push(`/dashboard/courses/${course.slug}/lesson/${course.lessons[0].id}`);
// }

//   async function startLearning() {
//     if (!user) {
//       toast.error("Please login first.");
//       return;
//     }

//     const { data } = await supabase
//       .from("student_courses")
//       .select("*")
//       .eq("student_id", user.id)
//       .eq("course_id", course?.id);

//     if (!data?.length) {
//       await supabase
//         .from("student_courses")
//         .insert({
//           student_id: user.id,
//           course_id: course?.id,
//           progress: 0,
//         });
//     }

//     router.push(
//       `/dashboard/courses/${course?.slug}/lesson/1`
//     );
//   }
// async function markLessonComplete(
//   lessonId: string,
//   url: string
// ) {
//   if (!user) {
//     toast.error("Please login.");
//     return;
//   }
//   if (!course) {
//     return;
//   }


//   await completeLesson(
//     user.id,
//     lessonId,
//     course.id
//   );

//   window.open(url, "_blank");
// }
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
    <div className="mx-auto max-w-6xl space-y-8 text-gray-600">

      <div className="rounded-3xl bg-white p-8 shadow">

        <h1 className="text-4xl font-bold text-gray-800">
          {course.title}
        </h1>

        <p className="mt-4 text-gray-600 leading-8">
          {course.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-8">

          <div className="flex items-center gap-2">

            <User size={18} />

            {course.instructor}

          </div>

          <div className="flex items-center gap-2">

            <Clock size={18} />

            {course.duration}

          </div>

          <div className="flex items-center gap-2">

            <BookOpen size={18} />

            {lessons.length} Lessons

          </div>

        </div>

        {/* <button
          onClick={startLearning}
          className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Start Learning
        </button> */}

      </div>

      <div className="rounded-3xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Course Curriculum
        </h2>

        <div className="space-y-4">

          {lessons.map((lesson) => (

            <div
              key={lesson.lesson_number}
              className="flex items-center justify-between rounded-xl border p-5 hover:border-blue-500"
            >
              <div className="flex items-center gap-4">

                {/* <PlayCircle
                  className="text-blue-600"
                  size={22}
                /> */}
                {/* <a
  href={lesson.video_url ?? "#"}
  target="_blank"
  rel="noopener noreferrer"
> */}
    {/* <button
    // markLessonComplete(
    //   lesson.id,
    //   lesson.video_url || "#"
    // )
    onClick={() =>
    completeLesson(
      lesson.id,
      course.id,
      lesson.video_url ?? "#"
    )
  }
>

    
  <PlayCircle
    className="cursor-pointer text-blue-600 hover:text-red-600"
    size={22}
  />
  </button> */}
<button
  onClick={() =>
    markLessonComplete(
      lesson.id,
      lesson.video_url ?? "#"
    )
  }
>
  <PlayCircle
    className="cursor-pointer text-blue-600 hover:text-red-600"
    size={22}
  />
</button>


{/* </a> */}

                <span className="font-medium">

                  {/* Lesson {lesson.id} — {lesson.title} */}
                  Lesson {lesson.lesson_number} — {lesson.title}

                </span>

              </div>

              {/* <a
                href={lesson.url}
                target="_blank"
                className="flex items-center gap-2 text-blue-600"
              > */}
              {/* <a
  href={lesson.url}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
>
                Read

                <ExternalLink size={16} />
              </a> */}
              {/* <button
  onClick={() =>
    markLessonComplete(
      lesson.id,
      lesson.url
    )
  }
  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
>
  Read

  <ExternalLink size={16} />
</button> */}

<button
  onClick={() =>
    markLessonComplete(
      lesson.id,
      lesson.url
    )
  }
  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
>
  Read
  <ExternalLink size={16} />
</button>
{/* <button
  onClick={() =>
    completeLesson(
      lesson.id,
      course.id,
      lesson.url
    )
  }
  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
>
  Read
  <ExternalLink size={16} />
</button> */}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}