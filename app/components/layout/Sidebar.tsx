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
} from "lucide-react";

import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";
import {useEffect,useState} from "react";
import {supabase} from "@/app/lib/supabase";

// export default function Sidebar() {
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
 const [userName,setUserName]=useState("");
    // const [collapsed, setCollapsed] = useState(true);

useEffect(()=>{


const getUser=async()=>{


const {
data:{user}
}=await supabase.auth.getUser();



if(user){


const {data}=await supabase
.from("profiles")
.select("full_name")
.eq("id",user.id)
.single();



setUserName(data?.full_name);

}


};


getUser();



},[]);
    return (
        // <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r bg-white">
        <aside
  className={`fixed left-0 top-0 flex h-screen flex-col border-r bg-white shadow-lg transition-all duration-300 ${
    collapsed ? "w-20" : "w-72"
  }`}
>

            {/* <div className="border-b p-8">

                <Logo />

            </div> */}
            <div className="flex items-center justify-between border-b p-5">

  {!collapsed && <Logo />}

  <button
    onClick={() => setCollapsed(!collapsed)}
    className="rounded-lg p-2 hover:bg-gray-100 text-gray-500"
  >
    <Menu size={22} />
  </button>

</div>

            <nav className="flex-1 space-y-2 p-4">

                <SidebarItem
                    href="/auth/dashboard"
                    icon={<LayoutDashboard size={20}/>}
                    label="Dashboard"
                      collapsed={collapsed}

                    
                />

                <SidebarItem
                    href="/auth/dashboard/courses"
                    icon={<BookOpen size={20} />}
                    label="Courses"
                      collapsed={collapsed}

                />

                <SidebarItem
                    href="/auth/dashboard/assignments"
                    icon={<ClipboardList size={20} />}
                    label="Assignments"
                      collapsed={collapsed}
                />

                <SidebarItem
                    // href="/quizzes"
                   href="/auth/dashboard/quizzes"
                   icon={<FileQuestion  size={20} />}
                   label="Quizzes"
                   collapsed={collapsed}
                />

                <SidebarItem
                    // href="/certificates"
                    href="/auth/dashboard/certificates"
                    icon={<Award size={20} />}
                    label="Certificates"
                      collapsed={collapsed}

                />

                <SidebarItem
                    // href="/calendar"
                        href="/auth/dashboard/calendar"
                    icon={<Calendar size={20} />}
                    label="Calendar"
                      collapsed={collapsed}

                />

                <SidebarItem
                    href="/settings"
                    icon={<Settings size={20} />}
                    label="Settings"
                      collapsed={collapsed}

                />

            </nav>

            <div className="border-t p-4">

                <SidebarItem
                href="/auth/login"
                    icon={<LogOut size={20} />}
                    label="Logout"
                    collapsed={collapsed}

                />

            </div>

        </aside>
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