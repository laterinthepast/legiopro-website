import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="svc-row" data-reveal>
      <span className="svc-num">{String(index + 1).padStart(2, "0")}</span>
      <i className={`ph ${service.icon} svc-icon`} aria-hidden="true" />
      <span className="svc-text">
        <span className="svc-title">{service.title}</span>
        <span className="svc-blurb">{service.blurb}</span>
      </span>
      <i className="ph ph-arrow-right svc-arrow" aria-hidden="true" />
    </Link>
  );
}
