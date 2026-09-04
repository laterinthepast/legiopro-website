import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { CONTACT_EMAIL, OWNER_NAME, PHONE_ROI, PHONE_UK } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[i - 1], older = posts[i + 1];

  return (
    <div className="page">
      <SiteNav />
      <main className="svc-main">
        <p className="crumb">
          <Link href="/blog"><i className="ph ph-arrow-left" aria-hidden="true" /> All posts</Link>
        </p>
        <div className="svc-grid">
          <article className="svc-article">
            <span className="post-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </span>
            <h1>{post.title}</h1>
            <p className="svc-lead">{post.excerpt}</p>
            <div className="svc-tags">{post.tags.map((t) => <span key={t} className="tag tag-accent">{t}</span>)}</div>
            <hr className="hr" />
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
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
        <nav className="svc-pager" aria-label="Newer and older posts">
          {newer ? <Link href={`/blog/${newer.slug}`} rel="prev"><i className="ph ph-arrow-left" aria-hidden="true" /> {newer.title}</Link> : <span />}
          {older ? <Link href={`/blog/${older.slug}`} rel="next">{older.title} <i className="ph ph-arrow-right" aria-hidden="true" /></Link> : <span />}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
