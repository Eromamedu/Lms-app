import Button from "../ui/button";
import { Zap } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/20">

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400">

            <Zap size={18} />

          </div>

          <h2 className="text-xl font-bold text-white">
            Quick Actions
          </h2>

        </div>

        <div className="mt-6 space-y-3">

          <Button>
            Browse Courses
          </Button>

          <Button variant="secondary">
            View Assignments
          </Button>

        </div>

      </div>

    </div>
  );
}


// import Button from "../ui/button";

// export default function QuickActions() {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow-sm">

//       <h2 className="text-xl font-bold text-gray-600">
//         Quick Actions
//       </h2>

//       <div className="mt-6 space-y-3">

//         <Button>
//           Browse Courses
//         </Button>

//         <Button variant="secondary">
//           View Assignments
//         </Button>

//       </div>

//     </div>
//   );
// }