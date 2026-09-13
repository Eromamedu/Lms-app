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
  collapsed,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        group relative flex items-center overflow-hidden rounded-xl
        py-3 transition-all duration-300 ease-out

        ${collapsed ? "justify-center px-0" : "gap-3 px-4"}

        ${
          active
            ? `
              scale-[1.02]
              border border-blue-400/30
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-purple-600
              text-white
              shadow-[0_0_25px_rgba(59,130,246,0.30)]
            `
            : `
              border border-transparent
              text-slate-400

              hover:-translate-y-[1px]
              hover:border-blue-400/30
              hover:bg-gradient-to-r
              hover:from-blue-600/90
              hover:via-cyan-500/80
              hover:to-purple-600/90
              hover:text-white
              hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
            `
        }
      `}
    >
      {/* Light sweep animation */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      {/* Left glowing indicator */}
      <span
        className={`
          absolute left-0 top-1/2
          w-1
          -translate-y-1/2
          rounded-r-full
          bg-cyan-300
          shadow-[0_0_12px_rgba(34,211,238,0.9)]
          transition-all duration-300

          ${active ? "h-8" : "h-0 group-hover:h-6"}
        `}
      />

      {/* Icon */}
      <span
        className={`
          relative z-10
          flex items-center justify-center
          transition-all duration-300

          ${
            active
              ? "scale-105 text-white"
              : "group-hover:scale-110 group-hover:text-white"
          }
        `}
      >
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span
          className="
            relative z-10
            font-medium
            tracking-wide
            transition-all duration-300
            group-hover:translate-x-0.5
          "
        >
          {label}
        </span>
      )}

      {/* Ambient glow */}
      <span
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          bg-cyan-300/20
          blur-2xl
          transition-all
          duration-500

          ${
            active
              ? "scale-125 opacity-100"
              : "scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100"
          }
        `}
      />
    </Link>
  );
}

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ReactNode } from "react";

// interface SidebarItemProps {
//   href: string;
//   icon: ReactNode;
//   label: string;
//   collapsed?: boolean;
// }

// export default function SidebarItem({
//   href,
//   icon,
//   label,
//   collapsed,
// }: SidebarItemProps) {
//   const pathname = usePathname();

//   const active = pathname === href;

//   return (
//     <Link
//       href={href}
//       className={`flex items-center rounded-xl py-3 transition-all duration-200
//         ${
//           collapsed
//             ? "justify-center px-0"
//             : "gap-3 px-4"
//         }
//         ${
//           active
//             ? "bg-blue-600 text-white shadow-lg"
//             : "text-gray-600 hover:bg-blue-600 hover:text-white hover:shadow-lg"
//         }
//       `}
//     >
//       {icon}

//       {!collapsed && (
//         <span className="font-medium">
//           {label}
//         </span>
//       )}
//     </Link>
//   );
// }


// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { ReactNode } from "react";

// // interface SidebarItemProps {
// //   href: string;
// //   icon: ReactNode;
// //   label: string;
// //   collapsed?: boolean;
// // }

// // export default function SidebarItem({
// //   href,
// //   icon,
// //   label,
// //   collapsed
// // }: SidebarItemProps) {
// //   const pathname = usePathname();

// //   const active = pathname === href;

// //   return (
// //     <Link
// //       href={href}
// //       // className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200

// //       // ${
// //       //   active
// //       //     ? "bg-blue-600 text-white shadow-lg"
// //       //     : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
// //       // }`}
// //       className={`flex items-center rounded-xl py-3 transition-all duration-200
// // ${
// //   collapsed
// //     ? "justify-center px-0"
// //     : "gap-3 px-4"
// // }
// // ${
// //   active
// //     ? "bg-blue-600 text-white shadow-lg"
// //     : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
// // }`}
// //     >
// //       {icon}

// //      {!collapsed &&  <span className="font-medium">{label}</span>}
// //     </Link>
// //   );
// // }
// // // "use client";

// // // import Link from "next/link";
// // // import { usePathname } from "next/navigation";

// // // interface SidebarItemProps {
// // //   href: string;
// // //   icon: React.ReactNode;
// // //   label: string;
// // // }

// // // export default function SidebarItem({
// // //   href,
// // //   icon,
// // //   label,
// // // }: SidebarItemProps) {
// // //   const pathname = usePathname();
// // //   const active = pathname === href;

// // //   return (
// // //     <Link
// // //       href={href}
// // //       className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
// // //         active
// // //           ? "bg-blue-600 text-white"
// // //           : "text-slate-600 hover:bg-slate-100"
// // //       }`}
// // //     >
// // //       {icon}
// // //       <span>{label}</span>
// // //     </Link>
// // //   );
// // // }


// // // // import Link from "next/link";

// // // // interface SidebarItemProps {
// // // //   href: string;
// // // //   icon: React.ReactNode;
// // // //   label: string;
// // // //   active?: boolean;
// // // // }

// // // // export default function SidebarItem({
// // // //   href,
// // // //   icon,
// // // //   label,
// // // //   active,
// // // // }: SidebarItemProps) {
// // // //   return (
// // // //     <Link
// // // //       href={href}
// // // //       className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
// // // //         active
// // // //           ? "bg-blue-600 text-white"
// // // //           : "text-slate-600 hover:bg-slate-100"
// // // //       }`}
// // // //     >
// // // //       {icon}

// // // //       <span>{label}</span>
// // // //     </Link>
// // // //   );
// // // // }