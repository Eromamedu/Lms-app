import { notFound } from "next/navigation";

import { courseData } from "@/app/lib/courseData";

interface Props {
  params: {
    id: string;
  };
}

export default function CoursePage({
  params,
}: Props) {
  const course = courseData.find(
    (c) => c.id === params.id
  );

  if (!course) {
    return notFound();
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-gray-700">
        {course.title}
      </h1>

      <p className="text-gray-500">
        {course.description}
      </p>

    </div>
  );
}