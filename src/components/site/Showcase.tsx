import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/Layout";
import { ServiceArt } from "@/components/site/ServiceArt";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { destinations, services, steps } from "@/lib/site";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* 1 — Count-up trust strip (only facts we can stand behind) */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - t0) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

export function StatsStrip() {
  const stats = [
    { n: services.length, l: "Specialist services", s: "from first question to file" },
    { n: destinations.length, l: "Destination regions", s: "Schengen to Morocco" },
    { n: steps.length, l: "Clear steps", s: "enquiry to next steps" },
    { n: 0, l: "Approvals promised", s: "only honest guidance" },
  ];
  return (
    <section className="grain relative bg-navy-deep text-ivory">
      <div className="container-x grid grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((x, i) => (
          <Reveal key={x.l} delay={i * 90} className="py-12 md:px-8">
            <p className="font-serif text-6xl text-gold-soft md:text-7xl"><CountUp to={x.n} /></p>
            <p className="eyebrow mt-3 !text-ivory">{x.l}</p>
            <p className="mt-1 text-xs text-ivory/55">{x.s}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function DestinationMarquee() {
  const items = [...destinations.map((d) => d.name), "Visa Guidance", "Documentation", "Appointments"];
  return (
    <div className="marquee overflow-hidden bg-gold py-5 text-navy-deep shadow-[0_20px_50px_-20px_rgba(0,0,0,.45)]" aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: "32s" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((t) => (
              <span key={t + k} className="flex items-center">
                <span className="px-8 font-serif text-3xl font-semibold italic md:text-5xl">{t}</span>
                <span className="h-2.5 w-2.5 rotate-45 bg-navy-deep" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2 — Bento grid with cursor spotlight */
const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

export function ServiceBento() {
  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="mt-16 grid gap-4 md:grid-cols-6">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 3) * 80} className={spans[i]}>
          <Link to="/services/$slug" params={{ slug: s.slug }} onMouseMove={move}
            className="spot group flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--navy)_45%,transparent)]">
            <div className="relative">
              <ServiceArt slug={s.slug} className="h-44" />
              <span className="absolute left-5 top-4 font-serif text-2xl text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
              <ServiceIcon name={s.icon} className="absolute right-5 top-4 h-6 w-6 text-ivory/70" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
              <ul className="mt-4 flex flex-wrap gap-2 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-40 md:group-hover:opacity-100">
                {s.includes.slice(0, 3).map((x) => (
                  <li key={x} className="border border-gold/40 px-2.5 py-1 text-[0.68rem] text-navy/80">{x}</li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* 3 — Expanding image panels */
export function DestinationPanels() {
  const [a, setA] = useState(0);
  return (
    <div className="mt-16 flex flex-col gap-3 md:h-[36rem] md:flex-row">
      {destinations.map((d, i) => {
        const on = a === i;
        return (
          <div key={d.slug} tabIndex={0} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}
            style={vars({ "--g": on ? 5 : 1 })} aria-label={d.name}
            className="panel group relative h-64 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-gold md:h-auto">
            <img src={d.image} alt={d.name} loading="eager" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.2s] ${on ? "scale-105 grayscale-0" : "scale-100 md:grayscale"}`} />
            <div className={`absolute inset-0 transition-opacity duration-700 ${on ? "bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" : "bg-navy-deep/55"}`} />
            <span className="absolute left-5 top-5 font-serif text-lg text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
            <span className={`hidden ${on ? "" : "md:block"} absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-2xl text-ivory [writing-mode:vertical-rl] rotate-180`}>{d.name}</span>
            <div className={`absolute inset-x-0 bottom-0 p-6 md:p-8 ${on ? "" : "md:hidden"}`}>
              <p className="eyebrow">{d.region}</p>
              <h3 className="mt-2 text-3xl md:text-5xl">{d.name}</h3>
              <p className="mt-3 max-w-md text-sm text-ivory/80">{d.blurb}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Enquire <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* 4 — Scroll-driven timeline */
export function ScrollTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setP(Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <ol ref={ref} className="relative mt-4 space-y-16 pl-14 md:pl-20">
      <span className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-border md:left-[1.65rem]" />
      <span className="absolute left-[1.15rem] top-0 w-px bg-gold md:left-[1.65rem]" style={{ height: `${p * 100}%` }} />
      {steps.map((s, i) => {
        const done = p > (i + 0.35) / steps.length;
        return (
          <li key={s.title} className="relative">
            <span className={`absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full border font-serif text-lg transition-all duration-500 md:-left-20 md:h-14 md:w-14 md:text-2xl ${done ? "scale-105 border-gold bg-gold text-navy-deep" : "border-border bg-background text-muted-foreground"}`}
              style={done ? { animation: "pulse-ring 1.6s ease-out 1" } : undefined}>{done ? <Check className="h-5 w-5" /> : i + 1}</span>
            <h3 className={`text-3xl transition-opacity duration-500 md:text-4xl ${done ? "opacity-100" : "opacity-40"}`}>{s.title}</h3>
            <p className={`mt-2 max-w-md text-muted-foreground transition-opacity duration-500 ${done ? "opacity-100" : "opacity-40"}`}>{s.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

/* 5 — Interactive file-readiness ring */
const docs = [
  ["Valid passport", "Usually 6+ months validity"],
  ["Passport photographs", "To the destination's spec"],
  ["Completed application form", "Consistent with your documents"],
  ["Cover letter", "Purpose and itinerary"],
  ["Bank statements", "Recent, with a clear history"],
  ["Employment / business proof", "Letter, NOC or registration"],
  ["Flight & hotel reservations", "Aligned with your dates"],
  ["Travel insurance", "Where the destination requires it"],
];

export function FileReadiness() {
  const [on, setOn] = useState<Set<number>>(new Set());
  const pct = on.size / docs.length;
  const C = 2 * Math.PI * 88;
  const toggle = (i: number) => setOn((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const msg = pct === 0 ? "Tick what you already have." : pct < 0.5 ? "A start — we'll map the gaps." : pct < 1 ? "Well on your way." : "A complete-looking file. Let's review it together.";
  return (
    <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="relative mx-auto grid aspect-square max-w-sm place-items-center">
          <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} className="ring-arc" />
          </svg>
          <div className="text-center" aria-live="polite">
            <p className="font-serif text-7xl text-gold-soft">{Math.round(pct * 100)}<span className="text-3xl">%</span></p>
            <p className="eyebrow mt-2 !text-ivory">File readiness</p>
            <p className="mx-auto mt-3 max-w-[12rem] text-xs text-ivory/60">{msg}</p>
          </div>
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-7">
        {docs.map(([t, n], i) => (
          <li key={t}>
            <button type="button" aria-pressed={on.has(i)} onClick={() => toggle(i)}
              className={`flex w-full items-start gap-4 border p-4 text-left transition-all duration-300 ${on.has(i) ? "border-gold bg-gold/10" : "border-ivory/15 hover:border-ivory/40"}`}>
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors ${on.has(i) ? "border-gold bg-gold text-navy-deep" : "border-ivory/40"}`}>{on.has(i) && <Check className="h-3.5 w-3.5" />}</span>
              <span><span className="block text-sm font-semibold">{t}</span><span className="block text-xs text-ivory/55">{n}</span></span>
            </button>
          </li>
        ))}
        <li className="sm:col-span-2"><p className="pt-2 text-xs text-ivory/45">Illustrative only. Requirements differ by destination and purpose; we provide a personalised checklist.</p></li>
      </ul>
    </div>
  );
}

/* Hero floating "sample file" glass card */
export function HeroFileCard() {
  const rows = [["Passport & photos", true], ["Application form", true], ["Cover letter", true], ["Appointment guidance", false]] as const;
  return (
    <div className="glass animate-rise absolute bottom-28 right-10 hidden w-72 p-6 lg:block" style={{ animationDelay: "1.1s" }}>
      <div style={{ animation: "float-y 6s ease-in-out infinite" }}>
        <p className="eyebrow">Sample file · Schengen</p>
        <ul className="mt-5 space-y-3">
          {rows.map(([t, d]) => (
            <li key={t} className="flex items-center gap-3 text-sm text-ivory/90">
              <span className={`grid h-5 w-5 place-items-center rounded-full ${d ? "bg-gold text-navy-deep" : "border border-gold"}`}>{d ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />}</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
