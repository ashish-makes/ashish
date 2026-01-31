'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight, User, Menu } from 'lucide-react';

interface DashboardHeaderProps {
    onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getBreadcrumbs = () => {
        const segments = pathname.split('/').filter(Boolean);
        // Default to just "Admin" if at root, otherwise build trail
        const trail = [
            { label: 'Admin', href: '/dashboard' },
            ...segments.slice(1).map(seg => ({
                label: seg.replace(/-/g, ' '),
                href: `/dashboard/${seg}`
            }))
        ];
        return trail;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <header
            className={`h-16 flex items-center justify-between px-4 md:px-8 bg-white sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border-transparent' : 'border-neutral-100 border-b'
                }`}
        >
            <div className="flex items-center gap-2 md:gap-4 md:text-sm text-xs">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className={`flex items-center gap-2 ${index === 0 ? 'hidden md:flex' : 'flex'}`}>
                            {index > 0 && <ChevronRight className="w-4 h-4 text-neutral-400" />}
                            <span
                                className={`font-medium capitalize ${index === breadcrumbs.length - 1
                                    ? 'text-neutral-900'
                                    : 'text-neutral-500'
                                    }`}
                            >
                                {crumb.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors">
                    <User className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
