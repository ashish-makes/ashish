"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCaseStudy(data: {
    title: string;
    slug: string;
    techStack: string[];
    description: string;
    visibility: string;
    githubLink?: string;
    liveLink?: string;
    image: string;
    videoUrl?: string;
}) {
    try {
        const caseStudy = await prisma.caseStudy.create({
            data: {
                title: data.title,
                slug: data.slug,
                techStack: data.techStack,
                description: data.description,
                visibility: data.visibility as any,
                githubLink: data.githubLink,
                liveLink: data.liveLink,
                imageUrl: data.image,
                videoUrl: data.videoUrl,
            },
        });

        revalidatePath("/dashboard/case-studies");
        revalidatePath("/work");
        return { success: true, caseStudy };
    } catch (error) {
        console.error("Error creating case study:", error);
        return { success: false, error: "Failed to create case study" };
    }
}

export async function updateCaseStudy(id: string, data: {
    title: string;
    slug: string;
    techStack: string[];
    description: string;
    visibility: string;
    githubLink?: string;
    liveLink?: string;
    image: string;
    videoUrl?: string;
}) {
    try {
        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                techStack: data.techStack,
                description: data.description,
                visibility: data.visibility as any,
                githubLink: data.githubLink,
                liveLink: data.liveLink,
                imageUrl: data.image,
                videoUrl: data.videoUrl,
            },
        });

        revalidatePath("/dashboard/case-studies");
        revalidatePath("/work");
        revalidatePath(`/case-studies/${data.slug}`);
        return { success: true, caseStudy };
    } catch (error) {
        console.error("Error updating case study:", error);
        return { success: false, error: "Failed to update case study" };
    }
}

export async function deleteCaseStudy(id: string) {
    try {
        await prisma.caseStudy.delete({
            where: { id },
        });

        revalidatePath("/dashboard/case-studies");

        revalidatePath("/work");
        return { success: true };
    } catch (error) {
        console.error("Error deleting case study:", error);
        return { success: false, error: "Failed to delete case study" };
    }
}

export async function getCaseStudies() {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: {
                visibility: 'public'
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return { success: true, caseStudies };
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return { success: false, error: "Failed to fetch case studies" };
    }
}
