"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface Course {
  id: string;
  title: string;
  instructor: string;
}

interface Certificate {
  course_id: string;
  issued_at: string;
}

export default function CertificatesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    //---------------------------------
    // Current user
    //---------------------------------

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    //---------------------------------
    // Student profile
    //---------------------------------

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    setStudentName(profile?.full_name ?? "Student");

    //---------------------------------
    // All courses
    //---------------------------------

    const { data: courseRows } = await supabase
      .from("courses")
      .select("id,title,instructor")
      .order("title");

    setCourses(courseRows ?? []);

    //---------------------------------
    // Earned certificates
    //---------------------------------

    const { data: certificateRows } = await supabase
      .from("certificates")
      .select("course_id, issued_at")
      .eq("student_id", user.id);

    setCertificates(certificateRows ?? []);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600">
        Loading certificates...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        My Certificates
      </h1>

      <div className="grid gap-8 md:grid-cols-2">

        {courses.map((course) => {

          const earned = certificates.find(
            (certificate) =>
              certificate.course_id === course.id
          );

          return (
            <CertificateCard
              key={course.id}
              course={course}
              earned={earned}
              studentName={studentName}
            />
          );
        })}

      </div>

    </div>
  );
}

function CertificateCard({
  course,
  earned,
  studentName,
}: {
  course: Course;
  earned?: Certificate;
  studentName: string;
}) {
  if (!earned) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-8 opacity-70">

        <h2 className="text-2xl font-bold text-gray-700">
          {course.title}
        </h2>

        <p className="mt-6 text-gray-500">
          🔒 Certificate Locked
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Complete all 7 lessons to unlock this certificate.
        </p>

      </div>
    );
  }

//   
return (
  <div className="relative overflow-hidden rounded-3xl border-[12px] border-yellow-500 bg-white p-12 shadow-2xl">

    {/* Decorative Corners */}
    <div className="absolute left-0 top-0 h-24 w-24 rounded-br-full bg-yellow-100" />
    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-yellow-100" />
    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-yellow-100" />
    <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-yellow-100" />

    {/* Watermark */}
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <h1 className="text-[180px] font-black text-blue-700">
        LMS
      </h1>
    </div>

    <div className="relative z-10">

      <p className="text-center text-sm font-semibold uppercase tracking-[0.55em] text-gray-500">
        Certificate of Completion
      </p>

      <h1 className="mt-5 text-center text-5xl font-extrabold text-blue-700">
        🎓 LMS Academy
      </h1>

      <div className="mx-auto mt-8 h-1 w-40 rounded-full bg-yellow-500" />

      <p className="mt-12 text-center text-lg text-gray-600">
        This certificate is proudly presented to
      </p>

      <h2 className="mt-4 text-center text-5xl font-bold text-gray-900">
        {studentName}
      </h2>

      <p className="mt-12 text-center text-lg text-gray-700">
        for successfully completing the course
      </p>

      <h3 className="mt-4 text-center text-4xl font-bold text-blue-700">
        {course.title}
      </h3>

      <p className="mx-auto mt-8 max-w-2xl text-center text-gray-600 leading-8">
        This certificate recognizes the successful completion of all
        lessons, assignments, and learning objectives required for this
        course.
      </p>

      <div className="mt-16 grid grid-cols-2 gap-10">

        <div className="text-center text-gray-400">
          {/* <div className="border-t border-gray-500" /> */}

          <p className="mt-2 font-semibold">
            Instructor
          </p>

          <p>{course.instructor}</p>
        </div>

        <div className="text-center text-gray-400">
          {/* <div className="border-t border-gray-500" /> */}

          <p className="mt-2 font-semibold">
            Date Issued
          </p>

          <p>
            {new Date(
              earned.issued_at
            ).toLocaleDateString()}
          </p>
        </div>

      </div>

      <div className="mt-16 flex justify-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-yellow-500 bg-yellow-50 text-5xl shadow-lg">
          🏅
        </div>

      </div>

    </div>

  </div>
);
}