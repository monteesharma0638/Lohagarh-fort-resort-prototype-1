import { createActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import Blogs from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await requireAdmin(["super-admin", "admin", "blog-edits"]);
        const { slug, title, blocks, status, metadata, category } = await req.json();
        console.log("🚀 ~ POST ~ slug:", slug, title, blocks, status, metadata, category);
        if(!slug || !title || !blocks) {
            throw new Error("Required details: slug, title, blocks, metadata");
        }

        const blog = await Blogs.create({
            slug,
            title,
            blocks,
            status,
            metadata,
            category
        })
        console.log("🚀 ~ POST ~ blog:", blog);

        createActivity(user, "create", "blogs", [blog?._id.toString()], "Created a new blog post");
        
        return NextResponse.json({message: "Blog created successfully", data: blog});
    }
    catch (err: any) {
        console.log("🚀 ~ POST ~ err:", err)
        return NextResponse.json({ message: "Error in creating Blog", error: err.message }, { status: 500 });
    }
}