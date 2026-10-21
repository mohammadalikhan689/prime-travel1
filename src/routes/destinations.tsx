import { createFileRoute, Link } from "@tanstack/react-router";
import schengen from "@/assets/schengen.webp";
import { FinalCTA, PageHero, Reveal } from "@/components/site/Layout";
import { destinations } from "@/lib/site";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Prime Travel LTD" },
      { name: "description", content: "Visa guidance for the Schengen Area, United States, Canada, Turkey and Morocco." },
      { property: "og:title", content: "Destinations — Prime Travel LTD" },
      { property: "og:description", content: "Schengen, USA, Canada, Turkey and Morocco visa guidance." },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  return (
    <>
      <PageHero eyebrow="Destinations" title="Destinations we support." text="We currently provide guidance for the following destinations." image={schengen} />
      <section className="py-24 md:py-32">
        <div className="container-x space-y-24">
          {destinations.map((d, i) => (
            <Reveal key={d.slug}>
              <article className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
                </div>
                <div>
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")} — {d.region}</p>
                  <h2 className="mt-4 text-5xl md:text-6xl">{d.name}</h2>
                  <p className="mt-6 max-w-md text-lg text-muted-foreground">{d.blurb}</p>
                  <Link to="/contact" search={{ destination: d.slug }} className="btn btn-ghost-dark mt-10">Enquire about {d.name}</Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
