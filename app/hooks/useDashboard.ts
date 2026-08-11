"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/context/UseContext";

interface DashboardData {
  courses: number;
  lessons: number;
  progress: number;
}

export function useDashboard() {
  const { user } = useUser();

  const [data, setData] = useState<DashboardData>({
    courses: 0,
    lessons: 0,
    progress: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadDashboard() {
      // Courses started
      const { count: courseCount } = await supabase
        .from("student_courses")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("student_id", user?.id);

      // Lessons completed
      const { count: lessonCount } = await supabase
        .from("lesson_progress")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("student_id", user?.id);

      // Progress
      const { data: progressData } = await supabase
        .from("student_courses")
        .select("progress")
        .eq("student_id", user?.id);

      let average = 0;

      if (progressData?.length) {
        average =
          progressData.reduce(
            (sum, item) => sum + item.progress,
            0
          ) / progressData.length;
      }

      setData({
        courses: courseCount || 0,
        lessons: lessonCount || 0,
        progress: Math.round(average),
      });

      setLoading(false);
    }

    loadDashboard();
  }, [user]);

  return {
    data,
    loading,
  };
}