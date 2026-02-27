"use client";

import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit3, Image as ImageIcon, FolderTree } from "lucide-react";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
const BlogEditor = dynamic(() => import("./components/BlogEditor"), {
  ssr: false,
});

export default function page() {
  const editorRef = useRef<any>(null);

  const handleAddBlog = async (e: any) => {
    const output = await editorRef.current.save();
    console.log("output", output);
  }

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
            <div className='prose max-w-none'>
                <BlogEditor editorRef={editorRef} />
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
        <div>
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleAddBlog}>Save Post</Button>
        </div>
        </div>
    </div>
  )
}
