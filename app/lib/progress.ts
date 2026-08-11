// import { supabase } from "./supabase";

// export async function completeLesson(
//   userId: string,
//   lessonId: string,
//   courseId: string
// ) {
//   // Check if lesson is already completed
//   const { data: existing } = await supabase
//     .from("lesson_progress")
//     .select("id")
//     .eq("student_id", userId)
//     .eq("lesson_id", lessonId)
//     .maybeSingle();

//   if (existing) return;

//   // Save lesson completion
//   const { error } = await supabase
//     .from("lesson_progress")
//     .insert({
//       student_id: userId,
//       lesson_id: lessonId,
//       course_id: courseId,
//       completed: true,
//       completed_at: new Date().toISOString(),
//     });

//   if (error) {
//     console.error(error);
//     return;
//   }

//   // Count total lessons in this course
//   const { count: totalLessons } = await supabase
//     .from("lessons")
//     .select("*", {
//       count: "exact",
//       head: true,
//     })
//     .eq("course_id", courseId);

//   // Get lesson IDs for this course
//   const { data: lessonIds } = await supabase
//     .from("lessons")
//     .select("id")
//     .eq("course_id", courseId);

//   // Count completed lessons
//   const { count: completedLessons } = await supabase
//     .from("lesson_progress")
//     .select("*", {
//       count: "exact",
//       head: true,
//     })
//     .eq("student_id", userId)
//     .in(
//       "lesson_id",
//       lessonIds?.map((lesson) => lesson.id) ?? []
//     );

//   const progress = Math.round(
//     ((completedLessons ?? 0) / (totalLessons ?? 1)) * 100
//   );

//   await supabase
//     .from("student_courses")
//     .update({
//       progress,
//     })
//     .eq("student_id", userId)
//     .eq("course_id", courseId);
// }


// // import { supabase } from "./supabase";

// // export async function completeLesson(
// //   userId: string,
// //   lessonId: string,
// //   courseId: string
// // ) {
// //   // Check if lesson was already completed
// //   const { data: existing } = await supabase
// //     .from("lesson_progress")
// //     .select("id")
// //     .eq("student_id", userId)
// //     .eq("lesson_id", lessonId)
// //     .maybeSingle();

// //   // Already completed?
// //   if (existing) return;

// //   // Save lesson completion
// //   await supabase
// //     .from("lesson_progress")
// //     .insert({
// //       student_id: userId,
// //       lesson_id: lessonId,
// //       completed: true,
// //     });

// //   // Count lessons in this course
// //   const { count: totalLessons } = await supabase
// //     .from("lessons")
// //     .select("*", { count: "exact", head: true })
// //     .eq("course_id", courseId);

// //   // Count completed lessons
// //   const { count: completedLessons } = await supabase
// //     .from("lesson_progress")
// //     .select("lesson_id", { count: "exact", head: true })
// //     .eq("student_id", userId)
// //     .in(
// //       "lesson_id",
// //       (
// //         await supabase
// //           .from("lessons")
// //           .select("id")
// //           .eq("course_id", courseId)
// //       ).data?.map((l) => l.id) || []
// //     );

// //   const progress = Math.round(
// //     ((completedLessons || 0) / (totalLessons || 1)) * 100
// //   );

// //   await supabase
// //     .from("student_courses")
// //     .update({
// //       progress,
// //     })
// //     .eq("student_id", userId)
// //     .eq("course_id", courseId);
// // }