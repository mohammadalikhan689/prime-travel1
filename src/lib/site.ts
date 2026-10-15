import schengen from "@/assets/schengen.webp";
import usa from "@/assets/usa.webp";
import canada from "@/assets/canada.webp";
import turkey from "@/assets/turkey.webp";
import morocco from "@/assets/morocco.webp";

export const BRAND = "Prime Travel LTD";
export const WHATSAPP_URL = "https://wa.me/923443151578";
export const WHATSAPP_DISPLAY = "+92 344 3151578";

export const DISCLAIMER =
  "Prime Travel LTD is an independent travel and visa assistance service. We are not a government authority, embassy or consulate. Visa decisions and processing times are determined solely by the relevant authorities, and approval or appointment availability cannot be guaranteed.";

export const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Our Services" },
  { to: "/destinations", label: "Destinations" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  includes: string[];
  icon: string;
};

export const services: Service[] = [
  { slug: "visa-application-assistance", icon: "FileCheck2", title: "Visa Application Assistance", short: "End-to-end guidance through your visa application, from first questions to submission.", intro: "We help you understand the requirements for your chosen destination and guide you step by step as you prepare and submit your application.", includes: ["Review of your travel purpose and visa category", "Explanation of destination requirements", "Step-by-step application guidance", "Pre-submission check of your file"] },
  { slug: "visa-appointment-assistance", icon: "CalendarClock", title: "Visa Appointment Assistance", short: "Support navigating appointment systems and preparing for your visit.", intro: "We help you navigate official appointment booking systems and prepare for the day. Availability is controlled by the relevant authorities and cannot be guaranteed.", includes: ["Guidance on the official booking process", "Help monitoring available slots", "Appointment-day checklist", "What to expect at the visa centre"] },
  { slug: "application-form-completion", icon: "PenLine", title: "Application Form Completion", short: "Careful, accurate completion of official application forms.", intro: "Forms are where small errors cause delays. We help you complete them accurately and consistently with your supporting documents.", includes: ["Form completion based on your information", "Consistency check against documents", "Review before you sign", "Guidance on declarations"] },
  { slug: "cover-letter-preparation", icon: "Mail", title: "Cover Letter Preparation", short: "Clear, well-structured cover letters that explain your trip.", intro: "A good cover letter presents your purpose of travel, itinerary and circumstances clearly. We help you prepare one tailored to your application.", includes: ["Structured drafting from your details", "Clear purpose and itinerary summary", "Tone and formatting review", "Revisions on request"] },
  { slug: "supporting-document-guidance", icon: "FolderOpen", title: "Supporting Document Guidance & Review", short: "Know exactly what to provide, and how to organise it.", intro: "We provide a tailored checklist and review your supporting documents so your file is complete, organised and easy to assess.", includes: ["Personalised document checklist", "Review of financial and employment documents", "Organisation and ordering of your file", "Notes on gaps to address"] },
  { slug: "flight-bookings", icon: "Plane", title: "Flight Bookings", short: "Flight arrangements and itineraries to support your plans.", intro: "We help arrange flight bookings and itineraries suited to your travel dates and application needs.", includes: ["Itinerary planning", "Flight reservation support", "Date changes guidance", "Booking confirmations"] },
  { slug: "hotel-reservations", icon: "BedDouble", title: "Hotel Reservations", short: "Accommodation arranged to match your itinerary.", intro: "We help you arrange hotel reservations aligned with your itinerary and travel dates.", includes: ["Accommodation options", "Reservation support", "Itinerary alignment", "Confirmation documents"] },
  { slug: "travel-insurance", icon: "ShieldCheck", title: "Travel Insurance", short: "Guidance on travel insurance that meets destination requirements.", intro: "Many destinations require specific travel medical cover. We help you find insurance that meets the stated requirements.", includes: ["Requirement review per destination", "Coverage guidance", "Policy arrangement support", "Certificate for your file"] },
  { slug: "business-visa-assistance", icon: "Briefcase", title: "Business Visa Assistance", short: "Support for conferences, meetings and business travel.", intro: "Business travel has its own documentation. We help you prepare invitation letters, company documents and supporting evidence correctly.", includes: ["Business visa category guidance", "Invitation and company letter review", "Supporting evidence checklist", "Application preparation"] },
  { slug: "document-legalisation-apostille", icon: "Stamp", title: "Document Legalisation & Apostille Assistance", short: "Guidance through legalisation and apostille processes.", intro: "We guide you through the steps required to legalise or apostille documents for use abroad, so you know what is needed and in what order.", includes: ["Identification of required process", "Step-by-step guidance", "Document preparation support", "Coordination advice"] },
];

export const destinations = [
  { slug: "schengen", name: "Schengen Area", region: "Europe", image: schengen, blurb: "France, Italy, Spain, Germany, the Netherlands and more Schengen states — one visa type, many destinations." },
  { slug: "usa", name: "United States", region: "North America", image: usa, blurb: "Guidance for visitor and business visa applications, forms and interview preparation." },
  { slug: "canada", name: "Canada", region: "North America", image: canada, blurb: "Support preparing visitor visa applications and supporting documents." },
  { slug: "turkey", name: "Turkey", region: "Europe & Asia", image: turkey, blurb: "Help with Turkish visa applications and travel arrangements." },
  { slug: "morocco", name: "Morocco", region: "North Africa", image: morocco, blurb: "Guidance on Moroccan visa requirements and travel planning." },
];

export const steps = [
  { title: "Submit Your Enquiry", text: "Send us your details through the form or WhatsApp." },
  { title: "Discuss Your Requirements", text: "We talk through your destination, purpose and timeline." },
  { title: "Receive Personalised Guidance", text: "You get clear advice and a checklist tailored to you." },
  { title: "Prepare Your Documents & Next Steps", text: "We help you organise your file and plan what comes next." },
];

export const pillars = [
  { title: "Personal guidance", text: "A real person who understands your plans, not a generic checklist." },
  { title: "Organised documentation", text: "Files prepared in a clear, logical order that is easy to review." },
  { title: "Clear communication", text: "Straightforward explanations and honest expectations at every stage." },
  { title: "Attention to detail", text: "Careful checks for consistency across forms and documents." },
  { title: "Client-focused support", text: "Advice shaped around your circumstances and timeline." },
];

export const faqs = [
  { q: "What does your visa assistance include?", a: "We guide you through requirements, help complete forms, prepare cover letters and review your supporting documents. The scope depends on the service you choose." },
  { q: "Can you guarantee my visa will be approved?", a: "No. Visa decisions are made solely by the relevant authorities. Our role is to help you prepare a clear, complete and well-organised application." },
  { q: "Which documents will I need?", a: "Requirements vary by destination and purpose of travel. After discussing your plans we provide a personalised checklist." },
  { q: "Can you book my visa appointment?", a: "We can guide and support you through official appointment systems. Appointment availability is controlled by the authorities and visa centres and cannot be guaranteed." },
  { q: "How long does processing take?", a: "Processing times are set by the relevant authority and can change. We share the published guidance where available, but cannot control or shorten official timelines." },
  { q: "Do you arrange flights, hotels and insurance?", a: "Yes, we can help with flight bookings, hotel reservations and travel insurance to support your travel plans." },
  { q: "Are you an embassy or government office?", a: "No. Prime Travel LTD is an independent travel and visa assistance service, not affiliated with any government, embassy or consulate." },
  { q: "How do I start a consultation?", a: "Send an enquiry through our contact form or message us on WhatsApp. We'll get back to you to discuss your requirements." },
];
