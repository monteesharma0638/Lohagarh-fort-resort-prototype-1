import { connectDB } from "@/lib/db";
import BlogCategories from "@/models/BlogCategories";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const categories = await BlogCategories.find().lean();
        return NextResponse.json(categories);
    }
    catch(error: any) {
        console.log("🚀 ~ GET ~ error:", error);
        return NextResponse.json({ message: "Unable to fetch", error}, {status: 500});
    }
}