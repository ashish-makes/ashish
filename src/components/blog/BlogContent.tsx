"use client";

import React, { useEffect } from 'react';
import hljs from 'highlight.js';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    useEffect(() => {
        // 1. Run highlighting
        const blocks = document.querySelectorAll('.rich-text-content pre code');
        blocks.forEach((block) => {
            if (block.getAttribute('data-highlighted')) return;
            hljs.highlightElement(block as HTMLElement);

            // 2. Inject line numbers after highlighting
            const lines = block.innerHTML.split(/\r?\n/);
            if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();

            const wrappedLines = lines.map((line, idx) => {
                return `<div class="code-line"><span class="line-number">${idx + 1}</span><span class="line-content">${line || ' '}</span></div>`;
            }).join('');

            block.innerHTML = wrappedLines;
            block.setAttribute('data-highlighted', 'true');
        });

        // 3. Add premium header if missing
        const preElements = document.querySelectorAll('.rich-text-content pre');
        preElements.forEach((pre, index) => {
            if (pre.querySelector('.code-header')) return;

            const codeElement = pre.querySelector('code');
            if (!codeElement) return;

            const text = codeElement.innerText || '';

            const header = document.createElement('div');
            header.className = 'code-header';

            const langMatch = codeElement.className.match(/language-(\w+)/);
            const lang = langMatch ? langMatch[1] : 'code';

            const langLabel = document.createElement('span');
            langLabel.className = 'code-lang';
            langLabel.innerText = lang.toUpperCase();
            header.appendChild(langLabel);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.setAttribute('title', 'Copy code');
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            `;

            copyBtn.onclick = () => {
                // Get pre-line-numbered text
                const plainText = codeElement.innerText;
                navigator.clipboard.writeText(plainText).then(() => {
                    copyBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><path d="M20 6 9 17l-5-5"/></svg>
                    `;
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        `;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            };

            header.appendChild(copyBtn);
            pre.insertBefore(header, pre.firstChild);
        });
    }, [content]);

    return (
        <div
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
