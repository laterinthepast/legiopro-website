import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Saira } from "next/font/google";
import "@phosphor-icons/web/regular";
import "./globals.css";
import { MOTION_BOOTSTRAP } from "@/lib/motion";
import { SITE_URL } from "@/lib/site";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
  adjustFontFallback: false, // next/font has no metrics for this family; fallback stays system-ui
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#131a24",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LegioPro - Legionella & Water Hygiene Consultancy | UK & Ireland",
    template: "%s - LegioPro",
  },
  description:
    "LegioPro delivers Legionella risk assessments, written schemes of control and routine water hygiene services across the UK, Northern Ireland and the Republic of Ireland - practical, site-specific advice you can act on.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "LegioPro",
    title: "LegioPro - Legionella & Water Hygiene Consultancy | UK & Ireland",
    description:
      "Independent Legionella risk assessments, written schemes of control and water hygiene services across the UK, Northern Ireland and the Republic of Ireland.",
    images: [{ url: "/images/logo-dark.png", alt: "LegioPro" }],
  },
  twitter: { card: "summary", title: "LegioPro - Legionella & Water Hygiene Consultancy" },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${bigShoulders.variable} ${saira.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
