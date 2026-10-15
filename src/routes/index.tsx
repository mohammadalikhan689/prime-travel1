import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.webp";
import documents from "@/assets/documents.webp";
import { FinalCTA, Reveal, SectionHead, WhatsAppIcon } from "@/components/site/Layout";
import { FaqList } from "@/components/site/Faqs";
import { DestinationMarquee, DestinationPanels, FileReadiness, HeroFileCard, ScrollTimeline, ServiceBento, StatsStrip } from "@/components/site/Showcase";
import { WHATSAPP_URL, pillars } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prime Travel LTD — Visa Guidance, Fast-Tracked" },
      { name: "description", content: "Professional visa guidance, organised documentation and dedicated support for Schengen, USA, Canada, Turkey and Morocco." },
      { property: "og:title", content: "Prime Travel LTD — Visa Guidance, Fast-Tracked" },
      { property: "og:description", content: "Expert visa guidance and travel arrangements from an independent consultancy." },
    ],
    links: [{ rel: "preload", as: "image", href: hero, type: "image/webp" }],
  }),
  component: Home,
});

function Hero() {
  const img = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (img.current) img.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-ivory">
      <div ref={img} className="absolute inset-0 will-change-transform">
        <img src={hero} alt="Paris rooftops at dusk with the Eiffel Tower" width={1920} height={1088} fetchPriority="high" className="animate-hero-zoom h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/60 to-navy/30" />
      <div className="container-x relative pb-20 pt-40 md:pb-28">
        <p className="eyebrow animate-rise" style={{ animationDelay: "300ms" }}>Visa & Travel Consultancy</p>
        <h1 className="animate-rise mt-6 max-w-5xl text-5xl leading-[1.02] sm:text-6xl md:text-8xl" style={{ animationDelay: "450ms" }}>
          Your Visa Journey, <em className="text-gold-soft">Fast-Tracked</em> With Expert Guidance.
        </h1>
        <p className="animate-rise mt-8 max-w-xl text-lg text-ivory/80" style={{ animationDelay: "650ms" }}>
          Professional visa guidance, organised documentation, and dedicated support to help you move forward with confidence.
        </p>
        <div className="animate-rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "850ms" }}>
          <Link to="/contact" className="btn btn-gold">Get a Free Assessment <ArrowRight className="h-4 w-4" /></Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
        </div>
      </div>
      <HeroFileCard />
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <StatsStrip />
      <DestinationMarquee />

      <section className="py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead eyebrow="Our Services" title="Every detail, carefully considered." text="From your first question to a well-prepared file, we support each part of the process." />
            <Reveal><Link to="/services" className="btn btn-ghost-dark">All services</Link></Reveal>
          </div>
          <ServiceBento />
        </div>
      </section>

      <section className="bg-navy py-28 text-ivory md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Destinations</p>
              <h2 className="mt-4 text-4xl md:text-6xl">Where we can help you go.</h2>
            </Reveal>
            <Reveal><Link to="/destinations" className="btn btn-ghost-light">View destinations</Link></Reveal>
          </div>
          <DestinationPanels />
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead eyebrow="How It Works" title="A clear path, from enquiry to next steps." text="Scroll — your progress lights the way." />
            </div>
          </div>
          <div className="lg:col-span-7"><ScrollTimeline /></div>
        </div>
      </section>

      <section className="grain relative bg-navy-deep py-28 text-ivory md:py-36">
        <div className="container-x">
          <SectionHead eyebrow="Know Where You Stand" title="How ready is your file?" />
          <FileReadiness />
        </div>
      </section>

      {/* Why */}
      <section className="bg-card py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <img src={documents} alt="Passport and neatly organised travel documents" loading="lazy" width={1280} height={1024} className="aspect-[5/4] w-full object-cover" />
          </Reveal>
          <div>
            <SectionHead eyebrow="Why Prime Travel LTD" title="Guidance that feels personal." />
            <ul className="mt-12">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <li className="grid grid-cols-[3rem_minmax(0,1fr)] border-t border-border py-5">
                    <span className="hairline mt-3" />
                    <div><h3 className="text-xl">{p.title}</h3><p className="mt-1 text-sm text-muted-foreground">{p.text}</p></div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQs" title="Questions, answered." text="Visa decisions and processing times are always set by the relevant authorities." />
            <Reveal><Link to="/faqs" className="link-underline mt-8 inline-block pb-1 text-sm font-semibold">See all FAQs</Link></Reveal>
          </div>
          <div className="lg:col-span-8"><FaqList limit={6} /></div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
