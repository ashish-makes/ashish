"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Target } from "lucide-react";
import Link from "next/link";
import { createGoal, updateGoal } from "@/app/actions/goal";

interface GoalFormProps {
    initialData?: {
        title: string;
        progress: number;
        category: string;
        id?: string;
    };
    mode: "create" | "edit";
}

export default function GoalForm({ initialData, mode }: GoalFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        progress: initialData?.progress || 0,
        category: initialData?.category || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = mode === "create"
                ? await createGoal(formData)
                : await updateGoal(initialData?.id!, formData);

            if (res.success) {
                router.push("/dashboard/goals");
            } else {
                setError(res.error || "Failed to save goal");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/goals"
                    className="p-2 rounded-xl bg-neutral-100 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                        {mode === "create" ? "Set New Goal" : "Edit Goal"}
                    </h1>
                    <p className="text-neutral-500 text-sm mt-0.5">Track your progress and personal growth targets.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="p-6 border-b border-neutral-100">
                        <h2 className="text-base font-bold text-neutral-900">Goal Details</h2>
                        <p className="text-sm text-neutral-500 mt-0.5">Define your milestone and current progress.</p>
                    </div>

                    {error && (
                        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="p-6 space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Goal Title</label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Reach 10k Monthly Viewers"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Category</label>
                                <input
                                    id="category"
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="Career, Personal, Technical..."
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="progress" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                                    Progress ({formData.progress}%)
                                </label>
                                <input
                                    id="progress"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                                />
                                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">
                                    <span>Started</span>
                                    <span>Halfway</span>
                                    <span>Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Link
                        href="/dashboard/goals"
                        className="px-6 py-3 rounded-full border border-neutral-200 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-sm font-bold text-white hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {mode === "create" ? "Set Goal" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
