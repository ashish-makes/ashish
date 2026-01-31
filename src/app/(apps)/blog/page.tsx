import React from 'react';
import prisma from '@/lib/prisma';
import BlogList from '@/components/blog/BlogList';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import { TextAnimate } from '@/components/ui/text-animate';

export const revalidate = 0;

export default async function BlogPage() {
    // Fetch only published blog posts
    const posts = await prisma.blog.findMany({
        where: {
            status: 'published'
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            <Header />

            {/* Editorial Hero */}
            <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">perspectives</span>
                            </div>
                            <TextAnimate
                                animation="blurInUp"
                                by="character"
                                once={true}
                                className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                            >
                                My Writings.
                            </TextAnimate>
                        </div>
                        <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2">
                            a journal of thoughts on engineering, design systems, and the intersection of technology and humans.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog List Section */}
            <section className="bg-white">
                <BlogList posts={posts} />
            </section>

            <Footer />
        </main>
    );
}
