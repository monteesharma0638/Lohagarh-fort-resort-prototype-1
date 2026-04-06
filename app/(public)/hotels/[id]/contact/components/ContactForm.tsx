"use client";

import { useState } from "react";
import { submitToZoho } from "@/actions/zohoLeads";

export default function ContactForm({
  company = "Lohagarh group of companies: Enquiries & Feedback",
}) {
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
      <form className="space-y-4" action={handleSubmit} id="enquiry-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="w-full col-span-1 border border-border bg-background p-3 text-sm outline-none focus:border-primary"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="w-full col-span-1 border border-border bg-background p-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Phone Number"
          className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary"
        />

        <div className="hidden">
          <input name="company" defaultValue={company} type="text" required />
        </div>
        <textarea
          name="description"
          placeholder="Your Message"
          rows={5}
          className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary resize-none"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase font-bold hover:bg-primary/90 transition-colors"
        >
          Send Message
        </button>

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
