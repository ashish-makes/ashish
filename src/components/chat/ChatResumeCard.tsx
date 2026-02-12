'use client';

import React, { useState } from 'react';
import { Download, FileText, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatResumeCard = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (status === 'loading') return;

        setStatus('loading');

        // Simulate a brief "preparing" state for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Trigger actual download
        const link = document.createElement('a');
        link.href = '/ASHISH.pdf';
        link.download = 'Ashish_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setStatus('success');

        // Reset to idle after a few seconds
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="group relative bg-white border border-neutral-200/60 rounded-xl p-4 mt-3 w-full max-w-[280px] shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-500 overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-neutral-50 to-white opacity-50" />

            <div className="relative z-10 flex items-start gap-4 mb-5">
                <div className="relative">
                    <div className="p-3 bg-neutral-100 rounded-xl group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-neutral-100 transition-all duration-500">
                        <FileText className="w-5 h-5 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-neutral-900 text-sm tracking-tight">Resume.pdf</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[9px] font-bold text-neutral-500 uppercase tracking-wider">PDF</span>
                        <span className="text-[10px] text-neutral-400 font-medium">2.4 MB</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleDownload}
                disabled={status === 'loading'}
                className={cn(
                    "relative w-full h-10 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 overflow-hidden",
                    status === 'idle' && "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm hover:shadow",
                    status === 'loading' && "bg-neutral-100 text-neutral-400 cursor-wait",
                    status === 'success' && "bg-emerald-500 text-white"
                )}
            >
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <span>Download Resume</span>
                            <Download className="w-3.5 h-3.5" />
                        </motion.div>
                    )}
                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {/* <span className="ml-2">Downloading...</span> */}
                        </motion.div>
                    )}
                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <span>Downloaded</span>
                            <Check className="w-3.5 h-3.5" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Bar (Fake) */}
                {status === 'loading' && (
                    <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-neutral-950"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                )}
            </button>
        </motion.div>
    );
};
