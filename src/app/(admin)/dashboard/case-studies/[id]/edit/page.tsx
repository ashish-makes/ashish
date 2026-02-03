import prisma from "@/lib/prisma";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { notFound } from "next/navigation";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const project = await prisma.caseStudy.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    const initialData = {
        id: project.id,
        title: project.title,
        slug: (project as any).slug || "",
        techStack: project.techStack.join(", "),
        description: project.description,
        visibility: project.visibility,
        githubLink: project.githubLink || "",
        liveLink: project.liveLink || "",
        image: project.imageUrl || "",
    };

    return <CaseStudyForm mode="edit" initialData={initialData} />;
}
