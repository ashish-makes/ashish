"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ExternalLink } from "lucide-react";

import Link from "next/link";

export default function CaseStudiesAdminPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Curate your top projects and professional achievements.</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/dashboard/case-studies/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Case Study
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground">Project Name</TableHead>
                                <TableHead className="text-muted-foreground">Tech Stack</TableHead>
                                <TableHead className="text-muted-foreground">Visibility</TableHead>
                                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { id: "1", name: "E-Commerce OS", tech: "Next.js, Stripe", status: "Public" },
                                { id: "2", name: "AI Writer Pro", tech: "OpenAI, React", status: "Public" },
                                { id: "3", name: "Crypto Tracker", tech: "Web3.js, Tailwind", status: "Private" },
                            ].map((project) => (
                                <TableRow key={project.name} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">{project.tech}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                                            <Link href={`/dashboard/case-studies/${project.id}/edit`}>
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
