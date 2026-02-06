'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';

export default function PrivacyPolicyPage() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Offset for header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="min-h-screen bg-white font-bricolage">
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">Legal Information</span>
                            </div>
                            <TextAnimate
                                animation="blurInUp"
                                by="character"
                                once={true}
                                className="relative z-10 text-7xl md:text-[8vw] tracking-tighter leading-[0.8]"
                            >
                                Privacy Policy.
                            </TextAnimate>
                        </div>
                        <p className="text-neutral-500 text-sm md:text-base font-light font-mono pb-2">
                            Last updated: February 5, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto prose prose-neutral prose-lg"
                >
                    <div className="space-y-16 text-neutral-600">
                        {/* Table of Contents */}
                        <section className="p-8 bg-neutral-50 border border-neutral-100 rounded-sm not-prose">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Quick Navigation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                {[
                                    { id: 'introduction', label: '01. Introduction' },
                                    { id: 'info-collect', label: '02. Information I Collect' },
                                    { id: 'how-use', label: '03. How I Use Your Information' },
                                    { id: 'cookies', label: '04. Cookies and Tracking' },
                                    { id: 'data-sharing', label: '05. Data Sharing' },
                                    { id: 'data-security', label: '06. Data Security' },
                                    { id: 'your-rights', label: '07. Your Rights' },
                                    { id: 'links', label: '08. Third-Party Links' },
                                    { id: 'changes', label: '09. Changes to This Policy' },
                                    { id: 'contact', label: '10. Contact Me' },
                                ].map((link) => (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        onClick={(e) => handleScroll(e, link.id)}
                                        className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-neutral-900 group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </section>

                        <section id="introduction" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">01. Introduction</h2>
                            <p>
                                Welcome to Ashish's portfolio website. I respect your privacy and am committed to protecting your personal data.
                                This privacy policy explains how I collect, use, and safeguard your information when you visit my website or engage with my content.
                            </p>
                        </section>

                        <section id="info-collect" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">02. Information I Collect</h2>
                            <p>I may collect the following types of information:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li><strong>Contact Information:</strong> Name, email address, and phone number when you reach out through contact forms.</li>
                                <li><strong>Usage Data:</strong> Information about how you interact with the website, including pages visited, time spent, and referring URLs.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system.</li>
                                <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
                            </ul>
                        </section>

                        <section id="how-use" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">03. How I Use Your Information</h2>
                            <p>Your information is used to:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Respond to your inquiries and provide requested services</li>
                                <li>Improve the website's functionality and user experience</li>
                                <li>Analyze website traffic and usage patterns</li>
                                <li>Send occasional updates about new blog posts or projects (only if you've subscribed)</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section id="cookies" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">04. Cookies and Tracking</h2>
                            <p>
                                This website uses cookies and similar tracking technologies to enhance your experience.
                                You can control cookie preferences through your browser settings. Disabling cookies may affect some website functionality.
                            </p>
                            <p className="mt-4">
                                I may use third-party analytics services (such as Google Analytics) to understand website usage.
                                These services may collect information about your online activities.
                            </p>
                        </section>

                        <section id="data-sharing" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">05. Data Sharing</h2>
                            <p>
                                I do not sell, trade, or rent your personal information to third parties.
                                I may share data with trusted service providers who assist in operating the website,
                                conducting business, or serving you, provided they agree to keep this information confidential.
                            </p>
                        </section>

                        <section id="data-security" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">06. Data Security</h2>
                            <p>
                                I implement appropriate security measures to protect your personal information.
                                However, no method of transmission over the Internet is 100% secure,
                                and I cannot guarantee absolute security.
                            </p>
                        </section>

                        <section id="your-rights" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">07. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Access the personal data I hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section id="links" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">08. Third-Party Links</h2>
                            <p>
                                This website may contain links to external sites. I am not responsible for the privacy practices
                                of these third-party websites. Please review their privacy policies before providing any personal information.
                            </p>
                        </section>

                        <section id="changes" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">09. Changes to This Policy</h2>
                            <p>
                                I may update this privacy policy from time to time. Any changes will be posted on this page
                                with an updated revision date. I encourage you to review this policy periodically.
                            </p>
                        </section>

                        <section id="contact" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">10. Contact Me</h2>
                            <p>
                                If you have any questions about this privacy policy or my data practices, please contact me at:
                            </p>
                            <div className="mt-8 p-6 bg-neutral-50 border border-neutral-100 rounded-sm not-prose">
                                <p className="text-sm text-neutral-500 mb-2 font-mono uppercase tracking-widest">Email Address</p>
                                <a href="mailto:ashindia.003@gmail.com" className="text-xl font-bold text-neutral-900 hover:text-neutral-600 transition-colors">
                                    ashindia.003@gmail.com
                                </a>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
