"use client";

import CloudinaryPicker from "@/components/CloudinaryPicker";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

const Field = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        {children}
    </div>
);

export default function UpdatePage({ hotel }: any) {
    const [data, setData] = useState<any>(hotel);

    const updateField = (key: string, value: any) => {
        setData((prev: any) => ({ ...prev, [key]: value }));
    };

    const updateNested = (section: string, key: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    const handleAddDiningCard = () => {
        setData((prev: any) => ({
            ...prev,
            dining: {
                ...prev["dining"],
                cards: [
                    ...prev["dining"]["cards"],
                    prev["dining"]["cards"][0]
                ]
            }
        }));
    }

    const handleDeleteDiningCard = (idx: number) => {
        if(data.dining.cards.length < 2) {
            Swal.fire({
                title: "Atleast 1 item required.",
                icon: "error"
            });
            return;
        }
        setData((prev: any) => ({
            ...prev,
            dining: {
                ...prev["dining"],
                cards: prev.dining.cards.filter((_: any, i: number) => i !== idx)
            }
        }));
    }

    const handleAddPhotoGalleryItem = () => {
        setData((prev: any) => {
            return ({
                ...prev,
                "photo-gallery": {
                    ...prev["photo-gallery"],
                    images: [
                        ...prev["photo-gallery"]["images"],
                        prev["photo-gallery"]["images"][0]
                    ]
                }
            })
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">{hotel.name}</h1>
                    <p className="text-gray-600 mt-2">Update information</p>
                </div>

                {/* BASIC INFO */}
                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="border-b-2 border-blue-500 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Resort Name">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />
                        </Field>

                        <Field label="Location">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.location}
                                onChange={(e) => updateField("location", e.target.value)}
                            />
                        </Field>

                        <Field label="Main Image">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.image}
                                onChange={(e) => updateField("image", e.target.value)}
                            />
                        </Field>

                        <Field label="Cover Image">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.coverImage}
                                onChange={(e) => updateField("coverImage", e.target.value)}
                            />
                        </Field>

                        <Field label="Starting Price">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.price}
                                onChange={(e) => updateField("price", e.target.value)}
                            />
                        </Field>

                        <Field label="Category">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.category}
                                onChange={(e) => updateField("category", e.target.value)}
                            />
                        </Field>

                        <Field label="Rating">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={data.rating}
                                onChange={(e) => updateField("rating", e.target.value)}
                            />
                        </Field>
                    </div>

                    <Field label="Description">
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={4}
                            value={data.description}
                            onChange={(e) => updateField("description", e.target.value)}
                        />
                    </Field>
                </div>

                {/* DINING */}
                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="border-b-2 border-green-500 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Dining Section</h2>
                    </div>

                    <Field label="Section Heading">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={data.dining.heading}
                            onChange={(e) => updateNested("dining", "heading", e.target.value)}
                        />
                    </Field>

                    <Field label="Section Description">
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            rows={4}
                            value={data.dining.content}
                            onChange={(e) => updateNested("dining", "content", e.target.value)}
                        />
                    </Field>

                    <div className="grid md:grid-cols-2 gap-6">
                        {data.dining.cards?.map((card: any, i: number) => (
                            <div key={i} className="border-2 border-gray-200 rounded-xl p-6 space-y-4 hover:border-green-300 transition">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-lg text-gray-900">Dining Card {i + 1}</h3>
                                    <button onClick={() => handleDeleteDiningCard(i)} style={{position: "relative", top: 0, right: 0, height: 50, width: 50}}><X size="small" color="red" /></button>
                                </div>
                                <Field label="Title">
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={card.title}
                                        onChange={(e) => {
                                            const cards = [...data.dining.cards];
                                            cards[i].title = e.target.value;
                                            updateNested("dining", "cards", cards);
                                        }}
                                    />
                                </Field>

                                <Field label="Content">
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                        rows={3}
                                        value={card.content}
                                        onChange={(e) => {
                                            const cards = [...data.dining.cards];
                                            cards[i].content = e.target.value;
                                            updateNested("dining", "cards", cards);
                                        }}
                                    />
                                </Field>

                                <Field label="Highlight Text">
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={card.heighlight}
                                        onChange={(e) => {
                                            const cards = [...data.dining.cards];
                                            cards[i].heighlight = e.target.value;
                                            updateNested("dining", "cards", cards);
                                        }}
                                    />
                                </Field>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleAddDiningCard}>Add Dining Card</Button>
                </div>

                {/* SPA & SALON */}
                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="border-b-2 border-purple-500 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Spa & Salon</h2>
                    </div>

                    <Field label="Title">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter title"
                            value={data["spa&salon"].title}
                            onChange={(e) => updateNested("spa&salon", "title", e.target.value)}
                        />
                    </Field>

                    <Field label="Content">
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            rows={4}
                            placeholder="Enter content"
                            value={data["spa&salon"].content}
                            onChange={(e) => updateNested("spa&salon", "content", e.target.value)}
                        />
                    </Field>
                </div>

                {/* PHOTO GALLERY */}
                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="border-b-2 border-orange-500 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
                    </div>

                    <div className="space-y-4">
                        {data["photo-gallery"].images?.map((img: any, i: number) => (
                            <div key={i} className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                <Field label={`Image ${i + 1} Title`}>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Image Title"
                                        value={img.title}
                                        onChange={(e) => {
                                            const images = [...data["photo-gallery"].images];
                                            images[i].title = e.target.value;
                                            updateNested("photo-gallery", "images", images);
                                        }}
                                    />
                                </Field>

                                <Field label={`Image ${i + 1} Src`}>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Image Src"
                                        value={img.src}
                                        onChange={(e) => {
                                            const images = [...data["photo-gallery"].images];
                                            images[i].src = e.target.value;
                                            updateNested("photo-gallery", "images", images);
                                        }}
                                    />
                                </Field>
                                <div className="relative top-5">
                                    <CloudinaryPicker onUpload={(url: string) => {
                                        const images = [...data["photo-gallery"].images];
                                        images[i].src = url;
                                        updateNested("photo-gallery", "images", images);
                                    }} />
                                    <Button style={{position: "relative", top: 2, right: 0}}><X /></Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button onClick={handleAddPhotoGalleryItem}><Plus /> Add Image</Button>
                </div>

                {/* CONTACT */}
                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="border-b-2 border-red-500 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
                    </div>

                    <Field label="Address">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Address"
                            value={data["contact-us"].address}
                            onChange={(e) => updateNested("contact-us", "address", e.target.value)}
                        />
                    </Field>

                    <Field label="Phone">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Phone"
                            value={data["contact-us"].phone}
                            onChange={(e) => updateNested("contact-us", "phone", e.target.value)}
                        />
                    </Field>

                    <Field label="Email">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Email"
                            value={data["contact-us"].email}
                            onChange={(e) => updateNested("contact-us", "email", e.target.value)}
                        />
                    </Field>
                </div>

                {/* FACT SHEET */}
                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="border-b-2 border-indigo-500 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Fact Sheet</h2>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(data["fact-sheet"].table || {}).map(
                            ([key, value]: any) => (
                                <div key={key} className="grid md:grid-cols-2 gap-4 items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="font-semibold text-gray-800 capitalize">{key}</div>

                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={value}
                                        onChange={(e) => {
                                            updateNested("fact-sheet", "table", {
                                                ...data["fact-sheet"].table,
                                                [key]: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
            <Button style={{background: "green", color: "white", width: "fit-content", padding: 10, position: "fixed", bottom: 20, right: 20}}>Save Details</Button>
        </div>
    );
}

