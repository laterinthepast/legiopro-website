# LegioPro Consultancy — website

Marketing site for LegioPro Consultancy Ltd (independent Legionella & water hygiene consultancy, UK · NI · ROI).
Built with Next.js (App Router) from the design handoff; homepage plus 11 service pages.

## Run locally

```bash
npm install
npm run dev                  # http://localhost:3000
```

`npm run build` produces a fully static homepage + service pages. There is no server code.

## Where things live

- `lib/services.ts` — the 11 services (order, icons, copy). Edit copy here; both the homepage index and the service pages read from it.
- `lib/site.ts` — contact details.
- `content/blog/*.md` — blog posts (markdown with `title`, `date`, `excerpt`, `tags` front matter). Drop a new file in and it appears on `/blog`, newest first.
- `app/globals.css` — design tokens (from the handoff token sheet) + all component/page classes.
- `components/HeroSphere.tsx`, `components/CoverageGlobe.tsx` — the two three.js scenes, ported from the handoff HTML as React components (no iframes).
- `components/HomeEffects.tsx` — scroll progress bar, reveal-on-scroll, hero fade/parallax, click ripple.
- `components/MotionToggle.tsx` / `lib/motion.ts` — the animations kill switch (footer button; also honours `prefers-reduced-motion`).
- `public/data/countries-110m.json` — vendored world-atlas TopoJSON for the globe.
- `components/ContactForm.tsx` + `public/__forms.html` — the enquiry form, handled by Netlify Forms (with a honeypot). It only works on a Netlify deploy; locally the submit shows an error.

## Deploy (Netlify)

1. Push the repo to GitHub and "Add new site" from it in Netlify; it detects Next.js automatically (`netlify.toml` sets the build command).
2. Site configuration → Environment variables: `NEXT_PUBLIC_SITE_URL=https://www.legiopro.co.uk`.
3. Site configuration → Forms: enable form detection, then after the first deploy the "enquiry" form appears. Add a form notification → Email → chris@legiopro.co.uk.
4. Submissions are listed in the Netlify dashboard under Forms as well (100/month on the free tier).
