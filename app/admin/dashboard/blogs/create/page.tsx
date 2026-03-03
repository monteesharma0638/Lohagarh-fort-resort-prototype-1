"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import slugify from "slugify";
import { useFetch } from "@/hooks/api";

const BlogEditor = dynamic(() => import("./components/BlogEditor"), {
  ssr: false,
});

interface Metadata {
  title: string;
  description: string;
}

const initialMetadata: Metadata = {
  title: "",
  description: "",
};

export default function page() {
  const editorRef = useRef<any>(null);
  const [metadatas, setMetadatas] = useState<Metadata[]>([]);
  const [metadata, setMetdata] = useState<Metadata>(initialMetadata);
  const [title, setTitle] = useState<string>();
  const [slug, setSlug] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [status, setStatus] = useState<string>("draft");
  const {data: categories} = useFetch("/api/categories");

  const handleAddBlog = async (e: any) => {
    try {
      const blocks = await editorRef.current.save();
      console.log("output", blocks);
      if (!blocks) throw new Error("blocks are required");
      if (!title) throw new Error("Title is required");
      if (!slug) throw new Error("Slug is required");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title,
        metadata: metadatas,
        slug,
        category,
        status,
        blocks: JSON.stringify(blocks)
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
  
      await fetch("/api/blogs/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if(result.error) {
            console.log(result.error);
            throw new Error(result.message);
          }
          Swal.fire({
            title: "Blog post created successfully.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: error.message,
            text: "Please check console for more details.",
            icon: "error",
          });
        });
    }
    catch(err: any) {
       console.log("🚀 ~ handleAddBlog ~ err:", err)
       Swal.fire({
          title: "Error in creating Blog.",
          text: "Please check console for more details.",
          icon: "error",
        });
    }
  };

  const handleAddMetadata = () => {
    try {
      if (!metadata.title) throw new Error("Title is required");
      if (!metadata.description) throw new Error("Description is required");

      setMetadatas((prev) => [...prev, metadata]);
      setMetdata(initialMetadata);
    } catch (err: any) {
      Swal.fire({
        title: "Invalid Input",
        text: err.message,
        icon: "error",
      });
    }
  };

  const handleRemoveMetadata = (index: number) => {
    setMetadatas((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return prev;
    });
  };


  return (
    <div>
      <div className="sm:max-w-[800px] max-h-[90vh]">
        <div>
          <div>Create Blog Post</div>
          <div>Write a new article.</div>
        </div>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter post title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              placeholder="blog-post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {
                    categories?.map((cat: any, index: any) => (
                        <option key={index + cat._id} value={cat._id}>{cat.name}</option>
                    ))
                }
              </select>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Content (Blog Editor)</Label>
            <div className="prose max-w-none">
              <BlogEditor editorRef={editorRef} />
            </div>
          </div>
          <div className="space-y-4">
            {metadatas.map((value, index) => (
              <div
                key={value.title + index}
                className="flex items-start justify-between p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">
                    {value.title}
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    {value.description}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveMetadata(index)}
                  className="ml-4 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
            <h4 className="text-sm font-semibold">SEO Meta Data</h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Meta Title</Label>
                <Input
                  placeholder="SEO Title"
                  value={metadata.title}
                  onChange={(e) =>
                    setMetdata((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Meta Description</Label>
                <Input
                  placeholder="SEO Description"
                  value={metadata.description}
                  onChange={(e) =>
                    setMetdata((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <Button className="cursor-pointer" onClick={handleAddMetadata}>
              Add Metadata
            </Button>
          </div>
        </div>
        <div>
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleAddBlog}>Save Post</Button>
        </div>
      </div>
    </div>
  );
}
