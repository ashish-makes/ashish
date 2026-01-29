"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft, Save, Github, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface CaseStudyFormProps {
    initialData?: {
        title: string;
        techStack: string;
        description: string;
        visibility: string;
        githubLink?: string;
        liveLink?: string;
    };
    mode: "create" | "edit";
}

export default function CaseStudyForm({ initialData, mode }: CaseStudyFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData || {
        title: "",
        techStack: "",
        description: "",
        visibility: "public",
        githubLink: "",
        liveLink: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate save
        console.log("Saving case study:", formData);
        router.push("/dashboard/case-studies");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/case-studies">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">
                    {mode === "create" ? "Add New Case Study" : "Edit Case Study"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>
                            Information about your project and technical implementation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="E-Commerce OS"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tech">Tech Stack (comma separated)</Label>
                                <Input
                                    id="tech"
                                    value={formData.techStack}
                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    placeholder="Next.js, Tailwind, Prisma"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="visibility">Visibility</Label>
                                <Select
                                    value={formData.visibility}
                                    onValueChange={(value) => setFormData({ ...formData, visibility: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Project Description (Markdown)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the problem, solution, and results..."
                                className="min-h-[300px] bg-slate-800 border-slate-700 font-sans"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="github" className="flex items-center gap-2">
                                    <Github className="h-4 w-4" /> GitHub Link
                                </Label>
                                <Input
                                    id="github"
                                    value={formData.githubLink}
                                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                    placeholder="https://github.com/..."
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="live" className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" /> Live Demo Link
                                </Label>
                                <Input
                                    id="live"
                                    value={formData.liveLink}
                                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                    placeholder="https://project.com"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Project Images / Showcase</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                                <div className="p-4 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                                    <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium">Upload project screenshots</p>
                                    <p className="text-xs text-muted-foreground">Add up to 5 high-resolution images</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" asChild>
                        <Link href="/dashboard/case-studies">Cancel</Link>
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Save className="mr-2 h-4 w-4" />
                        {mode === "create" ? "Add Project" : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
