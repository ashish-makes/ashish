import React from 'react';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

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

import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: "Work",
    description: "A showcase of selected UI/UX design and development projects, exploring the boundary between digital precision and human experience.",
};

export default async function WorkPage() {
    const projects = await prisma.caseStudy.findMany({
        where: {
            visibility: 'public'
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const workSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Ashish's Portfolio",
        "description": metadata.description,
        "url": "https://ashish.cv/work",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": projects.map((project, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://ashish.cv/case-studies/${(project as any).slug || project.id}`,
                "name": project.title
            }))
        }
    };

    return (
        <>
            <JsonLd data={workSchema} />
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
                <section className="py-16 px-6 lg:px-12 min-h-[40vh]">
                    <div className="max-w-screen-2xl mx-auto">
                        {projects.length === 0 ? (
                            <div className="py-24 text-center">
                                <p className="text-neutral-400 font-light text-lg">Portfolio is currently being curated. Check back soon.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                                {projects.map((project, i) => (
                                    <Link
                                        key={project.id}
                                        href={`/case-studies/${(project as any).slug || project.id}`}
                                        className="group cursor-pointer block"
                                    >
                                        {/* Visual Placeholder */}
                                        <div className="relative aspect-16/10 overflow-hidden bg-neutral-50 mb-6 rounded-sm">
                                            {project.imageUrl ? (
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700 bg-neutral-900" />
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                {!project.imageUrl && (
                                                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-200 group-hover:scale-110 transition-transform duration-700 opacity-50">
                                                        Project Showcase
                                                    </span>
                                                )}
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
                                                    Case Study
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-neutral-200" />
                                                <span className="text-xs font-mono text-neutral-300">
                                                    {new Date(project.createdAt).getFullYear()}
                                                </span>
                                            </div>

                                            {/* Tag Row */}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.techStack.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-50 border border-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                                                    >
                                                        {iconMap[tag] && (
                                                            <img
                                                                src={iconMap[tag]}
                                                                alt={tag}
                                                                className="w-3 h-3 object-contain"
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
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
