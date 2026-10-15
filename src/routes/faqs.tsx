import { createFileRoute } from "@tanstack/react-router";
import morocco from "@/assets/morocco.webp";
import { FinalCTA, PageHero } from "@/components/site/Layout";
import { FaqList } from "@/components/site/Faqs";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Prime Travel LTD" },
      { name: "description", content: "Answers about visa assistance, documents, appointments, processing times and travel arrangements." },
      { property: "og:title", content: "FAQs — Prime Travel LTD" },
      { property: "og:description", content: "Common questions about our visa and travel assistance." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions." text="Visa decisions and processing times are determined by the relevant authorities." image={morocco} />
      <section className="py-24 md:py-32"><div className="container-x max-w-4xl"><FaqList /></div></section>
      <FinalCTA />
    </>
  ),
});
