import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getNeighbours, getService, services } from "@/lib/services";
import { CONTACT_EMAIL, OWNER_NAME, PHONE_ROI, PHONE_UK } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.heading,
    description: s.lead,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.heading} - LegioPro`, description: s.lead },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const { prev, next } = getNeighbours(s.slug);

  return (
    <div className="page">
      <SiteNav />
      <main className="svc-main">
        <p className="crumb">
          <Link href="/#services"><i className="ph ph-arrow-left" aria-hidden="true" /> All services</Link>
        </p>
        <div className="svc-grid">
          <article className="svc-article">
            <span className="svc-tile" aria-hidden="true"><i className={`ph ${s.icon}`} /></span>
            <h1>{s.heading}</h1>
            <p className="svc-lead">{s.lead}</p>
            <div className="svc-tags">
              {s.tags.map((t) => <span key={t} className="tag tag-accent">{t}</span>)}
            </div>
            <hr className="hr" />
            <h4>What&apos;s covered</h4>
            <ul className="checklist">
              {s.covered.map((item) => (
                <li key={item}><i className="ph ph-check-circle" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </article>
          <aside className="card elev-md svc-aside">
            <span className="card-kicker">Talk it through</span>
            <span className="card-title">{OWNER_NAME}</span>
            <p className="card-body">Managing Director - happy to discuss your site and scope before quoting.</p>
            <div className="contact-links">
              <a href={`mailto:${CONTACT_EMAIL}`}><i className="ph ph-envelope-simple" aria-hidden="true" /> {CONTACT_EMAIL}</a>
              <a href={PHONE_UK.href}><i className="ph ph-phone" aria-hidden="true" /> {PHONE_UK.display}</a>
              <a href={PHONE_ROI.href}><i className="ph ph-phone" aria-hidden="true" /> {PHONE_ROI.display}</a>
            </div>
            <Link className="btn btn-primary btn-block" href="/#contact">Request a quote</Link>
          </aside>
        </div>
        <nav className="svc-pager" aria-label="Previous and next service">
          {prev ? (
            <Link href={`/services/${prev.slug}`} rel="prev"><i className="ph ph-arrow-left" aria-hidden="true" /> {prev.heading}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/services/${next.slug}`} rel="next">Next: {next.heading} <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
          ) : <span />}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
