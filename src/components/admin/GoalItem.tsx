"use client";

import { motion } from "framer-motion";
import { Check, Calendar, Trophy, Edit2 } from "lucide-react";
import { toggleGoalStatus } from "@/app/actions/goal";
import Link from "next/link";
import DeleteGoalButton from "./DeleteGoalButton";
import { useTransition } from "react";

interface GoalItemProps {
    goal: {
        id: string;
        title: string;
        progress: number;
        category: string;
        createdAt: Date;
    };
}

export default function GoalItem({ goal }: GoalItemProps) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            await toggleGoalStatus(goal.id, goal.progress);
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`group bg-white p-4 rounded-2xl border border-neutral-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all flex items-center gap-4 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
        >
            {/* Checkbox Interaction */}
            <button
                onClick={handleToggle}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${goal.progress === 100
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white border-2 border-neutral-200 text-transparent hover:border-neutral-400"
                    }`}
            >
                <Check className={`w-3.5 h-3.5 ${goal.progress === 100 ? "opacity-100" : "opacity-0"}`} />
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-6">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h3 className={`text-sm font-bold text-neutral-900 truncate transition-all ${goal.progress === 100 ? 'line-through decoration-neutral-400 text-neutral-400' : ''}`}>
                                {goal.title}
                            </h3>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 px-2 py-0.5 rounded-md shrink-0">
                                {goal.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium">
                                <Calendar className="w-3 h-3" />
                                <span>Added {new Date(goal.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>
                            {goal.progress === 100 && (
                                <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase tracking-wide">
                                    <Trophy className="w-3 h-3" />
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Progress Bar (Desktop Only) */}
                    <div className="hidden lg:flex flex-col justify-center w-40 shrink-0">
                        <div className="flex justify-between items-center mb-1">
                            <span className={`text-[10px] font-bold ${goal.progress === 100 ? "text-green-600" : "text-neutral-900"}`}>
                                {goal.progress}%
                            </span>
                        </div>
                        <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden">
                            <motion.div
                                initial={false}
                                animate={{ width: `${goal.progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`h-full ${goal.progress === 100 ? 'bg-green-500' : 'bg-neutral-900'}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center shrink-0 border-l border-neutral-100 pl-4 gap-1">
                <Link
                    href={`/dashboard/goals/${goal.id}/edit`}
                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                </Link>
                <DeleteGoalButton id={goal.id} title={goal.title} />
            </div>
        </motion.div>
    );
}
