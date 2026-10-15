import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Legal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Prime Travel LTD" },
      { name: "description", content: "How Prime Travel LTD collects and uses your personal information." },
      { property: "og:title", content: "Privacy Policy — Prime Travel LTD" },
      { property: "og:description", content: "How we handle your personal information." },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy Policy" sections={[
      { h: "Information we collect", p: "When you contact us we collect the details you choose to share, such as your name, phone number, email, travel plans and documents needed to provide our services." },
      { h: "How we use it", p: "We use your information only to respond to your enquiry and deliver the services you request. We do not sell your personal data." },
      { h: "Sharing", p: "Information is shared only where needed to provide your service, for example with booking or insurance providers, or as required by law." },
      { h: "WhatsApp", p: "Messages sent via WhatsApp are subject to WhatsApp's own privacy policy." },
      { h: "Your rights", p: "You may ask us to access, correct or delete your personal information by contacting us on WhatsApp." },
    ]} />
  ),
});
