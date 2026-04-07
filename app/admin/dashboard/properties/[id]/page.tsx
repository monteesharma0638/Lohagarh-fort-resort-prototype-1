// app/admin/dashboard/properties/[id]/page.jsx

import { notFound } from "next/navigation";
import Properties from "@/models/Properties";
import PropertyDrillEditor from "@/components/PropertyDrillEditor";
import { connectDB } from "@/lib/db";

const HIDDEN_FIELDS = { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 };

async function getProperty(id: string) {
  await connectDB();
  const doc = await Properties.findOne({ id }, HIDDEN_FIELDS).lean();
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export default async function PropertyRootPage({ params }: any) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  return (
    <PropertyDrillEditor
      documentId={id}
      fullDocument={property}
      path={[]}
    />
  );
}