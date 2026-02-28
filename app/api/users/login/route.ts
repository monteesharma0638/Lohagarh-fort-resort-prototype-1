import { connectDB } from "@/lib/db";
import Users from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if(!email) throw new Error("Email is required");
        if(!password) throw new Error("Password is required");

        await connectDB();
        const user = await Users.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Invalid Super Admin credentials' }, { status: 401 });
        }
        const token = jwt.sign({ id: user._id, access: user.access, name: user.name, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' });

        const response = NextResponse.json({ message: "logged in successfully", token });
        response.cookies.set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    }
    catch(err: any) {
        return NextResponse.json({ message: "Error logging in", error: err.message }, { status: 500 });
    }
}