import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import documents from "@/assets/documents.webp";
import { FinalCTA, PageHero, Reveal } from "@/components/site/Layout";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Our Services — Prime Travel LTD" },
      { name: "description", content: "Visa application and appointment assistance, forms, cover letters, documents, flights, hotels, insurance and apostille guidance." },
      { property: "og:title", content: "Our Services — Prime Travel LTD" },
      { property: "og:description", content: "Visa assistance and travel arrangements, handled with care." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Visa and travel support, end to end." text="Choose the help you need — from a single document review to complete application guidance." image={documents} />
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-x-12 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 100}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex gap-6 border-t border-border py-10">
                <ServiceIcon name={s.icon} className="h-8 w-8 shrink-0 text-gold" />
                <div className="min-w-0">
                  <h2 className="text-3xl">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
