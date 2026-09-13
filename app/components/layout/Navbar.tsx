// "use client";

// import {
//   Bell,
//   Search,
//   Sparkles,
//   Command,
//   Menu,
// } from "lucide-react";

// import { useState } from "react";

// import { useSearch } from "@/app/context/searchContext";
// // import { useSearchCourses } from "@/app/hooks/useSearchCourses";
// import SearchResults from "./SearchResult";
// import UserMenu from "./UserMenu";

// interface NavbarProps {
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Navbar({
//   mobileOpen,
//   setMobileOpen,
// }: NavbarProps) {
//   const [focused, setFocused] = useState(false);

//   const { search, setSearch } = useSearch();
//   // const { results } = useSearchCourses(search);

//   return (
//     <header
//       className="
//         sticky
//         top-0
//         z-50
//         h-20
//         border-b
//         border-white/10
//         bg-[#020617]/90
//         px-3
//         backdrop-blur-2xl
//         shadow-[0_10px_40px_rgba(0,0,0,0.25)]
//         sm:px-6
//         lg:px-8
//       "
//     >
//       <div className="flex h-full min-w-0 items-center gap-2 sm:gap-4">
//         {/* MOBILE MENU BUTTON */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           aria-label={
//             mobileOpen
//               ? "Close navigation menu"
//               : "Open navigation menu"
//           }
//           aria-expanded={mobileOpen}
//           className="
//             flex
//             h-11
//             w-11
//             shrink-0
//             items-center
//             justify-center
//             rounded-xl
//             border
//             border-white/10
//             bg-white/5
//             text-slate-300
//             transition-all
//             duration-300
//             hover:border-blue-400/30
//             hover:bg-blue-500/20
//             hover:text-cyan-300
//             lg:hidden
//           "
//         >
//           <Menu size={21} />
//         </button>

//         {/* BRAND / DESKTOP */}
//         <div
//           className="
//             hidden
//             shrink-0
//             items-center
//             gap-2
//             sm:flex
//           "
//         >
//           <Sparkles
//             size={18}
//             className="text-cyan-300"
//           />

//           <span
//             className="
//               hidden
//               font-semibold
//               tracking-wide
//               text-white
//               md:block
//             "
//           >
//             Learning Hub
//           </span>
//         </div>

//         {/* SEARCH */}
//         <div
//           className="
//             relative
//             min-w-0
//             flex-1
//           "
//         >
//           <div
//             className={`
//               relative
//               mx-auto
//               flex
//               h-11
//               w-full
//               items-center
//               rounded-xl
//               border
//               bg-white/[0.04]
//               transition-all
//               duration-300

//               ${
//                 focused
//                   ? "border-blue-400/50 bg-white/[0.07] shadow-[0_0_25px_rgba(59,130,246,0.15)]"
//                   : "border-white/10"
//               }

//               sm:h-12
//               ${
//                 focused
//                   ? "sm:max-w-[430px]"
//                   : "sm:max-w-[380px]"
//               }

//               lg:ml-auto
//               lg:mr-0
//             `}
//           >
//             <Search
//               size={18}
//               className="
//                 ml-3
//                 shrink-0
//                 text-slate-500
//                 sm:ml-4
//               "
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               onFocus={() => setFocused(true)}
//               onBlur={() =>
//                 setTimeout(
//                   () => setFocused(false),
//                   150
//                 )
//               }
//               placeholder="Search courses..."
//               className="
//                 min-w-0
//                 flex-1
//                 bg-transparent
//                 px-2
//                 text-sm
//                 text-white
//                 outline-none
//                 placeholder:text-slate-500
//                 sm:px-3
//               "
//             />

//             {/* KEYBOARD SHORTCUT */}
//             <div
//               className="
//                 mr-2
//                 hidden
//                 shrink-0
//                 items-center
//                 gap-1
//                 rounded-lg
//                 border
//                 border-white/10
//                 // bg-white/5
//                 px-2
//                 py-1
//                 text-[10px]
//                 text-slate-500
//                 sm:flex
//               "
//             >
//               <Command size={11} />
//               <span>K</span>
//             </div>
//           </div>

//           {/* SEARCH RESULTS */}
//           {search.trim() && results.length > 0 && (
//             <div
//               className="
//                 absolute
//                 left-0
//                 right-0
//                 top-[calc(100%+8px)]
//                 z-[80]
//                 overflow-hidden
//                 rounded-2xl
//                 border
//                 border-white/10
//                 // bg-[#0b1120]/95
//                 shadow-2xl
//                 backdrop-blur-2xl
//               "
//             >
//               <SearchResults results={results} />
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE */}
//         <div
//           className="
//             flex
//             shrink-0
//             items-center
//             gap-1
//             sm:gap-3
//           "
//         >
//           {/* STATUS */}
//           <div
//             className="
//               hidden
//               items-center
//               gap-2
//               rounded-xl
//               border
//               border-emerald-400/20
//               bg-emerald-400/5
//               px-3
//               py-2
//               md:flex
//             "
//           >
//             <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

//             <span className="text-xs font-medium text-emerald-300">
//               Online
//             </span>
//           </div>

//           {/* NOTIFICATIONS */}
//           <button
//             aria-label="Notifications"
//             className="
//               relative
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               border
//               border-white/10
//               bg-white/5
//               text-slate-300
//               transition-all
//               duration-300
//               hover:border-blue-400/30
//               hover:bg-blue-500/20
//               hover:text-cyan-300
//             "
//           >
//             <Bell size={18} />

//             <span
//               className="
//                 absolute
//                 right-2
//                 top-2
//                 h-2
//                 w-2
//                 rounded-full
//                 bg-cyan-400
//                 shadow-[0_0_10px_rgba(34,211,238,0.9)]
//               "
//             />
//           </button>

//           {/* DIVIDER */}
//           <div
//             className="
//               hidden
//               h-8
//               w-px
//               bg-white/10
//               sm:block
//             "
//           />

//           {/* USER */}
//           <div className="shrink-0">
//             <UserMenu />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import {
  Bell,
  Search,
  Sparkles,
  Command,
} from "lucide-react";

