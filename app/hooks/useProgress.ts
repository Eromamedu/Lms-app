"use client";

import { supabase } from "@/app/lib/supabase";

export async function completeLesson(
  studentId: string,
  courseId: string,
  lessonId: string
) {
  // Check if lesson is already completed
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("student_id", studentId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existing) {
    return; 
  }

  // Save completed lesson
  const { error } = await supabase
    .from("lesson_progress")
    .insert({
      student_id: studentId,
      course_id: courseId,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date(),
    });

  if (error) throw error;

  // Total lessons in course
  const { count: totalLessons } = await supabase
    .from("lessons")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  // Completed lessons
  const { count: completedLessons } = await supabase
    .from("lesson_progress")
    .select("*", { count: "exact", head: true })
    .eq("student_id", studentId)
    .eq("course_id", courseId);

  const progress = Math.round(
    ((completedLessons ?? 0) / (totalLessons ?? 1)) * 100
  );

  await supabase
    .from("student_courses")
    .update({
      progress,
    })
    .eq("student_id", studentId)
    .eq("course_id", courseId);
}