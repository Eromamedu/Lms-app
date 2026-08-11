"use client";
// import { useState } from "react";
import {
Bell,
Search,
// ChevronDown
} from "lucide-react";
// import {useEffect,useState} from "react";
// import {supabase} from "@/app/lib/supabase";
import { useUser } from "@/app/hooks/useUser";
import { useSearch } from "@/app/context/searchContext";
import useSearchCourses from "@/app/hooks/useSearchCourses";
import SearchResults from "./SearchResult";
import UserMenu from "./UserMenu";

export default function Navbar() {
    const {
  search,
  setSearch,
} = useSearch();

useSearchCourses();
//    const { profile } = useUser();
//    const [search, setSearch] = useState("");
    return (
        <header className=" sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white px-8">

            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="w-80 rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-blue-600 text-gray-600"
                />
<SearchResults />
            </div>

            <div className="flex items-center gap-6">

                <button className="relative">

                    <Bell className="text-gray-400"/>

                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

                </button>

                <UserMenu />

            </div>

        </header>
    );
}