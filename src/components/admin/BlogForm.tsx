"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import UploadButton from "@/components/admin/UploadButton";
import Image from "next/image";
import { createBlog, updateBlog } from "@/app/actions/blog";

interface BlogFormProps {
    initialData?: {
        title: string;
        slug: string;
        content: string;
        image: string;
        status: string;
        id?: string;
    };
    mode: "create" | "edit";
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData || {
        title: "",
        slug: "",
        content: "",
        image: "",
        status: "draft",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = mode === "create"
                ? await createBlog(formData)
                : await updateBlog(initialData?.id!, formData);

            if (res.success) {
                router.push("/dashboard/blogs");
            } else {
                setError(res.error || "Failed to save blog");
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
                    href="/dashboard/blogs"
                    className="p-2 rounded-xl bg-neutral-100 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                        {mode === "create" ? "Create New Post" : "Edit Post"}
                    </h1>
                    <p className="text-neutral-500 text-sm mt-0.5">Fill in the details for your blog post.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Post Information Card */}
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="p-6 border-b border-neutral-100">
                        <h2 className="text-base font-bold text-neutral-900">Post Information</h2>
                        <p className="text-sm text-neutral-500 mt-0.5">Basic details about your blog post.</p>
                    </div>

                    {error && (
                        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="The Future of Web Development"
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
                                    placeholder="the-future-of-web-development"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="status" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all appearance-none cursor-pointer"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Content</label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(html) => setFormData({ ...formData, content: html })}
                                placeholder="Start writing your amazing thoughts..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Featured Image</label>

                            {formData.image ? (
                                <div className="relative group rounded-2xl overflow-hidden border border-neutral-200">
                                    <div className="aspect-21/9 relative">
                                        <Image
                                            src={formData.image}
                                            alt="Featured image"
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
                        href="/dashboard/blogs"
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
                        {mode === "create" ? "Create Post" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
