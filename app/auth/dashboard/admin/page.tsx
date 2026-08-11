"use client";

import { seedAssignments } from "@/app/lib/seedAssignment";

export default function AdminPage() {
  return (
    <div className="p-10">
      <button
        onClick={seedAssignments}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Seed Assignments
      </button>
    </div>
  );
}
// "use client";

// import { seedAssignments } from "@/app/lib/seedAssignment";

// export default function SeedPage() {
//   return (
//     <div className="p-10">
//       <button
//         onClick={seedAssignments}
//         className="rounded bg-blue-600 px-6 py-3 text-white"
//       >
//         Seed Assignments
//       </button>
//     </div>
//   );
// }