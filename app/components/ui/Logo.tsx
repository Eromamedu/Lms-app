import { GraduationCap } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">

      <GraduationCap
        className="text-blue-600"
        size={36}
      />

      <span className="text-2xl font-bold text-slate-900">
        EduCore
      </span>

    </div>
  );
}