'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue, wrap } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import Magnetic from '@/components/animations/Magnetic';
import Footer from '@/components/main/Footer';

const WorkCard = ({ index }: { index: number }) => {
  return (
    <div className="group cursor-pointer shrink-0 w-[85vw] md:w-[45vw] lg:w-[40vw]">
      <div className="relative aspect-video overflow-hidden bg-neutral-100 mb-6 rounded-sm">
        <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium whitespace-nowrap overflow-hidden">
          <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-30">Coming Soon</span>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div className="max-w-[70%]">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-1 leading-tight group-hover:text-neutral-600 transition-colors">Digital Experience 0{index}</h3>
          <p className="text-xs md:text-base text-neutral-500 font-medium tracking-tight">Strategy • Design • Motion</p>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest pt-1.5 leading-none mb-1">Concept</span>
          <span className="block text-[8px] font-bold text-neutral-300 uppercase tracking-widest leading-none">© 2024</span>
        </div>
      </div>
    </div>
  );
};

const HorizontalWork = () => {
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
          {[1, 2, 3, 4].map((i) => (
            <WorkCard key={i} index={i} />
          ))}
        </motion.div>
      </div>
    </section >
  );
};



const Experience = () => {
  const roles = [
    { year: '2024 — Present', company: 'Freelance', role: 'Senior Product Designer' },
    { year: '2022 — 2024', company: 'Studio M', role: 'Design Lead' },
    { year: '2020 — 2022', company: 'Techflow', role: 'Frontend Developer' },
    { year: '2019 — 2020', company: 'Creative Inc', role: 'UI Designer' },
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
        </div>

        {/* List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-5% 0px -5% 0px" }}
          className="md:w-2/3 flex flex-col"
        >
          {roles.map((role, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                paddingLeft: "1rem",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 cursor-default"
              style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            >
              <div className="flex flex-col mb-1 md:mb-0">
                <span className="text-lg md:text-xl font-bold text-white group-hover:text-neutral-300 transition-colors">{role.company}</span>
                <span className="text-xs md:text-sm text-neutral-400 font-light">{role.role}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-neutral-500 group-hover:text-white transition-colors uppercase tracking-widest">{role.year}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const DigitalToolbox = () => {
  const stack = [
    {
      category: 'Frontend Engineering',
      tools: [
        { name: 'Next.js', icon: 'https://svgl.app/library/nextjs_icon_dark.svg' },
        { name: 'React', icon: 'https://svgl.app/library/react_dark.svg' },
        { name: 'TypeScript', icon: 'https://svgl.app/library/typescript.svg' },
        { name: 'Tailwind', icon: 'https://svgl.app/library/tailwindcss.svg' },
        { name: 'Motion', icon: 'https://svgl.app/library/motion_dark.svg' },
        { name: 'Shadcn UI', icon: 'https://svgl.app/library/shadcn-ui_dark.svg' },
        { name: 'React Query', icon: 'https://svgl.app/library/reactquery.svg' },
        { name: 'Three.js', icon: 'https://svgl.app/library/threejs-dark.svg' }
      ]
    },
    {
      category: 'Backend & Systems',
      tools: [
        { name: 'Node.js', icon: 'https://svgl.app/library/nodejs.svg' },
        { name: 'Python', icon: 'https://svgl.app/library/python.svg' },
        { name: 'Go', icon: 'https://svgl.app/library/golang.svg' },
        { name: 'PostgreSQL', icon: 'https://svgl.app/library/postgresql.svg' },
        { name: 'MongoDB', icon: 'https://svgl.app/library/mongodb-icon-dark.svg' },
        { name: 'Prisma', icon: 'https://svgl.app/library/prisma_dark.svg' },
        { name: 'Docker', icon: 'https://svgl.app/library/docker.svg' },
        { name: 'AWS', icon: 'https://svgl.app/library/aws_dark.svg' },
        { name: 'Redis', icon: 'https://svgl.app/library/redis.svg' },
        { name: 'Supabase', icon: 'https://svgl.app/library/supabase.svg' }
      ]
    },
    {
      category: 'Design & Tooling',
      tools: [
        { name: 'Figma', icon: 'https://svgl.app/library/figma.svg' },
        { name: 'Framer', icon: 'https://svgl.app/library/framer_dark.svg' },
        { name: 'Stripe', icon: 'https://svgl.app/library/stripe.svg' },
        { name: 'Git', icon: 'https://svgl.app/library/git.svg' },
        { name: 'GitHub', icon: 'https://svgl.app/library/github_dark.svg' },
        { name: 'Vercel', icon: 'https://svgl.app/library/vercel_dark.svg' },
        { name: 'Cloudflare', icon: 'https://svgl.app/library/cloudflare.svg' },
        { name: 'Linear', icon: 'https://svgl.app/library/linear.svg' },
        { name: 'Adobe', icon: 'https://svgl.app/library/adobe.svg' },
        { name: 'Postman', icon: 'https://svgl.app/library/postman.svg' }
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

const CaseStudyItem = ({ project, index, progress, range, targetScale }: { project: any, index: number, progress: any, range: number[], targetScale: number }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-[75vh] flex items-start justify-center sticky top-48 md:top-36">
      <motion.div
        style={{
          scale,
          top: `${index * 15}px`,
        }}
        className={`relative w-full h-[65vh] bg-white rounded-2xl overflow-hidden border border-neutral-100 flex flex-col md:flex-row origin-top ${index > 0 ? 'shadow-[0_-5px_20px_rgba(0,0,0,0.03)]' : ''}`}
      >
        {/* Left: Content */}
        <div className="md:w-5/12 p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full text-neutral-900 text-left">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="text-[10px] font-mono text-neutral-300">0{index + 1}</span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-black text-neutral-400">{project.category}</span>
            </div>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-none mb-4">
              {project.title}
            </h3>
            <p className="text-neutral-500 text-xs md:text-base font-light leading-relaxed max-w-sm">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest">Case Study</span>
            <div className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-300">
              <svg className="w-3 h-3 text-neutral-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="md:w-7/12 bg-neutral-50 relative overflow-hidden h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-neutral-100 group-hover:bg-neutral-200 transition-colors duration-700" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-400 opacity-20">Project Visual</span>
          </motion.div>
          {/* Subtle overlay for stacked items */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

const CaseStudies = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const projects = [
    { title: 'The Void', category: 'Creative Direction', description: 'Exploring the intersection of human emotion and digital precision through minimal architectural interfaces and soft light play.' },
    { title: 'Nexus Protocol', category: 'Brand Identity', description: 'A decentralized infrastructure for the next generation of digital asset management, focusing on speed and intuitive hierarchy.' },
    { title: 'Aether OS', category: 'Interface Design', description: 'Reimagining the operating system as a fluid, motion-first spatial experience for creators, prioritizing focus and creative flow.' },
    { title: 'Pulse Mobile', category: 'App Design', description: 'A health-focused experience that leverages biometric data to create personalized, calm visual environments for users.' },
  ];

  return (
    <section id="case-studies" ref={container} className="relative bg-white font-bricolage border-t border-neutral-100 pb-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl pt-6 pb-4 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <TextAnimate animation="blurInUp" by="character" className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Selected stories.
            </TextAnimate>
            <p className="text-neutral-500 text-sm md:text-base max-w-sm font-light leading-relaxed text-left md:text-right">
              Deep dives into key projects, exploring the design process and impact.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project, i) => {
            const targetScale = 1 - ((projects.length - i) * 0.05);
            return (
              <CaseStudyItem
                key={i}
                project={project}
                index={i}
                progress={scrollYProgress}
                range={[i * (1 / projects.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};





export default function Home() {
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
              Crafting digital experiences that merge aesthetic precision with functional excellence. Currently based in{' '}
              <span className="inline-flex items-center gap-1 text-neutral-900 font-medium">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Canada
              </span>
              , working worldwide.
            </p>

            {/* Availability Indicator */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800 shadow-lg"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">Available for projects</span>
            </motion.div>
          </div>

          {/* Social Links & Scroll */}
          <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { name: 'GitHub', href: 'https://github.com', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
                { name: 'Twitter', href: 'https://twitter.com', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
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
            </div>

            {/* Scroll Button */}
            <Magnetic>
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-500 shadow-sm"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 group-hover:text-white transition-colors duration-300 transform group-hover:translate-y-1"
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
      </section>

      {/* Selected Work Section - Horizontal Scroll */}
      <HorizontalWork />

      {/* Experience Section */}
      <Experience />

      {/* Digital Toolbox Section */}
      <DigitalToolbox />

      {/* Case Studies Section */}
      {/* <CaseStudies /> */}

      {/* Footer */}
      <Footer />

    </>
  );
}
