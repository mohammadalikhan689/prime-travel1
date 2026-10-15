import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/Layout";
import { Flag } from "@/components/site/Flags";
import { WHATSAPP_URL, destinations } from "@/lib/site";

const AUTOPLAY_MS = 1500;

// Look of each flag in the bottom row by distance from the active one (0 = centre).
const ROW = [
  { x: 0, scale: 1, opacity: 0.75, sat: 1 },
  { x: 0.9, scale: 0.6, opacity: 0.38, sat: 0.7 },
  { x: 1.5, scale: 0.4, opacity: 0.28, sat: 0.65 },
] as const;

const short: Record<string, string> = { schengen: "Schengen", usa: "USA", canada: "Canada", turkey: "Turkey", morocco: "Morocco" };

// Last item in each list shows as "in progress" (pulsing ring); the rest as done.
const checklists: Record<string, string[]> = {
  schengen: ["Passport & photos", "Application form", "Cover letter", "Appointment guidance"],
  usa: ["Passport & photo", "Form guidance", "Financial documents", "Interview preparation"],
  canada: ["Passport & photos", "Purpose-of-travel letter", "Financial documents", "Biometrics guidance"],
  turkey: ["Passport validity check", "Flight & hotel itinerary", "Travel insurance", "Online application guidance"],
  morocco: ["Passport & photos", "Entry requirements check", "Accommodation booking", "Itinerary review"],
};

const headline = ["Your", "Visa", "Journey,", "*Fast-Tracked*", "With", "Expert", "Guidance."];


function Stamp({ label, code, className }: { label: string; code: string; className?: string }) {
  const id = `stamp-${code}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs><path id={id} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="87" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
      <text fontSize="14" fontWeight="700" fill="currentColor"><textPath href={`#${id}`} textLength="446" lengthAdjust="spacing">{label}</textPath></text>
      <text x="100" y="112" textAnchor="middle" fontSize="40" fontWeight="700" fill="currentColor" style={{ fontFamily: "var(--font-serif)" }}>{code}</text>
      <text x="100" y="134" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="5" fill="currentColor">VISA</text>
    </svg>
  );
}

