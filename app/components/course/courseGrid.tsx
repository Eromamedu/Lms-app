"use client";

import CourseCard from "./CourseCard";
import { useCourses } from "@/app/hooks/useCourses";

export default function CourseGrid() {
  const { courses, loading } = useCourses();

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 text-gray-600">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          courseData={course}
        />
      ))}
    </div>
  );
}




// import CourseCard from "./CourseCard";
// import { courseData } from "@/app/lib/courseData";

// export default function CourseGrid() {
//   return (
//     <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 text-gray-600">

//       {courseData.map((course) => (
//         <CourseCard
//           key={course.id}
//           courseData={course}
//         />
//       ))}

//     </div>
//   );
// }