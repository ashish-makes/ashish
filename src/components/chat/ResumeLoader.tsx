'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeLoaderProps {
    onComplete: () => void;
}

const LOADING_STEPS = [
    "Analyzing request...",
    "Gathering professional data...",
    "Compiling experience...",
    "Formatting document...",
    "Finalizing PDF..."
];

export const ResumeLoader = ({ onComplete }: ResumeLoaderProps) => {
    const [stepIndex, setStepIndex] = useState(0);
    const onCompleteRef = React.useRef(onComplete);

    // Keep ref updated
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const stepDuration = 800; // ms per step
        const totalSteps = LOADING_STEPS.length;

        const timer = setInterval(() => {
            setStepIndex((prev) => {
                if (prev < totalSteps - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, stepDuration);

        // Complete after all steps + a little buffer
        const completionTimer = setTimeout(() => {
            if (onCompleteRef.current) {
                onCompleteRef.current();
            }
        }, stepDuration * totalSteps + 500);

        return () => {
            clearInterval(timer);
            clearTimeout(completionTimer);
        };
    }, []); // Run once on mount

    return (
        <div className="bg-neutral-50/50 border border-neutral-100 rounded-lg p-4 w-full max-w-[280px] flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-5 h-5">
                    <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
                </div>
                <div className="h-5 flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={stepIndex}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="text-xs font-medium text-neutral-600"
                        >
                            {LOADING_STEPS[stepIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-neutral-900"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 * LOADING_STEPS.length, ease: "linear" }}
                />
            </div>
        </div>
    );
};
