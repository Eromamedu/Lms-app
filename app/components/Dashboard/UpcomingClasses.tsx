export default function UpcomingClasses() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-600">
        Upcoming Classes
      </h2>

      <div className="mt-6 rounded-xl border p-5">

        <h3 className="font-semibold text-gray-600">
          React Hooks Deep Dive
        </h3>

        <p className="mt-2 text-slate-500">
          Today • 10:00 AM
        </p>

      </div>

      <div className="mt-4 rounded-xl border p-5">

        <h3 className="font-semibold text-gray-600">
          TypeScript Basics
        </h3>

        <p className="mt-2 text-slate-500">
          Tomorrow • 2:00 PM
        </p>

      </div>

    </div>
  );
}