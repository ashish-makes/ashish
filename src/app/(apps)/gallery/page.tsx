import React from 'react';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Footer from '@/components/main/Footer';
import Header from '@/components/main/Header';
import { TextAnimate } from '@/components/ui/text-animate';

export const revalidate = 0;

export const metadata: Metadata = {
    title: "Gallery",
    description: "A visual archive of captures and moments, exploring photography and the art of seeing.",
};

export default async function GalleryPage() {
    const images = await prisma.media.findMany({
        where: {
            type: 'image'
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
            <Header />
            {/* Dynamic Editorial Hero */}
            <section className="relative pt-32 pb-16 px-6 lg:px-12 overflow-hidden border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400">Visual Archives</span>
                            </div>

                            <div className="relative">
                                <TextAnimate
                                    animation="blurInUp"
                                    by="character"
                                    once={true}
                                    className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                                >
                                    My Gallery.
                                </TextAnimate>
                            </div>
                        </div>

                        <div className="max-w-sm mb-4">
                            <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed mb-6">
                                A personal collection of captures, exploring my passion for photography and the art of seeing beauty in the everyday.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-neutral-300">INDEX: {images.length} ITEMS</span>
                                <span className="w-4 h-px bg-neutral-100" />
                                <span className="text-[10px] font-mono text-neutral-300">EST. 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle architectural background element */}
                <div className="absolute top-0 right-0 w-1/2 h-full border-l border-neutral-50 z-0 hidden md:block" />
            </section>

            {/* High-Density Gallery Grid */}
            <section className="py-2 px-2">
                <div className="max-w-screen-2xl mx-auto">
                    <GalleryGrid images={images} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
