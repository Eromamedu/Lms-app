import { redirect } from "next/navigation";

export default function Home() {
  redirect("auth/login");
}

// export default function HomePage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="text-center">
//         <h1 className="text-5xl font-bold text-slate-900">
//           Learning Management System
//         </h1>

//         <p className="mt-4 text-lg text-slate-600">
//           Professional LMS built with Next.js & React
//         </p>
//       </div>
//     </main>
//   );
// }
// export default function HomePage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="text-center">
//         <h1 className="text-5xl font-bold text-slate-900">
//           Learning Management System
//         </h1>

//         <p className="mt-4 text-lg text-slate-600">
//           Professional LMS built with Next.js & React
//         </p>
//       </div>
//     </main>
//   );
// }