import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

export function FaqList({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {list.map((f, i) => (
        <AccordionItem key={i} value={`f${i}`} className="border-border">
          <AccordionTrigger className="py-6 text-left font-serif text-xl text-navy hover:no-underline md:text-2xl">{f.q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
