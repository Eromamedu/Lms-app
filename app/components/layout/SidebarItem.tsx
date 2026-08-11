"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  collapsed?: boolean;
}

export default function SidebarItem({
  href,
  icon,
  label,
  collapsed
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      // className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200

      // ${
      //   active
      //     ? "bg-blue-600 text-white shadow-lg"
      //     : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
      // }`}
      className={`flex items-center rounded-xl py-3 transition-all duration-200
${
  collapsed
    ? "justify-center px-0"
    : "gap-3 px-4"
}
${
  active
    ? "bg-blue-600 text-white shadow-lg"
    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
}`}
    >
      {icon}

     {!collapsed &&  <span className="font-medium">{label}</span>}
    </Link>
  );
}
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface SidebarItemProps {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
// }

// export default function SidebarItem({
//   href,
//   icon,
//   label,
// }: SidebarItemProps) {
//   const pathname = usePathname();
//   const active = pathname === href;

//   return (
//     <Link
//       href={href}
//       className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
//         active
//           ? "bg-blue-600 text-white"
//           : "text-slate-600 hover:bg-slate-100"
//       }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </Link>
//   );
// }


// // import Link from "next/link";

// // interface SidebarItemProps {
// //   href: string;
// //   icon: React.ReactNode;
// //   label: string;
// //   active?: boolean;
// // }

// // export default function SidebarItem({
// //   href,
// //   icon,
// //   label,
// //   active,
// // }: SidebarItemProps) {
// //   return (
// //     <Link
// //       href={href}
// //       className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
// //         active
// //           ? "bg-blue-600 text-white"
// //           : "text-slate-600 hover:bg-slate-100"
// //       }`}
// //     >
// //       {icon}

// //       <span>{label}</span>
// //     </Link>
// //   );
// // }