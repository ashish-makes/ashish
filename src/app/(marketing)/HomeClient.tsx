'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import Magnetic from '@/components/animations/Magnetic';
import Footer from '@/components/main/Footer';
import Link from 'next/link';
import { CaseStudy } from '@prisma/client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { getOptimizedUrl } from '@/lib/cloudinary';


const WorkCard = ({ caseStudy, index }: { caseStudy: CaseStudy; index: number }) => {
    return (
        <Link href={`/case-studies/${caseStudy.slug}`} className="group cursor-pointer shrink-0 w-[85vw] md:w-[45vw] lg:w-[40vw] block">
            <div className="relative aspect-video overflow-hidden bg-neutral-100 mb-6 rounded-sm">
                <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-700 ease-out" />
                {(caseStudy as any).videoUrl ? (
                    <video
                        src={getOptimizedUrl((caseStudy as any).videoUrl)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        muted
                        loop
                        autoPlay
                        playsInline
                        poster={getOptimizedUrl(caseStudy.imageUrl) || undefined}
                    />
                ) : caseStudy.imageUrl ? (
                    <img
                        src={getOptimizedUrl(caseStudy.imageUrl)}
                        alt={caseStudy.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium whitespace-nowrap overflow-hidden">
                        <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-30">No Image</span>
                    </div>
                )}
            </div>
            <div className="flex items-start justify-between">
                <div className="max-w-[70%]">
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-1 leading-tight group-hover:text-neutral-600 transition-colors line-clamp-2">
                        {caseStudy.title}
                    </h3>
                    <p className="text-xs md:text-base text-neutral-500 font-medium tracking-tight">
                        {caseStudy.techStack.slice(0, 3).join(" • ")}
                    </p>
                </div>
                <div className="text-right">
                    <span className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest pt-1.5 leading-none mb-1">
                        {caseStudy.visibility}
                    </span>
                    <span className="block text-[8px] font-bold text-neutral-300 uppercase tracking-widest leading-none">
                        {new Date(caseStudy.createdAt).getFullYear()}
                    </span>
                </div>
            </div>
        </Link>
    );
};

const HorizontalWork = ({ caseStudies }: { caseStudies: CaseStudy[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const isMobile = windowWidth < 768;
    const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-76%" : "-60%"]);

    return (
        <section id="work" ref={targetRef} data-scroll-section className="relative h-[400vh] bg-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                {/* Header */}
                <div className="absolute top-24 left-0 w-full px-6 md:px-12 lg:px-24">
                    <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <TextAnimate animation="blurInUp" by="word" className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight">
                            Selected Work
                        </TextAnimate>
                        <p className="text-neutral-700 text-sm md:text-base max-w-sm font-light">
                            A collection of projects exploring the boundary between digital precision and human experience.
                        </p>
                    </div>
                </div>

                <motion.div style={{ x }} className="flex gap-10 md:gap-14 px-6 md:px-12 lg:px-24 mt-32">
                    {caseStudies.map((project, i) => (
                        <WorkCard key={project.id} index={i} caseStudy={project} />
                    ))}
                </motion.div>
            </div>
        </section >
    );
};

const EmailCopyButton = () => {
    const [copied, setCopied] = React.useState(false);
    const email = 'ashindia.003@gmail.com';

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.button
            onClick={handleCopy}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors duration-300"
            title={copied ? 'Copied!' : 'Copy email'}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.svg
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-4 h-4 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                ) : (
                    <motion.svg
                        key="email"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </motion.svg>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

const Experience = () => {
    const roles = [
        {
            year: '2023 — Present',
            company: 'Freelance',
            role: 'Full-Stack Developer',
            description: 'Working with startups and small businesses to design, develop, and deploy custom web applications and digital solutions.',
            responsibilities: [
                'Developing custom e-commerce platforms and business websites using Next.js, React, and Node.js',
                'Building responsive, mobile-first user interfaces with modern CSS frameworks and animations',
                'Implementing database solutions with MongoDB and PostgreSQL for scalable data management',
                'Deploying and maintaining applications on cloud platforms with CI/CD pipelines',
                'Providing end-to-end project management from concept to launch'
            ]
        },
        {
            year: 'Apr 2025 — Present',
            company: 'UrbanIQ',
            role: 'Full-Stack Engineer',
            description: 'Building the UrbanIQ smart-pet-tech platform from the ground up, delivering a fully responsive, cloud-hosted e-commerce experience.',
            responsibilities: [
                'Designed and developed the UrbanIQ smart-pet-tech platform from scratch using Next.js, React, Node.js, and MongoDB',
                'Implemented a product showcase and cart system for IoT pet devices with secure checkout and mobile-optimized UX',
                'Built cloud deployment pipelines with GitHub-based CI/CD and containerized infrastructure for high availability',
                'Integrated customer testimonials, trust metrics, and dynamic analytics to improve conversion rates',
                'Optimized SEO and performance with image optimization, code splitting, and schema markup'
            ]
        },
        {
            year: 'Nov 2023 — Mar 2025',
            company: 'Anytime Cell Care',
            role: 'Full-Stack Developer',
            description: 'Developed and launched a comprehensive e-commerce and service platform for mobile device sales and repairs.',
            responsibilities: [
                'Built a comprehensive e-commerce and service platform using Next.js 15 with App Router, MongoDB, React, and Node.js',
                'Implemented dynamic product catalog with advanced filtering, increasing user engagement by 40%',
                'Built a robust inventory management system, improving stock accuracy by 25% and reducing overstocking by 15%',
                'Implemented SEO best practices with dynamic sitemap generation and Schema markup, achieving 50% increase in organic visibility',
                'Optimized site performance, achieving 30% reduction in page load times and 20% increase in conversion rates'
            ]
        },
    ];

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            filter: "blur(12px)",
            y: 30,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any
            }
        },
    };

    return (
        <section className="bg-neutral-950 py-16 md:py-24 px-6 lg:px-12 font-bricolage border-t border-white/10">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
                {/* Header */}
                <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500">Experience</span>
                    </div>
                    <TextAnimate animation="blurInUp" by="word" className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">
                        Commercial History.
                    </TextAnimate>
                    <p className="text-neutral-500 text-sm font-light mt-4 leading-relaxed">
                        Click on each role to explore responsibilities and achievements.
                    </p>
                </div>

                {/* Accordion List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1, margin: "-5% 0px -5% 0px" }}
                    className="md:w-2/3 flex flex-col"
                >
                    <Accordion type="single" className="w-full">
                        {roles.map((role, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                            >
                                <AccordionItem value={`item-${i}`}>
                                    <AccordionTrigger className="group hover:pl-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full pr-4">
                                            <div className="flex flex-col mb-1 md:mb-0">
                                                <span className="text-lg md:text-xl font-bold text-white group-hover:text-neutral-300 transition-colors">{role.company}</span>
                                                <span className="text-xs md:text-sm text-neutral-400 font-light">{role.role}</span>
                                            </div>
                                            <span className="text-[10px] md:text-xs font-mono text-neutral-500 group-hover:text-white transition-colors uppercase tracking-widest">{role.year}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pl-0 md:pl-4 space-y-4">
                                            <p className="text-neutral-400 text-sm font-light leading-relaxed">
                                                {role.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {role.responsibilities.map((responsibility, j) => (
                                                    <motion.li
                                                        key={j}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: j * 0.05, duration: 0.3 }}
                                                        className="flex items-start gap-3 text-neutral-300 text-sm font-light"
                                                    >
                                                        <span className="text-neutral-500 mt-0.5 text-xs font-mono w-4">{j + 1}.</span>
                                                        <span>{responsibility}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};

const DigitalToolbox = () => {
    const stack = [
        {
            category: 'Frontend & Frameworks',
            tools: [
                { name: 'Next.js', icon: 'https://svgl.app/library/nextjs_icon_dark.svg' },
                { name: 'React', icon: 'https://svgl.app/library/react_dark.svg' },
                { name: 'JavaScript', icon: 'https://svgl.app/library/javascript.svg' },
                { name: 'TypeScript', icon: 'https://svgl.app/library/typescript.svg' },
                { name: 'HTML/CSS', icon: 'https://svgl.app/library/html5.svg' },
                { name: 'Tailwind', icon: 'https://svgl.app/library/tailwindcss.svg' },
                { name: 'Motion', icon: 'https://svgl.app/library/motion_dark.svg' },
                { name: 'Redux', icon: 'https://svgl.app/library/redux.svg' },
                { name: 'Shadcn UI', icon: 'https://svgl.app/library/shadcn-ui_dark.svg' },
                { name: 'Three.js', icon: 'https://svgl.app/library/threejs-dark.svg' }
            ]
        },
        {
            category: 'Backend & Databases',
            tools: [
                { name: 'Node.js', icon: 'https://svgl.app/library/nodejs.svg' },
                { name: 'Express', icon: 'https://svgl.app/library/expressjs_dark.svg' },
                { name: 'Python', icon: 'https://svgl.app/library/python.svg' },
                { name: 'Django', icon: 'https://svgl.app/library/django.svg' },
                { name: 'PHP', icon: 'https://svgl.app/library/php_dark.svg' },
                { name: 'Java', icon: 'https://svgl.app/library/java.svg' },
                { name: 'PostgreSQL', icon: 'https://svgl.app/library/postgresql.svg' },
                { name: 'MySQL', icon: 'https://svgl.app/library/mysql.svg' },
                { name: 'MongoDB', icon: 'https://svgl.app/library/mongodb-icon-dark.svg' },
                { name: 'Prisma', icon: 'https://svgl.app/library/prisma_dark.svg' },
                { name: 'Redis', icon: 'https://svgl.app/library/redis.svg' },
                { name: 'Docker', icon: 'https://svgl.app/library/docker.svg' },
                { name: 'AWS', icon: 'https://svgl.app/library/aws_dark.svg' }
            ]
        },
        {
            category: 'Tools & Platforms',
            tools: [
                { name: 'Figma', icon: 'https://svgl.app/library/figma.svg' },
                { name: 'Notion', icon: 'https://svgl.app/library/notion_dark.svg' },
                { name: 'Git', icon: 'https://svgl.app/library/git.svg' },
                { name: 'GitHub', icon: 'https://svgl.app/library/github_dark.svg' },
                { name: 'Vercel', icon: 'https://svgl.app/library/vercel_dark.svg' },
                { name: 'Cloudflare', icon: 'https://svgl.app/library/cloudflare.svg' },
                { name: 'Google Analytics', icon: 'https://svgl.app/library/google_analytics.svg' },
                { name: 'Postman', icon: 'https://svgl.app/library/postman.svg' },
                { name: 'Stripe', icon: 'https://svgl.app/library/stripe.svg' },
                { name: 'Linear', icon: 'https://svgl.app/library/linear.svg' },
                { name: 'Slack', icon: 'https://svgl.app/library/slack.svg' },
                { name: 'Discord', icon: 'https://svgl.app/library/discord.svg' },
                { name: 'Adobe', icon: 'https://svgl.app/library/adobe.svg' }
            ]
        },
    ];

    return (
        <section id="toolbox" className="bg-white py-24 md:py-32 px-6 lg:px-12 font-bricolage border-t border-neutral-100">
            <div className="max-w-screen-2xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 md:mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-900">Infrastructure</span>
                        </div>
                        <TextAnimate
                            animation="blurInUp"
                            by="word"
                            once={true}
                            className="text-4xl md:text-6xl font-bold text-neutral-950 tracking-tighter leading-[0.9] mb-8"
                        >
                            Technical Stack.
                        </TextAnimate>
                        <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-md">
                            A collection of technologies and tools I use to build robust, scalable, and high-performance digital products.
                        </p>
                    </div>
                </div>

                {/* The Simplified Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
                    {stack.map((group, i) => (
                        <div key={group.category} className="flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: false, margin: "-5% 0px" }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <span className="text-[10px] font-mono text-neutral-300">0{i + 1}</span>
                                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">
                                    {group.category}
                                </h4>
                            </motion.div>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {group.tools.map((tool, j) => (
                                    <motion.span
                                        key={tool.name}
                                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                                        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 0.5,
                                            delay: (i * 0.1) + (j * 0.04),
                                            ease: [0.215, 0.61, 0.355, 1]
                                        }}
                                        viewport={{ once: false, margin: "-5% 0px" }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "#000",
                                            color: "#fff",
                                            transition: { duration: 0.2, ease: "easeOut" }
                                        }}
                                        className="group flex items-center gap-2.5 px-3 py-2 bg-neutral-50 border border-neutral-100 rounded-full text-xs md:text-sm font-medium text-neutral-800 cursor-default select-none"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <img
                                            src={tool.icon}
                                            alt={tool.name}
                                            className="w-4 h-4 md:w-5 md:h-5 object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        {tool.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function HomeClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
    const words = ["Design.", "Build.", "Ship.", "Solve.", "Scale.", "Impact."];
    const [index, setIndex] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

    // Magnetic cursor effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev: number) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [words.length]);

    return (
        <>
            {/* Custom Cursor - "it's me" */}
            <AnimatePresence>
                {showImage && (
                    <motion.div
                        className="fixed z-60 pointer-events-none flex items-center justify-center"
                        style={{
                            x: cursorX,
                            y: cursorY,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                        <div className="bg-neutral-900 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                            it's me ✨
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full-screen Hero Section */}
            <section className="relative min-h-[85vh] md:min-h-screen w-full bg-white flex flex-col justify-between pt-20 md:pt-32 pb-6 md:pb-8 overflow-hidden font-bricolage">
                {/* Intro Text Section */}
                <div className="flex flex-col justify-start md:justify-center px-6 md:px-12 lg:px-24 pt-4 md:pt-0">
                    <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tight leading-[1.15] md:leading-[1.1] text-neutral-900">
                        <span className="block text-neutral-400 font-light mb-2 md:mb-0">
                            Hi, I am{' '}
                            <span
                                className="relative inline-block cursor-none group"
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setImagePosition({ x: rect.left + rect.width / 2, y: rect.top });
                                    setShowImage(true);
                                }}
                                onMouseMove={(e) => {
                                    mouseX.set(e.clientX);
                                    mouseY.set(e.clientY);
                                }}
                                onMouseLeave={() => setShowImage(false)}
                            >
                                <span className="relative z-10 text-neutral-600 hover:text-neutral-900 transition-colors duration-300">Ashish</span>
                            </span>
                            {' '}and I
                        </span>
                        <div className="flex flex-nowrap items-center gap-x-3 md:gap-x-6">
                            <span className="font-instrument italic font-normal text-neutral-500 whitespace-nowrap">love to</span>
                            <div className="relative h-[1.2em] overflow-hidden inline-flex items-center">
                                {/* Ghost word to reserve width - use longest word */}
                                <span className="opacity-0 pointer-events-none whitespace-nowrap">Experiences.</span>
                                <AnimatePresence mode="wait">
                                    <TextAnimate
                                        key={words[index]}
                                        animation="blurInUp"
                                        by="character"
                                        duration={0.6}
                                        className="absolute left-0 text-neutral-900 whitespace-nowrap"
                                    >
                                        {words[index]}
                                    </TextAnimate>
                                </AnimatePresence>
                            </div>
                        </div>
                    </h1>

                    {/* Floating Image on Ashish Hover */}
                    <AnimatePresence>
                        {showImage && (
                            <motion.div
                                initial={{ scale: 0, rotate: -12 }}
                                animate={{ scale: 1, rotate: 3 }}
                                exit={{ scale: 0, rotate: 12 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    mass: 0.8
                                }}
                                className="fixed z-50 pointer-events-none origin-bottom"
                                style={{
                                    left: `min(max(${imagePosition.x}px, 80px), calc(100vw - 80px))`,
                                    top: imagePosition.y,
                                    transform: 'translate(-50%, -105%)'
                                }}
                            >
                                <motion.div
                                    className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 rounded-lg overflow-hidden shadow-2xl"
                                    initial={{ clipPath: 'circle(0% at 50% 100%)' }}
                                    animate={{ clipPath: 'circle(150% at 50% 100%)' }}
                                    exit={{ clipPath: 'circle(0% at 50% 100%)' }}
                                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                >
                                    <img
                                        src="/ashish.jpeg"
                                        alt="Ashish"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 px-6 lg:px-12 pb-4 md:pb-8 pt-8 mt-auto border-t border-neutral-50 md:border-transparent">
                    {/* Keywords & Status */}
                    <div className="max-w-lg w-full">
                        {/* Animated Tags */}
                        <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                            {['Strategy', 'Design', 'Development'].map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                                    whileHover={{ scale: 1.05, backgroundColor: "#171717", color: "#ffffff" }}
                                    className="px-2.5 py-0.5 md:px-3 md:py-1 bg-neutral-50 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 rounded-full border border-neutral-100 cursor-default transition-all duration-200"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* Description with highlighted location */}
                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light mb-4">
                            Full-Stack Developer crafting high-performance web applications with modern technologies. Currently based in{' '}
                            <span className="inline-flex items-center gap-1 text-neutral-900 font-medium">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                Toronto, ON
                            </span>
                            , building for the world.
                        </p>

                        {/* Availability Indicator */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            className="inline-flex items-center gap-2"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs md:text-sm font-medium text-neutral-600">Available for projects</span>
                        </motion.div>
                    </div>

                    {/* Social Links & Scroll */}
                    <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8">
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {[
                                { name: 'GitHub', href: 'https://github.com/ashish-makes', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
                                { name: 'LinkedIn', href: 'https://linkedin.com/in/ashish-makes', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
                                { name: 'Twitter', href: 'https://x.com/ashish_makes', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                            ].map((social, i) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors duration-300"
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                            {/* Email Copy Button */}
                            <EmailCopyButton />
                        </div>

                        {/* Scroll Button */}
                        <div className="relative flex items-center justify-center">
                            {/* Rotating Text Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 w-[66px] h-[66px] -m-[13px] pointer-events-none" // Adjusted size and margin to center around the 40px button
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <defs>
                                        <path
                                            id="circlePath"
                                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        />
                                    </defs>
                                    <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-neutral-300">
                                        <textPath href="#circlePath" startOffset="0%">
                                            Scroll Down • Scroll Down •
                                        </textPath>
                                    </text>
                                </svg>
                            </motion.div>

                            {/* Button */}
                            <Magnetic>
                                <button
                                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-neutral-100 hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-500 shadow-sm relative z-10"
                                >
                                    <svg
                                        className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition-colors duration-300 transform group-hover:translate-y-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </button>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Work Section - Horizontal Scroll */}
            {caseStudies.length > 0 && <HorizontalWork caseStudies={caseStudies} />}

            {/* Experience Section */}
            <Experience />

            {/* Digital Toolbox Section */}
            <DigitalToolbox />

        </>
    );
}
