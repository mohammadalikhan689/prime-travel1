import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import documents from "@/assets/documents.webp";
import turkey from "@/assets/turkey.webp";
import { FinalCTA, PageHero, Reveal, SectionHead } from "@/components/site/Layout";
import { ParallaxFrame, ScrollWords } from "@/components/site/AboutParts";
import { BentoCard, DestinationPanels } from "@/components/site/Showcase";
import { DISCLAIMER, pillars } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Prime Travel LTD" },
      { name: "description", content: "Prime Travel LTD is an independent travel and visa assistance service focused on personal, organised guidance." },
      { property: "og:title", content: "About Us — Prime Travel LTD" },
      { property: "og:description", content: "An independent consultancy for visa guidance and travel arrangements." },
    ],
  }),
  component: About,
});

const spans = ["md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Thoughtful guidance for every journey." image={turkey} />

      {/* Statement that lights up word by word as you scroll */}
      <section className="py-28 md:py-40">
        <div className="container-x max-w-5xl">
          <p className="eyebrow">Our belief</p>
          <ScrollWords
            className="mt-8 font-serif text-3xl leading-[1.25] md:text-6xl"
            text="We believe a visa application should feel organised, not overwhelming. We take time to understand your plans, explain what's required, and help you prepare a file that's complete and easy to review."
          />
          <Reveal>
            <p className="mt-12 max-w-2xl border-l-2 border-gold pl-5 text-sm text-muted-foreground">{DISCLAIMER}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-card py-24 md:py-32">
        <div className="container-x grid items-center gap-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <p className="mt-5 font-serif text-3xl leading-snug md:text-4xl">
              Prime Travel LTD helps travellers prepare visa applications and travel arrangements with clarity and care.
            </p>
            <p className="mt-8 max-w-md text-muted-foreground">From your first question to a well-prepared file, we support each part of the process.</p>
            <Link to="/contact" className="btn btn-gold mt-10 inline-flex">Talk to our team <ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
          <ParallaxFrame src={documents} alt="Organised travel documents" />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Our approach" title="What you can expect." />
          <div className="mt-14 grid gap-4 md:grid-cols-6">
            {pillars.map((p, i) => (
              <BentoCard key={p.title} i={i} className={spans[i] ?? "md:col-span-2"}>
                <div className="spot group flex h-full flex-col border border-border bg-card p-8 transition-colors duration-500 hover:border-gold">
                  <span className="font-serif text-5xl text-gold/50 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative bg-navy-deep py-24 text-ivory md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Where we guide" title="Five regions, one organised approach." />
          <DestinationPanels />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
