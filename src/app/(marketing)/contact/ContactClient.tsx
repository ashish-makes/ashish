'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import Header from '@/components/main/Header';

const ContactClient = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setErrorMessage('All fields are required.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('Submission error:', error);
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Email",
            value: "ashindia.003@gmail.com",
            link: "mailto:ashindia.003@gmail.com"
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: "Phone",
            value: "(437) 430-4645",
            link: "tel:+14374304645"
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: "Location",
            value: "Toronto, ON, Canada",
            link: "https://www.google.com/maps/search/?api=1&query=Toronto,+ON,+Canada"
        }
    ];

    const socials = [
        { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, link: "https://linkedin.com/in/ashish-makes" },
        { name: "GitHub", icon: <Github className="w-5 h-5" />, link: "https://github.com/ashish-makes" },
        { name: "X (Twitter)", icon: <Twitter className="w-5 h-5" />, link: "https://x.com/ashish_makes" }
    ];

    return (
        <main className="min-h-screen bg-white text-neutral-950 font-bricolage selection:bg-neutral-950 selection:text-white pb-24">
            <Header />

            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-neutral-100">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">Get in touch</span>
                            </div>
                            <TextAnimate
                                animation="blurInUp"
                                by="character"
                                once={true}
                                className="relative z-10 text-7xl md:text-[10vw] tracking-tighter leading-[0.8]"
                            >
                                Contact.
                            </TextAnimate>
                        </div>
                        <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2 font-instrument italic">
                            Have a project in mind? Let&apos;s create something extraordinary together.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Left Column: Contact Cards */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em]">Communication channels</h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                className="grid grid-cols-1 gap-4"
                            >
                                {contactInfo.map((info) => (
                                    <motion.a
                                        key={info.label}
                                        href={info.link}
                                        target={info.label === "Location" ? "_blank" : undefined}
                                        variants={itemVariants}
                                        className="group flex items-center justify-between p-8 bg-[#f9fafb] border border-neutral-100 rounded-2xl hover:border-neutral-900 transition-all duration-500"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 flex items-center justify-center bg-white border border-neutral-100 rounded-full text-neutral-400 group-hover:text-neutral-950 group-hover:bg-neutral-50 transition-all">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{info.label}</p>
                                                <p className="text-lg font-bold text-neutral-950">{info.value}</p>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em]">Connect Elsewhere</h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                className="flex flex-wrap gap-4"
                            >
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="flex items-center gap-3 px-6 py-4 bg-white border border-neutral-100 rounded-full text-neutral-600 hover:text-neutral-950 hover:border-neutral-900 transition-all"
                                    >
                                        {social.icon}
                                        <span className="text-sm font-bold">{social.name}</span>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="lg:col-span-7 bg-[#f9fafb] border border-neutral-100 rounded-[2.5rem] p-12 lg:p-16 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                                I&apos;m always open to new <span className="text-neutral-400">challenges</span> and <span className="text-neutral-400">opportunities</span>.
                            </h2>
                            <p className="text-neutral-500 text-lg font-light leading-relaxed mb-12 max-w-xl">
                                Whether you have a project in mind, need a consultant, or just want to say hi, my inbox is always open. I typically respond within 24-48 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-4">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        required
                                        className="w-full h-14 bg-white border border-neutral-100 rounded-2xl px-6 flex items-center text-neutral-950 text-sm focus:border-neutral-950 outline-hidden transition-all placeholder:text-neutral-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-4">Your Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full h-14 bg-white border border-neutral-100 rounded-2xl px-6 flex items-center text-neutral-950 text-sm focus:border-neutral-950 outline-hidden transition-all placeholder:text-neutral-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-4">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={4}
                                    className="w-full bg-white border border-neutral-100 rounded-2xl p-6 text-neutral-950 text-sm focus:border-neutral-950 outline-hidden transition-all placeholder:text-neutral-300 resize-none font-sans"
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest pl-4">{errorMessage}</p>
                            )}

                            {status === 'success' && (
                                <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest pl-4">Message sent successfully!</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full rounded-full py-5 font-bold uppercase tracking-widest text-sm transition-all ${status === 'loading'
                                    ? 'bg-neutral-200 text-neutral-500 cursor-wait'
                                    : 'bg-neutral-950 text-white hover:bg-neutral-800'
                                    }`}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default ContactClient;
