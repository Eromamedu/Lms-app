import { CalendarDays, Clock } from "lucide-react";

export default function UpcomingClasses() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-cyan-950/20">

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">

            <CalendarDays size={19} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Upcoming Classes
            </h2>

            <p className="text-xs text-slate-500">
              Your next learning sessions
            </p>

          </div>

        </div>

        {/* Class 1 */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]">

          <h3 className="font-semibold text-white">
            React Hooks Deep Dive
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

            <Clock size={14} />

            Today • 10:00 AM

          </div>

        </div>

        {/* Class 2 */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-purple-400/[0.04]">

          <h3 className="font-semibold text-white">
            TypeScript Basics
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

            <Clock size={14} />

            Tomorrow • 2:00 PM

          </div>

        </div>

      </div>

    </div>
  );
}



// export default function UpcomingClasses() {
//   return (
//     <div className="rounded-2xl bg-white p-8 shadow-sm">

//       <h2 className="text-xl font-bold text-gray-600">
//         Upcoming Classes
//       </h2>

//       <div className="mt-6 rounded-xl border p-5">

//         <h3 className="font-semibold text-gray-600">
//           React Hooks Deep Dive
//         </h3>

//         <p className="mt-2 text-slate-500">
//           Today • 10:00 AM
//         </p>

//       </div>

//       <div className="mt-4 rounded-xl border p-5">

//         <h3 className="font-semibold text-gray-600">
//           TypeScript Basics
//         </h3>

//         <p className="mt-2 text-slate-500">
//           Tomorrow • 2:00 PM
//         </p>

//       </div>

//     </div>
//   );
// }