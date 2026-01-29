"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveMedia(data: {
    url: string;
    name: string;
    type: string;
    size: number;
}) {
    try {
        const media = await prisma.media.create({
            data: {
                url: data.url,
                name: data.name,
                type: data.type,
                size: data.size,
            },
        });

        revalidatePath("/dashboard/gallery");
        return { success: true, media };
    } catch (error) {
        console.error("Error saving media:", error);
        return { success: false, error: "Failed to save media to database" };
    }
}

export async function deleteMedia(id: string) {
    try {
        await prisma.media.delete({
            where: { id },
        });
        revalidatePath("/dashboard/gallery");
        return { success: true };
    } catch (error) {
        console.error("Error deleting media:", error);
        return { success: false, error: "Failed to delete media" };
    }
}
