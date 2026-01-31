'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import Footer from '@/components/main/Footer';

const iconMap: Record<string, string> = {
    'Next.js': 'https://svgl.app/library/nextjs_icon_dark.svg',
    'React': 'https://svgl.app/library/react_dark.svg',
    'TypeScript': 'https://svgl.app/library/typescript.svg',
    'Tailwind': 'https://svgl.app/library/tailwindcss.svg',
    'Framer Motion': 'https://svgl.app/library/motion_dark.svg',
    'Three.js': 'https://svgl.app/library/threejs-dark.svg',
    'D3.js': 'https://svgl.app/library/d3.svg',
    'Shopify': 'https://svgl.app/library/shopify.svg',
    'Hydrogen': 'https://svgl.app/library/remix_dark.svg',
    'React Native': 'https://svgl.app/library/react_dark.svg',
    'Expo': 'https://svgl.app/library/expo.svg',
    'Node.js': 'https://svgl.app/library/nodejs.svg',
    'PostgreSQL': 'https://svgl.app/library/postgresql.svg',
    'Redux': 'https://svgl.app/library/redux.svg',
    'GLSL': 'https://svgl.app/library/opengl.svg',
    'Canvas': 'https://svgl.app/library/html5.svg',
    'Vanilla JS': 'https://svgl.app/library/javascript.svg'
};

const WorkPage = () => {
    const projects = [
        {
            title: 'Architectural Pulse',
            category: 'Branding & Experience',
            year: '2024',
            description: 'A high-end digital identity for a sustainable architecture firm, focusing on spatial geometry and organic transitions.',
            tags: ['Next.js', 'Framer Motion', 'Three.js'],
            color: 'bg-neutral-100',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        {
            title: 'Neural Dashboard',
            category: 'Product Design',
            year: '2024',
            description: 'Real-time AI monitoring dashboard with advanced data visualization and predictive analytics interface.',
            tags: ['TypeScript', 'D3.js', 'React'],
            color: 'bg-neutral-200',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        {
            title: 'Ethos Fashion',
            category: 'E-commerce',
            year: '2023',
            description: 'Minimalist shopping experience for a luxury apparel brand, emphasizing editorial-style typography and smooth interactions.',
            tags: ['Shopify', 'Hydrogen', 'Tailwind'],
            color: 'bg-neutral-300',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        {
            title: 'Zenith App',
            category: 'Mobile Application',
            year: '2023',
            description: 'Mindfulness and meditation app designed for high-stress environments, featuring immersive soundscapes.',
            tags: ['React Native', 'Expo', 'TypeScript'],
            color: 'bg-neutral-400',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        {
            title: 'Oasis Flow',
            category: 'Web Application',
            year: '2022',
            description: 'Comprehensive workflow management tool for creative studios, integrating task tracking and visual collation.',
            tags: ['Node.js', 'PostgreSQL', 'Redux'],
            color: 'bg-neutral-500',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        {
            title: 'Lumina Type',
            category: 'Design Tooling',
            year: '2022',
            description: 'An interactive typography playground for exploring variable fonts and motion-based layout systems.',
            tags: ['GLSL', 'Canvas', 'Vanilla JS'],
            color: 'bg-neutral-600',
            github: 'https://github.com',
            live: 'https://example.com'
        }
    ];



    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">Selected Projects</span>
                            </div>
                            <TextAnimate
                                animation="blurInUp"
                                by="character"
                                once={true}
                                className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                            >
                                My Work.
                            </TextAnimate>
                        </div>
                        <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2">
                            A curated selection of work exploring the intersection of design precision and technical performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 px-6 lg:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                viewport={{ once: false, amount: 0.2, margin: "-5% 0px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: (i % 2) * 0.15,
                                    ease: [0.16, 1, 0.3, 1] as any
                                }}
                                className="group cursor-default"
                            >
                                {/* Visual Placeholder */}
                                <div className="relative aspect-16/10 overflow-hidden bg-neutral-50 mb-6 rounded-sm">
                                    <div className={`absolute inset-0 ${project.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-200 group-hover:scale-110 transition-transform duration-700 opacity-50">
                                            Project Exploration
                                        </span>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                                            {project.title}
                                        </h3>
                                        <span className="text-[10px] font-mono text-neutral-300">
                                            0{i + 1}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                                        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-neutral-200" />
                                        <span className="text-xs font-mono text-neutral-300">
                                            {project.year}
                                        </span>
                                    </div>

                                    <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed max-w-md group-hover:text-neutral-800 transition-colors duration-500 mb-6">
                                        {project.description}
                                    </p>

                                    {/* Links and Tags Row */}
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        {/* Action Links */}
                                        <div className="flex items-center gap-4 transition-all duration-500">
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] font-bold uppercase tracking-widest text-neutral-950 flex items-center gap-1.5 hover:underline underline-offset-4 decoration-neutral-300 transition-all"
                                            >
                                                Live Demo
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5 hover:text-neutral-950 transition-colors"
                                            >
                                                GitHub
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>

                                        {/* Icon Tags */}
                                        <div className="flex flex-wrap gap-2 transition-all duration-500">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-50 border border-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500 group/tag hover:bg-black hover:text-white transition-all duration-300"
                                                >
                                                    {iconMap[tag] && (
                                                        <img
                                                            src={iconMap[tag]}
                                                            alt={tag}
                                                            className="w-3 h-3 object-contain filter group-hover/tag:brightness-0 group-hover/tag:invert transition-all duration-300"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default WorkPage;
