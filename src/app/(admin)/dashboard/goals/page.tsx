"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function GoalsAdminPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Track and manage your professional milestones.</p>
                <Button className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Goal
                </Button>
            </div>

            <div className="space-y-4">
                {[
                    { title: "Learn Rust", progress: 30, category: "Skills" },
                    { title: "Complete Portfolio", progress: 90, category: "Projects" },
                    { title: "Read 12 Books", progress: 15, category: "Personal" },
                ].map((goal) => (
                    <Card key={goal.title}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{goal.title}</h3>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{goal.category}</span>
                                </div>
                                <span className="text-2xl font-bold text-primary">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-3">
                                <div
                                    className="bg-chart-3 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${goal.progress}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
