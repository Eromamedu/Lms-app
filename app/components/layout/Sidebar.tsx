"use client";

import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileQuestion,
  Award,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      setUserName(data?.full_name ?? "");
    };

    getUser();
  }, []);

  /*
  ==================================================
  CLOSE MOBILE SIDEBAR
  ==================================================
  */

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobileSidebar}
          className="
            fixed
            inset-0
            z-[60]
            cursor-default
            bg-black/70
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[70]
          flex
          h-[100dvh]
          flex-col
          border-r
          border-white/10
          bg-black
          shadow-[10px_0_50px_rgba(0,0,0,0.45)]
          transition-all
          duration-300
          ease-in-out

          /* MOBILE WIDTH */

          w-[min(88vw,18rem)]

          /* MOBILE OPEN/CLOSE */

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          /* DESKTOP */

          lg:translate-x-0

          ${
            collapsed
              ? "lg:w-20"
              : "lg:w-72"
          }
        `}
      >
        {/* ==================================================
            SIDEBAR HEADER
        ================================================== */}

        <div
          className={`
            flex
            min-h-[81px]
            shrink-0
            items-center
            border-b
            border-white/10
            p-5

            ${
              collapsed
                ? "lg:justify-center"
                : "justify-between"
            }

            justify-between
          `}
        >
          {/* ==================================================
              LOGO
          ================================================== */}

          <div
            className={`
              ${
                collapsed
                  ? "lg:hidden"
                  : ""
              }
            `}
          >
            <Logo />
          </div>

          {/* ==================================================
              MOBILE CLOSE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close navigation"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              p-2
              text-slate-400
              transition-all
              duration-300
              hover:border-blue-400/30
              hover:bg-blue-500/20
              hover:text-cyan-300
              hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
              active:scale-95
              lg:hidden
            "
          >
            <X size={21} />
          </button>

          {/* ==================================================
              DESKTOP COLLAPSE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setCollapsed((previous) => !previous)
            }
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            aria-expanded={!collapsed}
            className="
              hidden
              rounded-xl
              p-2
              text-slate-400
              transition-all
              duration-300
              hover:bg-blue-500/30
              hover:text-cyan-300
              hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
              lg:block
            "
          >
            <Menu size={22} />
          </button>
        </div>

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav
          className="
            flex
            min-h-0
            flex-1
            flex-col
            space-y-2
            overflow-y-auto
            overscroll-contain
            p-4
          "
          onClick={closeMobileSidebar}
        >
          {/* DASHBOARD */}

          <SidebarItem
            href="/auth/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            collapsed={collapsed}
          />

          {/* COURSES */}

          <SidebarItem
            href="/auth/dashboard/courses"
            icon={<BookOpen size={20} />}
            label="Courses"
            collapsed={collapsed}
          />

          {/* ASSIGNMENTS */}

          <SidebarItem
            href="/auth/dashboard/assignments"
            icon={<ClipboardList size={20} />}
            label="Assignments"
            collapsed={collapsed}
          />

          {/* QUIZZES */}

          <SidebarItem
            href="/auth/dashboard/quizzes"
            icon={<FileQuestion size={20} />}
            label="Quizzes"
            collapsed={collapsed}
          />

          {/* CERTIFICATES */}

          <SidebarItem
            href="/auth/dashboard/certificates"
            icon={<Award size={20} />}
            label="Certificates"
            collapsed={collapsed}
          />

          {/* CALENDAR */}

          <SidebarItem
            href="/auth/dashboard/calendar"
            icon={<Calendar size={20} />}
            label="Calendar"
            collapsed={collapsed}
          />

          {/* SETTINGS */}

          <SidebarItem
            href="/auth/dashboard/settings"
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={collapsed}
          />
        </nav>

        {/* ==================================================
            LOGOUT
        ================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-4
          "
          onClick={closeMobileSidebar}
        >
          <SidebarItem
            href="/auth/login"
            icon={<LogOut size={20} />}
            label="Logout"
            collapsed={collapsed}
          />
        </div>
      </aside>
    </>
  );
}



// "use client";

// import {
//   LayoutDashboard,
//   BookOpen,
//   ClipboardList,
//   FileQuestion,
//   Award,
//   Calendar,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import Logo from "../ui/Logo";
// import SidebarItem from "./SidebarItem";

// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// interface SidebarProps {
//   collapsed: boolean;
//   setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Sidebar({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }: SidebarProps) {
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (user) {
//         const { data } = await supabase
//           .from("profiles")
//           .select("full_name")
//           .eq("id", user.id)
//           .single();

//         setUserName(data?.full_name ?? "");
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <>
//       {/* MOBILE OVERLAY */}
//       {mobileOpen && (
//         <button
//           aria-label="Close sidebar"
//           onClick={() => setMobileOpen(false)}
//           className="
//             fixed
//             inset-0
//             z-[60]
//             cursor-default
//             bg-black/70
//             backdrop-blur-sm
//             lg:hidden
//           "
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed
//           left-0
//           top-0
//           z-[70]
//           flex
//           h-screen
//           flex-col
//           border-r
//           border-white/10
//           bg-black
//           shadow-2xl
//           transition-all
//           duration-300
//           ease-in-out

//           w-72

//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

//           lg:translate-x-0

//           ${collapsed ? "lg:w-20" : "lg:w-72"}
//         `}
//       >
//         {/* SIDEBAR HEADER */}
//         <div
//           className={`
//             flex
//             min-h-[81px]
//             items-center
//             border-b
//             border-white/10
//             p-5

