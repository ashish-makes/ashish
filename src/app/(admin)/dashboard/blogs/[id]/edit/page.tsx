import prisma from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const blog = await prisma.blog.findUnique({
        where: { id },
    });

    if (!blog) {
        notFound();
    }

    const initialData = {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        image: blog.imageUrl || "",
        status: blog.status,
    };

    return <BlogForm mode="edit" initialData={initialData} />;
}
