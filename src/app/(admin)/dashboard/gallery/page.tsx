import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/admin/UploadButton";
import { deleteMedia } from "@/app/actions/media";
import Image from "next/image";

export default async function GalleryAdminPage() {
    const mediaItems = await prisma.media.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Manage your personal image collection.</p>
                <UploadButton />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mediaItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden group">
                        <div className="aspect-square relative bg-secondary">
                            <Image
                                src={item.url}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-secondary text-foreground hover:text-primary transition-colors"
                                >
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                                <form action={async () => {
                                    "use server";
                                    await deleteMedia(item.id);
                                }}>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        type="submit"
                                        className="text-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <p className="text-xs truncate text-muted-foreground">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground">{(item.size / 1024).toFixed(1)} KB</p>
                        </CardContent>
                    </Card>
                ))}

                {mediaItems.length === 0 && (
                    <div className="col-span-full border-2 border-dashed border-border rounded-xl p-20 flex flex-col items-center justify-center text-muted-foreground">
                        <p>No media found. Upload your first image!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
