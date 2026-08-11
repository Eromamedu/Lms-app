import LessonHeader from "@/app/components/lesson/LessonHeader";
import VideoPlayer from "@/app/components/lesson/VideoPlayer";
import LessonTabs from "@/app/components/lesson/LessonTabs";
import LessonNavigation from "@/app/components/lesson/LessonNavigation";

export default function LessonPage() {
  return (
    <div className="space-y-8">

      <LessonHeader />

      <VideoPlayer />

      <LessonTabs />

      <LessonNavigation />

    </div>
  );
}