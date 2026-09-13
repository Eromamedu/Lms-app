import { Megaphone, Sparkles } from "lucide-react";

export default function AnnouncementCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-blue-950/30">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 h-36 w-36 rounded-full bg-cyan-500/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10">
            <Megaphone size={19} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Announcements
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Latest updates
            </p>
          </div>

        </div>

        <Sparkles
          size={17}
          className="animate-pulse text-cyan-400"
        />

      </div>

      {/* Announcement */}
      <div className="relative overflow-hidden rounded-xl border border-blue-400/10 bg-blue-500/[0.06] p-5 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.09]">

        {/* Small animated shine */}
        <div
          className="pointer-events-none absolute inset-y-0 -left-20 w-20 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          style={{
            animation: "shine 5s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative">

          <div className="mb-3 flex items-center gap-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              New announcement
            </span>

          </div>

          <h3 className="font-semibold text-white">
            New React Bootcamp Released
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Start learning the latest React
            features today.
          </p>

        </div>

      </div>

    </div>
  );
}



// import { Megaphone } from "lucide-react";

// export default function AnnouncementCard() {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow-sm">

//       <div className="mb-5 flex items-center gap-3">

//         <Megaphone className="text-blue-600"/>

//         <h2 className="text-xl font-bold text-gray-600">

//           Announcements

//         </h2>

//       </div>

//       <div className="rounded-xl bg-blue-50 p-5">

//         <h3 className="font-semibold text-gray-500">

//           New React Bootcamp Released

//         </h3>

//         <p className="mt-2 text-slate-600">

//           Start learning the latest React
//           features today.

//         </p>

//       </div>

//     </div>
//   );
// }