import { Clock, BookOpen } from "lucide-react";

export default function LessonHeader() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h1 className="text-3xl font-bold text-gray-500">

        React Hooks Explained

      </h1>

      <div className="mt-4 flex flex-wrap gap-6 text-slate-500">

        <div className="flex items-center gap-2">
          <BookOpen size={18}/>
          Lesson 12 of 48
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18}/>
          24 Minutes
        </div>

      </div>

    </div>
  );
}