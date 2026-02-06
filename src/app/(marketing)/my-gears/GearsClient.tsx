'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import {
    Laptop,
    Monitor,
    MousePointer2,
    Keyboard as KeyboardIcon,
    Volume2,
    Cpu,
    Code2,
    Sparkles,
    MousePointerClick,
    Layout,
    Armchair
} from 'lucide-react';

const iconMap: Record<string, any> = {
    'Apple': 'apple',
    'Amazon': 'amazon',
    'Lenovo': 'lenovo',
    'HP': 'hp',
    'VS Code': 'visualstudiocode',
    'Figma': 'figma',
    'Cursor': 'cursor',
    'Antigravity': 'google-gemini',
    'MotionGrey': 'blueprint',
    'Mimoglad': 'seat'
};

const getFallbackIcon = (category: string, name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('macbook') || lowerName.includes('laptop')) return Laptop;
    if (lowerName.includes('monitor') || lowerName.includes('display')) return Monitor;
    if (lowerName.includes('mouse')) return MousePointer2;
    if (lowerName.includes('keyboard')) return KeyboardIcon;
    if (lowerName.includes('echo') || lowerName.includes('speaker')) return Volume2;
    if (lowerName.includes('desk')) return Layout;
    if (lowerName.includes('chair')) return Armchair;
    if (lowerName.includes('vscode')) return Code2;
    if (lowerName.includes('antigravity')) return Sparkles;
    if (lowerName.includes('cursor')) return MousePointerClick;
    return Cpu;
};

const GearsClient = ({ categories }: { categories: any[] }) => {
    const itemVariants: Variants = {
        hidden: { opacity: 0, filter: "blur(12px)", y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 0.8,
                delay: (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">Digital Toolbox</span>
                            </div>
                            <TextAnimate
                                animation="blurInUp"
                                by="character"
                                once={true}
                                className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                            >
                                The Gear.
                            </TextAnimate>
                        </div>
                        <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2">
                            A curated collection of hardware and software used to build digital experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Sections */}
            {categories.map((category, idx) => (
                <section key={category.title} className={`py-24 px-6 lg:px-12 ${idx % 2 !== 0 ? 'bg-neutral-50' : 'bg-white'} border-b border-neutral-100`}>
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="flex flex-col mb-16">
                            <span className="text-xs font-mono text-neutral-300 mb-4">0{idx + 1}</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">{category.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {category.items.map((item: any, i: number) => {
                                const FallbackIcon = getFallbackIcon(category.title, item.name);
                                const iconSlug = iconMap[item.brand];

                                return (
                                    <motion.div
                                        key={item.name}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.2, margin: "-5% 0px" }}
                                        variants={itemVariants}
                                        className="group flex flex-col justify-between p-8 bg-white border border-neutral-100 rounded-sm hover:border-neutral-900 transition-colors duration-500"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="w-10 h-10 flex items-center justify-center bg-neutral-50 rounded-full group-hover:bg-neutral-900 transition-colors duration-500 overflow-hidden">
                                                    {iconSlug ? (
                                                        <img
                                                            src={`https://cdn.simpleicons.org/${iconSlug}`}
                                                            alt={item.brand}
                                                            className="w-5 h-5 object-contain group-hover:invert transition-all"
                                                        />
                                                    ) : (
                                                        <FallbackIcon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                                                    )}
                                                </div>
                                                <span className="text-[8px] font-mono text-neutral-300 uppercase tracking-widest">{item.specs}</span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-500">
                                                {item.name}
                                            </h3>
                                            <p className="text-neutral-500 text-sm font-light leading-relaxed mb-8 group-hover:text-neutral-800 transition-colors duration-500">
                                                {item.description}
                                            </p>
                                        </div>

                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors"
                                        >
                                            View Product
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ))}
        </main>
    );
};

export default GearsClient;
