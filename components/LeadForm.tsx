"use client";

import { useState } from "react";
import { MACHINES } from "@/lib/catalogue";
import { DEALER, mailtoLink } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";
import { CheckIcon } from "./icons";

// Quote / contact form. Posts to the Apps Script mailer when
// NEXT_PUBLIC_LEAD_ENDPOINT is set; otherwise it opens the visitor's email app
// with the enquiry filled in, so no lead is ever lost.

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

const COUNTIES = [
  "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim",
  "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford",
  "Westmeath", "Wexford", "Wicklow", "Northern Ireland",
];

const field =
  "mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-base text-ink outline-none transition focus:border-graphite focus:ring-2 focus:ring-lime/60";
const label = "block text-sm font-semibold text-graphite";

type Status = "idle" | "sending" | "sent" | "mailto";

export default function LeadForm({ machine, source }: { machine?: string; source: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company_website")) return; // bot honeypot
    const phone = String(data.get("phone") ?? "").replace(/[\s()-]/g, "");
    if (!/^\+?\d{7,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    data.set("source", source);
    data.set("page", window.location.href);

    const lines = ["name", "phone", "email", "county", "machine", "finance", "message"]
      .map((k) => [k, data.get(k)])
      .filter(([, v]) => v)
      .map(([k, v]) => `${String(k)[0].toUpperCase()}${String(k).slice(1)}: ${v}`);

    if (!ENDPOINT) {
      window.location.href = mailtoLink(`Zoomlion enquiry: ${data.get("machine") || "general"}`, lines.join("\n"));
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      // Apps Script web apps don't send CORS headers; a no-cors POST still delivers.
      await fetch(ENDPOINT, { method: "POST", mode: "no-cors", body: new URLSearchParams(data as unknown as Record<string, string>) });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
      setError(`Sorry, that didn't send. Please call ${DEALER.phoneDisplay} or email ${DEALER.email}.`);
    }
  }

  if (status === "sent" || status === "mailto") {
    return (
      <div className="flex flex-col items-start gap-3 py-4" role="status">
        <span className="grid size-12 place-items-center bg-lime text-ink">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="display text-2xl">{status === "sent" ? "Thanks, we've got it" : "Almost done"}</h3>
        <p className="text-steel">
          {status === "sent"
            ? "Our sales team will be in touch shortly, usually the same working day."
            : `Your email app should have opened with your enquiry ready to send. If it didn't, email ${DEALER.email} or call ${DEALER.phoneDisplay}.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor={`${source}-name`} className={label}>Name *</label>
        <input id={`${source}-name`} name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={`${source}-phone`} className={label}>Phone *</label>
        <input id={`${source}-phone`} name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
      </div>
      <div>
        <label htmlFor={`${source}-email`} className={label}>Email *</label>
        <input id={`${source}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor={`${source}-county`} className={label}>County</label>
        <select id={`${source}-county`} name="county" className={field} defaultValue="">
          <option value="">Select…</option>
          {COUNTIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${source}-machine`} className={label}>Machine</label>
        <select id={`${source}-machine`} name="machine" className={field} defaultValue={machine ?? ""}>
          <option value="">Not sure yet / general enquiry</option>
          {MACHINES.map((m) => (
            <option key={m.slug} value={m.name}>Zoomlion {m.name}</option>
          ))}
          {machine && !MACHINES.some((m) => m.name === machine) && <option value={machine}>{machine}</option>}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${source}-message`} className={label}>What do you need it for?</label>
        <textarea id={`${source}-message`} name="message" rows={4} className={field} placeholder="The job, site conditions, attachments, when you need it…" />
      </div>
      <label className="flex items-center gap-3 text-sm text-graphite sm:col-span-2">
        <input type="checkbox" name="finance" value="Yes, include finance options" className="size-5 accent-lime-deep" />
        Include finance options in my quote
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {error && <p className="text-sm font-semibold text-red-700 sm:col-span-2" role="alert">{error}</p>}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-steel">We only use your details to reply to this enquiry.</p>
        <button type="submit" className={btnPrimary} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
