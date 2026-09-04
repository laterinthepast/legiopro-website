"use client";

import { useRef } from "react";
import { readMotionPref } from "@/lib/motion";
import { CONTACT_EMAIL, OWNER_NAME, PHONE_ROI, PHONE_UK } from "@/lib/site";

/** Direct-contact card with a subtle 3D tilt on mouse pointers only. */
export default function ContactCard() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !readMotionPref()) return; // keep touch scrolling clean
    const card = ref.current; if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const onLeave = () => {
    const card = ref.current; if (!card) return;
    card.style.transition = "transform 0.4s ease";
    card.style.transform = "none";
    setTimeout(() => { card.style.transition = ""; }, 400);
  };

  return (
    <div ref={ref} id="lp-card" className="card elev-md contact-card" data-reveal onPointerMove={onMove} onPointerLeave={onLeave}>
      <span className="card-kicker">Direct contact</span>
      <span className="card-title">{OWNER_NAME}</span>
      <p className="card-body">Managing Director, LegioPro Consultancy Ltd</p>
      <div className="contact-links">
        <a href={`mailto:${CONTACT_EMAIL}`}><i className="ph ph-envelope-simple" aria-hidden="true" /> {CONTACT_EMAIL}</a>
        <a href={PHONE_UK.href}><i className="ph ph-phone" aria-hidden="true" /> {PHONE_UK.display} <span className="text-muted">UK</span></a>
        <a href={PHONE_ROI.href}><i className="ph ph-phone" aria-hidden="true" /> {PHONE_ROI.display} <span className="text-muted">ROI</span></a>
      </div>
      <hr className="hr" style={{ width: "100%" }} />
      <p className="card-meta">Covering the UK, Northern Ireland and the Republic of Ireland</p>
    </div>
  );
}
