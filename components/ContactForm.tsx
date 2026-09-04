"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

/**
 * Enquiry form, submitted to Netlify Forms. The form is registered by the
 * static definition in public/__forms.html (field names must match); we post
 * there as application/x-www-form-urlencoded with form-name=enquiry.
 * Submissions appear under Site configuration -> Forms in Netlify.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const msg = String(fd.get("msg") || "").trim();
    if (!name) return setStatus({ kind: "error", message: "Please enter your name." });
    if (!EMAIL_RE.test(email)) return setStatus({ kind: "error", message: "Please enter a valid email address." });
    if (!msg) return setStatus({ kind: "error", message: "Please tell us a little about what you need." });

    setStatus({ kind: "sending" });
    try {
      const params = new URLSearchParams();
      params.set("form-name", "enquiry");
      fd.forEach((v, k) => params.set(k, String(v)));
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus({ kind: "ok" });
    } catch {
      setStatus({ kind: "error", message: `Could not send your enquiry. Please email ${CONTACT_EMAIL} directly.` });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form className="enquiry" name="enquiry" data-reveal onSubmit={onSubmit} noValidate>
      <input type="hidden" name="form-name" value="enquiry" />
      <div className="field"><label htmlFor="f-name">Name</label><input className="input" id="f-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="f-org">Organisation</label><input className="input" id="f-org" name="org" autoComplete="organization" /></div>
      <div className="field"><label htmlFor="f-email">Email</label><input className="input" id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required /></div>
      <div className="field"><label htmlFor="f-phone">Phone</label><input className="input" id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" /></div>
      <div className="field span"><label htmlFor="f-msg">How can we help?</label><textarea className="input" id="f-msg" name="msg" placeholder="e.g. Legionella risk assessment for a 40-bed care home in Belfast" required /></div>
      {/* Honeypot: hidden from people, filled by bots; Netlify discards those submissions */}
      <div className="field" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="f-website">Website</label><input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="span" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button className="btn btn-primary" type="submit" disabled={sending}>
          <i className="ph ph-paper-plane-tilt" aria-hidden="true" /> {sending ? "Sending…" : "Send enquiry"}
        </button>
        {status.kind === "ok" && <p className="form-status" data-kind="ok" role="status">Thanks - your enquiry has been sent. Chris will be in touch shortly.</p>}
        {status.kind === "error" && <p className="form-status" data-kind="error" role="alert">{status.message}</p>}
      </div>
    </form>
  );
}
