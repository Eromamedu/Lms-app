import { Star, Clock, BookOpen, Users } from "lucide-react";

export default function CourseHeader() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h1 className="text-4xl font-bold text-gray-600">

        Complete React Masterclass

      </h1>

      <div className="mt-5 flex flex-wrap gap-6 text-slate-600">

        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" size={18} />
          4.9 Rating
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} />
          18 Hours
        </div>

        <div className="flex items-center gap-2">
          <BookOpen size={18} />
          48 Lessons
        </div>

        <div className="flex items-center gap-2">
          <Users size={18} />
          3,200 Students
        </div>

      </div>

    </div>
  );
}