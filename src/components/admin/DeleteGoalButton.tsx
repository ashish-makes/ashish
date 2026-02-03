"use client";

import { useState } from "react";
import { Trash2, Loader2, MoreHorizontal } from "lucide-react";
import { deleteGoal } from "@/app/actions/goal";
import { useRouter } from "next/navigation";

interface DeleteGoalButtonProps {
    id: string;
    title: string;
}

export default function DeleteGoalButton({ id, title }: DeleteGoalButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteGoal(id);
            if (res.success) {
                router.refresh();
                setShowConfirm(false);
            } else {
                alert(res.error || "Failed to delete goal");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    if (showConfirm) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1 px-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider"
                >
                    {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm"}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isDeleting}
                    className="p-1 px-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors text-[9px] font-bold uppercase tracking-wider"
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Goal"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
