import BlogForm from "@/components/admin/BlogForm";

// In a real app, you would fetch data based on the ID
const simulatedBlogData = {
    title: "Why GSAP is Incredible",
    slug: "why-gsap-is-incredible",
    content: "# Why GSAP is Incredible\n\nGSAP stands for GreenSock Animation Platform...",
    status: "draft",
};

export default function EditBlogPage({ params }: { params: { id: string } }) {
    // Use params.id to fetch data in a real implementation
    return <BlogForm mode="edit" initialData={simulatedBlogData} />;
}
