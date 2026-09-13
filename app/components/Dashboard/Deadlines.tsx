import { AlertCircle, Clock } from "lucide-react";

export default function Deadlines() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-red-400/20 hover:shadow-red-950/20">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 h-36 w-36 rounded-full bg-amber-500/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative mb-5 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-400 shadow-lg shadow-red-500/10">

          <Clock size={19} />

        </div>

        <div>

          <h2 className="text-xl font-bold text-white">
            Upcoming Deadlines
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Stay ahead of your tasks
          </p>

        </div>

      </div>

      {/* Deadline 1 */}
      <div className="relative overflow-hidden rounded-xl border border-red-400/10 bg-red-500/[0.06] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/20 hover:bg-red-500/[0.09]">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">

            <AlertCircle size={17} />

          </div>

          <div>

            <h3 className="font-semibold text-white">
              React Dashboard Assignment
            </h3>

            <p className="mt-1 text-sm font-medium text-red-400">
              Due Tomorrow
            </p>

          </div>

        </div>

      </div>

      {/* Deadline 2 */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-amber-400/10 bg-amber-500/[0.06] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20 hover:bg-amber-500/[0.09]">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">

            <Clock size={17} />

          </div>

          <div>

            <h3 className="font-semibold text-white">
              JavaScript Quiz
            </h3>

            <p className="mt-1 text-sm font-medium text-amber-400">
              Friday
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

// export default function Deadlines() {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow-sm">

//       <h2 className="text-xl font-bold text-gray-600">
//         Upcoming Deadlines
//       </h2>

//       <div className="mt-6 space-y-4">

//         <div className="rounded-xl bg-red-50 p-4">

//           <h3 className="font-semibold text-gray-500">

//             React Dashboard Assignment

//           </h3>

//           <p className="text-sm text-red-600">

//             Due Tomorrow

//           </p>

//         </div>

//         <div className="rounded-xl bg-yellow-50 p-4">

//           <h3 className="font-semibold text-gray-500 ">

//             JavaScript Quiz

//           </h3>

//           <p className="text-sm text-yellow-700">

//             Friday

//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }