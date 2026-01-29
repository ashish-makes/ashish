"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    CheckSquare,
    Image as ImageIcon,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-primary">
                        Admin Panel
                    </h2>
                </div>

                <Separator className="bg-border" />

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                                    isActive
                                        ? "bg-secondary text-primary font-medium"
                                        : "hover:bg-secondary text-muted-foreground hover:text-primary"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-primary")} />
                                <span className="font-medium">{item.name}</span>
                                {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                    >
                        ← Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-background text-foreground">
                <header className="h-16 border-b border-border flex items-center px-8 bg-background/80 backdrop-blur-md sticky top-0 z-10">
                    <h1 className="text-lg font-semibold capitalize">
                        {pathname.split("/").pop() === "dashboard" ? "Dashboard Overview" : pathname.split("/").pop()?.replace("-", " ")}
                    </h1>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
