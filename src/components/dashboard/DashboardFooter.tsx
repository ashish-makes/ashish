'use client';

import React from 'react';
import Link from 'next/link';

const DashboardFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 px-4 md:px-8 border-t border-neutral-100 bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center md:text-left">
                <span>&copy; {currentYear} Ashish. All rights reserved.</span>

                <div className="flex items-center gap-6">
                    <Link href="/" className="hover:text-neutral-900 transition-colors">
                        Public Site
                    </Link>
                    <Link href="/dashboard/help" className="hover:text-neutral-900 transition-colors">
                        Help
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default DashboardFooter;
