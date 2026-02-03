import prisma from "@/lib/prisma";
import { ExternalLink, ImageIcon } from "lucide-react";
import UploadButton from "@/components/admin/UploadButton";
import DeleteMediaButton from "@/components/admin/DeleteMediaButton";
import Image from "next/image";

export default async function GalleryAdminPage() {
    const mediaItems = await prisma.media.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Media Gallery</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage your personal image collection.</p>
                </div>

                <div className="flex items-center gap-3">
                    <UploadButton />
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mediaItems.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] overflow-hidden transition-all"
                    >
                        <div className="aspect-square relative bg-neutral-50">
                            <Image
                                src={item.url}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                                <DeleteMediaButton mediaId={item.id} />
                            </div>
                        </div>
                        <div className="p-3 border-t border-neutral-100">
                            <p className="text-xs font-medium text-neutral-700 truncate">{item.name}</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">{(item.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {mediaItems.length === 0 && (
                    <div className="col-span-full bg-white rounded-3xl border border-dashed border-neutral-200 p-16 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-4">
                            <ImageIcon className="w-8 h-8 text-neutral-300" />
                        </div>
                        <p className="text-neutral-500 font-medium">No media found</p>
                        <p className="text-neutral-400 text-sm mt-1">Upload your first image to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
