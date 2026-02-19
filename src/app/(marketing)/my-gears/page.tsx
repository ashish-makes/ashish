import { Metadata } from 'next';
import GearsClient from './GearsClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: "My Gears",
    description: "A professional collection of hardware and software tools used by Ashish for creative design and technical development.",
    openGraph: {
        title: "My Gears | Ashish",
        description: "A professional collection of hardware and software tools used by Ashish for creative design and technical development.",
        url: "https://ashish.cv/my-gears",
    },
    alternates: {
        canonical: "/my-gears",
    },
};

const categories = [
    {
        title: 'Hardware',
        items: [
            {
                name: 'MacBook Air M2',
                description: '13-inch liquid retina display. Perfectly portable for design and development.',
                brand: 'Apple',
                link: 'https://a.co/d/0ewicnJp',
                specs: 'M2 • 8-Core CPU'
            },
            {
                name: 'Lenovo Legion Pro 5 (2025)',
                description: 'Intel Core Ultra 7 255HX, RTX 5070, 32GB DDR5. Built for high-performance computing.',
                brand: 'Lenovo',
                link: 'https://a.co/d/0dPqVEUW',
                specs: 'Ultra 7 • RTX 5070 • 32GB'
            },
            {
                name: 'HP 24mh Monitor',
                description: '24-inch IPS display with tilt adjustment and anti-glare panel for ergonomic focus.',
                brand: 'HP',
                link: 'https://a.co/d/0eONNStO',
                specs: '24" • IPS • Anti-glare'
            },
            {
                name: 'Lenovo Legion K500 Keyboard',
                description: 'RGB mechanical gaming keyboard with red switches and detachable palm rest.',
                brand: 'Lenovo',
                link: 'https://a.co/d/0j2sDzZm',
                specs: 'Mechanical • Red Switch'
            },
            {
                name: 'Lenovo 530 Wireless Mouse',
                description: 'Reliable USB-A wireless mouse with a clean, minimalist design.',
                brand: 'Lenovo',
                link: 'https://a.co/d/0ewy3UMP',
                specs: '2.4GHz • Ambidextrous'
            },
            {
                name: 'Amazon Echo Dot',
                description: 'Smart speaker with Alexa for seamless workspace automation and high-fidelity sound.',
                brand: 'Amazon',
                link: 'https://a.co/d/05YjkHt3',
                specs: '5th Gen • Alexa'
            }
        ]
    },
    {
        title: 'Software',
        items: [
            {
                name: 'VS Code',
                description: 'My primary editor, customized for a clean and efficient developer experience.',
                brand: 'VS Code',
                link: 'https://code.visualstudio.com',
                specs: 'Tokyo Night • Extensions'
            },
            {
                name: 'Antigravity',
                description: 'Advanced agentic AI assistant powered by Google Deepmind for complex coding tasks.',
                brand: 'Antigravity',
                link: 'https://antigravity.google/',
                specs: 'Agentic AI • Deepmind'
            },
            {
                name: 'Cursor',
                description: 'AI-first code editor that fundamentally changes how I write and ship code.',
                brand: 'Cursor',
                link: 'https://cursor.sh',
                specs: 'AI Native • VS Code Fork'
            }
        ]
    },
    {
        title: 'Workspace',
        items: [
            {
                name: 'MotionGrey Standing Desk',
                description: 'Electric height adjustable desk with a solid black frame for ergonomic excellence.',
                brand: 'MotionGrey',
                link: 'https://a.co/d/04pKNyyj',
                specs: 'Single Motor • 55" x 24"'
            },
            {
                name: 'Mimoglad Office Chair',
                description: 'High-back ergonomic chair with adjustable lumbar support and flip-up armrests.',
                brand: 'Mimoglad',
                link: 'https://a.co/d/08CaRycg',
                specs: 'High Back • Lumbar Support'
            }
        ]
    }
];

export default function Page() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" },
            { "@type": "ListItem", "position": 2, "name": "My Gears", "item": "https://ashish.cv/my-gears" }
        ]
    };

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <GearsClient categories={categories} />
        </>
    );
}
