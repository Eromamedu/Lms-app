"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  slug: string;
  progress: number;
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const loadCourses = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  const { data: studentCourses, error } = await supabase
    .from("student_courses")
    .select("course_id, progress")
    .eq("student_id", user.id)
    .gt("progress", 0);

  if (error || !studentCourses) {
    console.error(error);
    setLoading(false);
    return;
  }

  const courseIds = studentCourses.map(
    (row) => row.course_id
  );

  const { data: courseRows } = await supabase
    .from("courses")
    .select("id, title, slug")
    .in("id", courseIds);

  if (!courseRows) {
    setLoading(false);
    return;
  }

  const formatted = studentCourses.map((studentCourse) => {
    const course = courseRows.find(
      (c) => c.id === studentCourse.course_id
    );

    return {
      id: course?.id ?? studentCourse.course_id,
      title: course?.title ?? "Unknown Course",
      slug: course?.slug ?? "",
      progress: studentCourse.progress,
    };
  });

  setCourses(formatted);
  setLoading(false);
};
    void loadCourses();

}, []);
//   async function loadCourses() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return;

//     const { data } = await supabase
//       .from("student_courses")
//       .select(`
//         progress,
//         courses (
//           id,
//           title,
//           slug
//         )
//       `)
//       .eq("student_id", user.id)
//       .gt("progress", 0);

//     if (!data) return;

//     const formatted = data.map((item: any) => ({
//       id: item.courses.id,
//       title: item.courses.title,
//       slug: item.courses.slug,
//       progress: item.progress,
//     }));

//     setCourses(formatted);
//   }

  return (
    <div className="space-y-6 text-gray-500">

      <h1 className="text-3xl font-bold text-gray-600">
        Started Courses
      </h1>
{loading && (
  <div className="py-10 text-center text-gray-500">
    Loading courses...
  </div>
)}
{!loading && courses.length === 0 && (
  <div className="py-10 text-center text-gray-500">
    You haven&apos;t started any courses yet.
  </div>
)}
      { !loading &&
      courses.map((course) => (

        <Link
          key={course.id}
          href={`/auth/dashboard/courses/${course.slug}`}
        >
          <div className="rounded-xl border p-5 hover:bg-gray-50 mb-6">

            <h2 className="text-xl font-semibold">
              {course.title}
            </h2>

            <p className="text-blue-600">
              Progress: {course.progress}%
            </p>

          </div>
        </Link>

      ))}

    </div>
  );
}