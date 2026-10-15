import { createFileRoute } from "@tanstack/react-router";
import canada from "@/assets/canada.webp";
import { PageHero, Reveal, WhatsAppIcon } from "@/components/site/Layout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { DISCLAIMER, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Prime Travel LTD" },
      { name: "description", content: "Request a free assessment or chat with Prime Travel LTD on WhatsApp." },
      { property: "og:title", content: "Contact — Prime Travel LTD" },
      { property: "og:description", content: "Tell us about your travel plans and get a free assessment." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get a free assessment." text="Share a few details and our team will guide you on the next steps." image={canada} />
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Speak to us</p>
            <h2 className="mt-4 text-4xl">The quickest way is WhatsApp.</h2>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-8"><WhatsAppIcon className="h-4 w-4" /> {WHATSAPP_DISPLAY}</a>
            <p className="mt-10 text-sm text-muted-foreground">{DISCLAIMER}</p>
          </Reveal>
          <Reveal className="bg-card p-8 md:p-12 lg:col-span-8" delay={120}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
