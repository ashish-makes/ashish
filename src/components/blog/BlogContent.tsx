"use client";

import React, { useEffect } from 'react';
import hljs from 'highlight.js';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    useEffect(() => {
        // 0. Add IDs to headings for ToC links
        const headings = document.querySelectorAll('.rich-text-content h2, .rich-text-content h3');
        headings.forEach((heading) => {
            if (heading.id) return;
            const text = heading.textContent || '';
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            heading.id = id;
        });

        // 1. Run highlighting
        const blocks = document.querySelectorAll('.rich-text-content pre code');
        blocks.forEach((block) => {
            if (block.getAttribute('data-highlighted')) return;
            hljs.highlightElement(block as HTMLElement);
            block.setAttribute('data-highlighted', 'true');
        });

        // 2. Add animated copy button and wrap pre in a container for fixed positioning
        const preElements = document.querySelectorAll('.rich-text-content pre');
        preElements.forEach((pre) => {
            // Check if already wrapped
            if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

            const codeElement = pre.querySelector('code');
            if (!codeElement) return;

            // 1. Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            wrapper.style.position = 'relative';

            // 2. Insert wrapper before pre and move pre into it
            pre.parentNode?.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            // 3. Ensure the code element has the HLJS class for styling
            if (!codeElement.classList.contains('hljs')) {
                codeElement.classList.add('hljs');
            }

            // 4. Create copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.setAttribute('title', 'Copy code');

            // Initial Icon
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            `;

            copyBtn.onclick = () => {
                const plainText = codeElement.innerText;
                navigator.clipboard.writeText(plainText).then(() => {
                    // Success State
                    copyBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon" style="color: #10b981;"><path d="M20 6 9 17l-5-5"/></svg>
                    `;
                    copyBtn.classList.add('copied');
                    copyBtn.style.transform = 'scale(1.2)';

                    setTimeout(() => {
                        copyBtn.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        `;
                        copyBtn.classList.remove('copied');
                        copyBtn.style.transform = 'scale(1)';
                    }, 2000);
                });
            };

            wrapper.appendChild(copyBtn);
        });
    }, [content]);

    return (
        <div
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
