import React from "react";
import {
    Plus,
    Briefcase,
    FileText,
    Image as ImageIcon,
    Target,
    Clock,
    MoreHorizontal,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { format, formatDistanceToNow } from "date-fns";
import BlogActionsDropdown from "@/components/admin/BlogActionsDropdown";

export const revalidate = 0;

export default async function DashboardPage() {
    // Fetch real stats
    const [caseStudiesCount, blogsCount, mediaCount, goalsCount] = await Promise.all([
        prisma.caseStudy.count(),
        prisma.blog.count(),
        prisma.media.count(),
        prisma.goal.count({ where: { progress: { lt: 100 } } })
    ]);

    // Fetch recent blogs
    const recentBlogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4
    });

    // Fetch recent activity (Case studies and blogs combined)
    const [recentCaseStudies, latestBlogs] = await Promise.all([
        prisma.caseStudy.findMany({ orderBy: { updatedAt: 'desc' }, take: 2 }),
        prisma.blog.findMany({ orderBy: { updatedAt: 'desc' }, take: 2 })
    ]);

    const activity = [
        ...recentCaseStudies.map(cs => ({
            title: `Updated Project: '${cs.title}'`,
            time: formatDistanceToNow(new Date(cs.updatedAt)) + " ago",
            type: 'project'
        })),
        ...latestBlogs.map(b => ({
            title: `Updated Blog: '${b.title}'`,
            time: formatDistanceToNow(new Date(b.updatedAt)) + " ago",
            type: 'blog'
        }))
    ].sort((a, b) => 0); // Simplified sort for now

    const stats = [
        { label: "Case Studies", value: caseStudiesCount.toString(), change: "Total", trend: "neutral", icon: Briefcase },
        { label: "Blog Posts", value: blogsCount.toString(), change: "Total", trend: "neutral", icon: FileText },
        { label: "Gallery Images", value: mediaCount.toString(), change: "Total", trend: "neutral", icon: ImageIcon },
        { label: "Active Goals", value: goalsCount.toString(), change: "Pending", trend: "neutral", icon: Target },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                        Overview
                    </h1>
                    <p className="text-neutral-500 text-sm mt-1">Here's what's happening with your projects.</p>
                </div>
            </div>

            {/* Stats Grid - Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between h-36"
                    >
                        <div className="flex justify-between items-start">
                            <div className="bg-neutral-50 p-2.5 rounded-xl text-neutral-500">
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${stat.trend === 'up' ? 'bg-green-50 text-green-600' :
                                stat.trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-neutral-100 text-neutral-500'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-neutral-900 tracking-tight block mb-0.5">{stat.value}</span>
                            <span className="text-xs text-neutral-500 font-medium">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Blogs Table */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-neutral-900">Recent Blogs</h2>
                            <p className="text-sm text-neutral-500 mt-1">Latest articles and their performance.</p>
                        </div>
                        <Link
                            href="/dashboard/blogs"
                            className="text-xs font-bold text-neutral-900 px-4 py-2 hover:bg-neutral-50 rounded-full transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                            View All Posts
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead className="bg-neutral-50/50">
                                    <tr className="text-left border-b border-neutral-100">
                                        <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Post Title</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-right">Published</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {recentBlogs.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 text-sm italic">
                                                No blog posts yet. Start sharing your thoughts!
                                            </td>
                                        </tr>
                                    ) : (
                                        recentBlogs.map((blog) => (
                                            <tr key={blog.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-neutral-900 block">{blog.title}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest border ${blog.status === 'published'
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                        : 'bg-neutral-50 text-neutral-500 border-neutral-100'
                                                        }`}>
                                                        {blog.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-xs font-medium text-neutral-400 flex items-center justify-end gap-1.5">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {format(new Date(blog.createdAt), "MMM d, yyyy")}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end">
                                                        <BlogActionsDropdown id={blog.id} title={blog.title} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Quick Actions - Grid Cards */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">Quick Actions</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/dashboard/case-studies/new"
                                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform duration-300 text-left"
                            >
                                <div className="bg-neutral-50 p-2.5 rounded-xl text-neutral-500 w-fit">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-neutral-900 tracking-tight block">New</span>
                                    <span className="text-xs text-neutral-500 font-medium">Case Study</span>
                                </div>
                            </Link>
                            <Link
                                href="/dashboard/blogs/new"
                                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform duration-300 text-left"
                            >
                                <div className="bg-neutral-50 p-2.5 rounded-xl text-neutral-500 w-fit">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-neutral-900 tracking-tight block">New</span>
                                    <span className="text-xs text-neutral-500 font-medium">Blog Post</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">Recent Activity</h3>
                        </div>
                        <div className="space-y-3">
                            {activity.length === 0 ? (
                                <p className="text-xs text-neutral-400 italic">No recent activity detected.</p>
                            ) : (
                                activity.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-shadow">
                                        <div className="p-1.5 bg-neutral-50 rounded-lg text-neutral-500 shrink-0">
                                            {item.type === 'project' ? <Briefcase className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-900 font-bold leading-tight">{item.title}</p>
                                            <p className="text-[10px] text-neutral-500 font-medium mt-0.5">{item.time}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

