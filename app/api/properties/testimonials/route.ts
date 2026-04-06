import { getAllTestimonials, getTestimonials } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "ID parameter is required." }, { status: 400 });
        }

        if(id === "all") {
            const testimonials = await getAllTestimonials();
            return NextResponse.json(testimonials);
        }

        // Call the database function to fetch testimonials
        const {testimonials} = await getTestimonials(id);

        return NextResponse.json(testimonials);
    }
    catch(err: any) {
        return NextResponse.json({ message: "Error in fetching testimonials.", error: err.message }, { status: 500 });
    }
}