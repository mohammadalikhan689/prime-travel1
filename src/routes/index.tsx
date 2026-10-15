import { createFileRoute, Link } from "@tanstack/react-router";
import documents from "@/assets/documents.webp";
import { FinalCTA, Reveal, SectionHead } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { FaqList } from "@/components/site/Faqs";
import { DestinationMarquee, DestinationPanels, FileReadiness, ScrollTimeline, ServiceBento, StatsStrip } from "@/components/site/Showcase";
import { pillars } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prime Travel LTD — Visa Guidance, Fast-Tracked" },
      { name: "description", content: "Professional visa guidance, organised documentation and dedicated support for Schengen, USA, Canada, Turkey and Morocco." },
      { property: "og:title", content: "Prime Travel LTD — Visa Guidance, Fast-Tracked" },
      { property: "og:description", content: "Expert visa guidance and travel arrangements from an independent consultancy." },
    ],
  }),
  component: Home,
});

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
