import { Metadata } from 'next';
import TermsOfServiceClient from './TermsOfServiceClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of service for Ashish's portfolio website. Understand your rights and responsibilities when using this site.",
    openGraph: {
        title: "Terms of Service | Ashish",
        description: "Terms of service for Ashish's portfolio website. Understand your rights and responsibilities when using this site.",
        url: "https://ashish.cv/terms-of-service",
    },
    alternates: {
        canonical: "/terms-of-service",
    },
};

export default function Page() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://ashish.cv/terms-of-service" }
        ]
    };

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <TermsOfServiceClient />
        </>
    );
}
