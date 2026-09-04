"use client";

import { setMotionPref, useMotion } from "@/lib/motion";

/** Footer kill switch for the site's animations (mirrors the prototype's "Animations" prop). */
export default function MotionToggle() {
  const on = useMotion();
  return (
    <button type="button" className="motion-toggle" onClick={() => setMotionPref(!on)} aria-pressed={on}>
      Animations: {on ? "on" : "off"}
    </button>
  );
}
