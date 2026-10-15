import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Legal";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Prime Travel LTD" },
      { name: "description", content: "Refund policy for Prime Travel LTD services." },
      { property: "og:title", content: "Refund Policy — Prime Travel LTD" },
      { property: "og:description", content: "When and how refunds apply to our services." },
    ],
  }),
  component: () => (
    <LegalPage title="Refund Policy" sections={[
      { h: "Service fees", p: "Service fees cover our guidance and preparation work. Once work on your file has started, fees are generally non-refundable." },
      { h: "Visa outcomes", p: "Because decisions are made by the relevant authorities, a refused application does not by itself entitle you to a refund of service fees." },
      { h: "Third-party fees", p: "Government, visa centre, airline, hotel and insurance charges are subject to the refund rules of those providers." },
      { h: "Requests", p: "To request a refund, contact us on WhatsApp with your details and we will review your request." },
    ]} />
  ),
});
