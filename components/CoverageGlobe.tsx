"use client";

import { useEffect, useRef } from "react";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Position } from "geojson";

/**
 * Coverage globe (three.js). Ported from the handoff's coverage-map.html.
 * Camera hovers over the UK/Ireland region and zooms in as the section scrolls
 * into view. Deliberately no drag/rotate - touch scroll passes straight through.
 * Country outlines come from a locally vendored world-atlas TopoJSON.
 */
const CITIES: [number, number][] = [
  [-0.1278, 51.5074], [-2.2426, 53.4808], [-3.1883, 55.9533], [-3.1791, 51.4816],
  [-5.9301, 54.5973], [-6.2603, 53.3498], [-8.4756, 51.8985],
];
const COVERAGE_IDS = ["826", "372"]; // United Kingdom, Ireland

export default function CoverageGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [THREE, topojson] = await Promise.all([import("three"), import("topojson-client")]);
      if (disposed) return;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.pointerEvents = "none";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 20);
      const globe = new THREE.Group();
      scene.add(globe);
      const disposables: { dispose(): void }[] = [];

      // flat dark ocean - no lighting hotspots
      const oceanGeo = new THREE.SphereGeometry(0.994, 64, 64);
      const oceanMat = new THREE.MeshBasicMaterial({ color: 0x14202f });
      disposables.push(oceanGeo, oceanMat);
      globe.add(new THREE.Mesh(oceanGeo, oceanMat));

      const V = (lon: number, lat: number, r: number): [number, number, number] => {
        const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
        return [-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th)];
      };
      const lines = (coordsList: Position[][], color: number, opacity: number, r: number) => {
        const pts: number[] = [];
        for (const line of coordsList) {
          for (let k = 0; k < line.length - 1; k++) {
            pts.push(...V(line[k][0], line[k][1], r), ...V(line[k + 1][0], line[k + 1][1], r));
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
        disposables.push(g, m);
        globe.add(new THREE.LineSegments(g, m));
      };

      // faint graticule every 6 degrees
      const grat: Position[][] = [];
      for (let lat = -84; lat <= 84; lat += 6) { const l: Position[] = []; for (let lon = -180; lon <= 180; lon += 2) l.push([lon, lat]); grat.push(l); }
      for (let lon = -180; lon < 180; lon += 6) { const l: Position[] = []; for (let lat = -84; lat <= 84; lat += 2) l.push([lon, lat]); grat.push(l); }
      lines(grat, 0x3f5a72, 0.16, 0.998);

      const pinGroup = new THREE.Group();
      globe.add(pinGroup);
      const pinGeo = new THREE.SphereGeometry(0.0055, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xb9e3ef });
      disposables.push(pinGeo, pinMat);

      // Country outlines (async - globe renders immediately, coastlines pop in)
      fetch("/data/countries-110m.json")
        .then((r) => r.json())
        .then((topo: Topology) => {
          if (disposed) return;
          const countries = topo.objects.countries as GeometryCollection;
          const m = topojson.mesh(topo, countries);
          lines(m.coordinates, 0x8fa3b8, 0.5, 1.0); // coastlines
          const feats = topojson.feature(topo, countries).features;
          for (const id of COVERAGE_IDS) {
            const f = feats.find((x) => String(x.id) === id);
            if (!f) continue;
            const rings: Position[][] = f.geometry.type === "Polygon"
              ? f.geometry.coordinates
              : f.geometry.type === "MultiPolygon" ? f.geometry.coordinates.flat() : [];
            lines(rings, 0x2fb0c8, 1, 1.002);    // coverage countries in teal
            lines(rings, 0x2fb0c8, 0.25, 1.006); // soft glow pass
          }
          for (const [lon, lat] of CITIES) {
            const pin = new THREE.Mesh(pinGeo, pinMat);
            pin.position.set(...V(lon, lat, 1.006));
            pinGroup.add(pin);
          }
        })
        .catch((err) => console.error("Coverage globe: could not load country outlines", err));

      // camera hovers just above the UK/Ireland region - regional view, not a full globe
      const AIM = V(-4.8, 54.2, 1);
      const placeCamera = (dist: number) => {
        camera.position.set(AIM[0] * dist, AIM[1] * dist, AIM[2] * dist);
        camera.lookAt(0, 0, 0);
      };
      placeCamera(1.62);

      const resize = () => {
        const w = mount.clientWidth || 1, h = mount.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      // 0 when the globe enters the viewport bottom, 1 once it reaches the upper third
      let zoomT = 0, zoomCur = 0;
      const onScroll = () => {
        const r = mount.getBoundingClientRect();
        zoomT = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight * 0.85)));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const frame = (t: number) => {
        const time = t * 0.001;
        zoomCur += (zoomT - zoomCur) * 0.06;
        globe.rotation.y = Math.sin(time * 0.1) * 0.015;
        globe.rotation.x = Math.sin(time * 0.13) * 0.008;
        placeCamera(2.55 - zoomCur * 0.93);
        pinGroup.children.forEach((p, i) => p.scale.setScalar(1 + 0.4 * Math.sin(time * 2.2 + i * 1.1)));
        renderer.render(scene, camera);
      };
      const io = new IntersectionObserver(([en]) => {
        renderer.setAnimationLoop(en.isIntersecting ? frame : null);
      }, { threshold: 0 });
      io.observe(mount);

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("scroll", onScroll);
        renderer.setAnimationLoop(null);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup?.(); };
  }, []);

  return <div ref={mountRef} className="globe" role="img" aria-label="Coverage globe - UK and Ireland" data-reveal />;
}
