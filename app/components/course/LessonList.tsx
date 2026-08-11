import LessonItem from "./LessonItem";

const lessons = [
  {
    title: "Introduction",
    status: "completed",
  },

  {
    title: "React Components",
    status: "completed",
  },

  {
    title: "Props & State",
    status: "completed",
  },

  {
    title: "React Hooks",
    status: "current",
  },

  {
    title: "Context API",
    status: "locked",
  },

  {
    title: "Authentication",
    status: "locked",
  },

  {
    title: "Deployment",
    status: "locked",
  },
] as const;

export default function LessonList() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-gray-600">
        Course Curriculum
      </h2>

      <div className="space-y-4 text-gray-600">

        {lessons.map((lesson) => (
          <LessonItem
            key={lesson.title}
            title={lesson.title}
            status={lesson.status}
          />
        ))}

      </div>

    </div>
  );
}