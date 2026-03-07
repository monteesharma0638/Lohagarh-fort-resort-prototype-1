import Blogs from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: any}) {
    try {
        const {blogId}: any = await params;
        const blog = await Blogs.findOne({_id: blogId}).lean();

        return NextResponse.json(blog);
    }
    catch(error: any) {
        return NextResponse.json({message: "Unable to fetch blogs", error}, {status: 500});
    }
}