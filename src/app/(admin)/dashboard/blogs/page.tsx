import React from "react";
import {
    Plus,
    Calendar,
    FileText,
    Settings,
    Edit2
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

export const revalidate = 0;

export default async function BlogsAdminPage() {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Blog Posts</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage and create content for your audience.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/blogs/new"
                        className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-neutral-900 px-6 font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-wide">New Post</span>
                    </Link>
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead className="bg-neutral-50/50">
                            <tr className="text-left border-b border-neutral-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider w-[400px]">Post Title</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 text-sm italic">
                                        No blog posts discovered yet. Create your first one!
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((post) => (
                                    <tr key={post.id} className="group hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                                                    <FileText className="w-4 h-4 text-neutral-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-neutral-900">{post.title}</span>
                                                    <span className="text-xs text-neutral-400 mt-0.5 select-all">/{post.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border ${post.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                post.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-neutral-50 text-neutral-500 border-neutral-100'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {format(new Date(post.createdAt), "MMM d, yyyy")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    title="View Public"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/dashboard/blogs/${post.id}/edit`}
                                                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    title="Edit Post"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <DeleteBlogButton id={post.id} title={post.title} />
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
    );
}
