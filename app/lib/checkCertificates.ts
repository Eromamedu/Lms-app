import { supabase } from "./supabase";

export async function checkCertificate(
  studentId: string,
  courseId: string
) {
  //-----------------------------------
  // Get total lessons
  //-----------------------------------

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id")
    .eq("course_id", courseId);

  if (!lessons?.length) return;

  //-----------------------------------
  // Get completed lessons
  //-----------------------------------

  const lessonIds = lessons.map(
    (lesson) => lesson.id
  );

  const { data: completed } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("student_id", studentId)
    .eq("completed", true)
    .in("lesson_id", lessonIds);

  //-----------------------------------
  // Every lesson completed?
  //-----------------------------------

//   if (completed?.length !== lessons.length) {
//     return;
//   }
if ((completed?.length ?? 0) < lessons.length) {
    return;
}

  //-----------------------------------
  // Already has certificate?
  //-----------------------------------

  const { data: existing } = await supabase
    .from("certificates")
    .select("id")
    .eq("student_id", studentId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (existing) return;

  //-----------------------------------
  // Issue certificate
  //-----------------------------------

  await supabase.from("certificates").insert({
    student_id: studentId,
    course_id: courseId,
  });
}