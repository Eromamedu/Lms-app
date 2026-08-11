import { Flame } from "lucide-react";

export default function LearningStreak() {
  return (
    <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-sm">

      <Flame
        size={40}
      />

      <h2 className="mt-5 text-3xl font-bold">

        18 Days

      </h2>

      <p>

        Current Learning Streak

      </p>

    </div>
  );
}