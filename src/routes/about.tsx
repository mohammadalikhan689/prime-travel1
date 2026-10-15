import { createFileRoute } from "@tanstack/react-router";
import documents from "@/assets/documents.webp";
import turkey from "@/assets/turkey.webp";
import { FinalCTA, PageHero, Reveal, SectionHead } from "@/components/site/Layout";
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

function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Thoughtful guidance for every journey." image={turkey} />
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="font-serif text-3xl leading-snug md:text-4xl">
              Prime Travel LTD helps travellers prepare visa applications and travel arrangements with clarity and care.
            </p>
            <p className="mt-8 text-muted-foreground">
              We believe a visa application should feel organised, not overwhelming. We take time to understand your plans, explain what's required, and help you prepare a file that's complete and easy to review.
            </p>
            <p className="mt-6 border-l-2 border-gold pl-5 text-sm text-muted-foreground">{DISCLAIMER}</p>
          </Reveal>
          <Reveal delay={120}>
            <img src={documents} alt="Organised travel documents" loading="lazy" width={1280} height={1024} className="aspect-[5/4] w-full object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="bg-card py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Our approach" title="What you can expect." />
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="bg-card p-8">
                <span className="hairline block" />
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
