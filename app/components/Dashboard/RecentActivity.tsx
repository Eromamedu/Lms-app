import { CheckCircle2, Activity } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    "Completed JavaScript Quiz",
    "Submitted React Assignment",
    "Enrolled in Next.js Course",
    "Downloaded Certificate",
  ];

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/20">

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">

            <Activity size={19} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Recent Activity
            </h2>

            <p className="text-xs text-slate-500">
              Your latest learning activity
            </p>

          </div>

        </div>

        <div className="mt-6 space-y-3">

          {activities.map((activity, index) => (

            <div
              key={activity}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-slate-300 transition-all duration-300 hover:translate-x-1 hover:border-emerald-400/15 hover:bg-emerald-400/[0.04]"
            >

              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">

                <CheckCircle2 size={15} />

              </div>

              <span className="text-sm">
                {activity}
              </span>

              <span className="ml-auto text-[10px] text-slate-600">
                {index + 1}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

// export default function RecentActivity() {
//   const activities = [
//     "Completed JavaScript Quiz",
//     "Submitted React Assignment",
//     "Enrolled in Next.js Course",
//     "Downloaded Certificate",
//   ];

//   return (
//     <div className="rounded-2xl bg-white p-8 shadow-sm">

//       <h2 className="text-xl font-bold text-gray-600">
//         Recent Activity
//       </h2>

//       <div className="mt-6 space-y-4">

//         {activities.map((activity) => (
//           <div
//             key={activity}
//             className="rounded-xl bg-slate-50 p-4 text-gray-600"
//           >
//             {activity}
//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }