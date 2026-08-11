import { supabase } from "./supabase";
import { checkCertificate } from "@/app/lib/checkCertificates";

export async function completeLesson(
  lessonId: string,
  courseId: string,
  url: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.open(url, "_blank");
    return;
  }

  // Has this lesson already been completed?
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id")
    .eq("student_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (!existing) {
    await supabase.from("lesson_progress").insert({
      student_id: user.id,
      lesson_id: lessonId,
        course_id: courseId,
      completed: true,
      completed_at: new Date().toISOString(),
    });
  }
  
  // Total lessons in this course
  const { count: totalLessons } = await supabase
    .from("lessons")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("course_id", courseId);

  // Lessons completed in this course
//   const { count: completedLessons } = await supabase
//     .from("lesson_progress")
//     .select("*, lessons!inner(course_id)", {
//       count: "exact",
//       head: true,
//     })
//     .eq("student_id", user.id)
//     .eq("completed", true)
//     .eq("lessons.course_id", courseId);
// Get all lesson IDs for this course
const { data: lessonIds } = await supabase
  .from("lessons")
  .select("id")
  .eq("course_id", courseId);

// Count completed lessons
const { count: completedLessons } = await supabase
  .from("lesson_progress")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("student_id", user.id)
  .eq("completed", true)
  .in(
    "lesson_id",
    lessonIds?.map((lesson) => lesson.id) ?? []
  );

  const progress =
    totalLessons && completedLessons
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  await supabase
    .from("student_courses")
    .update({
      progress,
    })
    .eq("student_id", user.id)
    .eq("course_id", courseId);

    await checkCertificate(
  user.id,
  courseId
);


//   window.open(url, "_blank");
window.open(url, "_blank");

window.location.reload();
}