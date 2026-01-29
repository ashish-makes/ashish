"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface BlogFormProps {
    initialData?: {
        title: string;
        slug: string;
        content: string;
        status: string;
    };
    mode: "create" | "edit";
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData || {
        title: "",
        slug: "",
        content: "",
        status: "draft",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate save
        console.log("Saving blog:", formData);
        router.push("/dashboard/blogs");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/blogs">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">
                    {mode === "create" ? "Create New Post" : "Edit Post"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Post Information</CardTitle>
                        <CardDescription>
                            Review and update the basic details of your blog post.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="The Future of Web Flow"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="the-future-of-web-flow"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content (Markdown)</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Start writing your amazing thoughts..."
                                className="min-h-[400px] bg-slate-800 border-slate-700 font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Featured Image</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                                <div className="p-4 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                                    <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium">Upload an image</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" asChild>
                        <Link href="/dashboard/blogs">Cancel</Link>
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Save className="mr-2 h-4 w-4" />
                        {mode === "create" ? "Create Post" : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
