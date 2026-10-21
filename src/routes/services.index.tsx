import { createFileRoute } from "@tanstack/react-router";
import documents from "@/assets/documents.webp";
import { FinalCTA, PageHero } from "@/components/site/Layout";
import { ServiceRows } from "@/components/site/ServiceParts";

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
        <ServiceRows />
      </section>
      <FinalCTA />
    </>
  );
}
