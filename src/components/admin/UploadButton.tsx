"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { saveMedia } from "@/app/actions/media";

interface UploadButtonProps {
    onUpload?: (url: string) => void;
    label?: string;
    className?: string;
    icon?: React.ReactNode;
    showGalleryUpload?: boolean;
}

export default function UploadButton({
    onUpload,
    label = "Upload Media",
    className,
    icon,
    showGalleryUpload = true
}: UploadButtonProps) {
    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ashish_portfolio"}
            onSuccess={async (result) => {
                if (result.info && typeof result.info !== "string") {
                    const { secure_url, original_filename, resource_type, bytes } = result.info;

                    if (showGalleryUpload) {
                        await saveMedia({
                            url: secure_url,
                            name: original_filename || "unnamed",
                            type: resource_type,
                            size: bytes,
                        });
                    }

                    if (onUpload) {
                        onUpload(secure_url);
                    } else if (showGalleryUpload) {
                        alert("Image uploaded successfully!");
                    }
                }
            }}
        >
            {({ open }) => {
                return (
                    <button
                        type="button"
                        onClick={() => open()}
                        className={className || "group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-neutral-900 px-6 font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"}
                    >
                        {icon || <Upload className="w-4 h-4" />}
                        <span className="text-xs font-bold tracking-wide">{label}</span>
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
