import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ashish.cv';

    // Fetch dynamic routes
    const [blogs, caseStudies] = await Promise.all([
        prisma.blog.findMany({
            where: { status: 'published' },
            select: { slug: true, updatedAt: true }
        }),
        prisma.caseStudy.findMany({
            where: { visibility: 'public' },
            select: { slug: true, updatedAt: true }
        })
    ]);

    const blogRoutes = blogs.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const caseStudyRoutes = caseStudies.map((project) => ({
        url: `${baseUrl}/case-studies/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const staticRoutes = [
        '',
        '/work',
        '/blog',
        '/gallery',
        '/my-gears',
        '/checklist',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
