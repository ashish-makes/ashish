"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { deleteBlog } from "@/app/actions/blog";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface BlogActionsDropdownProps {
    id: string;
    title: string;
}

export default function BlogActionsDropdown({ id, title }: BlogActionsDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setShowConfirm(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("scroll", () => setIsOpen(false));
            window.addEventListener("resize", () => setIsOpen(false));
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", () => setIsOpen(false));
            window.removeEventListener("resize", () => setIsOpen(false));
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.right - 192 + window.scrollX, // 192 is w-48
            });
        }
        setIsOpen(!isOpen);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteBlog(id);
            if (res.success) {
                router.refresh();
                setIsOpen(false);
            } else {
                alert(res.error || "Failed to delete post");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    const dropdownContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        top: coords.top + 8,
                        left: coords.left,
                        zIndex: 1000,
                    }}
                    className="w-48 bg-white border border-neutral-100 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden p-1"
                >
                    {!showConfirm ? (
                        <>
                            <Link
                                href={`/dashboard/blogs/${id}/edit`}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors group"
                            >
                                <div className="p-1.5 bg-neutral-50 rounded-lg group-hover:bg-white transition-colors">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </div>
                                Edit Article
                            </Link>
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                            >
                                <div className="p-1.5 bg-red-50/50 rounded-lg group-hover:bg-red-100/50 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </div>
                                Delete Article
                            </button>
                        </>
                    ) : (
                        <div className="p-3">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-1">Are you sure?</p>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                        "Confirm Delete"
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    disabled={isDeleting}
                                    className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative inline-block">
            <button
                ref={triggerRef}
                onClick={handleToggle}
                className={`p-2 rounded-lg transition-all duration-200 ${isOpen ? "bg-neutral-100 text-neutral-900 shadow-inner" : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                title="Actions"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
        </div>
    );
}
