import { createActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import BlogCategories from "@/models/BlogCategories";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await requireAdmin(["super-admin", "admin", "blog-edits"])
        const { name, description, image } = await req.json();
        console.log("🚀 ~ POST ~ name:", name, description, image);

        const result = await BlogCategories.create({
            name,
            description,
            image
        });
        console.log("🚀 ~ POST ~ result:", result);

        createActivity(user, "create", "BlogCategories", [result._id], "Created a blog post");
        return NextResponse.json({message: "Category created successfully.", result});
    }
    catch (err: any) {
        return NextResponse.json({ message: "Error in creating categories.", error: err.message }, { status: 500 });
    }
}