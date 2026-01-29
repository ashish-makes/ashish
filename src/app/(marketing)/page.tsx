'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue, wrap } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import Magnetic from '@/components/animations/Magnetic';

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
    </section>
  );
};

const MarqueeRow = ({ items, baseVelocity = 0.5 }: { items: { name: string, cat: string }[], baseVelocity?: number }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden py-2 md:py-3">
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap gap-4 md:gap-6"
      >
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="group flex items-center gap-5 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full hover:border-neutral-700 transition-all duration-300"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-neutral-500 transition-colors" />
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold text-neutral-400 group-hover:text-white transition-colors leading-none mb-1">
                {item.name}
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-black text-neutral-600 group-hover:text-neutral-500 transition-colors">
                {item.cat}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const roles = [
    { year: '2024 — Present', company: 'Freelance', role: 'Senior Product Designer' },
    { year: '2022 — 2024', company: 'Studio M', role: 'Design Lead' },
    { year: '2020 — 2022', company: 'Techflow', role: 'Frontend Developer' },
    { year: '2019 — 2020', company: 'Creative Inc', role: 'UI Designer' },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-12 font-bricolage border-t border-neutral-100">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Header */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-900">Experience</span>
          </div>
          <TextAnimate animation="blurInUp" by="word" className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-none">
            Commercial History.
          </TextAnimate>
        </div>

        {/* List */}
        <div className="md:w-2/3 flex flex-col">
          {roles.map((role, i) => (
            <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-neutral-100 hover:pl-4 transition-all duration-300 cursor-default">
              <div className="flex flex-col mb-1 md:mb-0">
                <span className="text-lg md:text-xl font-bold text-neutral-900 group-hover:text-black transition-colors">{role.company}</span>
                <span className="text-xs md:text-sm text-neutral-500 font-light">{role.role}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors uppercase tracking-widest">{role.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DigitalToolbox = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const row1 = [
    { name: 'Next.js', cat: 'Framework' },
    { name: 'React', cat: 'UI Library' },
    { name: 'TypeScript', cat: 'Language' },
    { name: 'JavaScript', cat: 'Language' },
    { name: 'Tailwind CSS', cat: 'Styling' },
    { name: 'Figma', cat: 'Product Design' },
  ];

  const row2 = [
    { name: 'Framer Motion', cat: 'Animation' },
    { name: 'Node.js', cat: 'Runtime' },
    { name: 'Python', cat: 'Language' },
    { name: 'PostgreSQL', cat: 'Database' },
    { name: 'Prisma', cat: 'ORM' },
    { name: 'Git', cat: 'Version Control' },
  ];

  return (
    <section id="toolbox" ref={targetRef} data-scroll-section className="bg-neutral-900 py-16 md:py-24 overflow-hidden font-bricolage">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-8 md:mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500">Infrastructure</span>
        </div>
        <div className="max-w-3xl">
          <TextAnimate animation="blurInUp" by="word" className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            A curated stack for modern performance.
          </TextAnimate>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light max-w-xl">
            I leverage a specialized ecosystem of tools designed for precision, type-safety, and meaningful user interactions.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        <MarqueeRow items={row1} baseVelocity={-0.4} />
        <MarqueeRow items={row2} baseVelocity={0.4} />
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

const CTA = () => {
  return (
    <section className="bg-white py-32 md:py-48 px-6 cursor-default font-bricolage border-t border-neutral-100">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="mb-12 overflow-hidden">
            <TextAnimate animation="blurInUp" by="word" className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Ready to define the next chapter?
            </TextAnimate>
          </div>

          <Magnetic>
            <button className="group relative px-10 py-5 bg-neutral-900 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10 text-white font-medium text-sm md:text-base flex items-center gap-3">
                Let&apos;s talk
                <svg className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-neutral-800 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
            </button>
          </Magnetic>

          <p className="mt-12 text-neutral-400 text-sm font-light tracking-wide">
            Currently available for select projects in Q4 2024.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white px-6 md:px-12 lg:px-24 pb-12 pt-24 font-bricolage border-t border-neutral-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Connect</span>
            <a href="mailto:hello@ashish.design" className="text-sm font-medium text-neutral-900 hover:text-neutral-500 transition-colors">hello@ashish.design</a>
            <span className="text-sm text-neutral-500 font-light">+1 (647) 555-0199</span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Socials</span>
            {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map((link) => (
              <a key={link} href="#" className="text-sm font-medium text-neutral-900 hover:text-neutral-500 transition-colors">{link}</a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Legal</span>
            <a href="#" className="text-sm font-medium text-neutral-900 hover:text-neutral-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm font-medium text-neutral-900 hover:text-neutral-500 transition-colors">Terms of Service</a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Version</span>
            <span className="text-sm text-neutral-500 font-light">2024 Edition</span>
            <span className="text-sm text-neutral-500 font-light">Local time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-t border-neutral-100 pt-12">
          <h1 className="text-[12vw] leading-[0.8] font-bold text-neutral-200 tracking-tighter select-none">ASHISH</h1>
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">All Systems Normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const words = ["Design.", "Build.", "Ship.", "Solve.", "Scale.", "Impact."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <>
      {/* Full-screen Hero Section */}
      <section className="relative min-h-screen w-full bg-white flex flex-col justify-between pt-24 md:pt-32 pb-8 overflow-hidden font-bricolage">
        {/* Intro Text Section */}
        <div className="grow flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <h1 className="text-[11vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tight leading-[1.2] md:leading-[1.1] text-neutral-900">
            <span className="block text-neutral-400 font-light mb-2 md:mb-0">Hi, I am Ashish and I</span>
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
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 px-6 lg:px-12 pb-4 md:pb-8 pt-8 mt-auto border-t border-neutral-50 md:border-transparent">
          {/* Keywords & Status */}
          <div className="max-w-md w-full">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {['Strategy', 'Design', 'Development'].map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 md:px-3 md:py-1 bg-neutral-50 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 rounded-full border border-neutral-100">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
              Crafting digital experiences that merge aesthetic precision with functional excellence. Currently based in Canada, working worldwide.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="flex items-center justify-between w-full md:w-auto gap-10">
            <div className="md:hidden flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100">
              <div className="w-1 h-1 rounded-full bg-neutral-900 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-900">Explore</span>
            </div>

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
      <CaseStudies />

      {/* Call To Action Section */}
      <CTA />

      {/* Footer */}
      <Footer />

    </>
  );
}
