'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Animated digit component for the clock with blur fade effect
const AnimatedDigit = ({ digit }: { digit: string }) => (
    <div className="relative h-4 w-[0.6em] overflow-hidden">
        <AnimatePresence mode="popLayout">
            <motion.span
                key={digit}
                initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
                transition={{
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 0.2 },
                    filter: { duration: 0.25 }
                }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {digit}
            </motion.span>
        </AnimatePresence>
    </div>
);

// Real-time animated clock component
const AnimatedClock = ({ time }: { time: Date }) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const hour12 = hours % 12 || 12;
    const hourStr = hour12.toString().padStart(2, '0');
    const minStr = minutes.toString().padStart(2, '0');
    const secStr = seconds.toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-0.5 text-xs font-mono font-medium tracking-wide text-neutral-600">
            {/* Hours */}
            <AnimatedDigit digit={hourStr[0]} />
            <AnimatedDigit digit={hourStr[1]} />
            <span className="mx-0.5 animate-pulse">:</span>
            {/* Minutes */}
            <AnimatedDigit digit={minStr[0]} />
            <AnimatedDigit digit={minStr[1]} />
            <span className="mx-0.5 animate-pulse">:</span>
            {/* Seconds */}
            <AnimatedDigit digit={secStr[0]} />
            <AnimatedDigit digit={secStr[1]} />
            {/* AM/PM */}
            <span className="ml-1 text-neutral-400">{ampm}</span>
        </div>
    );
};

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [fullMenuOpen, setFullMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Prevent body scroll when full menu is open
    useEffect(() => {
        if (fullMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [fullMenuOpen]);

    const menuLinks = [
        { href: '/', label: 'Home' },
        { href: '/work', label: 'Work' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 bg-white">
                <nav className="w-full px-6 lg:px-12 py-6">
                    <div className="flex items-center justify-between">
                        {/* Logo - Always visible */}
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="text-xl font-bold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
                            >
                                ASHISH
                            </a>
                        </div>

                        {/* Right side controls */}
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Current Time & Date */}
                            <div className="hidden md:flex items-center gap-3 text-neutral-500">
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <AnimatedClock time={currentTime} />
                                </div>
                                <span className="text-neutral-300">|</span>
                                <span className="text-xs font-mono font-medium tracking-wide">
                                    {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            {/* Menu Trigger at the top */}
                            <motion.button
                                whileHover="hover"
                                className="flex items-center gap-3 p-2 -mr-2 rounded-full cursor-pointer"
                                onClick={() => setFullMenuOpen(true)}
                            >
                                <motion.span
                                    variants={{
                                        hover: { color: 'rgb(115, 115, 115)' } // neutral-500
                                    }}
                                    className="hidden md:block text-sm font-bold uppercase tracking-widest text-neutral-900 transition-colors duration-300"
                                >
                                    Menu
                                </motion.span>
                                <div className="flex flex-col gap-1.5 items-end">
                                    <motion.div
                                        variants={{
                                            hover: { width: '2rem' } // 8 in tailwind
                                        }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="w-6 h-0.5 bg-neutral-900"
                                    />
                                    <motion.div
                                        variants={{
                                            hover: { width: '2rem' }
                                        }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="w-4 h-0.5 bg-neutral-900"
                                    />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Floating Menu Button (Mobile/Scroll only) */}
            <AnimatePresence mode="wait">
                {isScrolled && !fullMenuOpen && (
                    <motion.button
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        exit={{ y: 120 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-neutral-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform origin-bottom"
                        onClick={() => setFullMenuOpen(true)}
                    >
                        Menu
                        <div className="flex flex-col gap-1 items-end">
                            <div className="w-4 h-0.5 bg-white" />
                            <div className="w-2 h-0.5 bg-white" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Full Page Menu Overlay */}
            <AnimatePresence>
                {fullMenuOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1] // Custom buttery smooth cubic-bezier
                        }}
                        className="fixed inset-0 z-[100] bg-neutral-900 flex flex-col overflow-hidden"
                    >
                        {/* Menu Header (Close Button at top) */}
                        <div className="w-full px-6 lg:px-12 py-8 flex justify-between items-center text-white">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Navigation</span>
                            <button
                                className="group flex items-center gap-4 hover:opacity-70 transition-opacity"
                                onClick={() => setFullMenuOpen(false)}
                            >
                                <span className="text-sm font-bold uppercase tracking-widest">Close</span>
                                <div className="relative w-8 h-8 flex items-center justify-center">
                                    <div className="absolute w-6 h-0.5 bg-white rotate-45" />
                                    <div className="absolute w-6 h-0.5 bg-white -rotate-45" />
                                </div>
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex-1 flex flex-col justify-center px-6 lg:px-24">
                            <nav
                                className="space-y-4 lg:space-y-6"
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {menuLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    const isAnyHovered = hoveredIndex !== null;
                                    const isTarget = hoveredIndex === index || (isActive && !isAnyHovered);

                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ y: 40, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <a
                                                href={link.href}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                className={`
                                                    block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none
                                                    transition-all duration-500 ease-out
                                                    ${isTarget ? 'text-white translate-x-4 md:translate-x-8' : 'text-white/20 scale-95'}
                                                `}
                                                onClick={() => setFullMenuOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        </motion.div>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Menu Footer */}
                        <div className="w-full px-6 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-end gap-8 text-white/80 border-t border-white/5">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold tracking-[0.2em]">Contact</span>
                                <a href="mailto:hello@ashish.design" className="text-base text-white hover:underline underline-offset-8">hello@ashish.design</a>
                            </div>
                            <div className="flex gap-8">
                                <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Instagram</a>
                                <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Behance</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
