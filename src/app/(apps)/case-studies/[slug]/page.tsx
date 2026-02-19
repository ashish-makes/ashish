import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import Image from 'next/image';
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import { TextAnimate } from '@/components/ui/text-animate';
import { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { getOptimizedUrl } from '@/lib/cloudinary';

export async function generateStaticParams() {
    const projects = await prisma.caseStudy.findMany({
        where: { visibility: 'public' },
        select: { slug: true },
    });
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.caseStudy.findUnique({
        where: { slug },
    });

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.description.substring(0, 160) + "...",
        alternates: {
            canonical: `/case-studies/${slug}`,
        },
        openGraph: {
            title: `${project.title} | Ashish`,
            description: project.description.substring(0, 160) + "...",
            url: `https://ashish.cv/case-studies/${slug}`,
            images: project.imageUrl ? [{ url: project.imageUrl }] : [],
        },
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const project = await prisma.caseStudy.findUnique({
        where: { slug },
    });

    if (!project) {
        notFound();
    }

    const projectSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description.substring(0, 160) + "...",
        "image": project.imageUrl ? [project.imageUrl] : [],
        "url": `https://ashish.cv/case-studies/${project.slug}`,
        "datePublished": project.createdAt.toISOString(),
        "dateModified": project.updatedAt.toISOString(),
        "keywords": project.techStack.join(", "),
        "author": {
            "@type": "Person",
            "name": "Ashish",
            "url": "https://ashish.cv"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" },
            { "@type": "ListItem", "position": 2, "name": "Work", "item": "https://ashish.cv/work" },
            { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://ashish.cv/case-studies/${project.slug}` }
        ]
    };

    return (
        <>
            <JsonLd data={projectSchema} />
            <JsonLd data={breadcrumbSchema} />
            <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
                <Header />

                {/* EXACT Gallery Page Header Structure */}
                <section className="relative pt-32 pb-8 px-6 lg:px-12 overflow-hidden border-b border-neutral-100">
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <Link href="/work" className="group flex items-center gap-2">
                                        <ArrowLeft className="w-3 h-3 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
                                        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 group-hover:text-neutral-950 transition-colors">Visual Archives / 00{project.visibility === 'public' ? '1' : '0'}</span>
                                    </Link>
                                </div>

                                <div className="relative max-w-[95%] lg:max-w-[85%]">
                                    <TextAnimate
                                        animation="blurInUp"
                                        by="word"
                                        once={true}
                                        className="relative z-10 text-5xl md:text-[clamp(3.5rem,8vw,8rem)] tracking-tighter leading-[0.95] md:leading-[0.85]"
                                    >
                                        {project.title + "."}
                                    </TextAnimate>
                                </div>
                            </div>

                            <div className="max-w-sm mb-4">
                                <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed mb-6 font-instrument italic">
                                    An editorial exploration into the design and functional development of {project.title}.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">{project.visibility} ACCESS</span>
                                    <span className="w-4 h-px bg-neutral-100" />
                                    <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
                                        EST. {new Date(project.createdAt).getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subtle architectural background element */}
                    <div className="absolute top-0 right-0 w-1/2 h-full border-l border-neutral-50 z-0 hidden md:block" />
                </section>

                <article className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8 pb-16">
                    {/* Hero Image - Sharp Edges */}
                    {/* Hero Image - Sharp Edges */}
                    {project.imageUrl ? (
                        <div className="mb-6">
                            <div className="relative aspect-21/9 w-full bg-neutral-50 border border-neutral-100">
                                <Image
                                    src={getOptimizedUrl(project.imageUrl, { width: 1920 })}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-all duration-700"
                                    priority
                                    sizes="(max-width: 1536px) 100vw, 1536px"
                                />
                            </div>
                        </div>
                    ) : null}

                    {/* Information Console */}
                    <div className="flex flex-wrap items-center justify-between gap-12 py-8 border-y border-neutral-100 mb-12 bg-neutral-50/50 px-8">
                        <div className="flex flex-wrap items-center gap-x-16 gap-y-8">
                            <div>
                                <p className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.3em] mb-3">Core Stack</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="px-2.5 py-1 bg-neutral-950 text-white text-[9px] font-bold uppercase tracking-widest">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.3em] mb-3">Timeline</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 hover:text-neutral-950 transition-colors group"
                                >
                                    <Github className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
                                    <span>Codebase</span>
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-950 hover:text-neutral-400 transition-all group"
                                >
                                    <span>Experience</span>
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            )}
                        </div>


                    </div>

                    {/* Content Area */}
                    <div className="max-w-3xl">
                        <div className="prose-container">
                            <header className="mb-8">
                                <span className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.4em] block mb-2">Technical Breakdown</span>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                                    The Blueprint
                                </h2>
                            </header>
                            <div className="text-neutral-600 leading-relaxed text-lg font-light">
                                <BlogContent content={project.description} />
                            </div>
                        </div>
                    </div>
                </article>

                <Footer />
            </main>
        </>
    );
}
