import { connectDB } from '@/lib/db';
import Properties from '@/models/Properties'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';


export default async function page() {
    await connectDB();
    const data = await Properties.find().lean();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Properties</h1>
                <Link href="/admin/dashboard/properties/create">
                    <Button>Add Property</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((property) => (
                        <TableRow key={property._id}>
                            <TableCell className="font-medium">{property.name}</TableCell>
                            <TableCell>{property.location}</TableCell>
                            <TableCell>
                                <Link href={`/admin/dashboard/properties/${property.id}`}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}