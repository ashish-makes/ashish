import React from 'react';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import { TextAnimate } from '@/components/ui/text-animate';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 0;

export const metadata: Metadata = {
    title: "Checklist",
    description: "Tracking professional milestones and personal growth objectives.",
    openGraph: {
        title: "Checklist | Ashish",
        description: "Tracking professional milestones and personal growth objectives.",
        url: "https://ashish.cv/checklist",
    },
    alternates: {
        canonical: "/checklist",
    },
};

export default async function ChecklistPage() {
    // Fetch all goals
    const goals = await prisma.goal.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Group goals by category
    const groupedGoals = goals.reduce((acc, goal) => {
        const category = goal.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(goal);
        return acc;
    }, {} as Record<string, typeof goals>);

    const checklistSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Ashish's Professional Checklist",
        "description": metadata.description,
        "url": "https://ashish.cv/checklist",
        "itemListElement": goals.map((goal, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": goal.title
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" },
            { "@type": "ListItem", "position": 2, "name": "Checklist", "item": "https://ashish.cv/checklist" }
        ]
    };

    return (
        <>
            <JsonLd data={checklistSchema} />
            <JsonLd data={breadcrumbSchema} />
            <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white">
                <Header />

                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-neutral-100">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                            <div className="max-w-4xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">roadmap</span>
                                </div>
                                <TextAnimate
                                    animation="blurInUp"
                                    by="character"
                                    once={true}
                                    className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                                >
                                    Checklist.
                                </TextAnimate>
                            </div>
                            <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2">
                                tracking professional milestones, technical skills, and personal growth objectives.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Goals List */}
                <section className="py-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        {Object.keys(groupedGoals).length > 0 ? (
                            <div className="space-y-24">
                                {Object.entries(groupedGoals).map(([category, categoryGoals]) => {
                                    // Group by Year within Category
                                    let lastYear: number | null = null;

                                    return (
                                        <div key={category}>
                                            <h2 className="text-xl font-medium tracking-tight mb-8 capitalize text-neutral-950">{category}</h2>
                                            <div className="flex flex-col">
                                                {categoryGoals.map((goal) => {
                                                    const currentYear = new Date(goal.createdAt).getFullYear();
                                                    const showYear = currentYear !== lastYear;
                                                    lastYear = currentYear;
                                                    const isCompleted = goal.progress === 100;

                                                    return (
                                                        <div key={goal.id} className={`group flex items-baseline py-4 border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors duration-200 ${isCompleted ? 'opacity-50' : ''}`}>
                                                            {/* Year Column */}
                                                            <div className="w-24 text-sm font-mono text-neutral-400 shrink-0 select-none">
                                                                {showYear && <span>{currentYear}</span>}
                                                            </div>

                                                            {/* Title Column */}
                                                            <div className="flex-1 min-w-0 pr-8">
                                                                <h3 className={`text-base font-normal transition-colors truncate ${isCompleted ? 'text-neutral-400 line-through decoration-neutral-300' : 'text-neutral-800 group-hover:text-black'}`}>
                                                                    {goal.title}
                                                                </h3>
                                                            </div>

                                                            {/* Date Column */}
                                                            <div className="w-16 text-right text-sm font-mono text-neutral-400 shrink-0">
                                                                {new Date(goal.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400">
                                <p className="text-lg">No goals tracked yet.</p>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
