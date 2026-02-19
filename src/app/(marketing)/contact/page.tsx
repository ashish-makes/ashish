import { Metadata } from 'next';
import ContactClient from './ContactClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Ashish for collaborations, projects, or just a coffee chat.",
    openGraph: {
        title: "Contact | Ashish",
        description: "Get in touch with Ashish for collaborations, projects, or just a coffee chat.",
        url: "https://ashish.cv/contact",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function Page() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Ashish",
        "description": metadata.description,
        "url": "https://ashish.cv/contact",
        "mainEntity": {
            "@type": "Person",
            "name": "Ashish",
            "email": "ashindia.003@gmail.com",
            "url": "https://ashish.cv"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://ashish.cv/contact" }
        ]
    };

    return (
        <>
            <JsonLd data={contactSchema} />
            <JsonLd data={breadcrumbSchema} />
            <ContactClient />
        </>
    );
}
