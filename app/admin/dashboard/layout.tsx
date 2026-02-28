import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Newspaper,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Params } from "next/dist/server/request/params";
import { getSession } from "../helpers";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<Params>
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users (Super Admin)", href: "/admin/dashboard/users", onlySuperAdmin: true },
  { icon: FileText, label: "Pages", href: "/admin/dashboard/pages" },
  { icon: Newspaper, label: "Blogs", href: "/admin/dashboard/blogs" },
];

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { slug: location } = await params;
  const session = await getSession();

  if(!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <span className="font-heading font-bold text-xl text-sidebar-foreground tracking-tight">
            Lohagarh Admin
          </span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-4 px-2">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = location === item.href;
            let canRender = false;
            if(item.onlySuperAdmin && session.access === "super-admin") {
              canRender = true;
            }
            else if (!item.onlySuperAdmin) {
              canRender = true;
            }

            return (
              canRender &&
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  data-testid={`link-sidebar-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <Link href="/api/users/logout">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground mt-1">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">
            {navItems.find(item => item.href === location)?.label || "Lohagarh Admin Panel"}
          </div>
          <div className="flex items-center space-x-4">
            {session?.name}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 bg-[#f8fafc]">
          <div className="mx-auto max-w-6xl w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
