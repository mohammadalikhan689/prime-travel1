import { useState, type FormEvent } from "react";
import { z } from "zod";
import { WHATSAPP_URL, destinations, services } from "@/lib/site";
import { WhatsAppIcon } from "./Layout";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(25).regex(/^[+\d\s()-]+$/, "Digits, spaces and + only"),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  destination: z.string().min(1, "Please choose a destination"),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().max(1000, "Keep it under 1000 characters"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-navy placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-0";

export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = r.data;
    const text = [
      "Hello Prime Travel LTD, I'd like a free assessment.",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email && `Email: ${v.email}`,
      `Destination: ${v.destination}`,
      `Service: ${v.service}`,
      v.message && `Details: ${v.message}`,
    ].filter(Boolean).join("\n");
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  const Err = ({ k }: { k: keyof Errors }) => errors[k] ? <p className="mt-1 text-xs text-destructive" role="alert">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7 sm:grid-cols-2">
      <label className="block"><span className="eyebrow !text-muted-foreground">Full name *</span>
        <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} /><Err k="name" /></label>
      <label className="block"><span className="eyebrow !text-muted-foreground">Phone / WhatsApp *</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} /><Err k="phone" /></label>
      <label className="block sm:col-span-2"><span className="eyebrow !text-muted-foreground">Email (optional)</span>
        <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} /><Err k="email" /></label>
      <label className="block"><span className="eyebrow !text-muted-foreground">Destination *</span>
        <select name="destination" defaultValue="" className={field} aria-invalid={!!errors.destination}>
          <option value="" disabled>Select…</option>
          {destinations.map((d) => <option key={d.slug}>{d.name}</option>)}
          <option>Not sure yet</option>
        </select><Err k="destination" /></label>
      <label className="block"><span className="eyebrow !text-muted-foreground">Service *</span>
        <select name="service" defaultValue="" className={field} aria-invalid={!!errors.service}>
          <option value="" disabled>Select…</option>
          {services.map((s) => <option key={s.slug}>{s.title}</option>)}
        </select><Err k="service" /></label>
      <label className="block sm:col-span-2"><span className="eyebrow !text-muted-foreground">Tell us about your plans</span>
        <textarea name="message" rows={4} className={field} /><Err k="message" /></label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-navy w-full sm:w-auto"><WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp</button>
        <p className="mt-4 text-xs text-muted-foreground">Your enquiry opens in WhatsApp, ready to send to our team. It's only received once you press send there.</p>
        {opened && <p className="mt-3 text-sm text-navy" role="status">WhatsApp has opened with your message — please press send to reach our team.</p>}
      </div>
    </form>
  );
}
