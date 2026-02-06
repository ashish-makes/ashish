import { Metadata } from 'next';
import { getCaseStudies } from '@/app/actions/case-study';
import HomeClient from './HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Ashish • Software Developer",
  description: "Explore the creative portfolio of Ashish, a software developer building unique digital experiences.",
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const result = await getCaseStudies();
  const caseStudies = result.success && result.caseStudies ? result.caseStudies : [];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ashish",
    "url": "https://ashish.cv",
    "jobTitle": "Software Developer",
    "sameAs": [
      "https://github.com/ashish-makes",
      "https://linkedin.com/in/ashish-makes",
      "https://x.com/ashish_makes"
    ],
    "description": metadata.description
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ashish Portfolio",
    "url": "https://ashish.cv"
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <HomeClient caseStudies={caseStudies} />
    </>
  );
}
