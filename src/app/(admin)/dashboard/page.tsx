import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, CheckSquare, Image as ImageIcon } from "lucide-react";

const stats = [
    { name: "Total Blogs", value: "12", icon: BookOpen, color: "text-blue-400" },
    { name: "Case Studies", value: "8", icon: Briefcase, color: "text-purple-400" },
    { name: "Media Items", value: "45", icon: ImageIcon, color: "text-emerald-400" },
    { name: "Active Goals", value: "5", icon: CheckSquare, color: "text-yellow-400" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.name}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">+2% from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <p className="text-foreground">Updated blog post: "How to use GSAP in Next.js"</p>
                                    <span className="ml-auto text-muted-foreground">2h ago</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Goal Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Next.js Certification</span>
                                <span>80%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-chart-1 h-2 rounded-full" style={{ width: '80%' }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>UI/UX Portfolio Update</span>
                                <span>45%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-chart-2 h-2 rounded-full" style={{ width: '45%' }} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
