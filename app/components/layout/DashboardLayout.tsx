"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div className="bg-slate-100">

            <Sidebar collapsed={collapsed}
  setCollapsed={setCollapsed} />

            {/* <div className="ml-72 min-h-screen"> */}
            <div
  className={`transition-all duration-300 ${
    collapsed ? "ml-20" : "ml-72"
  }`}
>

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}