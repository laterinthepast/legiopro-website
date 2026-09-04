"use client";

import { useEffect, useState } from "react";

/**
 * Global motion kill switch. Motion is off when the visitor prefers reduced
 * motion, or when they have switched it off in the footer (persisted in
 * localStorage). The <html data-motion> attribute drives the CSS side; this
 * module drives the JS side.
 */
const KEY = "lp-motion";
const EVENT = "lp-motion-change";

export function readMotionPref(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.localStorage.getItem(KEY) === "off") return false;
  } catch { /* storage unavailable */ }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function applyMotionPref(on: boolean) {
  document.documentElement.setAttribute("data-motion", on ? "on" : "off");
}

export function setMotionPref(on: boolean) {
  try { window.localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* ignore */ }
  applyMotionPref(on);
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Inline bootstrap so the attribute is set before first paint (no flash). */
export const MOTION_BOOTSTRAP = `(function(){try{var o=localStorage.getItem('${KEY}')==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.setAttribute('data-motion',o?'off':'on')}catch(e){}})();`;

export function useMotion(): boolean {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const sync = () => setOn(readMotionPref());
    sync();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", sync);
    window.addEventListener(EVENT, sync);
    return () => { mq.removeEventListener("change", sync); window.removeEventListener(EVENT, sync); };
  }, []);
  return on;
}
