import React from 'react';
import { Mail, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';

export const ChatContactCard = () => {
    return (
        <div className="bg-white border border-neutral-100 rounded-md p-5 mt-4 w-full max-w-[280px] group/card hover:border-neutral-200 transition-colors">
            <div className="mb-6">
                <h3 className="font-semibold text-neutral-900 text-sm tracking-tight">Ashish</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium mt-1">Full Stack Engineer</p>
            </div>

            <div className="space-y-1">
                <a
                    href="mailto:ashindia.003@gmail.com"
                    className="flex items-center justify-between text-xs text-neutral-500 hover:text-neutral-900 transition-all p-2 hover:bg-neutral-50 rounded-md -mx-2 group/item"
                >
                    <div className="flex items-center gap-3">
                        <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-neutral-900 transition-colors" />
                        <span>ashindia.003@gmail.com</span>
                    </div>
                </a>

                {/* Phone number omitted to keep it cleaner, email/linkedin are primary for portfolios usually, but user included it before. I will re-include if they asked indexally, but for 'simple' I'll stick to Email/LinkedIn/Location or just Email/LinkedIn. Let's keep Phone but make it cleaner. */}
                <a
                    href="tel:+14374304645"
                    className="flex items-center justify-between text-xs text-neutral-500 hover:text-neutral-900 transition-all p-2 hover:bg-neutral-50 rounded-md -mx-2 group/item"
                >
                    <div className="flex items-center gap-3">
                        {/* Using a phone icon might look a bit 'busy' if not careful, but standardization is good */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover/item:text-neutral-900 transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <span>(437) 430-4645</span>
                    </div>
                </a>

                <a
                    href="https://linkedin.com/in/ashish-makes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-neutral-500 hover:text-neutral-900 transition-all p-2 hover:bg-neutral-50 rounded-md -mx-2 group/item"
                >
                    <div className="flex items-center gap-3">
                        <Linkedin className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-neutral-900 transition-colors" />
                        <span>/in/ashish-makes</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0 text-neutral-400" />
                </a>

                <div className="flex items-center gap-3 text-xs text-neutral-400 p-2 -mx-2 pt-4 border-t border-neutral-50 mt-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Toronto, Canada</span>
                </div>
            </div>
        </div>
    );
};
