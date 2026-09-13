"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ChevronDown,
  User,
  BookOpen,
  BarChart3,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/hooks/useUser";

export default function UserMenu() {
  const { profile } = useUser();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /*
  ==================================================
  CLOSE MENU WHEN CLICKING OUTSIDE
  ==================================================
  */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /*
  ==================================================
  LOGOUT
  ==================================================
  */

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/auth/login");
  }

  /*
  ==================================================
  GET INITIALS
  ==================================================
  */

  const initials =
    profile?.full_name
      ?.trim()
      .split(/\s+/)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  /*
  ==================================================
  GET LAST NAME
  ==================================================
  */

  const displayName =
    profile?.full_name
      ?.trim()
      .split(/\s+/)
      .pop() || "User";

  return (
    <div
      ref={menuRef}
      className="relative"
    >

      {/* ==================================================
          USER BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="
          group
          relative
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          px-2
          py-1.5
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-blue-400/30
          hover:bg-white/[0.06]
          hover:shadow-lg
          hover:shadow-blue-500/10
          active:scale-[0.98]
        "
      >

        {/* ==================================================
            BUTTON GLOW
        ================================================== */}

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            bg-blue-500/10
            opacity-0
            blur-xl
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* ==================================================
            AVATAR
        ================================================== */}

        <div className="relative">

          {/* Animated outer glow */}

          <div
            className="
              absolute
              -inset-1
              rounded-[15px]
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              opacity-60
              blur-sm
              transition-all
              duration-500
              group-hover:opacity-100
              group-hover:blur-md
            "
          />

          {/* Avatar */}

          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-white/20
              bg-gradient-to-br
              from-blue-500
              via-indigo-600
              to-purple-600
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-500
              group-hover:scale-105
              group-hover:rotate-2
            "
          >

            {/* Avatar shine */}

            <div
              className="
                absolute
                -left-6
                top-0
                h-full
                w-5
                rotate-12
                bg-white/20
                blur-sm
                transition-all
                duration-700
                group-hover:left-[120%]
              "
            />

            {/* Small decorative sparkle */}

            {/* <Sparkles
              size={10}
              className="
                absolute
                right-1
                top-1
                text-cyan-200
                opacity-80
              "
            /> */}

            {/* Initials */}

            <span
              className="
                relative
                z-10
                text-sm
                font-black
                tracking-wider
                text-white
              "
            >
              {initials}
            </span>

          </div>

          {/* Online indicator */}

          <span
            className="
              absolute
              -bottom-0.5
              -right-0.5
              h-3
              w-3
              rounded-full
              border-2
              border-[#020617]
              bg-emerald-400
              shadow-[0_0_8px_rgba(52,211,153,0.8)]
            "
          />

        </div>

        {/* ==================================================
            USER INFORMATION
        ================================================== */}

        <div className="hidden min-w-0 text-left sm:block">

          <p
            className="
              max-w-[100px]
              truncate
              text-sm
              font-bold
              text-white
            "
          >
            {displayName}
          </p>

          <div className="flex items-center gap-1">

            <span className="text-[10px] font-medium text-slate-500">
              Student
            </span>

            {/* <span className="h-1 w-1 rounded-full bg-emerald-400" />

            <span className="text-[10px] text-emerald-400">
              Online
            </span> */}

          </div>

        </div>

        {/* ==================================================
            CHEVRON
        ================================================== */}

        <ChevronDown
          size={17}
          className={`
            hidden
            text-slate-500
            transition-all
            duration-300
            sm:block
            ${
              open
                ? "rotate-180 text-cyan-400"
                : "group-hover:text-slate-300"
            }
          `}
        />

      </button>

      {/* ==================================================
          DROPDOWN MENU
      ================================================== */}

      {open && (
        <div
          className="
            absolute
            right-0
            z-[100]
            mt-3
            w-[300px]
            origin-top-right
            animate-[dropdownIn_0.25s_ease-out]
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#0b1120]/95
            shadow-2xl
            shadow-black/50
            backdrop-blur-2xl
          "
        >

          {/* ==================================================
              DROPDOWN TOP PROFILE
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              border-b
              border-white/10
              bg-gradient-to-br
              from-blue-500/10
              via-transparent
              to-purple-500/10
              p-5
            "
          >

            {/* Background glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-blue-500/20
                blur-3xl
              "
            />

            <div className="relative flex items-center gap-4">

              {/* Bigger Avatar */}

              <div className="relative">

                <div
                  className="
                    absolute
                    -inset-1
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-500
                    to-purple-500
                    opacity-60
                    blur-sm
                  "
                />

                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/20
                    bg-gradient-to-br
                    from-blue-500
                    via-indigo-600
                    to-purple-600
                    text-lg
                    font-black
                    text-white
                    shadow-xl
                  "
                >
                  {initials}
                </div>

                <span
                  className="
                    absolute
                    -bottom-1
                    -right-1
                    h-4
                    w-4
                    rounded-full
                    border-[3px]
                    border-[#0b1120]
                    bg-emerald-400
                    shadow-[0_0_10px_rgba(52,211,153,0.8)]
                  "
                />

              </div>

              {/* Name */}

              <div className="min-w-0">

                <p className="truncate text-base font-bold text-white">
                  {profile?.full_name || "User"}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {profile?.email || "Student account"}
                </p>

                <div className="mt-2 flex items-center gap-1.5">

                  <ShieldCheck
                    size={13}
                    className="text-emerald-400"
                  />

                  <span className="text-[10px] font-semibold text-emerald-400">
                    Active learner
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              MENU ITEMS
          ================================================== */}

          <div className="p-2">

            {/* PROFILE */}

            <MenuItem
              href="/auth/dashboard/Profile"
              icon={<User size={17} />}
              title="My Profile"
              description="Manage your profile"
              color="blue"
              onClick={() => setOpen(false)}
            />

            {/* COURSES */}

            <MenuItem
              href="/dashboard/courses"
              icon={<BookOpen size={17} />}
              title="My Courses"
              description="View your courses"
              color="cyan"
              onClick={() => setOpen(false)}
            />

            {/* PROGRESS */}

            <MenuItem
              href="/dashboard/progress"
              icon={<BarChart3 size={17} />}
              title="My Progress"
              description="Track your learning"
              color="emerald"
              onClick={() => setOpen(false)}
            />

            {/* CERTIFICATES */}

            <MenuItem
              href="/dashboard/certificates"
              icon={<Award size={17} />}
              title="Certificates"
              description="View your achievements"
              color="purple"
              onClick={() => setOpen(false)}
            />

            {/* SETTINGS */}

            <MenuItem
              href="/dashboard/settings"
              icon={<Settings size={17} />}
              title="Account Settings"
              description="Manage preferences"
              color="amber"
              onClick={() => setOpen(false)}
            />

            {/* HELP */}

            <MenuItem
              href="/dashboard/help"
              icon={<HelpCircle size={17} />}
              title="Help & Support"
              description="Get assistance"
              color="pink"
              onClick={() => setOpen(false)}
            />

          </div>

          {/* ==================================================
              LOGOUT
          ================================================== */}

          <div className="border-t border-white/10 p-2">

            <button
              type="button"
              onClick={handleLogout}
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-left
                transition-all
                duration-300
                hover:bg-red-500/10
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-500/10
                  text-red-400
                  transition-all
                  duration-300
                  group-hover:bg-red-500/20
                  group-hover:text-red-300
                  group-hover:shadow-lg
                  group-hover:shadow-red-500/10
                "
              >
                <LogOut size={17} />
              </div>

              <div>

                <p className="text-sm font-semibold text-red-400">
                  Logout
                </p>

                <p className="text-[10px] text-slate-600">
                  Sign out of your account
                </p>

              </div>

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/*
==================================================
MENU ITEM COMPONENT
==================================================
*/

function MenuItem({
  href,
  icon,
  title,
  description,
  color,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color:
    | "blue"
    | "cyan"
    | "emerald"
    | "purple"
    | "amber"
    | "pink";
  onClick: () => void;
}) {
  const colorStyles = {
    blue: `
      bg-blue-500/10
      text-blue-400
      group-hover:bg-blue-500/20
      group-hover:text-blue-300
    `,

    cyan: `
      bg-cyan-500/10
      text-cyan-400
      group-hover:bg-cyan-500/20
      group-hover:text-cyan-300
    `,

    emerald: `
      bg-emerald-500/10
      text-emerald-400
      group-hover:bg-emerald-500/20
      group-hover:text-emerald-300
    `,

    purple: `
      bg-purple-500/10
      text-purple-400
      group-hover:bg-purple-500/20
      group-hover:text-purple-300
    `,

    amber: `
      bg-amber-500/10
      text-amber-400
      group-hover:bg-amber-500/20
      group-hover:text-amber-300
    `,

    pink: `
      bg-pink-500/10
      text-pink-400
      group-hover:bg-pink-500/20
      group-hover:text-pink-300
    `,
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        relative
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        transition-all
        duration-300
        hover:bg-white/[0.05]
      "
    >

      {/* Hover line */}

      <span
        className="
          absolute
          left-0
          top-1/2
          h-0
          w-0.5
          -translate-y-1/2
          rounded-full
          bg-cyan-400
          transition-all
          duration-300
          group-hover:h-7
        "
      />

      {/* Icon */}

      <div
        className={`
          flex
          h-9
          w-9
          flex-shrink-0
          items-center
          justify-center
          rounded-lg
          transition-all
          duration-300
          group-hover:scale-105
          ${colorStyles[color]}
        `}
      >
        {icon}
      </div>

      {/* Text */}

      <div className="min-w-0">

        <p className="text-sm font-semibold text-slate-200 transition-colors group-hover:text-white">
          {title}
        </p>

        <p className="text-[10px] text-slate-600 transition-colors group-hover:text-slate-500">
          {description}
        </p>

      </div>

    </Link>
  );
}





// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//     ChevronDown,
//     User,
//     BookOpen,
//     BarChart3,
//     Award,
//     Settings,
//     HelpCircle,
//     LogOut,
// } from "lucide-react";

// import { supabase } from "@/app/lib/supabase";
// import { useUser } from "@/app/hooks/useUser";

// export default function UserMenu() {
//     const { profile } = useUser();

//     const router = useRouter();

//     const [open, setOpen] = useState(false);

//     const menuRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (
//                 menuRef.current &&
//                 !menuRef.current.contains(event.target as Node)
//             ) {
//                 setOpen(false);
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside);

//         return () =>
//             document.removeEventListener(
//                 "mousedown",
//                 handleClickOutside
//             );
//     }, []);

//     async function handleLogout() {
//         await supabase.auth.signOut();

//         router.push("/auth/login");
//     }

//     return (
//         <div
//             ref={menuRef}
//             className="relative"

//         >
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="flex items-center gap-3"
//             >
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600  text-white">
//                     {profile?.full_name
//                         ?.split(" ")
//                         .map((name) => name[0])
//                         .join("")
//                         .toUpperCase()}
//                 </div>

//                 <div className="text-left ">
//                     <p className="font-semibold text-gray-700">
//                         {profile?.full_name?.split(" ").pop()}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                         Student
//                     </p>
//                 </div>

//                 <ChevronDown 
//                     size={18}
//                     className={`text-gray-500 transition-transform ${
//                         open ? "rotate-180" : ""
//                     }`}
//                 />
//             </button>

//             {open && (
//                 <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-white shadow-xl overflow-hidden text-gray-500">

//                     <div className="border-b p-5">

//                         <p className="font-semibold">
//                             {profile?.full_name}
//                         </p>

//                         <p className="text-sm text-gray-500">
//                             Student
//                         </p>

//                     </div>

//                     <Link
//                         href="/auth/dashboard/Profile"
//                         className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
//                     >
//                         <User size={18} />

//                         My Profile
//                     </Link>

//                     <Link
//                         href="/dashboard/courses"
//                         className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
//                     >
//                         <BookOpen size={18} />

//                         My Courses
//                     </Link>

//                     <Link
//                         href="/dashboard/progress"
//                         className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
//                     >
//                         <BarChart3 size={18} />

//                         My Progress
//                     </Link>

//                     <Link
//                         href="/dashboard/certificates"
//                         className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
//                     >
//                         <Award size={18} />

//                         Certificates
//                     </Link>

//                     <Link
//                         href="/dashboard/settings"
//                         className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
//                     >
//                         <Settings size={18} />

//                         Account Settings
//                     </Link>

//                     <Link
//                         href="/dashboard/help"
//                         className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
//                     >
//                    <HelpCircle size={18} />
//                     Help & Support
//                     </Link>
//                     <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center gap-3 border-t px-5 py-3 text-red-600 hover:bg-red-50"
//                     >
//                         <LogOut size={18} />

//                         Logout
//                     </button>

//                 </div>
//             )}
//         </div>
//     );
// }