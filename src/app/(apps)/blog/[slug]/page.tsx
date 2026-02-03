import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import Image from 'next/image';
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Pen } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import { TextAnimate } from '@/components/ui/text-animate';
import { calculateReadTime } from '@/lib/utils';
import ShareButton from '@/components/blog/ShareButton';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await prisma.blog.findUnique({
        where: { slug },
    });

    if (!post || post.status !== 'published') {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            <Header />

            {/* EXACT Gallery/Case-Study Page Header Structure */}
            <section className="relative pt-32 pb-8 px-6 lg:px-12 overflow-hidden border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <Link href="/blog" className="group flex items-center gap-2">
                                    <ArrowLeft className="w-3 h-3 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 group-hover:text-neutral-950 transition-colors">Journal Archives / 001</span>
                                </Link>
                            </div>

                            <div className="relative">
                                <TextAnimate
                                    animation="blurInUp"
                                    by="character"
                                    once={true}
                                    className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                                >
                                    {post.title + "."}
                                </TextAnimate>
                            </div>
                        </div>

                        <div className="max-w-sm mb-4">
                            <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed mb-6 font-instrument italic">
                                A curated perspective on design, technology, and the nuances of the digital craft.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">PUBLISHED</span>
                                <span className="w-4 h-px bg-neutral-100" />
                                <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
                {post.imageUrl && (
                    <div className="mb-6">
                        <div className="relative aspect-[21/9] w-full bg-neutral-50 border border-neutral-100">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Information Console */}
                <div className="flex flex-wrap items-center justify-between gap-12 py-8 border-y border-neutral-100 mb-12 bg-neutral-50/50 px-8">
                    <div className="flex flex-wrap items-center gap-x-16 gap-y-8">
                        <div className="flex items-center gap-3">
                            <Pen className="w-4 h-4 text-neutral-400" />
                            <p className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.3em]">Written by Ashish</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <p className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.3em]">{calculateReadTime(post.content)} Min Read</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <ShareButton
                            title={post.title}
                            text={`Check out this blog post: ${post.title}`}
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-3xl">
                    <div className="prose-container">
                        <header className="mb-8">
                            <span className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.4em] block mb-2">Editorial Narrative</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                                The Perspective
                            </h2>
                        </header>
                        <div className="text-neutral-600 leading-relaxed text-lg font-light">
                            <BlogContent content={post.content} />
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
