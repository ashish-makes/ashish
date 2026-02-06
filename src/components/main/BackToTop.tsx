'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth progress for the circular indicator
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-neutral-900 text-white rounded-full shadow-2xl hover:bg-neutral-800 transition-colors duration-300 group"
                    aria-label="Back to top"
                >
                    {/* Simplified Circular Progress Container */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-neutral-800"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="289.027" // 2 * PI * r
                            style={{ pathLength: scaleX }}
                            className="text-white"
                        />
                    </svg>

                    {/* Arrow Icon */}
                    <svg
                        className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
