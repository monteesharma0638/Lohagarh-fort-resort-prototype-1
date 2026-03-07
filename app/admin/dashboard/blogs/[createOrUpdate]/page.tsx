"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import slugify from "slugify";
import { useFetch } from "@/hooks/api";
import useAddMetdata from "@/hooks/useAddMetdata";
import AddMetadataComponent from "@/components/AddMetadataComponent";
import { redirect } from "next/navigation";

const BlogEditor = dynamic(() => import("./components/BlogEditor"), {
  ssr: false,
});


export default function page({params}: any) {
  const { createOrUpdate } = React.use(params) as any; 

  const isNew = createOrUpdate === "create";
  const blogId = createOrUpdate;
  
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState<string>();
  const [slug, setSlug] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [status, setStatus] = useState<string>("draft");
  const [blocks, setBlocks] = useState<any>();
  const { metadata, handleAddMetaRow, removeMetaRow, updateMetaRow, setMetadata } = useAddMetdata();
  const { data: categories } = useFetch("/api/categories");
  
  useEffect(() => {
    async function fn() {
      if(!isNew) {
        try {
          const blogData = await fetch("/api/blogs/" + blogId).then(res => res.json());
          
          if(blogData.error) {
            return redirect("/admin/dashboard/blogs");
          }
          else {
            setTitle(blogData.title);
            setCategory(prev => blogData.category ?? prev);
            setStatus(prev => blogData?.status ?? prev);
            setSlug(blogData.slug);
            setMetadata(prev => blogData.metadata ?? prev);
            setBlocks((prev: any) => JSON.parse(blogData.blocks) ?? prev)
          }
        }
        catch(err) {
          return redirect("/admin/dashboard/blogs");
        }
      }
    }
    fn();
  }, []);
  

  const handleAddOrUpdateBlog = async (e: any) => {
    try {
      const blocks = await editorRef.current.save();
      console.log("output", blocks);
      if (!blocks) throw new Error("blocks are required");
      if (!title) throw new Error("Title is required");
      if (!slug) throw new Error("Slug is required");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        blogId,
        title,
        metadata,
        slug,
        category,
        status,
        blocks: JSON.stringify(blocks),
      });

      const requestOptions = {
        method: isNew? "POST": "PUT",
        headers: myHeaders,
        body: raw,
      };

      await fetch(isNew? "/api/blogs/create": "/api/blogs/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
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
    } catch (err: any) {
      console.log("🚀 ~ handleAddBlog ~ err:", err);
      Swal.fire({
        title: "Error in creating Blog.",
        text: "Please check console for more details.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="sm:max-w-[800px] max-h-[90vh]">
        <div>
          <div>{isNew? "Create": "Edit"} Blog Post</div>
          {isNew && <div>Write a new article.</div>}
        </div>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                {categories?.map((cat: any, index: any) => (
                  <option key={index + cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
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
              {isNew || blocks ? (
                <BlogEditor
                  editorRef={editorRef}
                  blocks={blocks}
                />
              ) : (
                <div>Loading editor...</div>
              )}
            </div>
          </div>
          <AddMetadataComponent metadata={metadata} handleAddMetaRow={handleAddMetaRow} updateMetaRow={updateMetaRow} removeMetaRow={removeMetaRow} />
        </div>
        <div>
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleAddOrUpdateBlog}>Save Post</Button>
        </div>
      </div>
    </div>
  );
}
