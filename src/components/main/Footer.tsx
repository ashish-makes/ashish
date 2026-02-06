'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/ashish-makes', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/ashish-makes', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
        { name: 'X', href: 'https://x.com/ashish_makes', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    ];

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Blog', href: '/blog' },
        { label: 'My Gears', href: '/my-gears' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="relative bg-neutral-950 text-white font-bricolage overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-neutral-900/0 via-neutral-950 to-neutral-950 pointer-events-none" />
            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 pb-16 border-b border-white/10">
                    <div className="max-w-2xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-neutral-400 text-sm uppercase tracking-[0.3em] mb-4"
                        >
                            Let&apos;s work together
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                        >
                            Have a project in mind?{' '}
                            <span className="text-neutral-500">Let&apos;s create something extraordinary.</span>
                        </motion.h2>
                    </div>
                    <motion.a
                        href="mailto:ashindia.003@gmail.com"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="group flex items-center gap-4 bg-white text-neutral-900 px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors shrink-0"
                    >
                        Get in touch
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 mb-20">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-6">Navigation</h3>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-300 hover:text-white transition-colors duration-300 text-sm font-medium inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-white group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-6">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:ashindia.003@gmail.com" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                                    ashindia.003@gmail.com
                                </a>
                            </li>
                            <li><span className="text-neutral-500 text-sm">(437) 430-4645</span></li>
                            <li className="pt-2"><span className="text-neutral-500 text-xs">Toronto, ON, Canada</span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-6">Socials</h3>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12">
                    <div className="overflow-hidden mb-8">
                        <motion.h1
                            initial={{ y: 100 }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="text-[18vw] md:text-[14vw] leading-[0.85] font-bold text-transparent bg-clip-text bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800 tracking-tighter select-none"
                        >
                            ASHISH
                        </motion.h1>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-neutral-500 text-xs">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <span>© {currentYear} Ashish. All rights reserved.</span>
                            <span className="hidden md:inline">•</span>
                            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-sm">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-white">Available for projects</span>
                            </div>
                            <span className="text-neutral-600">|</span>
                            <span className="font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} EST</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </footer>
    );
};

export default Footer;
