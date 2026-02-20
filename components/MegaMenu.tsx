import React, { useState } from "react";
import {motion} from "framer-motion";

export default function MegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow-md z-50" onMouseLeave={() => setOpen(false)}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold">GrandStay</h1>

        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
        >
          <button className="font-medium hover:text-amber-600">
            Explore
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute left-0 top-full w-full bg-white shadow-2xl border-t"
        >
          <div className="grid grid-cols-2 max-w-7xl mx-auto p-10 gap-10">

            {/* LEFT SIDE IMAGE */}
            <div
              className="h-[380px] rounded-xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
              }}
            >
              <div className="h-full w-full bg-black/30 rounded-xl flex items-end p-6">
                <h2 className="text-white text-2xl font-semibold">
                  Experience Luxury & Comfort
                </h2>
              </div>
            </div>

            {/* RIGHT SIDE MENU */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                  Rooms
                </h3>
                <ul className="space-y-3">
                  <li><a href="#">Deluxe Room</a></li>
                  <li><a href="#">Executive Suite</a></li>
                  <li><a href="#">Family Room</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                  Facilities
                </h3>
                <ul className="space-y-3">
                  <li><a href="#">Spa & Wellness</a></li>
                  <li><a href="#">Restaurant</a></li>
                  <li><a href="#">Swimming Pool</a></li>
                  <li><a href="#">Fitness Center</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                  Events
                </h3>
                <ul className="space-y-3">
                  <li><a href="#">Weddings</a></li>
                  <li><a href="#">Conference Hall</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                  Discover
                </h3>
                <ul className="space-y-3">
                  <li><a href="#">Gallery</a></li>
                  <li><a href="#">Special Offers</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </nav>
  );
}
