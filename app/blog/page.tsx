import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { formatDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Legionella and water hygiene news, guidance updates and practical advice from LegioPro Consultancy.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <div className="page">
      <SiteNav />
      <main className="svc-main">
        <div className="section-head" style={{ maxWidth: "60ch" }}>
          <h6 className="kicker">News &amp; guidance</h6>
          <h1 style={{ fontSize: "clamp(32px, 3.6vw, 44px)" }}>Blog</h1>
          <p>Guidance updates, common findings and practical advice on Legionella and water hygiene, written for duty holders and responsible persons.</p>
        </div>
        <div className="post-list">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row">
              <span className="post-meta">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{p.readingMinutes} min read</span>
              </span>
              <span className="post-title">{p.title}</span>
              <span className="post-excerpt">{p.excerpt}</span>
              <span className="post-tags">{p.tags.map((t) => <span key={t} className="tag tag-outline">{t}</span>)}</span>
              <i className="ph ph-arrow-right post-arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
