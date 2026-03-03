import { createActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import BlogCategories from "@/models/BlogCategories";
import Blogs from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const user = await requireAdmin(["super-admin", "admin", "blog-edits"]);
        const { blogId, slug, title, blocks, status, metadata, category } = await req.json();
        if(!blogId) {
            throw new Error("Blog id is required");
        }

        if(!slug || !title || !blocks) {
            throw new Error("Required details: slug, title, content");
        }

        const blog = await Blogs.findByIdAndUpdate(blogId, {
            slug,
            title,
            blocks,
            status,
            metadata,
            category
        }, { new: true });
        
        return NextResponse.json({message: "Category created successfully.", data: blog});
    }
    catch (err: any) {
        return NextResponse.json({ message: "Error in creating categories.", error: err.message }, { status: 500 });
    }
}