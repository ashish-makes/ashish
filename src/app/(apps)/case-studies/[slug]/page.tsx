import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import Image from 'next/image';
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, Github, Globe, Layout, Palette } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Attempt to fetch by slug
    const project = await prisma.caseStudy.findUnique({
        where: {
            slug,
        },
    });

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            <Header />

            <article className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    {/* Header Controls */}
                    <div className="flex items-center justify-between mb-12">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-950 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full border border-neutral-100 hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-950"
                                    title="GitHub Repository"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 text-white text-sm font-bold hover:bg-neutral-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    <span>Live Preview</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.85] mb-8">
                                    {project.title}
                                </h1>

                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 rounded-full bg-neutral-100 text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-12 border-t border-neutral-100">
                                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-300 mb-6 flex items-center gap-2">
                                    <Code2 className="w-4 h-4" />
                                    The Implementation
                                </h2>
                                <BlogContent content={project.description} />
                            </div>
                        </div>

                        {/* Visual Column */}
                        <div className="lg:col-span-7">
                            {project.imageUrl && (
                                <div className="sticky top-32">
                                    <div className="relative aspect-4/3 md:aspect-square w-full rounded-[2.5rem] overflow-hidden bg-neutral-100 shadow-2xl">
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100">
                                            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mb-1">Status</p>
                                            <p className="text-sm font-bold capitalize">{project.visibility}</p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100">
                                            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mb-1">Created</p>
                                            <p className="text-sm font-bold">
                                                {new Date(project.createdAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
