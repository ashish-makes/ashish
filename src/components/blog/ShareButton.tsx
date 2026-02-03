'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from "lucide-react";
import { cn } from '@/lib/utils';

interface ShareButtonProps {
    title: string;
    text?: string;
    url?: string;
    className?: string;
}

export default function ShareButton({ title, text, url, className }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: text || `Check out this post: ${title}`,
            url: url || window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Error copying to clipboard:", err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className={cn(
                "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] transition-all group relative",
                copied ? "text-emerald-500" : "text-neutral-600 hover:text-neutral-950",
                className
            )}
            title={copied ? "Link Copied!" : "Share Post"}
        >
            {copied ? (
                <Check className="w-4 h-4 animate-in zoom-in duration-300" />
            ) : (
                <Share2 className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
            )}
            {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-[8px] rounded whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
                    Link Copied
                </span>
            )}
        </button>
    );
}
