// app/admin/dashboard/properties/[id]/[...path]/page.jsx

import { notFound } from "next/navigation";
import Properties from "@/models/Properties";
import PropertyDrillEditor from "@/components/PropertyDrillEditor";
import { connectDB } from "@/lib/db";

const HIDDEN_FIELDS = { _id: 0, __v: 0 };

async function getProperty(id: string) {
  await connectDB();
  const doc = await Properties.findOne({ id }, HIDDEN_FIELDS).lean();
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

async function Page({ id, path = [] }: any) {
  const property = await getProperty(id);
  if (!property) notFound();

  // Walk the path to validate it exists — coerce numeric string segments for arrays
  let cursor = property;
  for (const segment of path) {
    if (cursor == null || typeof cursor !== "object") notFound();
    cursor = Array.isArray(cursor) ? cursor[Number(segment)] : cursor[segment];
    if (cursor === undefined) notFound();
  }

  return (
    <PropertyDrillEditor
      documentId={id}
      fullDocument={property}
      path={path}
    />
  );
}

export default async function DrillPage({ params }: any) {
  const { id, path = [] } = await params;
  return <Page id={id} path={path} />;
}