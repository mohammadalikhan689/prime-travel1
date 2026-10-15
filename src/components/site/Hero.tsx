import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import heroImg from "@/assets/hero.webp";
import { WhatsAppIcon } from "@/components/site/Layout";
import { WHATSAPP_URL, destinations } from "@/lib/site";

const AUTOPLAY_MS = 7000;

const short: Record<string, string> = { schengen: "Schengen", usa: "USA", canada: "Canada", turkey: "Turkey", morocco: "Morocco" };

// Last item in each list shows as "in progress" (pulsing ring), the rest as done.
const checklists: Record<string, string[]> = {
  schengen: ["Passport & photos", "Application form", "Cover letter", "Appointment guidance"],
  usa: ["Passport & photo", "Form guidance", "Financial documents", "Interview preparation"],
  canada: ["Passport & photos", "Purpose-of-travel letter", "Financial documents", "Biometrics guidance"],
  turkey: ["Passport validity check", "Flight & hotel itinerary", "Travel insurance", "Online application guidance"],
  morocco: ["Passport & photos", "Entry requirements check", "Accommodation booking", "Itinerary review"],
};

const headline = ["Your", "Visa", "Journey,", "*Fast-Tracked*", "With", "Expert", "Guidance."];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const scrollLayer = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true); // assume reduced until checked: no autoplay on server render
  const d = destinations[idx]!;
  const items = checklists[d.slug] ?? checklists.schengen!;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (scrollLayer.current) scrollLayer.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Cursor parallax: writes CSS variables directly, so no React re-renders on mouse move.
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !section.current) return;
    const r = section.current.getBoundingClientRect();
    section.current.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    section.current.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };

  return (
    <section
      ref={section}
      onMouseMove={onMove}
      style={{ "--px": 0, "--py": 0 } as CSSProperties}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-ivory"
    >
      {/* Background: one layer per destination, crossfading */}
      <div ref={scrollLayer} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: "translate3d(calc(var(--px) * -14px), calc(var(--py) * -10px), 0)" }}>
          {destinations.map((x, i) => (
            <div key={x.slug} className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out" style={{ opacity: i === idx ? 1 : 0 }} aria-hidden={i !== idx}>
              <img
                src={i === 0 ? heroImg : x.image}
                alt={i === 0 ? "Paris rooftops at dusk with the Eiffel Tower" : `${x.name} travel scene`}
                width={i === 0 ? 1800 : 800}
                height={i === 0 ? 1020 : 1000}
                fetchPriority={i === 0 ? "high" : "auto"}
                className={`animate-kenburns h-full w-full object-cover ${i === 0 ? "" : "blur-[2px]"}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/60 to-navy/30" />
      <div className="grain absolute inset-0" />

      {/* Destination card (desktop) */}
      <div
        className="animate-rise absolute bottom-48 right-10 hidden w-[19rem] lg:block"
        style={{ animationDelay: "1.1s" }}
      >
        <div style={{ transform: "translate3d(calc(var(--px) * 10px), calc(var(--py) * 8px), 0)", transition: "transform .3s ease-out" }}>
          <div className="relative aspect-[4/5] overflow-hidden border border-ivory/20" style={{ animation: "float-y 7s ease-in-out infinite" }}>
            {destinations.map((x, i) => (
              <img key={x.slug} src={x.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]" style={{ opacity: i === idx ? 1 : 0 }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
            <div key={d.slug} className="glass absolute inset-x-3 bottom-3 p-5">
              <p className="eyebrow">Sample file · {short[d.slug]}</p>
              <ul className="mt-4 space-y-2.5">
                {items.map((t, i) => {
                  const done = i < items.length - 1;
                  return (
                    <li key={t} className="animate-rise flex items-center gap-3 text-[0.82rem] text-ivory/90" style={{ animationDelay: `${300 + i * 320}ms` }}>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${done ? "bg-gold text-navy-deep" : "border border-gold"}`} style={done ? { animation: `tick-pop .5s ${500 + i * 320}ms both` } : undefined}>
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
      </div>

      {/* Copy */}
      <div className="container-x relative pb-8 pt-40 md:pb-10">
        <p className="eyebrow animate-rise" style={{ animationDelay: "300ms" }}>Visa & Travel Consultancy</p>
        <h1 className="mt-6 max-w-5xl text-5xl leading-[1.02] sm:text-6xl md:text-8xl">
          {headline.map((w, i) => {
            const em = w.startsWith("*");
            const text = em ? w.slice(1, -1) : w;
            return (
              <span key={w}>
                <span className="hero-word">
                  <span style={{ animationDelay: `${450 + i * 90}ms` }}>{em ? <em className="text-gold-soft">{text}</em> : text}</span>
                </span>{" "}
              </span>
            );
          })}
        </h1>

        <p key={d.slug} className="animate-rise mt-8 min-h-[4.5rem] max-w-xl text-lg text-ivory/80 md:min-h-[3.5rem]">
          <span className="mr-2 font-semibold text-gold-soft">{d.name}.</span>
          {d.blurb}
        </p>

        <div className="animate-rise mt-8 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: "1s" }}>
          <Link to="/contact" className="btn btn-gold">Get a Free Assessment <ArrowRight className="h-4 w-4" /></Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
        </div>

        {/* Destination selector with autoplay progress */}
        <div
          role="tablist"
          aria-label="Choose a destination"
          className="animate-rise mt-12 grid grid-cols-5 gap-2 sm:gap-4"
          style={{ animationDelay: "1.2s" }}
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
                    onAnimationEnd={active && !reduced ? () => setIdx((c) => (c + 1) % destinations.length) : undefined}
                  />
                </span>
                <span className={`eyebrow mt-3 block !text-[0.6rem] transition-colors ${active ? "" : "!text-ivory/45 group-hover:!text-ivory/80"}`}>0{i + 1}</span>
                <span className={`mt-1 block font-serif text-base transition-colors sm:text-xl ${active ? "text-ivory" : "text-ivory/55 group-hover:text-ivory/90"}`}>{short[x.slug]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
