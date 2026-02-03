"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGoal(data: {
    title: string;
    progress: number;
    category: string;
}) {
    try {
        const goal = await prisma.goal.create({
            data: {
                title: data.title,
                progress: data.progress,
                category: data.category,
            },
        });

        revalidatePath("/dashboard/goals");
        revalidatePath("/"); // If goals are shown on home
        return { success: true, goal };
    } catch (error) {
        console.error("Error creating goal:", error);
        return { success: false, error: "Failed to create goal" };
    }
}

export async function updateGoal(id: string, data: {
    title: string;
    progress: number;
    category: string;
}) {
    try {
        const goal = await prisma.goal.update({
            where: { id },
            data: {
                title: data.title,
                progress: data.progress,
                category: data.category,
            },
        });

        revalidatePath("/dashboard/goals");
        revalidatePath("/");
        return { success: true, goal };
    } catch (error) {
        console.error("Error updating goal:", error);
        return { success: false, error: "Failed to update goal" };
    }
}

export async function toggleGoalStatus(id: string, currentProgress: number) {
    try {
        const newProgress = currentProgress === 100 ? 0 : 100;
        const goal = await prisma.goal.update({
            where: { id },
            data: { progress: newProgress },
        });

        revalidatePath("/dashboard/goals");
        revalidatePath("/");
        return { success: true, goal };
    } catch (error) {
        console.error("Error toggling goal status:", error);
        return { success: false, error: "Failed to update goal" };
    }
}

export async function deleteGoal(id: string) {
    try {
        await prisma.goal.delete({
            where: { id },
        });

        revalidatePath("/dashboard/goals");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error deleting goal:", error);
        return { success: false, error: "Failed to delete goal" };
    }
}
