import React from "react";
import {
    Plus,
    Calendar,
    Briefcase,
    Globe,
    Lock,
    Settings,
    Edit2
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import DeleteCaseStudyButton from "@/components/admin/DeleteCaseStudyButton";

export const revalidate = 0;

export default async function CaseStudiesAdminPage() {
    const caseStudies = await prisma.caseStudy.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Case Studies</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage your portfolio projects and showcase your work.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/case-studies/new"
                        className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-neutral-900 px-6 font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-wide">New Case Study</span>
                    </Link>
                </div>
            </div>

            {/* Case Studies Table */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead className="bg-neutral-50/50">
                            <tr className="text-left border-b border-neutral-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider w-[400px]">Project Name</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Visibility</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {caseStudies.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 text-sm italic">
                                        No case studies discovered yet. Showcase your professional work!
                                    </td>
                                </tr>
                            ) : (
                                caseStudies.map((project) => (
                                    <tr key={project.id} className="group hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                                                    <Briefcase className="w-4 h-4 text-neutral-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-neutral-900">{project.title}</span>
                                                    <div className="flex flex-wrap gap-1 mt-0.5">
                                                        {project.techStack.slice(0, 3).map(tech => (
                                                            <span key={tech} className="text-[10px] text-neutral-400 border border-neutral-200 rounded px-1">{tech}</span>
                                                        ))}
                                                        {project.techStack.length > 3 && <span className="text-[10px] text-neutral-400">+{project.techStack.length - 3}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border flex items-center gap-1.5 w-fit ${project.visibility === 'public' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                'bg-neutral-50 text-neutral-500 border-neutral-100'
                                                }`}>
                                                {project.visibility === 'public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                                {project.visibility}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {format(new Date(project.createdAt), "MMM d, yyyy")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/case-studies/${(project as any).slug || project.id}`}
                                                    target="_blank"
                                                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    title="View Public"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/dashboard/case-studies/${project.id}/edit`}
                                                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    title="Edit Project"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <DeleteCaseStudyButton id={project.id} title={project.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
