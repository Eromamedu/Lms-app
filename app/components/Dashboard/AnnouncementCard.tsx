import { Megaphone } from "lucide-react";

export default function AnnouncementCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <Megaphone className="text-blue-600"/>

        <h2 className="text-xl font-bold text-gray-600">

          Announcements

        </h2>

      </div>

      <div className="rounded-xl bg-blue-50 p-5">

        <h3 className="font-semibold text-gray-500">

          New React Bootcamp Released

        </h3>

        <p className="mt-2 text-slate-600">

          Start learning the latest React
          features today.

        </p>

      </div>

    </div>
  );
}