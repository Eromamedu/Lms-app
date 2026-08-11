import { CheckCircle, PlayCircle, Circle } from "lucide-react";

interface LessonItemProps {
  title: string;
  status: "completed" | "current" | "locked";
}

export default function LessonItem({
  title,
  status,
}: LessonItemProps) {
  const icon =
    status === "completed" ? (
      <CheckCircle className="text-green-600" size={20} />
    ) : status === "current" ? (
      <PlayCircle className="text-blue-600" size={20} />
    ) : (
      <Circle className="text-slate-400" size={20} />
    );

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50">
      {icon}

      <span className="font-medium">{title}</span>
    </div>
  );
}