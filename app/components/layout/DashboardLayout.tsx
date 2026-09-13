"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`
          min-h-screen
          min-w-0
          transition-all
          duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-72"}
        `}
      >
        <Navbar
        //   mobileOpen={mobileOpen}
        //   setMobileOpen={setMobileOpen}
        />

        <main className="min-w-0 p-3 sm:p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}


// "use client";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import { useState } from "react";

// export default function DashboardLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const [collapsed, setCollapsed] = useState(true);
//     return (
//         <div className="bg-slate-100">

//             <Sidebar collapsed={collapsed}
//   setCollapsed={setCollapsed} />

//             {/* <div className="ml-72 min-h-screen"> */}
//             <div
//   className={`transition-all duration-300 ${
//     collapsed ? "ml-20" : "ml-72"
//   }`}
// >

//                 <Navbar />

//                 <main className="p-8">

//                     {children}

//                 </main>

//             </div>

//         </div>
//     );
// }