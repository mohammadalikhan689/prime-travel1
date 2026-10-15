import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Legal";
import { DISCLAIMER } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Prime Travel LTD" },
      { name: "description", content: "Terms and conditions for Prime Travel LTD visa and travel assistance services." },
      { property: "og:title", content: "Terms & Conditions — Prime Travel LTD" },
      { property: "og:description", content: "The terms that apply to our services." },
    ],
  }),
  component: () => (
    <LegalPage title="Terms & Conditions" sections={[
      { h: "Our role", p: DISCLAIMER },
      { h: "No guarantees", p: "We do not guarantee visa approval, appointment availability or processing times. These are decided by the relevant authorities." },
      { h: "Your responsibilities", p: "You are responsible for providing accurate, truthful and complete information and documents. Final applications are submitted under your name and responsibility." },
      { h: "Fees", p: "Our service fees are agreed with you before work begins. Government, visa centre and third-party fees are separate and paid to those parties." },
      { h: "Liability", p: "We are not liable for decisions made by authorities, third-party service changes, or losses arising from inaccurate information provided to us." },
    ]} />
  ),
});
