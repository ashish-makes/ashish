'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';

export default function TermsOfServiceClient() {
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
                                Terms of Service.
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
                                    { id: 'acceptance', label: '01. Acceptance of Terms' },
                                    { id: 'description', label: '02. Description of Service' },
                                    { id: 'property', label: '03. Intellectual Property Rights' },
                                    { id: 'conduct', label: '04. User Conduct' },
                                    { id: 'comments', label: '05. Blog Comments' },
                                    { id: 'disclaimer', label: '06. Disclaimer of Warranties' },
                                    { id: 'liability', label: '07. Limitation of Liability' },
                                    { id: 'links', label: '08. External Links' },
                                    { id: 'modifications', label: '09. Modifications to Terms' },
                                    { id: 'law', label: '10. Governing Law' },
                                    { id: 'contact', label: '11. Contact Information' },
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

                        <section id="acceptance" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">01. Acceptance of Terms</h2>
                            <p>
                                By accessing and using this website (ashish.dev), you accept and agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use this website.
                            </p>
                        </section>

                        <section id="description" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">02. Description of Service</h2>
                            <p>
                                This website serves as a personal portfolio and blog platform where I showcase my work,
                                share insights about web development and design, and provide information about my services.
                                The content includes but is not limited to blog posts, case studies, project showcases, and educational resources.
                            </p>
                        </section>

                        <section id="property" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">03. Intellectual Property Rights</h2>
                            <p>
                                All content on this website, including but not limited to text, graphics, logos, images,
                                code snippets, and blog posts, is the property of Ashish or its content creators and is
                                protected by applicable copyright and intellectual property laws.
                            </p>
                            <p className="mt-4">You may:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>View and read content for personal, non-commercial use</li>
                                <li>Share links to content on social media</li>
                                <li>Quote small portions with proper attribution</li>
                            </ul>
                            <p className="mt-4">You may not:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Copy, reproduce, or republish content without permission</li>
                                <li>Use content for commercial purposes without authorization</li>
                                <li>Modify or create derivative works without consent</li>
                            </ul>
                        </section>

                        <section id="conduct" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">04. User Conduct</h2>
                            <p>When using this website, you agree not to:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Engage in any activity that disrupts or interferes with the website</li>
                                <li>Attempt to gain unauthorized access to any portion of the website</li>
                                <li>Use automated systems to access the website in a manner that sends more requests than a human could reasonably produce</li>
                                <li>Transmit any viruses, malware, or other malicious code</li>
                                <li>Impersonate any person or entity</li>
                            </ul>
                        </section>

                        <section id="comments" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">05. Blog Comments and User Content</h2>
                            <p>
                                If commenting functionality is available on blog posts, you are responsible for the content you post.
                                I reserve the right to remove any comments that are offensive, spam, or violate these terms.
                            </p>
                            <p className="mt-4">
                                By posting comments, you grant me a non-exclusive, royalty-free license to use,
                                display, and distribute your content in connection with the website.
                            </p>
                        </section>

                        <section id="disclaimer" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">06. Disclaimer of Warranties</h2>
                            <p>
                                This website is provided &quot;as is&quot; without any warranties, express or implied.
                                I do not guarantee that the website will be error-free, secure, or available at all times.
                            </p>
                            <p className="mt-4">
                                The information and code examples provided in blog posts are for educational purposes only.
                                While I strive for accuracy, I make no guarantees about the completeness, reliability,
                                or suitability of this information for any particular purpose.
                            </p>
                        </section>

                        <section id="liability" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">07. Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by law, I shall not be liable for any indirect, incidental,
                                special, consequential, or punitive damages arising out of your access to or use of the website,
                                including any errors or omissions in the content.
                            </p>
                        </section>

                        <section id="links" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">08. External Links</h2>
                            <p>
                                This website may contain links to third-party websites. These links are provided for convenience only,
                                and I do not endorse or assume responsibility for the content, privacy policies, or practices of these sites.
                            </p>
                        </section>

                        <section id="modifications" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">09. Modifications to Terms</h2>
                            <p>
                                I reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
                                Your continued use of the website after any changes indicates your acceptance of the new terms.
                            </p>
                        </section>

                        <section id="law" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">10. Governing Law</h2>
                            <p>
                                These terms shall be governed by and construed in accordance with the laws of Ontario, Canada,
                                without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section id="contact" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">11. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact me at:
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
