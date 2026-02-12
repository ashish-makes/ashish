'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                const speed =
                    prev < 30 ? Math.floor(Math.random() * 6) + 3 :
                        prev < 70 ? Math.floor(Math.random() * 4) + 2 :
                            Math.floor(Math.random() * 2) + 1;
                return Math.min(prev + speed, 100);
            });
        }, 55);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white flex items-end justify-end"
                    initial={{ opacity: 1 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <motion.span
                        className="text-[30vw] md:text-[15vw] leading-none font-instrument italic text-neutral-950 pr-6 pb-4 md:pr-12 md:pb-8 lg:pr-24 lg:pb-12 select-none tabular-nums"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -60, transition: { duration: 0.4 } }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {counter}
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
