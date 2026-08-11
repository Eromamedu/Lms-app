"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
//   student: string;

  lessons: {
    id: string;
    title: string;
    url: string;
  }[];

  progress: number;
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Load all courses
    const { data: courseData } = await supabase
      .from("courses")
      .select("*")
      .order("title");

    if (!courseData) {
      setLoading(false);
      return;
    }

    const finalCourses: Course[] = [];

    for (const course of courseData) {
      // Load lessons for this course
      const { data: lessons } = await supabase
        .from("lessons")
        .select("id,title,url")
        .eq("course_id", course.id);

      let progress = 0;

      if (user) {
        const { data: studentCourse } = await supabase
          .from("student_courses")
          .select("progress")
          .eq("student_id", user.id)
          .eq("course_id", course.id)
          .maybeSingle();

        progress = studentCourse?.progress ?? 0;
      }

      finalCourses.push({
        ...course,
        lessons: lessons ?? [],
        progress,
      });
    }

    setCourses(finalCourses);
    setLoading(false);
  }

  return {
    courses,
    loading,
    reloadCourses: loadCourses,
  };
}