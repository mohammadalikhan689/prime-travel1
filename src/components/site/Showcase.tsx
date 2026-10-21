import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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

// One service card: staggered 3D entrance when scrolled into view, cursor tilt, spotlight and spinning gold border.
export function BentoCard({ i, className, children }: { i: number; className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(y / r.height - 0.5) * -8}deg`);
  };
  const leave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    <div ref={ref} data-in={seen} className={`bento-card ${className}`} style={{ "--d": `${(i % 3) * 110}ms` } as CSSProperties} onMouseMove={move} onMouseLeave={leave}>
      <div className="bento-tilt h-full">{children}</div>
    </div>
  );
}

export function ServiceBento() {
  return (
    <div className="mt-16 grid gap-4 md:grid-cols-6">
      {services.map((s, i) => (
        <BentoCard key={s.slug} i={i} className={spans[i]!}>
          <Link to="/services/$slug" params={{ slug: s.slug }}
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
              <span className="learn mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </div>
          </Link>
        </BentoCard>
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
              <Link to="/contact" search={{ destination: d.slug }} className="mt-5 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Enquire <ArrowUpRight className="h-4 w-4" /></Link>
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
  const doneCount = steps.filter((_, i) => p > (i + 0.35) / steps.length).length;
  const active = doneCount - 1; // the step currently being reached
  return (
    <ol ref={ref} className="relative mt-4 space-y-20 pl-14 md:pl-20">
      <span className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-border md:left-[1.65rem]" />
      <span className="absolute left-[1.15rem] top-0 w-px bg-gold shadow-[0_0_14px_var(--gold)] md:left-[1.65rem]" style={{ height: `${p * 100}%` }} />
      {/* glowing marker that travels down the line with your scroll */}
      <span aria-hidden="true" className="absolute left-[1.15rem] z-10 md:left-[1.65rem]" style={{ top: `${p * 100}%`, opacity: p > 0.01 && p < 0.995 ? 1 : 0, transition: "opacity .4s" }}>
        <span className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_18px_4px_var(--gold)]" />
        <span className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 animate-ping rounded-full bg-gold/60" />
      </span>
      {steps.map((s, i) => {
        const done = i < doneCount;
        const on = i === active;
        return (
          <li key={s.title} className="relative isolate">
            {/* highlight panel + ghost numeral for the current step */}
            <span aria-hidden="true" className={`absolute -inset-x-6 -inset-y-6 -z-10 border border-gold/25 bg-gradient-to-r from-gold/10 via-gold/[.04] to-transparent transition-all duration-700 ease-out ${on ? "scale-100 opacity-100" : "scale-95 opacity-0"}`} />
            <span aria-hidden="true" className="pointer-events-none absolute -top-8 right-0 -z-10 select-none font-serif text-[8rem] leading-none text-transparent transition-all duration-1000 ease-out md:text-[10rem]"
              style={{ WebkitTextStroke: "1px color-mix(in oklab, var(--gold) 38%, transparent)", opacity: on ? 1 : done ? 0.35 : 0.12, transform: on ? "translateX(0)" : "translateX(28px)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full border font-serif text-lg transition-all duration-500 md:-left-20 md:h-14 md:w-14 md:text-2xl ${done ? "scale-105 border-gold bg-gold text-navy" : "border-border bg-background text-muted-foreground"}`}
              style={done ? { animation: "pulse-ring 1.6s ease-out 1" } : undefined}>
              {/* ring that draws itself around the number */}
              <svg viewBox="0 0 56 56" aria-hidden="true" className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] -rotate-90">
                <circle cx="28" cy="28" r="26.5" fill="none" stroke="var(--gold)" strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={done ? 0 : 1} style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.3,.6,.2,1)" }} />
              </svg>
              {done ? <Check className="relative h-5 w-5" style={{ animation: "tick-pop .55s .3s both" }} /> : <span className="relative">{i + 1}</span>}
            </span>
            <h3 className={`wipe inline-block text-3xl md:text-4xl ${done ? "on" : ""}`}>{s.title}</h3>
            <p className="mt-2 max-w-md text-muted-foreground transition-all duration-700 ease-out" style={{ opacity: done ? 1 : 0.35, transform: done ? "none" : "translateY(10px)", transitionDelay: done ? ".25s" : "0s" }}>{s.text}</p>
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
  const [seen, setSeen] = useState(false);
  const [shown, setShown] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const shownRef = useRef(0);
  const n = docs.length;
  const pct = on.size / n;
  const full = on.size === n;
  const seg = 100 / n - 2; // arc length (pathLength = 100) with a small gap
  const toggle = (i: number) => setOn((s) => { const x = new Set(s); if (x.has(i)) x.delete(i); else x.add(i); return x; });
  const spot = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const msg = pct === 0 ? "Tick what you already have." : pct < 0.5 ? "A start — we'll map the gaps." : pct < 1 ? "Well on your way." : "A complete-looking file. Let's review it together.";

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // count the percentage up/down smoothly
  useEffect(() => {
    const from = shownRef.current;
    const to = Math.round(pct * 100);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 700);
      const v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      shownRef.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  return (
    <div ref={root} className="mt-16 grid items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="relative mx-auto grid aspect-square max-w-sm place-items-center">
          {/* segmented ring: one arc per document, lights up as you tick */}
          <div className="absolute inset-0" style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "scale(.82) rotate(-50deg)", transition: "opacity 1s ease, transform 1.4s cubic-bezier(.2,.7,.2,1)" }}>
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
              <g style={{ transformOrigin: "100px 100px", animation: `orbit ${full ? 7 : 26}s linear infinite` }}>
                <circle cx="100" cy="100" r="96" fill="none" stroke="var(--ivory)" strokeOpacity=".16" strokeWidth="1" strokeDasharray="1.5 5" />
                <circle cx="100" cy="4" r="2.6" fill="var(--gold)" style={{ filter: "drop-shadow(0 0 4px var(--gold))" }} />
              </g>
              {docs.map((_, i) => (
                <g key={i} transform={`rotate(${(i * 360) / n + 1} 100 100)`}>
                  <circle cx="100" cy="100" r="86" fill="none" stroke="var(--ivory)" strokeOpacity=".14" strokeWidth="4.5" pathLength="100" strokeDasharray={`${seg} ${100 - seg}`} />
                  <circle cx="100" cy="100" r="86" fill="none" stroke="var(--gold)" strokeWidth="4.5" pathLength="100"
                    strokeDasharray={on.has(i) ? `${seg} ${100 - seg}` : `0 100`}
                    style={{ transition: "stroke-dasharray .8s cubic-bezier(.3,.6,.2,1)", filter: on.has(i) ? "drop-shadow(0 0 5px var(--gold))" : "none" }} />
                </g>
              ))}
            </svg>
          </div>
          {full && Array.from({ length: 16 }, (_, i) => (
            <span key={i} aria-hidden="true" className="spark" style={{ "--a": `${i * 22.5}deg`, "--dist": `${135 + (i % 3) * 20}px` } as CSSProperties} />
          ))}
          <div className="relative text-center" aria-live="polite">
            <p className={`font-serif text-7xl text-gold-soft transition-transform duration-500 ${full ? "scale-110" : ""}`}>{shown}<span className="text-3xl">%</span></p>
            <p className="eyebrow mt-2 !text-ivory">File readiness</p>
            <p key={msg} className="animate-rise mx-auto mt-3 max-w-[12rem] text-xs text-ivory/60">{msg}</p>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft/80">{on.size} of {n} ready</p>
          </div>
        </div>
        <div className="mt-8 flex min-h-[3rem] items-center justify-center gap-5">
          {on.size > 0 && (
            <>
              <Link key={full ? "f" : "p"} to="/contact" className="btn btn-gold animate-rise">{full ? "Get my file reviewed" : "Get my personalised checklist"} <ArrowRight className="h-4 w-4" /></Link>
              <button type="button" onClick={() => setOn(new Set())} className="text-xs uppercase tracking-[0.18em] text-ivory/50 transition-colors hover:text-ivory">Reset</button>
            </>
          )}
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-7">
        {docs.map(([t, d], i) => {
          const c = on.has(i);
          return (
            <li key={t} data-in={seen} className="doc-item" style={{ "--d": `${i * 70}ms` } as CSSProperties}>
              <button type="button" aria-pressed={c} onClick={() => toggle(i)} onMouseMove={spot}
                className={`doc-card spot flex w-full items-start gap-4 border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${c ? "is-on border-gold" : "border-ivory/15 hover:border-ivory/40"}`}>
                <span className={`relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-all duration-300 ${c ? "scale-110 border-gold bg-gold" : "border-ivory/40"}`}>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-navy-deep" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6.5" pathLength="1" strokeDasharray="1" strokeDashoffset={c ? 0 : 1} style={{ transition: "stroke-dashoffset .45s ease .1s" }} />
                  </svg>
                </span>
                <span>
                  <span className={`block text-sm font-semibold transition-colors duration-300 ${c ? "text-gold-soft" : ""}`}>{t}</span>
                  <span className="block text-xs text-ivory/55">{d}</span>
                </span>
              </button>
            </li>
          );
        })}
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
