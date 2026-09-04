import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-dark.png";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#coverage", label: "Coverage" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Sticky top nav. On the homepage links are in-page anchors; elsewhere they point back to the homepage. */
export default function SiteNav({ home = false }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <nav className="nav" aria-label="Primary">
      <Link href={home ? "#top" : "/"} className="nav-brand" aria-label="LegioPro home">
        <Image src={logo} alt="LegioPro" height={32} priority />
      </Link>
      {LINKS.map((l) => (
        <a key={l.href} href={`${prefix}${l.href}`} className="nav-link">{l.label}</a>
      ))}
      <Link href="/blog" className="nav-link">Blog</Link>
      <a className="btn btn-primary" href={`${prefix}#contact`}>Request a quote</a>
    </nav>
  );
}
