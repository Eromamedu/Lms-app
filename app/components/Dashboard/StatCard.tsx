"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
  href?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  href,
}: Props) {
  const card = (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg cursor-pointer text-gray-600">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div className={`${color} rounded-xl p-4 text-white`}>
          {icon}
        </div>

      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
// import React from "react";

// interface StatCardProps {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
//   color: string;
// }

// export default function StatCard({
//   title,
//   value,
//   icon,
//   color,
// }: StatCardProps) {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-slate-500">{title}</p>

//           <h2 className="mt-2 text-3xl font-bold text-slate-900">
//             {value}
//           </h2>
//         </div>

//         <div className={`${color} rounded-xl p-4 text-white`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }