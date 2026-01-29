"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Upload } from "lucide-react";

import Link from "next/link";

export default function BlogsAdminPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search blogs..." className="pl-10" />
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/dashboard/blogs/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground">Title</TableHead>
                                <TableHead className="text-muted-foreground">Status</TableHead>
                                <TableHead className="text-muted-foreground">Date</TableHead>
                                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { id: "1", title: "The Future of Web Flow", status: "Published", date: "2024-01-20", badge: "bg-chart-4" },
                                { id: "2", title: "Why GSAP is Incredible", status: "Draft", date: "2024-01-18", badge: "bg-muted" },
                                { id: "3", title: "Mastering Next.js 14", status: "Published", date: "2024-01-15", badge: "bg-chart-4" },
                            ].map((post) => (
                                <TableRow key={post.title} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>
                                        <Badge className={`${post.badge} hover:${post.badge} text-foreground`}>{post.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{post.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                                            <Link href={`/dashboard/blogs/${post.id}/edit`}>
                                                Edit
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
