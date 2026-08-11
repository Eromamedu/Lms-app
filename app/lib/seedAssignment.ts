import { supabase } from "./supabase";
import { assignmentData } from "./assignmentData";

export async function seedAssignments() {
  //----------------------------------------
  // Get all lessons
  //----------------------------------------

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id,title");

  if (error) {
    console.error(error);
    return;
  }

  //----------------------------------------
  // Group questions by lesson
  //----------------------------------------

  const grouped = assignmentData.reduce((acc, item) => {
    if (!acc[item.lessonTitle]) {
      acc[item.lessonTitle] = [];
    }

    acc[item.lessonTitle].push(item);

    return acc;
  }, {} as Record<string, typeof assignmentData>);

  //----------------------------------------
  // Create assignment for every lesson
  //----------------------------------------

  for (const lessonTitle in grouped) {
    const lesson = lessons.find(
      (l) => l.title === lessonTitle
    );

    if (!lesson) {
      console.log(
        "Lesson not found:",
        lessonTitle
      );
      continue;
    }

    //----------------------------------------
    // Insert Assignment
    //----------------------------------------

    const { data: assignment, error } =
      await supabase
        .from("assignments")
        .insert({
          lesson_id: lesson.id,
          title: `${lessonTitle} Assignment`,
          description: `Complete this assignment after studying ${lessonTitle}.`,
          total_marks: grouped[lessonTitle].length,
        })
        .select()
        .single();

    if (error) {
      console.log(error);
      continue;
    }

    //----------------------------------------
    // Insert Questions
    //----------------------------------------

    const questions = grouped[
      lessonTitle
    ].map((q) => ({
      assignment_id: assignment.id,
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
      marks: 1,
    }));

    const { error: questionError } =
      await supabase
        .from("assignment_questions")
        .insert(questions);

    if (questionError) {
      console.log(questionError);
    }
  }

  console.log("Finished seeding assignments.");
}



// import { supabase } from "./supabase";
// import { assignmentData } from "./assignmentData";

// export async function seedAssignments() {
//   //---------------------------------------
//   // Get every lesson
//   //---------------------------------------

//   const { data: lessons, error } = await supabase
//     .from("lessons")
//     .select("id,title");

//   if (error) {
//     console.error(error);
//     return;
//   }

//   //---------------------------------------
//   // Loop through lessons
//   //---------------------------------------

//   for (const lesson of lessons) {
//     //---------------------------------------
//     // Questions for this lesson
//     //---------------------------------------

//     const questions = assignmentData.filter(
//       (q) =>
//         q.lessonTitle.trim().toLowerCase() ===
//         lesson.title.trim().toLowerCase()
//     );

//     if (!questions.length) continue;

//     //---------------------------------------
//     // Create Assignment
//     //---------------------------------------

//     const { data: assignment, error: assignmentError } =
//       await supabase
//         .from("assignments")
//         .insert({
//           lesson_id: lesson.id,
//           title: `${lesson.title} Assignment`,
//           description: `Complete the questions for ${lesson.title}.`,
//           total_marks: questions.length,
//         })
//         .select()
//         .single();

//     if (assignmentError) {
//       console.error(assignmentError);
//       continue;
//     }

//     //---------------------------------------
//     // Insert Questions
//     //---------------------------------------

//     const rows = questions.map((question) => ({
//       assignment_id: assignment.id,
//       question: question.question,
//       option_a: question.option_a,
//       option_b: question.option_b,
//       option_c: question.option_c,
//       option_d: question.option_d,
//       correct_answer: question.correct_answer,
//       marks: 1,
//     }));

//     const { error: questionError } = await supabase
//       .from("assignment_questions")
//       .insert(rows);

//     if (questionError) {
//       console.error(questionError);
//     }
//   }

//   console.log("Finished seeding assignments.");
// }