//             ${
//               collapsed
//                 ? "lg:justify-center"
//                 : "justify-between"
//             }

//             justify-between
//           `}
//         >
//           {/* LOGO */}
//           <div
//             className={`
//               ${collapsed ? "lg:hidden" : ""}
//             `}
//           >
//             <Logo />
//           </div>

//           {/* MOBILE CLOSE BUTTON */}
//           <button
//             onClick={() => setMobileOpen(false)}
//             aria-label="Close navigation"
//             className="
//               rounded-xl
//               p-2
//               text-slate-400
//               transition-all
//               duration-300
//               hover:bg-blue-500/30
//               hover:text-cyan-300
//               hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
//               lg:hidden
//             "
//           >
//             <X size={22} />
//           </button>

//           {/* DESKTOP COLLAPSE BUTTON */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             aria-label={
//               collapsed
//                 ? "Expand sidebar"
//                 : "Collapse sidebar"
//             }
//             aria-expanded={!collapsed}
//             className="
//               hidden
//               rounded-xl
//               p-2
//               text-slate-400
//               transition-all
//               duration-300
//               hover:bg-blue-500/30
//               hover:text-cyan-300
//               hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
//               lg:block
//             "
//           >
//             <Menu size={22} />
//           </button>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex-1 space-y-2 overflow-y-auto p-4">
//           <SidebarItem
//             href="/auth/dashboard"
//             icon={<LayoutDashboard size={20} />}
//             label="Dashboard"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             href="/auth/dashboard/courses"
//             icon={<BookOpen size={20} />}
//             label="Courses"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             href="/auth/dashboard/assignments"
//             icon={<ClipboardList size={20} />}
//             label="Assignments"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             href="/auth/dashboard/quizzes"
//             icon={<FileQuestion size={20} />}
//             label="Quizzes"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             href="/auth/dashboard/certificates"
//             icon={<Award size={20} />}
//             label="Certificates"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             href="/auth/dashboard/calendar"
//             icon={<Calendar size={20} />}
//             label="Calendar"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             href="/auth/dashboard/settings"
//             icon={<Settings size={20} />}
//             label="Settings"
//             collapsed={collapsed}
//           />
//         </nav>

//         {/* LOGOUT */}
//         <div className="border-t border-white/10 p-4">
//           <SidebarItem
//             href="/auth/login"
//             icon={<LogOut size={20} />}
//             label="Logout"
//             collapsed={collapsed}
//           />
//         </div>
//       </aside>
//     </>
//   );
// }


// // "use client";

