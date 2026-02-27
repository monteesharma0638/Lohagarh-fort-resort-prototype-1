"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit2, ShieldAlert } from "lucide-react";
import Swal from "sweetalert2";

interface IUsers {
    _id: string,
    name: string,
    email: string,
    access: string,
    lastLogin: string
}

export default function UsersList({users}: {users: IUsers[]}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleCreateUser = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const access = formData.get("access");

    console.log("name, email, password, access", name, email, password, access);

    const myHeaders = new Headers();

    const raw = JSON.stringify({
      name, email, password, access
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };

    fetch("/api/users/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.error) {
          Swal.fire({
            title: result.error,
            text: result.message,
            icon: "error"
          });
        }
        else {
          Swal.fire({
            title: "User created Successfully.",
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Unable to create user.",
          icon: 'error',
        })
      });
  }

  const getBadgeColor = (access: string) => {
    switch(access) {
      case "super-admin": return "bg-red-500/10 text-red-600 hover:bg-red-500/20";
      case "admin": return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20";
      case "blog-edits": return "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20";
      case "page-content": return "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-heading font-bold tracking-tight">Admin Users</h1>
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 uppercase text-[10px] tracking-wider font-semibold">Super Admin Only</Badge>
          </div>
          <p className="text-muted-foreground mt-1">Manage panel access, roles and users.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-sm" data-testid="button-create-user">
              <Plus className="mr-2 h-4 w-4" />
              Create New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Admin User</DialogTitle>
                <DialogDescription>
                  Add a new user with specific access rights to the admin panel.
                </DialogDescription>
              </DialogHeader>
            <form onSubmit={handleCreateUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@lohagarh.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="access">Access Level</Label>
                  <Select defaultValue="page content" name="access">
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page-content">Page Content Only</SelectItem>
                      <SelectItem value="blog-edits">Blog Edits Only</SelectItem>
                      <SelectItem value="admin">Page Content & Blogs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={() => setIsAddOpen(false)}>Save User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9 h-9 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${getBadgeColor(user.access)} border-0 font-medium capitalize text-[10px]`}>
                      {user.access}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEdit(user)}
                      data-testid={`btn-edit-user-${user._id}`}
                    >
                      <Edit2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogDescription>
              Update information and access levels for {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-password">New Password (Optional)</Label>
                <Input id="edit-password" type="password" placeholder="Leave blank to keep current" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-access">Access Level</Label>
                <Select defaultValue={selectedUser.access}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page-content">Page Content Only</SelectItem>
                    <SelectItem value="blog-edits">Blog Edits Only</SelectItem>
                    <SelectItem value="admin">Page Content & Blogs</SelectItem>
                  </SelectContent>
                </Select>
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