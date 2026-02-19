import { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for Ashish's portfolio website. Learn how your data is collected, used, and protected.",
    openGraph: {
        title: "Privacy Policy | Ashish",
        description: "Privacy policy for Ashish's portfolio website. Learn how your data is collected, used, and protected.",
        url: "https://ashish.cv/privacy-policy",
    },
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function Page() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://ashish.cv/privacy-policy" }
        ]
    };

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <PrivacyPolicyClient />
        </>
    );
}
