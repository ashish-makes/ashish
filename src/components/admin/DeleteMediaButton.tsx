"use client";

import { Trash2 } from "lucide-react";
import { deleteMedia } from "@/app/actions/media";
import { useState } from "react";

export default function DeleteMediaButton({ mediaId }: { mediaId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this image? This action cannot be undone.");

        if (confirmed) {
            setIsDeleting(true);
            await deleteMedia(mediaId);
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-red-500/80 backdrop-blur-sm transition-colors disabled:opacity-50"
        >
            <Trash2 className={`h-4 w-4 ${isDeleting ? 'animate-pulse' : ''}`} />
        </button>
    );
}
