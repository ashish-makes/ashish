"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Eye,
    Users,
    TrendingUp,
    Activity,
    Plus,
    Image as ImageIcon,
    FileText
} from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Total Views", value: "124.5K", change: "+12%", icon: Eye },
    { label: "Active Users", value: "8.2K", change: "+5%", icon: Users },
    { label: "Bounce Rate", value: "42.3%", change: "-2%", icon: Activity },
    { label: "Engagement", value: "2.4m", change: "+18%", icon: TrendingUp },
];

const activity = [
    { title: "New Blog Post Published", time: "2 hours ago", type: "blog" },
    { title: "Portfolio Image Uploaded", time: "5 hours ago", type: "media" },
    { title: "System Update Completed", time: "1 day ago", type: "system" },
    { title: "New Comment on 'GSAP Guide'", time: "2 days ago", type: "comment" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header / Welcome */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                    Good evening, Ashish.
                </h1>
                <p className="text-neutral-500">
                    Here is what's happening with your portfolio today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 flex flex-col justify-between h-32 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-neutral-50 rounded-lg text-neutral-600">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+')
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-neutral-900 block">{stat.value}</span>
                            <span className="text-xs text-neutral-500 font-medium">{stat.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content / Chart Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 p-8 min-h-[400px] flex flex-col"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-neutral-900">Traffic Overview</h2>
                        <select className="text-sm border-none bg-neutral-50 rounded-lg px-3 py-1 text-neutral-600 outline-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    {/* Placeholder Chart Visual */}
                    <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                        {[40, 65, 30, 85, 50, 95, 60, 45, 75, 55, 80, 70].map((h, i) => (
                            <div key={i} className="w-full bg-neutral-100 rounded-t-lg relative group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.05), ease: "easeOut" }}
                                    className="absolute bottom-0 w-full bg-neutral-900 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-neutral-400 font-medium uppercase tracking-wider">
                        <span>Jan</span>
                        <span>Dec</span>
                    </div>
                </motion.div>

                {/* Side Column: Quick Actions & Activity */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-neutral-900 text-white rounded-3xl p-6 shadow-xl"
                    >
                        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                                    <span className="text-sm font-medium">New Post</span>
                                </div>
                                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                                    <span className="text-sm font-medium">Upload Media</span>
                                </div>
                                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Recent Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-neutral-900">Activity</h3>
                            <Link href="#" className="text-xs font-medium text-neutral-500 hover:text-neutral-900">View All</Link>
                        </div>
                        <div className="space-y-6">
                            {activity.map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 leading-snug">{item.title}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
