import { requireSuperAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        await connectDB();
        const superAdmin = await requireSuperAdmin();
        const { userId, name, email, password, access } = await req.json();
        if (!userId) {
            return NextResponse.json({ message: "user id is required" }, { status: 400 });
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, { name, email, password, access }, { new: true });
        return NextResponse.json({ message: "User updated successfully", user: updatedUser });
    }
    catch (err: any) {
        return NextResponse.json({ message: "Error updating user", error: err.message }, { status: 500 });
    }
}