// // import {
// //   LayoutDashboard,
// //   BookOpen,
// //   ClipboardList,
// //   FileQuestion,
// //   Award,
// //   Calendar,
// //   Settings,
// //   LogOut,
// //   Menu,
// // } from "lucide-react";

// // import Logo from "../ui/Logo";
// // import SidebarItem from "./SidebarItem";
// // import { useEffect, useState } from "react";
// // import { supabase } from "@/app/lib/supabase";

// // interface SidebarProps {
// //   collapsed: boolean;
// //   setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
// // }

// // export default function Sidebar({
// //   collapsed,
// //   setCollapsed,
// // }: SidebarProps) {
// //   const [userName, setUserName] = useState("");

// //   useEffect(() => {
// //     const getUser = async () => {
// //       const {
// //         data: { user },
// //       } = await supabase.auth.getUser();

// //       if (user) {
// //         const { data } = await supabase
// //           .from("profiles")
// //           .select("full_name")
// //           .eq("id", user.id)
// //           .single();

// //         setUserName(data?.full_name ?? "");
// //       }
// //     };

// //     getUser();
// //   }, []);

// //   return (
// //     <aside
// //       className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-black shadow-2xl transition-all duration-300 ${
// //         collapsed ? "w-20" : "w-72"
// //       }`}
// //     >
// //       {/* Header */}
// //       <div className="flex items-center justify-between border-b border-white/10 p-5">
// //         {!collapsed && <Logo />}

// //         <button
// //           onClick={() => setCollapsed(!collapsed)}
// //           className="rounded-xl p-2 text-slate-400 transition-all duration-300 hover:bg-blue-500/30 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
// //         >
// //           <Menu size={22} />
// //         </button>
// //       </div>

// //       {/* Navigation */}
// //       <nav className="flex-1 space-y-2 p-4">
// //         <SidebarItem
// //           href="/auth/dashboard"
// //           icon={<LayoutDashboard size={20} />}
// //           label="Dashboard"
// //           collapsed={collapsed}
// //         />

// //         <SidebarItem
// //           href="/auth/dashboard/courses"
// //           icon={<BookOpen size={20} />}
// //           label="Courses"
// //           collapsed={collapsed}
// //         />

// //         <SidebarItem
// //           href="/auth/dashboard/assignments"
// //           icon={<ClipboardList size={20} />}
// //           label="Assignments"
// //           collapsed={collapsed}
// //         />

// //         <SidebarItem
// //           href="/auth/dashboard/quizzes"
// //           icon={<FileQuestion size={20} />}
// //           label="Quizzes"
// //           collapsed={collapsed}
// //         />

// //         <SidebarItem
// //           href="/auth/dashboard/certificates"
// //           icon={<Award size={20} />}
// //           label="Certificates"
// //           collapsed={collapsed}
// //         />

// //         <SidebarItem
// //           href="/auth/dashboard/calendar"
// //           icon={<Calendar size={20} />}
// //           label="Calendar"
// //           collapsed={collapsed}
// //         />

// //         <SidebarItem
// //           href="/auth/dashboard/settings"
// //           icon={<Settings size={20} />}
// //           label="Settings"
// //           collapsed={collapsed}
// //         />
// //       </nav>

// //       {/* Logout */}
// //       <div className="border-t border-white/10 p-4">
// //         <SidebarItem
// //           href="/auth/login"
// //           icon={<LogOut size={20} />}
// //           label="Logout"
// //           collapsed={collapsed}
// //         />
// //       </div>
// //     </aside>
// //   );
// // }

// // // "use client";

// // // import Link from "next/link";
// // // import { usePathname } from "next/navigation";
// // // import { ReactNode } from "react";

// // // interface SidebarItemProps {
// // //   href: string;
// // //   icon: ReactNode;
// // //   label: string;
// // //   collapsed?: boolean;
// // // }

// // // export default function SidebarItem({
// // //   href,
// // //   icon,
// // //   label,
// // //   collapsed,
// // // }: SidebarItemProps) {
// // //   const pathname = usePathname();

// // //   const active = pathname === href;

