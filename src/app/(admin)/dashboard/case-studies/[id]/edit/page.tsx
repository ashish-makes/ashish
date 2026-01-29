import CaseStudyForm from "@/components/admin/CaseStudyForm";

// Simulated data
const simulatedProjectData = {
    title: "E-Commerce OS",
    techStack: "Next.js, Tailwind, Prisma",
    description: "# E-Commerce OS\n\nA full-scale commerce solution...",
    visibility: "public",
    githubLink: "https://github.com/ashish/ecommerce-os",
    liveLink: "https://shop.ashish.dev",
};

export default function EditCaseStudyPage({ params }: { params: { id: string } }) {
    return <CaseStudyForm mode="edit" initialData={simulatedProjectData} />;
}
