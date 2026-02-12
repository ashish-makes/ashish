'use client';

import React, { useState } from 'react';

interface TechIconProps {
    src: string;
    alt: string;
    className?: string;
}

export const TechIcon = ({ src, alt, className }: TechIconProps) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) return null;

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
};
