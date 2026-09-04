"use client";

import { useEffect } from "react";
import { useMotion } from "@/lib/motion";

/**
 * Homepage-wide effects: scroll progress bar, reveal-on-scroll, hero scroll
 * fade/parallax and the click/tap water ripple. Everything except the
 * progress bar is disabled by the motion kill switch / reduced-motion.
 */
export default function HomeEffects() {
  const motion = useMotion();

  // Scroll progress + hero fade/parallax
  useEffect(() => {
    const bar = document.getElementById("lp-progress");
    const art = document.getElementById("lp-heroart");
    const copy = document.getElementById("lp-herocopy");
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = max > 0 ? `${(y / max) * 100}%` : "0%";
      if (!motion) return;
      if (art) art.style.transform = `translateY(${Math.min(y * 0.22, 260)}px)`;
      if (copy) {
        const f = Math.max(0, 1 - y / (window.innerHeight * 0.9));
        copy.style.opacity = String(0.15 + 0.85 * f);
        copy.style.transform = `translateY(${y * 0.08}px)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (art) art.style.transform = "";
      if (copy) { copy.style.opacity = ""; copy.style.transform = ""; }
    };
  }, [motion]);

  // Reveal on scroll (once)
  useEffect(() => {
    if (!motion) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el, i) => el.style.setProperty("--reveal-delay", `${(i % 3) * 0.08}s`));
    document.documentElement.setAttribute("data-reveal-ready", "");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.removeAttribute("data-reveal-ready");
    };
  }, [motion]);

  // Click / tap water ripple
  useEffect(() => {
    if (!motion) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest("input,textarea,button,select,label,a")) return;
      ([[110, 0], [56, 0.14]] as const).forEach(([size, delay]) => {
        const s = document.createElement("span");
        s.className = "click-ripple";
        s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;animation-delay:${delay}s`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1300);
      });
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [motion]);

  return <div id="lp-progress" className="progress" aria-hidden="true" />;
}
