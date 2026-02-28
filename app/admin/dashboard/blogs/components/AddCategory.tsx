"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { FolderTree } from "lucide-react";

export default function AddCategory() {
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  async function handleAddCategory(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const name = formData.get("name");
      const description = formData.get("description");
      const image = formData.get("image");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name,
        description,
        image,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      await fetch("/api/categories/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          Swal.fire({
            title: "Category created successfully.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Having an error while creating category.",
            text: "Please check console for more details.",
            icon: "error",
          });
        });
      setIsCatModalOpen(false);
    } catch (err: any) {
      Swal.fire({
        title: "Error in creating category.",
        text: "Please check console for more details.",
        icon: "error",
      });
    }
  }

  return (
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
          <DialogDescription>
            Add a new category to organize your blogs.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddCategory}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Category Name</Label>
              <Input name="name" placeholder="e.g. Travel Destinations" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Short description about this category"
              />
            </div>
            <div className="grid gap-2">
              <Label>Image URL (Optional)</Label>
              <Input name="image" placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCatModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
