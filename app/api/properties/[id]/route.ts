// app/api/properties/[id]/route.ts

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Properties from "@/models/Properties";
import { connectDB } from "@/lib/db";

function buildFilter(id: string) {
  try {
    return { _id: new ObjectId(id) };
  } catch {
    return { id }; // slug-based fallback
  }
}

// Fields internal to MongoDB/Mongoose — never exposed to the client
const HIDDEN_FIELDS = { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, "$isNew": 0, "$__": 0, "$init": 0 };

export async function GET(_: Request, { params }: any) {
  try {
    await connectDB();
    const { id } = await params;

    // Projection strips _id and __v before the document leaves the DB
    const doc = await Properties.findOne({id}, HIDDEN_FIELDS).lean();
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(doc);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: any) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Strip _id — MongoDB won't allow updating the immutable _id field
    const { _id, ...setPayload } = body;

    // setPayload is already dot-notation safe:
    // e.g. { "salesContact.telephone": [...] }   ← deep path
    //   or { price: "18000", name: "Resort" }     ← root-level leaves only
    const result = await Properties.updateOne({ id }, { $set: setPayload });

    if (result.matchedCount === 0)
      return NextResponse.json({ message: "Document not found" }, { status: 404 });

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}