import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import documents from "@/assets/documents.webp";
import { FinalCTA, PageHero, Reveal, WhatsAppIcon } from "@/components/site/Layout";
import { DISCLAIMER, WHATSAPP_URL, services } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service not found — Prime Travel LTD" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${s.title} — Prime Travel LTD` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.title} — Prime Travel LTD` },
        { property: "og:description", content: s.short },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} text={s.intro} image={documents} />
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">What's included</p>
            <ul className="mt-8">
              {s.includes.map((i) => (
                <li key={i} className="flex gap-4 border-t border-border py-5 text-lg"><Check className="mt-1 h-5 w-5 shrink-0 text-gold" />{i}</li>
              ))}
            </ul>
            <p className="mt-10 border-l-2 border-gold pl-5 text-sm text-muted-foreground">{DISCLAIMER}</p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <div className="bg-navy p-10 text-ivory">
              <h2 className="text-3xl">Discuss your requirements</h2>
              <p className="mt-4 text-ivory/70">Tell us about your plans and we'll explain how we can help.</p>
              <div className="mt-8 flex flex-col gap-3">
                <Link to="/contact" className="btn btn-gold">Get a Free Assessment</Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
              </div>
            </div>
            <p className="eyebrow mt-12">Related services</p>
            <ul className="mt-4">
              {others.map((o) => (
                <li key={o.slug}><Link to="/services/$slug" params={{ slug: o.slug }} className="block border-t border-border py-4 font-serif text-xl hover:text-gold">{o.title}</Link></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