// // //   return (
// // //     <Link
// // //       href={href}
// // //       className={`
// // //         group relative flex items-center rounded-xl py-3
// // //         overflow-hidden
// // //         transition-all duration-300 ease-out

// // //         ${
// // //           collapsed
// // //             ? "justify-center px-0"
// // //             : "gap-3 px-4"
// // //         }

// // //         ${
// // //           active
// // //             ? `
// // //               text-white
// // //               bg-gradient-to-r
// // //               from-blue-600
// // //               via-cyan-500
// // //               to-purple-600
// // //               shadow-[0_0_25px_rgba(59,130,246,0.30)]
// // //               border border-blue-400/30
// // //               scale-[1.02]
// // //             `
// // //             : `
// // //               text-slate-400
// // //               border border-transparent
// // //               hover:text-white
// // //               hover:bg-gradient-to-r
// // //               hover:from-blue-600/90
// // //               hover:via-cyan-500/80
// // //               hover:to-purple-600/90
// // //               hover:border-blue-400/30
// // //               hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
// // //               hover:-translate-y-[1px]
// // //             `
// // //         }
// // //       `}
// // //     >
// // //       {/* Animated light sweep */}
// // //       <span
// // //         className="
// // //           pointer-events-none
// // //           absolute inset-0
// // //           -translate-x-full
// // //           bg-gradient-to-r
// // //           from-transparent
// // //           via-white/20
// // //           to-transparent
// // //           transition-transform
// // //           duration-700
// // //           group-hover:translate-x-full
// // //         "
// // //       />

// // //       {/* Left glowing indicator */}
// // //       <span
// // //         className={`
// // //           absolute left-0 top-1/2
// // //           h-0 w-1
// // //           -translate-y-1/2
// // //           rounded-r-full
// // //           bg-cyan-300
// // //           shadow-[0_0_12px_rgba(34,211,238,0.9)]
// // //           transition-all duration-300

// // //           ${
// // //             active
// // //               ? "h-8"
// // //               : "group-hover:h-6"
// // //           }
// // //         `}
// // //       />

// // //       {/* Icon */}
// // //       <span
// // //         className={`
// // //           relative z-10
// // //           flex items-center justify-center
// // //           transition-all duration-300

// // //           ${
// // //             active
// // //               ? "text-white scale-105"
// // //               : "group-hover:text-white group-hover:scale-110"
// // //           }
// // //         `}
// // //       >
// // //         {icon}
// // //       </span>

// // //       {/* Label */}
// // //       {!collapsed && (
// // //         <span
// // //           className="
// // //             relative z-10
// // //             font-medium
// // //             tracking-wide
// // //             transition-all duration-300
// // //             group-hover:translate-x-0.5
// // //           "
// // //         >
// // //           {label}
// // //         </span>
// // //       )}

// // //       {/* Active / hover glow */}
// // //       <span
// // //         className={`
// // //           pointer-events-none
// // //           absolute
// // //           -right-8
// // //           -top-8
// // //           h-20
// // //           w-20
// // //           rounded-full
// // //           bg-cyan-300/20
// // //           blur-2xl
// // //           transition-all
// // //           duration-500

// // //           ${
// // //             active
// // //               ? "opacity-100 scale-125"
// // //               : "opacity-0 group-hover:opacity-100 group-hover:scale-125"
// // //           }
// // //         `}
// // //       />
// // //     </Link>
// // //   );
// // // }


// // // "use client";

// // // import {
// // //     LayoutDashboard,
// // //     BookOpen,
// // //     ClipboardList,
// // //     FileQuestion,
// // //     Award,
// // //     Calendar,
// // //     Settings,
// // //     LogOut,
// // //     Menu,
// // // } from "lucide-react";

// // // import Logo from "../ui/Logo";
// // // import SidebarItem from "./SidebarItem";
// // // import {useEffect,useState} from "react";
// // // import {supabase} from "@/app/lib/supabase";

// // // // export default function Sidebar() {
// // // interface SidebarProps {
// // //   collapsed: boolean;
// // //   setCollapsed: React.Dispatch<
// // //     React.SetStateAction<boolean>
// // //   >;
// // // }

