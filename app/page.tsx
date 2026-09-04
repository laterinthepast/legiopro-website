import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";
import CoverageGlobe from "@/components/CoverageGlobe";
import HeroSphere from "@/components/HeroSphere";
import HomeEffects from "@/components/HomeEffects";
import ServiceRow from "@/components/ServiceRow";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { services } from "@/lib/services";
import { PHONE_ROI, PHONE_UK } from "@/lib/site";

const HEADLINE = "Independent water safety, done properly.";

const MARQUEE = [
  "ACoP L8",
  "HSG274 Parts 1-3",
  "BS 8580-1",
  "HPSC National Guidelines 2009",
  "Independent & impartial",
  "UK · NI · ROI coverage",
];

const SECTORS = [
  "Healthcare & care homes",
  "Hospitality & leisure",
  "Education",
  "Manufacturing & industrial",
  "Commercial property & FM",
  "Public sector",
];

export default function HomePage() {
  const words = HEADLINE.split(" ");
  return (
    <div className="page">
      <HomeEffects />
      <SiteNav home />

      <header id="top" className="hero wrap">
        <div id="lp-herocopy" className="hero-copy">
          <h1>
            {words.map((w, i) => (
              <span key={i} className="w" style={{ "--d": `${0.07 * i}s` } as React.CSSProperties}>
                {w}{i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p>
            LegioPro delivers Legionella risk assessments, written schemes of control and routine water hygiene services
            across the UK, Northern Ireland and the Republic of Ireland - practical, site-specific advice you can act on.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#services">Explore our services</a>
            <a className="btn btn-secondary" href="#contact">Talk to Chris</a>
          </div>
        </div>
        <HeroSphere />
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="marquee-item"><i className="ph ph-drop" /> {item}</span>
          ))}
        </div>
      </div>

      <section id="services" className="section wrap">
        <div className="section-head" data-reveal style={{ maxWidth: "60ch" }}>
          <h6 className="kicker">What we do</h6>
          <h2>Services</h2>
          <p>Every service is delivered independently and documented in full, so your records stand up to scrutiny. Click any service for the detail.</p>
        </div>
        <div className="svc-list">
          {services.map((s, i) => <ServiceRow key={s.slug} service={s} index={i} />)}
        </div>
      </section>

      <section id="coverage" className="coverage">
        <div className="coverage-grid section wrap">
          <div className="coverage-copy" data-reveal>
            <h6>Where we work</h6>
            <h2>UK-wide, Northern Ireland and the Republic of Ireland</h2>
            <p>
              Based to serve both sides of the Irish Sea, LegioPro works to UK legislation (ACoP L8, HSG274, BS 8580-1) and to
              the HPSC National Guidelines and Health and Safety Authority requirements in Ireland - one consultancy, both
              regulatory frameworks.
            </p>
            <div className="coverage-phones">
              <span><i className="ph ph-phone" aria-hidden="true" /> UK &nbsp;{PHONE_UK.display}</span>
              <span><i className="ph ph-phone" aria-hidden="true" /> ROI &nbsp;{PHONE_ROI.display}</span>
            </div>
          </div>
          <CoverageGlobe />
        </div>
      </section>

      <section id="about" className="about section wrap">
        <div className="about-copy" data-reveal>
          <h6 className="kicker">About LegioPro</h6>
          <h2>Christopher Baggley, Managing Director</h2>
          <p>
            LegioPro Consultancy Ltd is an independent water hygiene consultancy led by Christopher Baggley. Because we don&apos;t
            sell chemicals or water treatment contracts, our advice is impartial: we tell you what your systems actually need,
            document it clearly, and help you keep it that way.
          </p>
          <div className="tag-row">
            {SECTORS.map((s) => <span key={s} className="tag tag-neutral">{s}</span>)}
          </div>
        </div>
      </section>

      <section id="contact" className="contact section wrap">
        <div className="section-head" data-reveal>
          <h6 className="kicker">Get in touch</h6>
          <h2>Request a quote or a callback</h2>
        </div>
        <div className="contact-grid">
          <ContactForm />
          <ContactCard />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
