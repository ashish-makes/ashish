"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowLeft, Save, Github, Link as LinkIcon, X } from "lucide-react";
import Link from "next/link";
import UploadButton from "@/components/admin/UploadButton";
import Image from "next/image";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { createCaseStudy, updateCaseStudy } from "@/app/actions/case-study";

interface CaseStudyFormProps {
    initialData?: {
        title: string;
        slug: string;
        techStack: string;
        description: string;
        visibility: string;
        githubLink?: string;
        liveLink?: string;
        image: string;
        id?: string;
    };
    mode: "create" | "edit";
}

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars
        .replace(/--+/g, '-');      // Replace multiple - with single -
};

export default function CaseStudyForm({ initialData, mode }: CaseStudyFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        techStack: initialData?.techStack || "",
        description: initialData?.description || "",
        visibility: initialData?.visibility || "public",
        githubLink: initialData?.githubLink || "",
        liveLink: initialData?.liveLink || "",
        image: initialData?.image || "",
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (mode === "create") {
            setFormData({
                ...formData,
                title,
                slug: slugify(title)
            });
        } else {
            setFormData({ ...formData, title });
        }
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Convert techStack string to array
        const techStackArray = formData.techStack
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);

        try {
            const dataToSave = {
                ...formData,
                techStack: techStackArray
            };

            const res = mode === "create"
                ? await createCaseStudy(dataToSave)
                : await updateCaseStudy(initialData?.id!, dataToSave);

            if (res.success) {
                router.push("/dashboard/case-studies");
            } else {
                setError(res.error || "Failed to save case study");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/case-studies"
                    className="p-2 rounded-xl bg-neutral-100 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                        {mode === "create" ? "Add New Case Study" : "Edit Case Study"}
                    </h1>
                    <p className="text-neutral-500 text-sm mt-0.5">Showcase your project and technical implementation.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Details Card */}
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="p-6 border-b border-neutral-100">
                        <h2 className="text-base font-bold text-neutral-900">Project Details</h2>
                        <p className="text-sm text-neutral-500 mt-0.5">Information about your project.</p>
                    </div>

                    {error && (
                        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Project Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    placeholder="E-Commerce OS"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="slug" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Slug</label>
                                <input
                                    id="slug"
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="e-commerce-os"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="tech" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Tech Stack</label>
                                <input
                                    id="tech"
                                    type="text"
                                    value={formData.techStack}
                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    placeholder="Next.js, Tailwind, Prisma"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="visibility" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Visibility</label>
                                <select
                                    id="visibility"
                                    value={formData.visibility}
                                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Description</label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(html) => setFormData({ ...formData, description: html })}
                                placeholder="Describe the problem, solution, and results..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="github" className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <Github className="h-3.5 w-3.5" /> GitHub Link
                                </label>
                                <input
                                    id="github"
                                    type="text"
                                    value={formData.githubLink}
                                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                    placeholder="https://github.com/..."
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="live" className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <LinkIcon className="h-3.5 w-3.5" /> Live Demo Link
                                </label>
                                <input
                                    id="live"
                                    type="text"
                                    value={formData.liveLink}
                                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                    placeholder="https://project.com"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Featured Image</label>

                            {formData.image ? (
                                <div className="relative group rounded-2xl overflow-hidden border border-neutral-200">
                                    <div className="aspect-video relative">
                                        <Image
                                            src={formData.image}
                                            alt="Project image"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <UploadButton
                                                label="Change Image"
                                                onUpload={(url) => setFormData({ ...formData, image: url })}
                                                showGalleryUpload={false}
                                                className="bg-white text-neutral-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-neutral-100 transition-colors"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: "" })}
                                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <UploadButton
                                    onUpload={(url) => setFormData({ ...formData, image: url })}
                                    showGalleryUpload={false}
                                    label="Upload Featured Image"
                                    className="w-full border-2 border-dashed border-neutral-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 hover:border-neutral-400 transition-colors cursor-pointer group bg-neutral-50/30"
                                    icon={
                                        <div className="p-3 bg-neutral-100 rounded-xl group-hover:bg-neutral-200 transition-colors">
                                            <Upload className="h-6 w-6 text-neutral-400 group-hover:text-neutral-600" />
                                        </div>
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <Link
                        href="/dashboard/case-studies"
                        className="px-6 py-3 rounded-full border border-neutral-200 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-sm font-bold text-white hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {mode === "create" ? "Add Project" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
