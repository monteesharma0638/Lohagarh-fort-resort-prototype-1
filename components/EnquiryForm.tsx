"use client";

import { useState } from "react";
import { submitToZoho } from "@/actions/zohoLeads";

export default function EnquiryForm({company = "Lohagarh group of companies: Enquiries & Feedback"}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const result = await submitToZoho(formData);

    if (result.success) {
      setStatus("success");
      (document.getElementById("enquiry-form") as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
    }
  }

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="enquiry-form"
        action={handleSubmit}
      >
        <div className="space-y-6">
          <input
            type="text"
            placeholder="First Name*"
            name="firstName"
            required
            className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Last Name*"
            name="lastName"
            required
            className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        <div className="space-y-6">
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address*"
            className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
          />
        </div>

        <div>
          <input
            name="mobile"
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            name="description"
            rows={5}
            placeholder="Your Message / Enquiry*"
            className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors resize-none"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary hover:bg-gold text-secondary font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-lg"
          >
            Submit Enquiry
          </button>
          <p className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-widest">
            * All information is handled with strict confidentiality.
          </p>
        </div>
        <div className="hidden">
          <input name="company" defaultValue={company} type="text" required />
        </div>

        {status === "success" && (
          <div className="col-span-2 animate-in fade-in slide-in-from-bottom-2 p-3 bg-green-100 text-green-800 rounded-lg text-center text-sm font-semibold">
            ✓ Your enquiry has been sent to our team.
          </div>
        )}

        {status === "error" && (
          <div className="col-span-2 p-3 bg-red-100 text-red-800 rounded-lg text-center text-sm font-semibold">
            ✕ Failed to send. Please check your connection.
          </div>
        )}
      </form>
    </>
  );
}
