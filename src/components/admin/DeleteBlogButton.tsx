"use client";

import { useState } from "react";
import { Trash2, AlertCircle, Loader2 } from "lucide-react";
import { deleteBlog } from "@/app/actions/blog";
import { useRouter } from "next/navigation";

interface DeleteBlogButtonProps {
    id: string;
    title: string;
}

export default function DeleteBlogButton({ id, title }: DeleteBlogButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteBlog(id);
            if (res.success) {
                // revalidatePath is called in the server action, but we might need a refresh to show changes if navigation is involved
                router.refresh();
                setShowConfirm(false);
            } else {
                alert(res.error || "Failed to delete blog post");
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
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                >
                    {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Confirm"}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isDeleting}
                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors text-[10px] font-bold uppercase tracking-wider"
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
            title="Delete Post"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
