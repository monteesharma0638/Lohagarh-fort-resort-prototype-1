import { createActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import BlogCategories from "@/models/BlogCategories";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const user = await requireAdmin(["super-admin", "admin", "blog-edits"])
        const { name, description, image, categoryId } = await req.json();
        console.log("🚀 ~ POST ~ name:", name, description, image);
        
        if(!categoryId) throw new Error("Category Id is required.");

        const result = await BlogCategories.findByIdAndUpdate(categoryId, {
            name: name ?? undefined,
            description: description ?? undefined,
            image: image ?? undefined
        });
        console.log("🚀 ~ POST ~ result:", result);

        createActivity(user, "update", "BlogCategories", [result._id], "Updated a blog category");
        return NextResponse.json({message: "Category created successfully.", result});
    }
    catch (err: any) {
        return NextResponse.json({ message: "Error in creating categories.", error: err.message }, { status: 500 });
    }
}