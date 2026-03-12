"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Maximize, BedDouble, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MotionDiv from "./MotionDiv";
import type { Room } from "@/types/rooms";

interface RoomsFilterProps {
  rooms: Room[];
  hotelId: string;
}

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Size: Largest First", value: "size-desc" },
];

function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/40">
      <div className="text-center">
        <BedDouble size={32} className="mx-auto mb-2 opacity-30" />
        <p className="text-[0.6rem] tracking-[0.15em] uppercase">Room Image</p>
      </div>
    </div>
  );
}

export default function RoomsFilter({ rooms, hotelId }: RoomsFilterProps) {
  const types = useMemo(() => {
    const t = Array.from(new Set(rooms.map((r) => r.type)));
    return ["All", ...t];
  }, [rooms]);

  const [activeType, setActiveType] = useState("All");
  const [sort, setSort] = useState("price-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minSize, setMinSize] = useState<number>(0);
  const [occupancy, setOccupancy] = useState<number>(0);

  const maxPriceInData = useMemo(() => Math.max(...rooms.map((r) => r.price)), [rooms]);

  const filtered = useMemo(() => {
    let result = rooms.filter((r) => {
      if (activeType !== "All" && r.type !== activeType) return false;
      if (r.price > maxPrice) return false;
      if (r.size < minSize) return false;
      if (occupancy > 0 && r.occupancy < occupancy) return false;
      return true;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "size-desc") result = [...result].sort((a, b) => b.size - a.size);

    return result;
  }, [rooms, activeType, sort, maxPrice, minSize, occupancy]);

  const resetFilters = () => {
    setActiveType("All");
    setMaxPrice(Infinity);
    setMinSize(0);
    setOccupancy(0);
  };

  const hasActiveFilters = activeType !== "All" || maxPrice !== Infinity || minSize > 0 || occupancy > 0;

  return (
    <div>
      {/* ── Type Tabs + Sort bar ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={cn(
                "px-4 py-2 text-[0.65rem] tracking-[0.12em] uppercase font-bold transition-all border",
                activeType === t
                  ? "bg-primary text-white border-primary"
                  : "border-border text-foreground/60 hover:border-primary hover:text-primary"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.12em] uppercase font-bold border transition-all",
              showFilters ? "border-primary text-primary" : "border-border text-foreground/60 hover:border-primary hover:text-primary"
            )}
          >
            <SlidersHorizontal size={13} />
            Filters
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-[0.65rem] tracking-[0.1em] uppercase font-bold border border-border px-3 py-2 bg-background text-foreground/60 outline-none hover:border-primary transition-colors"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Advanced Filters Panel ───────────────────────── */}
      {showFilters && (
        <MotionDiv
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-foreground/50 mb-3 font-bold">
              Max Price per Night
            </label>
            <input
              type="range"
              min={0}
              max={maxPriceInData}
              step={1000}
              value={maxPrice === Infinity ? maxPriceInData : maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-sm text-foreground mt-2">
              Up to ₹{(maxPrice === Infinity ? maxPriceInData : maxPrice).toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-foreground/50 mb-3 font-bold">
              Min Room Size (sq ft)
            </label>
            <input
              type="range"
              min={0}
              max={1000}
              step={50}
              value={minSize}
              onChange={(e) => setMinSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-sm text-foreground mt-2">
              {minSize > 0 ? `From ${minSize} sq ft` : "Any size"}
            </p>
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-foreground/50 mb-3 font-bold">
              Min Occupancy
            </label>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setOccupancy(n)}
                  className={cn(
                    "w-9 h-9 text-sm border transition-all",
                    occupancy === n
                      ? "border-primary bg-primary text-white"
                      : "border-border text-foreground/60 hover:border-primary"
                  )}
                >
                  {n === 0 ? "Any" : n}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-[0.65rem] tracking-widest uppercase text-foreground/50 hover:text-primary transition-colors"
              >
                <X size={12} /> Reset Filters
              </button>
            </div>
          )}
        </MotionDiv>
      )}

      {/* ── Results count ────────────────────────────────── */}
      <p className="text-xs text-foreground/40 tracking-wider mb-8">
        Showing {filtered.length} of {rooms.length} accommodation{rooms.length !== 1 ? "s" : ""}
      </p>

      {/* ── Rooms Grid ───────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border">
          <p className="text-foreground/40 text-sm">No rooms match your filters.</p>
          <button onClick={resetFilters} className="mt-4 text-primary text-sm underline underline-offset-4">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filtered.map((room, i) => (
            <MotionDiv
              key={room.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group border border-border bg-card hover:border-primary/30 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
                {/* Image area */}
                <div className="relative h-64 lg:h-auto min-h-[260px] overflow-hidden">
                  <ImagePlaceholder />
                  {/* Type badge */}
                  <span className="absolute top-4 left-4 bg-primary text-white text-[0.6rem] tracking-[0.15em] uppercase font-bold px-3 py-1.5">
                    {room.type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
                      {room.name}
                    </h3>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-5 mb-5 text-foreground/50 text-xs tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Maximize size={13} /> {room.size} sq ft
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={13} /> Up to {room.occupancy} guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={13} /> {room.beds}
                      </span>
                    </div>

                    <p className="text-foreground/65 text-sm leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.features.map((f) => (
                        <span key={f} className="text-[0.65rem] tracking-[0.1em] uppercase border border-border px-2.5 py-1 text-foreground/50">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-6">
                      {room.amenities.slice(0, 6).map((a) => (
                        <span key={a} className="flex items-center gap-1.5 text-xs text-foreground/55">
                          <span className="w-1 h-1 bg-primary rounded-full" /> {a}
                        </span>
                      ))}
                      {room.amenities.length > 6 && (
                        <span className="text-xs text-foreground/40">+{room.amenities.length - 6} more</span>
                      )}
                    </div>
                  </div>

                  {/* Footer: price + CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border">
                    <div>
                      <p className="text-[0.6rem] tracking-[0.15em] uppercase text-foreground/40 mb-0.5">Starting from</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-serif text-foreground">
                          ₹{room.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-foreground/40">/ night</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/hotels/${hotelId}/rooms/${room.id}`}
                        className="flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-[0.65rem] tracking-[0.12em] uppercase font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        View Details <ChevronRight size={12} />
                      </Link>
                      <Link
                        href="/reservations"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[0.65rem] tracking-[0.12em] uppercase font-bold hover:bg-primary/90 transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      )}
    </div>
  );
}
