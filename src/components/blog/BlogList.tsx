'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    imageUrl?: string | null;
    content?: string;
    status: string;
}

interface BlogListProps {
    posts: BlogPost[];
}

const BlogList = ({ posts }: BlogListProps) => {
    // If no posts from database, use some premium placeholders for demonstration
    const displayPosts = posts.length > 0 ? posts : [
        {
            id: 'p1',
            title: 'The Art of Minimalist Engineering',
            slug: 'minimalist-engineering',
            createdAt: new Date('2024-01-15'),
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
            status: 'published',
            content: 'Exploring the boundary between structural necessity and aesthetic purity in modern software architecture.'
        },
        {
            id: 'p2',
            title: 'Building Scalable Design Systems',
            slug: 'scalable-design-systems',
            createdAt: new Date('2024-01-10'),
            imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
            status: 'published',
            content: 'A deep dive into creating robust, flexible component libraries that empower teams and maintain consistency.'
        },
        {
            id: 'p3',
            title: 'The Future of AI in Creative Workflows',
            slug: 'future-of-ai',
            createdAt: new Date('2024-01-05'),
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
            status: 'published',
            content: 'How generative intelligence is redefining the role of the designer and the process of digital creation.'
        }
    ];

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            filter: "blur(20px)",
            y: 40
        },
        visible: (i: number) => ({
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 1,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 border-t border-b border-neutral-100">
            {displayPosts.map((post, i) => (
                <motion.div
                    key={post.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="bg-white group"
                >
                    <Link
                        href={`/blog/${post.slug}`}
                        className="flex flex-col h-full p-6 md:p-8 transition-all duration-500 hover:bg-neutral-50"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-300">/ 0{i + 1}</span>
                            </div>

                            {post.imageUrl && (
                                <div className="aspect-video w-full overflow-hidden mb-6 bg-neutral-100 rounded-none">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-4 group-hover:text-neutral-600 transition-colors duration-500">
                                {post.title.toLowerCase()}
                            </h2>

                            {post.content && (
                                <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6 group-hover:text-neutral-800 transition-colors duration-500 line-clamp-2">
                                    {post.content}
                                </p>
                            )}

                            <div className="mt-auto pt-6 flex items-center justify-between border-t border-neutral-50">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">Open</span>
                                <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default BlogList;
