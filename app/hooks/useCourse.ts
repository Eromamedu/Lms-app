"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  duration: string;
  slug: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  url: string;
  video_url: string | null;
  lesson_number: number;
}

export function useCourse(slug: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function loadCourse() {
      setLoading(true);

      // Load course
      const { data: courseData, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setCourse(courseData);

      // Load lessons
      const { data: lessonData } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseData.id)
        .order("lesson_number");


        console.log("Course:", courseData);
console.log("Lessons:", lessonData);
      setLessons(lessonData || []);

      setLoading(false);
    }

    loadCourse();
  }, [slug]);

  return {
    course,
    lessons,
    loading,
  };
}