// Line-art plane, flight trail and visa stamps. Gold on navy at low opacity, masked at the edges so it reads as part of the theme.
function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 text-gold"
      style={{
        transform: "translate3d(calc(var(--px) * 12px), calc(var(--py) * 8px), 0)",
        transition: "transform .5s ease-out",
        maskImage: "radial-gradient(ellipse 85% 80% at 62% 42%, black 25%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 62% 42%, black 25%, transparent 78%)",
      }}
    >
      <Stamp label="UNITED KINGDOM • VISA GUIDANCE • " code="UK" className="absolute right-[8%] top-[14%] w-28 rotate-[14deg] opacity-[.16] sm:w-36 lg:left-[44%] lg:right-auto lg:top-[9%] lg:-rotate-[12deg] lg:opacity-[.14]" />
      <Stamp label="UNITED STATES • VISA GUIDANCE • " code="USA" className="absolute bottom-[26%] right-[3%] hidden w-44 rotate-[10deg] opacity-[.12] lg:block" />
    </div>
  );
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true); // assume reduced until checked, so no autoplay during server render
  const n = destinations.length;
  const half = Math.floor(n / 2);
  const prevOff = useRef<number[]>([]);
  const d = destinations[idx]!;
  const items = checklists[d.slug] ?? checklists.schengen!;

  useEffect(() => {
    prevOff.current = destinations.map((_, i) => ((i - idx + n + half) % n) - half);
  }, [idx, n, half]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Cursor effects write CSS variables directly: no React re-render on mouse move.
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = section.current;
    if (reduced || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--px", String((x - 0.5) * 2));
    el.style.setProperty("--py", String((y - 0.5) * 2));
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  return (
    <section
      ref={section}
      onMouseMove={onMove}
      style={{ "--px": 0, "--py": 0, "--flag-w": "clamp(18rem, 32vw, 38rem)", "--flag-vis": "calc(var(--flag-w) * 0.5)" } as CSSProperties}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-deep text-ivory"
    >
      {/* Atmosphere: grid, cursor glow, grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(color-mix(in oklab, var(--ivory) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--ivory) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "radial-gradient(ellipse at 70% 45%, black 10%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 45%, black 10%, transparent 72%)",
        }}
      />
      <HeroBackdrop />
      <div className="absolute inset-0" style={{ background: "radial-gradient(760px circle at var(--mx, 72%) var(--my, 38%), color-mix(in oklab, var(--gold) 22%, transparent), transparent 62%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(900px circle at 0% 100%, color-mix(in oklab, var(--navy) 90%, transparent), transparent 70%)" }} />
      <div className="grain absolute inset-0" />

      {/* Flag row: all five flags, the active one centred, large and bright */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: "var(--flag-vis)", perspective: "1100px" }}>
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg) rotateY(calc(var(--px) * -5deg))", transition: "transform .5s ease-out" }}>
          {destinations.map((x, i) => {
            const o = ((i - idx + n + half) % n) - half;
            const abs = Math.min(Math.abs(o), ROW.length - 1);
            const look = ROW[abs]!;
            const prev = prevOff.current[i];
            const jumped = prev !== undefined && Math.abs(o - prev) > 2;
            return (
              <button
                key={x.slug}
                type="button"
                tabIndex={-1}
                aria-label={`Show ${x.name}`}
                onClick={() => setIdx(i)}
                className="pointer-events-auto absolute left-1/2 top-0 aspect-[3/2]"
                style={{
                  width: "var(--flag-w)",
                  marginLeft: "calc(var(--flag-w) / -2)",
                  opacity: look.opacity,
                  filter: `saturate(${look.sat}) brightness(.95)`,
                  zIndex: 10 - abs,
                  transform: `translate3d(calc(var(--flag-w) * ${(Math.sign(o) * look.x).toFixed(2)}), 0, ${-abs * 90}px) scale(${look.scale})`,
                  transition: jumped ? "opacity 1s ease" : "transform 1.1s cubic-bezier(.2,.7,.2,1), opacity 1s ease, filter 1s ease",
                  maskImage: "radial-gradient(ellipse closest-side, black 55%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse closest-side, black 55%, transparent 100%)",
                }}
              >
                <Flag slug={x.slug} className="h-full w-full" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-x relative z-10 grid items-center gap-24 pt-36 lg:grid-cols-12 lg:gap-12" style={{ paddingBottom: "calc(var(--flag-vis) + 3.5rem)" }}>
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise" style={{ animationDelay: "200ms" }}>Visa & Travel Consultancy</p>
          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl xl:text-7xl">
            {headline.map((w, i) => {
              const em = w.startsWith("*");
              const text = em ? w.slice(1, -1) : w;
              return (
                <span key={w}>
                  <span className="hero-word">
                    <span style={{ animationDelay: `${350 + i * 90}ms` }}>{em ? <em className="text-gold-soft">{text}</em> : text}</span>
                  </span>{" "}
                </span>
              );
            })}
          </h1>

          <p key={d.slug} className="animate-rise mt-10 min-h-[5.5rem] max-w-xl text-lg text-ivory/80 md:min-h-[4.5rem]">
            <span className="mr-2 font-semibold text-gold-soft">{d.name}.</span>
            {d.blurb}
          </p>

          <div className="animate-rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: "900ms" }}>
            <Link to="/contact" className="btn btn-gold">Get a Free Assessment <ArrowRight className="h-4 w-4" /></Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>

          {/* Destination selector with autoplay progress */}
          <div
            role="tablist"
            aria-label="Choose a destination"
            className="animate-rise mt-14 grid max-w-xl grid-cols-5 gap-3 sm:gap-4"
            style={{ animationDelay: "600ms" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {destinations.map((x, i) => {
              const active = i === idx;
              return (
                <button key={x.slug} type="button" role="tab" aria-selected={active} onClick={() => setIdx(i)} className="group text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  <span className="relative block h-[2px] overflow-hidden bg-ivory/20">
                    <span
                      className="absolute inset-0 origin-left bg-gold"
                      style={{
                        transform: i < idx || (active && reduced) ? "scaleX(1)" : "scaleX(0)",
                        ...(active && !reduced ? { animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? "paused" : "running" } : {}),
                      }}
                      onAnimationEnd={active && !reduced ? () => setIdx((c) => (c + 1) % n) : undefined}
                    />
                  </span>
                  <span className="sr-only">{x.name}</span>
                  <span className={`mt-5 block origin-left transition-all duration-500 ease-out ${active ? "scale-[1.45] opacity-100" : "scale-100 opacity-55 saturate-[.6] group-hover:opacity-90 group-hover:saturate-100"}`}>
                    <Flag slug={x.slug} className="aspect-[3/2] w-9 rounded-[2px] shadow-[0_6px_18px_-6px_rgba(0,0,0,.7)] ring-1 ring-ivory/25 sm:w-11" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card stack */}
        <div className="animate-rise relative mx-auto pb-10 lg:col-span-5" style={{ animationDelay: "150ms" }}>
          <div className="relative h-[25rem] w-[18.5rem] [--s:20px] sm:h-[32rem] sm:w-[24rem] sm:[--s:34px]" style={{ perspective: "1200px" }}>
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateY(calc(var(--px) * 7deg)) rotateX(calc(var(--py) * -5deg))", transition: "transform .4s ease-out" }}>
              {destinations.map((x, i) => {
                const o = (i - idx + n) % n;
                const visible = o < 3;
                return (
                  <button
                    key={x.slug}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`Show ${x.name}`}
                    tabIndex={o === 0 || !visible ? -1 : 0}
                    className="absolute inset-0 overflow-hidden border border-ivory/20 bg-navy text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,.85)]"
                    style={{
                      zIndex: n - o,
                      opacity: visible ? 1 - o * 0.15 : 0,
                      pointerEvents: visible ? "auto" : "none",
                      filter: o === 0 ? "none" : `brightness(${1 - o * 0.2})`,
                      transform: `translate3d(calc(var(--s) * ${o}), calc(var(--s) * ${o} * -0.65), 0) rotate(${o * 4.5}deg) scale(${1 - o * 0.06})`,
                      transition: "transform 1s cubic-bezier(.2,.7,.2,1), opacity 1s ease, filter 1s ease",
                    }}
                  >
                    <img src={x.image} alt={o === 0 ? `${x.name} destination` : ""} width={800} height={1000} decoding="async" loading={i < 3 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-6">
                      <span className="eyebrow block">0{i + 1} / 0{n} · {x.region}</span>
                      <span className="mt-2 block font-serif text-4xl text-ivory">{x.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spinning seal */}
          <div className="absolute -right-2 -top-8 z-20 h-28 w-28 sm:-right-10">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-gold-soft" style={{ animation: "seal-spin 20s linear infinite" }} aria-hidden="true">
              <defs><path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <text fontSize="10" fontWeight="600" fill="currentColor"><textPath href="#seal-circle" textLength="284" lengthAdjust="spacing">VISA GUIDANCE • DOCUMENTS • SUPPORT • </textPath></text>
            </svg>
            <span className="absolute inset-[30%] grid place-items-center rounded-full bg-gold text-navy-deep"><ArrowUpRight className="h-5 w-5" /></span>
          </div>

          {/* Sample file card: builds itself for each destination */}
          <div key={d.slug} className="glass absolute -bottom-2 -left-3 z-20 w-60 p-5 sm:-left-16 sm:w-64">
            <p className="eyebrow">Sample file · {short[d.slug]}</p>
            <ul className="mt-4 space-y-2.5">
              {items.map((t, i) => {
                const done = i < items.length - 1;
                return (
                  <li key={t} className="animate-rise flex items-center gap-3 text-[0.82rem] text-ivory/90" style={{ animationDelay: `${250 + i * 300}ms` }}>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${done ? "bg-gold text-navy-deep" : "border border-gold"}`} style={done ? { animation: `tick-pop .5s ${450 + i * 300}ms both` } : undefined}>
                      {done ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />}
                    </span>
                    {t}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
