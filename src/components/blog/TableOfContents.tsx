"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<ToCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // 1. Extract headings from content on mount/content change
    useEffect(() => {
        if (!content) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const headingElements = doc.querySelectorAll('h2, h3');

        const extractedHeadings: ToCItem[] = Array.from(headingElements).map((el) => {
            const text = el.textContent || '';
            // Same slugify logic as BlogContent.tsx
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            return {
                id,
                text,
                level: parseInt(el.tagName[1])
            };
        });

        setHeadings(extractedHeadings);
    }, [content]);

    // 2. Track active section with IntersectionObserver
    useEffect(() => {
        if (headings.length === 0) return;

        const observerOptions = {
            rootMargin: '-100px 0% -80% 0%', // Adjust to trigger when heading is near top
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, observerOptions);

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    // Handle smooth scrolling to heading
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    // Generate numbers for headings
    const getNumberedHeadings = () => {
        let h2Count = 0;
        let h3Count = 0;

        return headings.map((heading) => {
            if (heading.level === 2) {
                h2Count++;
                h3Count = 0; // Reset h3 count for new h2
                return { ...heading, number: `${h2Count}` };
            } else {
                h3Count++;
                return { ...heading, number: `${h2Count}.${h3Count}` };
            }
        });
    };

    const numberedHeadings = getNumberedHeadings();

    const scrollToHeadingMobile = (id: string) => {
        scrollToHeading(id);
        setIsOpen(false);
    };

    if (headings.length === 0) return null;

    return (
        <>
            {/* Desktop Version (Unchanged) */}
            <nav className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide hidden lg:block w-72">
                <div className="bg-[#f9fafb] border border-neutral-100 rounded-2xl p-6">
                    <h4 className="text-xs font-bold text-neutral-500 mb-6">
                        Outline
                    </h4>
                    <ul className="space-y-4">
                        {numberedHeadings.map((heading) => (
                            <li
                                key={heading.id}
                                style={{ paddingLeft: heading.level === 3 ? '1.5rem' : '0' }}
                            >
                                <button
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={`text-left text-sm transition-all duration-300 flex gap-3 group ${activeId === heading.id
                                            ? 'text-neutral-950 font-bold'
                                            : 'text-neutral-500 hover:text-neutral-800'
                                        }`}
                                >
                                    <span className={`shrink-0 tabular-nums ${activeId === heading.id ? 'text-neutral-950' : 'text-neutral-300'
                                        }`}>
                                        {heading.number}.
                                    </span>
                                    <span className="leading-snug text-balance">
                                        {heading.text}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Floating Trigger */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        className="fixed bottom-24 right-6 z-40 lg:hidden"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-12 h-12 bg-neutral-900 shadow-2xl rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
                            aria-label="Table of Contents"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Popover Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] bg-white rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden lg:hidden"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            {/* Mobile Header */}
                            <div className="px-8 pt-8 pb-4 flex justify-between items-center">
                                <h4 className="text-xs font-bold text-neutral-500">
                                    On this page
                                </h4>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[10px] font-black text-neutral-900 uppercase tracking-widest bg-neutral-100 px-4 py-2 rounded-full active:scale-95 transition-transform"
                                >
                                    Close
                                </button>
                            </div>

                            {/* Mobile Scrollable Content */}
                            <div className="bg-[#f9fafb] flex-1 overflow-y-auto px-8 pb-12 pt-4 scrollbar-hide">
                                <ul className="space-y-6">
                                    {numberedHeadings.map((heading) => (
                                        <li
                                            key={heading.id}
                                            style={{ paddingLeft: heading.level === 3 ? '1.5rem' : '0' }}
                                        >
                                            <button
                                                onClick={() => scrollToHeadingMobile(heading.id)}
                                                className={`text-left text-base transition-all duration-300 flex gap-4 w-full py-1 ${activeId === heading.id
                                                    ? 'text-neutral-950 font-bold'
                                                    : 'text-neutral-500'
                                                    }`}
                                            >
                                                <span className={`shrink-0 tabular-nums ${activeId === heading.id ? 'text-neutral-950' : 'text-neutral-300'
                                                    }`}>
                                                    {heading.number}.
                                                </span>
                                                <span className="leading-snug">
                                                    {heading.text}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
