import { supabase } from "./supabase";

export async function submitAssignment(
  lessonId: string,
  answers: string[]
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  //-----------------------------------
  // Get Questions
  //-----------------------------------

  const { data: questions, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("id");

  if (error || !questions) {
    console.error(error);
    return null;
  }

  //-----------------------------------
  // Grade
  //-----------------------------------

  let score = 0;

  questions.forEach((question, index) => {
    if (answers[index] === question.correct_answer) {
      score++;
    }
  });

  //-----------------------------------
  // Save Result
  //-----------------------------------

  const { error: saveError } = await supabase
    .from("assignment_results")
    .upsert(
      {
        student_id: user.id,
        lesson_id: lessonId,
        score,
        total: questions.length,
      },
      {
        onConflict: "student_id,lesson_id",
      }
    );

  if (saveError) {
    console.error(saveError);
    return null;
  }

  return {
    score,
    total: questions.length,
  };
}