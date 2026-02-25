"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Newspaper, Eye } from "lucide-react";

export default function Dashboard () {
  const stats = [
    { label: "Total Users", value: "24", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Published Pages", value: "18", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Blogs", value: "42", icon: Newspaper, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Monthly Visits", value: "12.4k", icon: Eye, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Welcome back, Admin</h1>
        <p className="text-muted-foreground mt-2 text-lg">Here's what's happening with the Lohagarh Group website today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold font-heading">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription>Latest changes made across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { action: "Updated homepage hero content", time: "2 hours ago", user: "John Doe" },
                { action: "Published new blog: 'Top 10 Resorts'", time: "5 hours ago", user: "Jane Smith" },
                { action: "Modified 'About Us' metadata", time: "Yesterday", user: "John Doe" },
                { action: "Added new user 'Michael'", time: "Yesterday", user: "Super Admin" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Quick Actions</CardTitle>
            <CardDescription>Manage frequently used features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors group">
                   <div className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <FileText className="h-5 w-5 text-primary" />
                   </div>
                   <span className="text-sm font-medium">New Page</span>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors group">
                   <div className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <Newspaper className="h-5 w-5 text-primary" />
                   </div>
                   <span className="text-sm font-medium">Draft Blog</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}