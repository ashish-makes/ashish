import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import GoalItem from "@/components/admin/GoalItem";
import { AnimatePresence } from "framer-motion"; // Although we'll need a wrapper for client-side animations if we want them here, or just render the list.

export const revalidate = 0;

export default async function GoalsAdminPage() {
    const goalsList = await prisma.goal.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Milestones & Goals</h1>
                    <p className="text-neutral-500 text-sm mt-1">Track your progress and personal growth targets.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/goals/new"
                        className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-neutral-900 px-6 font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-wide">New Goal</span>
                    </Link>
                </div>
            </div>

            {/* Goals List View (To-Do Style) */}
            <div className="space-y-3">
                {goalsList.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-dashed border-neutral-200 text-center">
                        <p className="text-neutral-500 text-sm italic">No goals set yet. Start dreaming big!</p>
                    </div>
                ) : (
                    goalsList.map((goal) => (
                        <GoalItem key={goal.id} goal={goal} />
                    ))
                )}
            </div>
        </div>
    );
}

