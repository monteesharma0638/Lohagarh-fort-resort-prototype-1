import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Users from "@/models/Users";
import { requireSuperAdmin } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        await connectDB();  
        const superAdmin = await requireSuperAdmin();
        const user = await Users.find({ access: {
            $ne: "super-admin"
        }});
        return NextResponse.json({ message: "Got user details.", user });
    }
    catch(err: any) {
        console.log(err);
        return NextResponse.json({ message: "Have an error" });
    }
}