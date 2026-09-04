"use client";

import { useEffect, useRef } from "react";
import { readMotionPref } from "@/lib/motion";

/**
 * Hero water sphere (three.js). Ported from the handoff's hero-sphere.html;
 * scroll and hover state are wired directly instead of via postMessage.
 * - Idle rotation, scroll-eased rotation + camera pull-back, hover roll (mouse only).
 * - DPR capped at 2, sized by ResizeObserver, paused when off-screen.
 */
export default function HeroSphere() {
  const artRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const art = artRef.current;
    const mount = mountRef.current;
    if (!art || !mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        art.classList.add("is-ready"); // no WebGL: show glow + rings anyway
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.pointerEvents = "none";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
      camera.position.z = 3.1;
      scene.add(new THREE.AmbientLight(0x9bb7c9, 0.55));
      const key = new THREE.DirectionalLight(0xeef6fa, 1.5); key.position.set(2.5, 3, 2); scene.add(key);
      const rim = new THREE.PointLight(0x2fb0c8, 5, 12); rim.position.set(-3, -1.5, -2); scene.add(rim);

      const geo = new THREE.IcosahedronGeometry(1, 5);
      const base = (geo.attributes.position.array as Float32Array).slice();
      const mat = new THREE.MeshPhongMaterial({ color: 0x2394ab, emissive: 0x0b2630, shininess: 80, specular: 0x9fdcea });
      const sphere = new THREE.Mesh(geo, mat);
      scene.add(sphere);
      const wireGeo = new THREE.IcosahedronGeometry(1.15, 2);
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x2fb0c8, wireframe: true, transparent: true, opacity: 0.1 });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wire);

      const resize = () => {
        const w = mount.clientWidth || 1, h = mount.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      const pos = geo.attributes.position as import("three").BufferAttribute;
      const arr = pos.array as Float32Array;
      let scrollT = 0, scrollCur = 0;
      let hovT = 0, hovAmt = 0, hx = 0, hy = 0, rollX = 0, rollY = 0;

      const onScroll = () => { scrollT = readMotionPref() ? window.scrollY : 0; };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      // Hover roll - mouse pointers only, never touch (no scroll hijack on mobile)
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || !readMotionPref()) return;
        const r = art.getBoundingClientRect();
        hovT = 1;
        hx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        hy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      const onLeave = () => { hovT = 0; hx = 0; hy = 0; };
      art.addEventListener("pointermove", onMove);
      art.addEventListener("pointerleave", onLeave);

      const frame = (t: number) => {
        const time = t * 0.001;
        for (let i = 0; i < pos.count; i++) {
          const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2];
          const d = 1 + 0.045 * Math.sin(x * 3.1 + time * 1.4) * Math.sin(y * 3.7 + time) * Math.sin(z * 2.9 + time * 0.8)
            + 0.02 * Math.sin(y * 6 + time * 2);
          arr[i * 3] = x * d; arr[i * 3 + 1] = y * d; arr[i * 3 + 2] = z * d;
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
        scrollCur += (scrollT - scrollCur) * 0.08;
        hovAmt += (hovT - hovAmt) * 0.05;
        rollY += hovAmt * hx * 0.045;
        rollX += hovAmt * hy * 0.045;
        sphere.rotation.y = time * 0.18 + scrollCur * 0.0035 + rollY;
        sphere.rotation.x = scrollCur * 0.0012 + rollX;
        wire.rotation.y = -time * 0.06 - scrollCur * 0.0018;
        wire.rotation.x = time * 0.04 + scrollCur * 0.0008;
        camera.position.z = 3.1 + Math.min(scrollCur * 0.0009, 0.9);
        renderer.render(scene, camera);
        if (!art.classList.contains("is-ready")) art.classList.add("is-ready"); // fade the art in on first frame
      };

      // Only animate while on screen
      const io = new IntersectionObserver(([en]) => {
        renderer.setAnimationLoop(en.isIntersecting ? frame : null);
      }, { threshold: 0 });
      io.observe(art);

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("scroll", onScroll);
        art.removeEventListener("pointermove", onMove);
        art.removeEventListener("pointerleave", onLeave);
        renderer.setAnimationLoop(null);
        geo.dispose(); mat.dispose(); wireGeo.dispose(); wireMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup?.(); };
  }, []);

  return (
    <div ref={artRef} id="lp-heroart" className="heroart" role="img" aria-label="3D water sphere">
      <span className="heroart-glow" />
      {[0, 1.5, 3, 4.5].map((d) => (
        <span key={d} className="heroart-ring" style={{ animationDelay: `${d}s` }} />
      ))}
      <span ref={mountRef} className="heroart-float" />
    </div>
  );
}
