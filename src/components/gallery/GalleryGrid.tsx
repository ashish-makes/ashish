'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { getOptimizedUrl } from '@/lib/cloudinary';


interface MediaItem {
    id: string;
    url: string;
    name: string;
    type: string;
    createdAt: Date;
}

interface GalleryGridProps {
    images: MediaItem[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-neutral-500">
                <p className="text-lg font-light tracking-tight">No captures found in the collection.</p>
            </div>
        );
    }

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
                delay: (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2">
            {images.map((image, i) => (
                <motion.div
                    key={image.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1, margin: "-10% 0px" }}
                    className="break-inside-avoid"
                >
                    <div className="relative overflow-hidden bg-neutral-100 rounded-none">
                        <img
                            src={getOptimizedUrl(image.url)}
                            alt={image.name}
                            className="w-full h-auto object-cover block"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default GalleryGrid;
