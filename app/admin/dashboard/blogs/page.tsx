import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit3 } from "lucide-react";
import Link from "next/link";
import AddCategory from "./components/AddCategory";
import BlogCategories from "@/models/BlogCategories";

const blogs = [
  { id: 1, title: "10 Reasons to Visit Jaipur", category: "Travel Guide", status: "Published", date: "2024-02-20" },
  { id: 2, title: "Ultimate Wedding Destinations", category: "Weddings", status: "Published", date: "2024-02-15" },
  { id: 3, title: "Relaxing Spa Treatments to Try", category: "Wellness", status: "Draft", date: "2024-02-24" },
];

export default async function Blogs() {
  const categories = await BlogCategories.find().lean();

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Blogs & Categories</h1>
        <p className="text-muted-foreground mt-1">Manage your articles, news, and blog taxonomy.</p>
      </div>

      <Tabs defaultValue="blogs" className="space-y-6">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="blogs" className="px-6">Articles</TabsTrigger>
          <TabsTrigger value="categories" className="px-6">Categories</TabsTrigger>
        </TabsList>
        
        {/* BLOGS TAB */}
        <TabsContent value="blogs" className="space-y-4 focus-visible:outline-none">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-9 h-9" />
            </div>
            <Link href={"/admin/dashboard/blogs/create"}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog Post
                </Button>
            </Link>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[350px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">{blog.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{blog.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={blog.status === "Published" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"} variant="secondary">
                          {blog.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{blog.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CATEGORIES TAB */}
        <TabsContent value="categories" className="space-y-4 focus-visible:outline-none">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." className="pl-9 h-9" />
            </div>
            <AddCategory />
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Image Url</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat._id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{cat.description}</TableCell>
                      <TableCell>{cat.image}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}