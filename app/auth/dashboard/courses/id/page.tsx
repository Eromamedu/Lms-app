import CourseHeader from "@/app/components/course/CourseHeader";
import CourseDescription from "@/app/components/course/CourseDescription";
import LessonList from "@/app/components/course/LessonList";

export default function CourseDetailsPage() {
  return (
    <div className="space-y-8">

      <CourseHeader />

      <CourseDescription />

      <LessonList />

    </div>
  );
}