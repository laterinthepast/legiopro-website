import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export default function NotFound() {
  return (
    <div className="page">
      <SiteNav />
      <main className="svc-main" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
        <h6 className="kicker">404</h6>
        <h1 style={{ margin: 0 }}>Page not found</h1>
        <p className="svc-lead">That page doesn&apos;t exist. The services index has everything we offer.</p>
        <Link className="btn btn-primary" href="/#services">All services</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
