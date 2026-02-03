import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import BlogContent from '@/components/blog/BlogContent';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await prisma.blog.findUnique({
        where: {
            slug,
        },
    });

    if (!post || post.status !== 'published') {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            <Header />

            <article className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-950 transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Journal</span>
                    </Link>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 text-neutral-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-medium">
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-medium">5 min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-12">
                        {post.title}
                    </h1>

                    {/* Featured Image */}
                    {post.imageUrl && (
                        <div className="relative aspect-21/9 w-full mb-16 rounded-3xl overflow-hidden bg-neutral-100">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <BlogContent content={post.content} />

                    {/* Footer / Share */}
                    <div className="mt-24 pt-12 border-t border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Written By</p>
                            <p className="text-xl font-bold">Ashish.</p>
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-950 text-white text-sm font-bold hover:bg-neutral-800 transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            Read More Articles
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
