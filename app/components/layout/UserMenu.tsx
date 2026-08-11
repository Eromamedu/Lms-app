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
} from "lucide-react";

import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/hooks/useUser";

export default function UserMenu() {
    const { profile } = useUser();

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    async function handleLogout() {
        await supabase.auth.signOut();

        router.push("/auth/login");
    }

    return (
        <div
            ref={menuRef}
            className="relative"

        >
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600  text-white">
                    {profile?.full_name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                </div>

                <div className="text-left">
                    <p className="font-semibold text-gray-700">
                        {profile?.full_name?.split(" ").pop()}
                    </p>

                    <p className="text-sm text-gray-500">
                        Student
                    </p>
                </div>

                <ChevronDown 
                    size={18}
                    className={`text-gray-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-white shadow-xl overflow-hidden text-gray-500">

                    <div className="border-b p-5">

                        <p className="font-semibold">
                            {profile?.full_name}
                        </p>

                        <p className="text-sm text-gray-500">
                            Student
                        </p>

                    </div>

                    <Link
                        href="/auth/dashboard/Profile"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >
                        <User size={18} />

                        My Profile
                    </Link>

                    <Link
                        href="/dashboard/courses"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >
                        <BookOpen size={18} />

                        My Courses
                    </Link>

                    <Link
                        href="/dashboard/progress"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >
                        <BarChart3 size={18} />

                        My Progress
                    </Link>

                    <Link
                        href="/dashboard/certificates"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >
                        <Award size={18} />

                        Certificates
                    </Link>

                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >
                        <Settings size={18} />

                        Account Settings
                    </Link>

                    <Link
                        href="/dashboard/help"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >
                   <HelpCircle size={18} />
                    Help & Support
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 border-t px-5 py-3 text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={18} />

                        Logout
                    </button>

                </div>
            )}
        </div>
    );
}