// // // export default function Sidebar({
// // //   collapsed,
// // //   setCollapsed,
// // // }: SidebarProps) {
// // //  const [userName,setUserName]=useState("");
// // //     // const [collapsed, setCollapsed] = useState(true);

// // // useEffect(()=>{


// // // const getUser=async()=>{


// // // const {
// // // data:{user}
// // // }=await supabase.auth.getUser();



// // // if(user){


// // // const {data}=await supabase
// // // .from("profiles")
// // // .select("full_name")
// // // .eq("id",user.id)
// // // .single();



// // // setUserName(data?.full_name);

// // // }


// // // };


// // // getUser();



// // // },[]);
// // //     return (
// // //         // <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r bg-white">
// // //         <aside
// // //   className={`fixed left-0 top-0 flex h-screen flex-col border-r bg-white shadow-lg transition-all duration-300 ${
// // //     collapsed ? "w-20" : "w-72"
// // //   }`}
// // // >

// // //             {/* <div className="border-b p-8">

// // //                 <Logo />

// // //             </div> */}
// // //             <div className="flex items-center justify-between border-b p-5">

// // //   {!collapsed && <Logo />}

// // //   <button
// // //     onClick={() => setCollapsed(!collapsed)}
// // //     className="rounded-lg p-2 hover:bg-blue-600 text-gray-500"
// // //   >
// // //     <Menu size={22} />
// // //   </button>

// // // </div>

// // //             <nav className="flex-1 space-y-2 p-4">

// // //                 <SidebarItem
// // //                     href="/auth/dashboard"
// // //                     icon={<LayoutDashboard size={20}/>}
// // //                     label="Dashboard"
// // //                       collapsed={collapsed}

                    
// // //                 />

// // //                 <SidebarItem
// // //                     href="/auth/dashboard/courses"
// // //                     icon={<BookOpen size={20} />}
// // //                     label="Courses"
// // //                       collapsed={collapsed}

// // //                 />

// // //                 <SidebarItem
// // //                     href="/auth/dashboard/assignments"
// // //                     icon={<ClipboardList size={20} />}
// // //                     label="Assignments"
// // //                       collapsed={collapsed}
// // //                 />

// // //                 <SidebarItem
// // //                     // href="/quizzes"
// // //                    href="/auth/dashboard/quizzes"
// // //                    icon={<FileQuestion  size={20} />}
// // //                    label="Quizzes"
// // //                    collapsed={collapsed}
// // //                 />

// // //                 <SidebarItem
// // //                     // href="/certificates"
// // //                     href="/auth/dashboard/certificates"
// // //                     icon={<Award size={20} />}
// // //                     label="Certificates"
// // //                       collapsed={collapsed}

// // //                 />

// // //                 <SidebarItem
// // //                     // href="/calendar"
// // //                         href="/auth/dashboard/calendar"
// // //                     icon={<Calendar size={20} />}
// // //                     label="Calendar"
// // //                       collapsed={collapsed}

// // //                 />

// // //                 <SidebarItem
// // //                     href="/auth/dashboard/settings"
// // //                     icon={<Settings size={20} />}
// // //                     label="Settings"
// // //                       collapsed={collapsed}

// // //                 />

// // //             </nav>

// // //             <div className="border-t p-4">

// // //                 <SidebarItem
// // //                 href="/auth/login"
// // //                     icon={<LogOut size={20} />}
// // //                     label="Logout"
// // //                     collapsed={collapsed}

// // //                 />

// // //             </div>

// // //         </aside>
// // //     );
// // // }
// // // "use client";

// // // import { seedAssignments } from "@/app/lib/seedAssignment";

// // // export default function SeedPage() {
// // //   return (
// // //     <div className="p-10">
// // //       <button
// // //         onClick={seedAssignments}
// // //         className="rounded bg-blue-600 px-6 py-3 text-white"
// // //       >
// // //         Seed Assignments
// // //       </button>
// // //     </div>
// // //   );
// // // }