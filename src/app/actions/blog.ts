"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlog(data: {
    title: string;
    slug: string;
    content: string;
    image: string;
    status: string;
}) {
    try {
        const blog = await prisma.blog.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                imageUrl: data.image,
                status: data.status,
            },
        });

        revalidatePath("/dashboard/blogs");
        revalidatePath("/blog");
        return { success: true, blog };
    } catch (error) {
        console.error("Error creating blog:", error);
        return { success: false, error: "Failed to create blog post" };
    }
}

export async function updateBlog(id: string, data: {
    title: string;
    slug: string;
    content: string;
    image: string;
    status: string;
}) {
    try {
        const blog = await prisma.blog.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                imageUrl: data.image,
                status: data.status,
            },
        });

        revalidatePath("/dashboard/blogs");
        revalidatePath("/blog");
        revalidatePath(`/blog/${data.slug}`);
        return { success: true, blog };
    } catch (error) {
        console.error("Error updating blog:", error);
        return { success: false, error: "Failed to update blog post" };
    }
}

export async function deleteBlog(id: string) {
    try {
        await prisma.blog.delete({
            where: { id },
        });

        revalidatePath("/dashboard/blogs");
        revalidatePath("/blog");
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog:", error);
        return { success: false, error: "Failed to delete blog post" };
    }
}
