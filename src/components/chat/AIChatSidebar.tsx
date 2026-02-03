'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TextShimmer } from '../motion-primitives/text-shimmer';
import { TextAnimate } from '../ui/text-animate';
import { ChatContactCard } from './ChatContactCard';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SUGGESTED_PROMPTS = [
    "Tell me about Ashish's background",
    "What is his design philosophy?",
    "Show me his latest projects",
    "How can I contact him?"
];

export default function AIChatSidebar({ isOpen, onClose }: AIChatSidebarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Initial welcome message
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello. I'm Ashish's digital twin. I can guide you through his work, philosophy, and experience. How can I assist you today?",
            timestamp: new Date()
        }
    ]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen, isLoading]);

    // Focus input when sidebar opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 500);
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessageContent = inputValue;
        setInputValue("");

        // Add user message
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: userMessageContent,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, newUserMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromptClick = (prompt: string) => {
        setInputValue(prompt);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[110] bg-white/50 backdrop-blur-sm md:block"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-0 right-0 bottom-0 z-[120] w-full md:w-[450px] bg-white border-l border-neutral-100 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100 bg-white/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-2">
                                <TextShimmer className="text-[10px] uppercase tracking-[0.3em] font-black" duration={2}>
                                    AI Assistant
                                </TextShimmer>
                            </div>
                            <button
                                onClick={onClose}
                                className="group p-2 -mr-2 text-neutral-400 hover:text-neutral-950 transition-colors"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        {/* Chat Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-8 py-8 space-y-8"
                        >
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex flex-col gap-2 max-w-[90%]",
                                        message.role === 'assistant' ? "mr-auto" : "ml-auto items-end"
                                    )}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] uppercase tracking-widest font-black text-neutral-300">
                                            {message.role === 'assistant' ? "Aeon" : "You"}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "text-sm leading-relaxed relative px-5 py-4 rounded-[4px]",
                                        message.role === 'assistant'
                                            ? "bg-neutral-50/50 border border-neutral-100 text-neutral-600 font-light"
                                            : "bg-neutral-950 text-white font-medium"
                                    )}>
                                        {message.role === 'assistant' ? (
                                            <>
                                                <div className="markdown-container text-sm leading-relaxed">
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
                                                            ul: ({ node, ...props }: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                                            ol: ({ node, ...props }: any) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                                            li: ({ node, ...props }: any) => <li className="pl-1" {...props} />,
                                                            strong: ({ node, ...props }: any) => <span className="font-bold text-neutral-900" {...props} />,
                                                            a: ({ node, ...props }: any) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                                                        }}
                                                    >
                                                        {message.content.replace('[[CONTACT_CARD]]', '')}
                                                    </ReactMarkdown>
                                                </div>
                                                {message.content.includes('[[CONTACT_CARD]]') && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                    >
                                                        <ChatContactCard />
                                                    </motion.div>
                                                )}
                                            </>
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-2 max-w-[90%] mr-auto"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] uppercase tracking-widest font-black text-neutral-300">Aeon</span>
                                    </div>
                                    <div className="bg-neutral-50/50 border border-neutral-100 px-5 py-4 rounded-[4px] flex items-center gap-2">
                                        <TextShimmer className="text-sm font-light text-neutral-500" duration={1.5}>
                                            Aeon is thinking...
                                        </TextShimmer>
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggested Prompts (only show if few messages) */}
                            {messages.length === 1 && !isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-4 grid grid-cols-1 gap-2"
                                >
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">Suggested Topics</p>
                                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePromptClick(prompt)}
                                            className="text-left px-4 py-3 text-xs font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-900 transition-all border border-neutral-100 rounded-lg flex items-center justify-between group"
                                        >
                                            {prompt}
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white">
                            <form
                                className="relative flex items-center gap-4 py-2 border-b border-neutral-200 focus-within:border-neutral-950 transition-colors"
                                onSubmit={handleSendMessage}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your question..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-neutral-300 placeholder:uppercase placeholder:tracking-widest"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="p-2 text-neutral-300 hover:text-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                            <div className="flex justify-between items-center mt-3">
                                <p className="text-[8px] uppercase tracking-widest font-black text-neutral-300">
                                    Aeon can make mistakes. Check important info.
                                </p>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
