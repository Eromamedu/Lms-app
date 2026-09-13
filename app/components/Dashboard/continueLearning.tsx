import Button from "@/app/components/ui/button";
import { BookOpen, Play, Sparkles } from "lucide-react";

export default function ContinueLearning() {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-8 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-blue-950/30">

      {/* Ambient blue glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20"
        aria-hidden="true"
      />

      {/* Ambient cyan glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Continue Learning
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Pick up where you left off
              </p>
            </div>

          </div>

          <Sparkles
            size={18}
            className="animate-pulse text-cyan-400"
          />

        </div>

        {/* Course information */}
        <div className="mt-8">

          <h2 className="text-2xl font-black tracking-tight text-white">
            React Masterclass
          </h2>

          {/* Progress text */}
          <div className="mt-3 flex items-center justify-between">

            <p className="text-sm text-slate-400">
              Your progress
            </p>

            <span className="text-sm font-bold text-cyan-400">
                {/* <div className="h-3 w-[68%] rounded-full bg-blue-600"></div> */}
              68%
            </span>

          </div>

          {/* Progress bar */}
          {/* 68% Progress Bar */}
<div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-4 w-[68%] rounded-full bg-blue-600"></div>

  {/* <div
    className="h-full rounded-full bg-gradient-to-r from-white-600 via-white-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)]"
    style={{ width: "68%" }}
  /> */}
</div>
          {/* <div className="relative mt-3 h-4 w-full overflow-hidden rounded-full border border-white/10 bg-slate-800/80">

            {/* 68% filled area */}
            {/* <div
              className="absolute left-0 top-0 h-full w-[68%] rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-300 shadow-lg shadow-cyan-500/30 transition-all duration-1000"
              aria-label="Course progress: 68%"
            /> */}

          {/* </div> */} 

          {/* Progress description */}
          <div className="mt-3 flex items-center justify-between">
            <div className="mt-5 h-3 rounded-full bg-slate-200">
        <div className="h-3 w-[68%] rounded-full bg-blue-600"></div>
       </div>

            <p className="text-xs text-slate-500">
              Keep going 🚀
            </p>

          </div>

        </div>

        {/* Continue button */}
        <div className="mt-8 flex justify-center">

          <Button
            className="group/button flex w-full items-center justify-center gap-2"
          >
            <Play
              size={16}
              className="transition-transform duration-300 group-hover/button:translate-x-0.5"
            />

            <span>
              Continue Course
            </span>

          </Button>

        </div>

      </div>
    </div>
  );
}


// import Button from "@/app/components/ui/button";
// import { BookOpen, Play, Sparkles } from "lucide-react";

// export default function ContinueLearning() {
//   return (
//     <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-8 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-blue-950/30">

//       {/* Ambient glow */}
//       <div
//         className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20"
//         aria-hidden="true"
//       />

//       <div
//         className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl"
//         aria-hidden="true"
//       />

//       <div className="relative">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10">
//               <BookOpen size={20} />
//             </div>

//             <div>
//               <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
//                 Continue Learning
//               </p>

//               <p className="mt-1 text-xs text-slate-500">
//                 Pick up where you left off
//               </p>
//             </div>

//           </div>

//           <Sparkles
//             size={18}
//             className="animate-pulse text-cyan-400"
//           />
//         </div>

//         {/* Course information */}
//         <div className="mt-8">

//           <h2 className="text-2xl font-black tracking-tight text-white">
//             React Masterclass
//           </h2>

//           <div className="mt-2 flex items-center justify-between">
//             <p className="text-sm text-slate-400">
//               Your progress
//             </p>

//             <span className="text-sm font-bold text-cyan-400">
//               68%
//             </span>
//           </div>

//           {/* Progress bar */}
//           <div className="mt-3 h-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.05]">

//             <div
//               className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-300 shadow-lg shadow-cyan-500/20 transition-all duration-1000"
//             />

//           </div>

//           <p className="mt-2 text-xs text-slate-500">
//             You're more than halfway through this course.
//           </p>

//         </div>

//         {/* Continue button */}
//         <div className="mt-7">

//           <Button className="group/button flex items-center gap-2">
//             <Play
//               size={16}
//               className="transition-transform duration-300 group-hover/button:translate-x-0.5"
//             />

//             Continue Course
//           </Button>

//         </div>

//       </div>
//     </div>
//   );
// }


// import Button from "@/app/components/ui/button";

// export default function ContinueLearning() {
//   return (
//     <div className="rounded-2xl bg-white p-8 shadow-sm">
//       <p className="text-sm text-blue-600 font-semibold ">Continue Learning</p>

//       <h2 className="mt-3 text-2xl font-bold text-gray-600">React Masterclass</h2>

//       <p className="mt-2 text-slate-500">Progress: 68%</p>

//       <div className="mt-5 h-3 rounded-full bg-slate-200">
//         <div className="h-3 w-[68%] rounded-full bg-blue-600"></div>
//       </div>

//       <Button className="mt-8">Continue Course</Button>
//     </div>
//   );
// }
