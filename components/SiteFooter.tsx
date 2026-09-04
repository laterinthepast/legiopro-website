import Image from "next/image";
import logo from "@/public/images/logo-dark.png";
import { CONTACT_EMAIL } from "@/lib/site";
import MotionToggle from "./MotionToggle";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <Image src={logo} alt="LegioPro" height={22} />
      <span className="text-muted">© 2026 LegioPro Consultancy Ltd. Independent Legionella &amp; water hygiene consultancy.</span>
      <span className="footer-right">
        <MotionToggle />
        <span className="text-muted">{CONTACT_EMAIL}</span>
      </span>
    </footer>
  );
}
