"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { saveMedia } from "@/app/actions/media";

export default function UploadButton() {
    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ashish_portfolio"}
            onSuccess={async (result) => {
                if (result.info && typeof result.info !== "string") {
                    const { secure_url, original_filename, resource_type, bytes } = result.info;

                    await saveMedia({
                        url: secure_url,
                        name: original_filename || "unnamed",
                        type: resource_type,
                        size: bytes,
                    });

                    alert("Image uploaded successfully!");
                }
            }}
        >
            {({ open }) => {
                return (
                    <Button
                        onClick={() => open()}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Media
                    </Button>
                );
            }}
        </CldUploadWidget>
    );
}
