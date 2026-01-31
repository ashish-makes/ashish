"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    CheckSquare,
    Image as ImageIcon,
    ArrowLeft,
    PanelLeftClose,
    PanelLeftOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Blogs", href: "/dashboard/blogs", icon: BookOpen },
    { name: "Case Studies", href: "/dashboard/case-studies", icon: Briefcase },
    { name: "Goals", href: "/dashboard/goals", icon: CheckSquare },
    { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 80 : 260 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="hidden md:flex border-r border-neutral-800 bg-neutral-950 flex-col sticky top-0 h-screen z-20 overflow-hidden font-bricolage"
            >
                <SidebarContent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} pathname={pathname} />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col md:hidden font-bricolage"
                        >
                            <SidebarContent isCollapsed={false} setIsCollapsed={() => setIsMobileOpen(false)} pathname={pathname} isMobile />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen w-full">
                <DashboardHeader onMenuClick={() => setIsMobileOpen(true)} />
                <main className="flex-1 p-4 md:p-12 bg-neutral-50/10">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
                <DashboardFooter />
            </div>
        </div>
    );
}

// Extracted Sidebar Content to reuse for Desktop and Mobile
function SidebarContent({ isCollapsed, setIsCollapsed, pathname, isMobile = false }: { isCollapsed: boolean, setIsCollapsed: (val: boolean) => void, pathname: string, isMobile?: boolean }) {
    return (
        <>
            <div className={cn("p-4 mb-2 flex items-center justify-between", isCollapsed ? "flex-col justify-center gap-4" : "")}>
                <Link href="/dashboard" className={cn("flex items-center gap-3 group transition-all duration-300", isCollapsed ? "justify-center" : "")}>
                    <span className="text-xl font-extrabold tracking-tight text-white pl-2">
                        {isCollapsed ? "a." : "ashish"}
                    </span>
                </Link>

                {!isMobile && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={cn(
                            "flex items-center justify-center text-neutral-500 hover:text-white transition-all",
                            isCollapsed ? "rotate-180 w-full" : ""
                        )}
                    >
                        {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                    </button>
                )}
                {isMobile && (
                    <button
                        onClick={() => setIsCollapsed(false)} // Close mobile menu
                        className="flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                    >
                        <PanelLeftClose className="w-5 h-5" />
                    </button>
                )}
            </div>

            <nav className="flex-1 px-2 space-y-1">
                <div className={cn("flex flex-col", isCollapsed ? "items-center" : "")}>
                    {!isCollapsed && (
                        <span className="text-[11px] font-medium text-neutral-500 block mb-2 px-3">Dashboard</span>
                    )}
                    <div className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={isMobile ? () => setIsCollapsed(false) : undefined}
                                    title={isCollapsed ? item.name : ""}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 transition-all duration-200 group rounded-md",
                                        isActive
                                            ? "bg-neutral-800 text-white"
                                            : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4 transition-colors shrink-0", isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300")} />
                                    <AnimatePresence>
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm font-medium tracking-wide whitespace-nowrap"
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <div className="mt-auto px-2 pb-4">
                <Link
                    href="/"
                    className={cn("flex items-center gap-3 px-3 py-2 group transition-all rounded-md text-neutral-500 hover:text-white hover:bg-neutral-900/50", isCollapsed ? "justify-center" : "")}
                >
                    <ArrowLeft className="w-4 h-4 transition-colors" />
                    {!isCollapsed && (
                        <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                            Logout
                        </span>
                    )}
                </Link>
            </div>
        </>
    );
}
