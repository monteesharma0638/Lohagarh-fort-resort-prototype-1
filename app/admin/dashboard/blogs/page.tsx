"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit3, Image as ImageIcon, FolderTree } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Blogs() {
  const [blogs] = useState([
    { id: 1, title: "10 Reasons to Visit Jaipur", category: "Travel Guide", status: "Published", date: "2024-02-20" },
    { id: 2, title: "Ultimate Wedding Destinations", category: "Weddings", status: "Published", date: "2024-02-15" },
    { id: 3, title: "Relaxing Spa Treatments to Try", category: "Wellness", status: "Draft", date: "2024-02-24" },
  ]);

  const [categories] = useState([
    { id: 1, name: "Travel Guide", description: "Tips and guides for traveling in Rajasthan.", articles: 12 },
    { id: 2, name: "Weddings", description: "All about regal weddings.", articles: 5 },
    { id: 3, name: "Wellness", description: "Spa and salon treatments.", articles: 3 },
  ]);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

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
            
            <Dialog open={isBlogModalOpen} onOpenChange={setIsBlogModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Blog Post</DialogTitle>
                  <DialogDescription>Write a new article. A Quill rich-text editor will be used for the content.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label>Title</Label>
                    <Input placeholder="Enter post title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <option>Travel Guide</option>
                        <option>Weddings</option>
                        <option>Wellness</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Status</Label>
                      <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <option>Draft</option>
                        <option>Published</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Content (Simulated Rich Text Editor)</Label>
                    <div className="border border-border rounded-md overflow-hidden">
                      <div className="bg-muted p-2 border-b border-border flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2 font-bold">B</Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 italic">I</Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 underline">U</Button>
                        <div className="w-px h-6 bg-border mx-1 my-1"></div>
                        <Button variant="ghost" size="sm" className="h-8 px-2"><ImageIcon className="h-4 w-4" /></Button>
                      </div>
                      <Textarea className="border-0 focus-visible:ring-0 rounded-none resize-none min-h-[200px]" placeholder="Start writing your amazing blog post here..." />
                    </div>
                  </div>
                  
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold">SEO Meta Data</h4>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Meta Title</Label>
                        <Input placeholder="SEO Title" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Meta Description</Label>
                        <Input placeholder="SEO Description" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBlogModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsBlogModalOpen(false)}>Save Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            
            <Dialog open={isCatModalOpen} onOpenChange={setIsCatModalOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <FolderTree className="mr-2 h-4 w-4" />
                  New Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Category</DialogTitle>
                  <DialogDescription>Add a new category to organize your blogs.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Category Name</Label>
                    <Input placeholder="e.g. Travel Destinations" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Short description about this category" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Image URL (Optional)</Label>
                    <Input placeholder="https://..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCatModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsCatModalOpen(false)}>Save Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Articles Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{cat.description}</TableCell>
                      <TableCell>{cat.articles}</TableCell>
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