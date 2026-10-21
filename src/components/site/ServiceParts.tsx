import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { services } from "@/lib/site";

export function ServiceRows() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const spot = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} data-in={seen} className="container-x grid gap-x-12 md:grid-cols-2">
      {services.map((s, i) => (
        <div key={s.slug} className="doc-item" style={{ "--d": `${(i % 2) * 120 + Math.floor(i / 2) * 90}ms` } as CSSProperties}>
          <Link to="/services/$slug" params={{ slug: s.slug }} onMouseMove={spot} className="svc-row spot group relative flex gap-6 px-3 py-10">
            <span className="svc-line" aria-hidden="true" />
            <span className="svc-line-gold" aria-hidden="true" />
            <span aria-hidden="true" className="svc-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
              <ServiceIcon name={s.icon} className="h-7 w-7 transition-transform duration-700 group-hover:rotate-[360deg]" />
            </span>
            <div className="min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
              <h2 className="text-3xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.short}</p>
              <span className="learn mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
