import prisma from "@/lib/prisma";
import GoalForm from "@/components/admin/GoalForm";
import { notFound } from "next/navigation";

export default async function EditGoalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const goal = await prisma.goal.findUnique({
        where: { id },
    });

    if (!goal) {
        notFound();
    }

    const initialData = {
        id: goal.id,
        title: goal.title,
        progress: goal.progress,
        category: goal.category,
    };

    return <GoalForm mode="edit" initialData={initialData} />;
}
