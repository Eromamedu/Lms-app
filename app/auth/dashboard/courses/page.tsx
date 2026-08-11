import CourseGrid from "@/app/components/course/courseGrid";

export default function CoursesPage() {
  return (
    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-500">

          My Courses

        </h1>

        <p className="mt-2 text-slate-500">

          Start your learning journey.

        </p>

      </div>

      <CourseGrid />

    </div>
  );
}