import { useState } from "react";

import { useSearch } from "@/app/context/searchContext";
import useSearchCourses from "@/app/hooks/useSearchCourses";
import SearchResults from "./SearchResult";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const {
    search,
    setSearch,
  } = useSearch();

  const [searchFocused, setSearchFocused] =
    useState(false);

  useSearchCourses();

  return (
    <header
      className="
        sticky top-0 z-50
        h-20
        border-b border-white/10
        bg-[#020617]/90
        px-4 sm:px-6 lg:px-8
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
    >

      {/* ==================================================
          AMBIENT NAVBAR GLOW
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-0
          h-20
          w-64
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[15%]
          top-0
          h-20
          w-52
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* ==================================================
          NAVBAR CONTENT
      ================================================== */}

      <div className="relative flex h-full items-center justify-between gap-4">

        {/* ==================================================
            LEFT SIDE
        ================================================== */}

        <div className="flex min-w-0 items-center gap-4">

          {/* SMALL BRAND MARK */}

          <div
            className="
              hidden
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-blue-400/20
              bg-gradient-to-br
              from-blue-500/20
              to-cyan-400/10
              shadow-lg
              shadow-blue-500/10
              sm:flex
            "
          >
            <Sparkles
              size={19}
              className="
                text-cyan-400
                transition-transform
                duration-500
                hover:rotate-180
              "
            />
          </div>

          {/* ==================================================
              SEARCH
          ================================================== */}

          <div
            className={`
              relative
              transition-all
              duration-500
              ease-out
              ${
                searchFocused
                  ? "w-[280px] sm:w-[380px] lg:w-[430px]"
                  : "w-[240px] sm:w-[320px] lg:w-[380px]"
              }
            `}
          >

            {/* SEARCH GLOW */}

            <div
              className={`
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                bg-blue-500/20
                blur-xl
                transition-opacity
                duration-500
                ${
                  searchFocused
                    ? "opacity-100"
                    : "opacity-0"
                }
              `}
              aria-hidden="true"
            />

            <div
              className={`
                relative
                flex
                items-center
                rounded-2xl
                border
                transition-all
                duration-300
                ${
                  searchFocused
                    ? "border-blue-400/50 bg-slate-900 shadow-lg shadow-blue-500/10"
                    : "border-white/10 bg-white/[0.04]"
                }
              `}
            >

              {/* SEARCH ICON */}

              <Search
                size={18}
                className={`
                  absolute
                  left-4
                  transition-all
                  duration-300
                  ${
                    searchFocused
                      ? "text-cyan-400 scale-110"
                      : "text-slate-500"
                  }
                `}
              />

              {/* INPUT */}

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onFocus={() =>
                  setSearchFocused(true)
                }
                onBlur={() =>
                  setSearchFocused(false)
                }
                placeholder="Search courses..."
                className="
                  h-12
                  w-full
                  rounded-2xl
                  bg-transparent
                  py-3
                  pl-11
                  pr-16
                  text-sm
                  text-white
                  placeholder:text-slate-500
                  outline-none
                "
              />

              {/* KEYBOARD SHORTCUT */}

              <div
                className="
                  absolute
                  right-3
                  hidden
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-2
                  py-1
                  text-[10px]
                  font-semibold
                  text-slate-500
                  sm:flex
                "
              >
                <Command size={11} />

                <span>K</span>
              </div>

            </div>

            {/* SEARCH RESULTS */}

            <div className="relative z-[60]">
              <SearchResults />
            </div>

          </div>

        </div>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex flex-shrink-0 items-center gap-3 sm:gap-5">

          {/* ==================================================
              STATUS INDICATOR
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/10
              bg-emerald-400/5
              px-3
              py-2
              md:flex
            "
          >

            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.8)]
              "
            />

            <span className="text-[11px] font-semibold text-emerald-400">
              Learning active
            </span>

          </div>

          {/* ==================================================
              NOTIFICATION
          ================================================== */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              group
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-400/30
              hover:bg-blue-500/10
              hover:shadow-lg
              hover:shadow-blue-500/10
              active:scale-95
            "
          >

            <Bell
              size={20}
              className="
                text-slate-400
                transition-all
                duration-300
                group-hover:rotate-[-12deg]
                group-hover:text-cyan-400
              "
            />

            {/* NOTIFICATION DOT */}

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-red-500
                shadow-[0_0_8px_rgba(239,68,68,0.8)]
              "
            />

            {/* OUTER PULSE */}

            <span
              className="
                absolute
                right-[6px]
                top-[6px]
                h-3
                w-3
                animate-ping
                rounded-full
                bg-red-500/40
              "
            />

          </button>

          {/* DIVIDER */}

          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          {/* ==================================================
              USER MENU
          ================================================== */}

          <div
            className="
              rounded-2xl
              transition-all
              duration-300
              hover:bg-white/[0.03]
            "
          >
            <UserMenu />
          </div>

        </div>

      </div>

    </header>
  );
}


// // "use client";
// // // import { useState } from "react";
// // import {
// // Bell,
// // Search,
// // // ChevronDown
// // } from "lucide-react";
// // // import {useEffect,useState} from "react";
// // // import {supabase} from "@/app/lib/supabase";
// // import { useUser } from "@/app/hooks/useUser";
// // import { useSearch } from "@/app/context/searchContext";
// // import useSearchCourses from "@/app/hooks/useSearchCourses";
// // import SearchResults from "./SearchResult";
// // import UserMenu from "./UserMenu";

// // export default function Navbar() {
// //     const {
// //   search,
// //   setSearch,
// // } = useSearch();

// // useSearchCourses();
// // //    const { profile } = useUser();
// // //    const [search, setSearch] = useState("");
// //     return (
// //         <header className=" sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white px-8">

// //             <div className="relative">
// //                 <Search
// //                     size={18}
// //                     className="absolute left-4 top-4 text-slate-400"
// //                 />

// //                 <input
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     placeholder="Search courses..."
// //                     className="w-80 rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-blue-600 text-gray-600"
// //                 />
// // <SearchResults />
// //             </div>

// //             <div className="flex items-center gap-6">

// //                 <button className="relative">

// //                     <Bell className="text-gray-400"/>

// //                     <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

// //                 </button>

// //                 <UserMenu />

// //             </div>

// //         </header>
// //     );
// // }