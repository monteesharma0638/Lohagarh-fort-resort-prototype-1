import { requireSuperAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Users from "@/models/Users";
import { createActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const superAdmin = await requireSuperAdmin();
        const { name, email, password, access } = await req.json();
        
        if (!name || !email || !password || !access) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await Users.create({ name, email, password: passwordHash, access });
        await createActivity(superAdmin, "create", "users", [user.id.toString()], `Created user with email: ${email} and access: ${access}`);
        return NextResponse.json({ message: "User created successfully" });
    }
    catch(err: any) {
        return NextResponse.json({ message: "Error creating user", error: err.message }, { status: 500 });
    }
}