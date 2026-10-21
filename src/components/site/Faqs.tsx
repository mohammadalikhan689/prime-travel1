import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

export function FaqList({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // soft light that follows the cursor across the row
  const spot = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} data-in={seen} className="faq-wrap relative">
      <span className="faq-top" aria-hidden="true" />
      <Accordion type="single" collapsible>
        {list.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`} onMouseMove={spot} className="faq-item spot group relative border-0" style={{ "--d": `${Math.min(i, 8) * 90}ms` } as CSSProperties}>
            <span className="faq-bar" aria-hidden="true" />
            <AccordionTrigger className="items-center gap-5 py-6 text-left font-serif text-xl text-navy hover:no-underline md:text-2xl [&>svg]:hidden">
              <span className="faq-num w-10 shrink-0 font-sans text-xs tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-q flex-1">{f.q}</span>
              <span className="faq-icon" aria-hidden="true" />
            </AccordionTrigger>
            <AccordionContent className="faq-content pb-7 pl-[3.75rem] pr-14 text-base leading-relaxed text-muted-foreground">
              <p className="faq-ans max-w-2xl">{f.a}</p>
            </AccordionContent>
            <span className="faq-line" aria-hidden="true" />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
