import { Metadata } from 'next';
import { getCaseStudies } from '@/app/actions/case-study';
import HomeClient from './HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Ashish • Software Developer",
  description: "Explore the creative portfolio of Ashish, a software developer building unique digital experiences.",
};

export const dynamic = 'force-dynamic';

import { Preloader } from '@/components/layout/Preloader';

export default async function Page() {
  const result = await getCaseStudies();
  const caseStudies = result.success && result.caseStudies ? result.caseStudies : [];

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Ashish — Software Developer",
    "url": "https://ashish.cv",
    "description": metadata.description,
    "mainEntity": {
      "@type": "Person",
      "name": "Ashish",
      "url": "https://ashish.cv",
      "jobTitle": "Software Developer",
      "email": "ashindia.003@gmail.com",
      "knowsAbout": [
        "React", "Next.js", "TypeScript", "JavaScript",
        "Node.js", "UI/UX Design", "Full Stack Development",
        "MongoDB", "Prisma", "Tailwind CSS"
      ],
      "sameAs": [
        "https://github.com/ashish-makes",
        "https://linkedin.com/in/ashish-makes",
        "https://x.com/ashish_makes"
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ashish Portfolio",
    "url": "https://ashish.cv",
    "description": metadata.description,
    "author": {
      "@type": "Person",
      "name": "Ashish",
      "url": "https://ashish.cv"
    }
  };

  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Projects",
    "url": "https://ashish.cv",
    "numberOfItems": caseStudies.length,
    "itemListElement": caseStudies.map((project: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": project.title,
      "url": `https://ashish.cv/case-studies/${project.slug}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashish.cv" }
    ]
  };

  return (
    <>
      <Preloader />
      <JsonLd data={profilePageSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={projectListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HomeClient caseStudies={caseStudies} />
    </>
  );
}
