"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, FileCode2, ExternalLink } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function PagesList() {
  const [pages] = useState([
    { id: 1, title: "Home", slug: "/", lastUpdated: "2024-02-23", sections: 8 },
    { id: 2, title: "About Us", slug: "/about", lastUpdated: "2024-02-15", sections: 4 },
    { id: 3, title: "Lohagarh Fort Resort", slug: "/hotels/lohagarh-fort", lastUpdated: "2024-02-20", sections: 6 },
    { id: 4, title: "Special Packages", slug: "/packages", lastUpdated: "2024-01-30", sections: 3 },
    { id: 5, title: "Regal Weddings", slug: "/experiences/regal-weddings", lastUpdated: "2024-02-10", sections: 5 },
  ]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);

  const handleEdit = (page: any) => {
    setSelectedPage(page);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground mt-1">Manage website pages, meta data, and content.</p>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Pages</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                className="pl-9 h-9 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-primary/5 text-primary">
                        <FileCode2 className="h-4 w-4" />
                      </div>
                      <span>{page.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-muted/50 font-mono text-xs">{page.slug}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{page.sections} sections</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{page.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                        onClick={() => handleEdit(page)}
                        data-testid={`btn-edit-page-${page.id}`}
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit Data
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Page Data Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page: {selectedPage?.title}</DialogTitle>
            <DialogDescription>
              Update metadata and base configuration for this page. To edit sections, use the visual builder.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPage && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold border-b pb-2">Page Information</h4>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input id="title" defaultValue={selectedPage.title} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Page Route (Slug)</Label>
                    <Input id="slug" defaultValue={selectedPage.slug} className="font-mono text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold border-b pb-2">SEO & Meta Data</h4>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input id="meta-title" defaultValue={`${selectedPage.title} | Lohagarh Group of Companies`} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="meta-desc">Meta Description</Label>
                    <Input id="meta-desc" defaultValue="Experience luxury at Lohagarh Group of Companies..." />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg border border-border mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Page Content Sections</h4>
                  <p className="text-xs text-muted-foreground">Manage the text and images on this page</p>
                </div>
                <Button size="sm">Manage Content</Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button type="button" onClick={() => setIsEditOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}