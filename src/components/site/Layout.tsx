import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND, DISCLAIMER, WHATSAPP_DISPLAY, WHATSAPP_URL, nav, services } from "@/lib/site";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.48-.22-.36a9.43 9.43 0 0 1 14.62-11.7 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.44-9.4 9.44zm8.02-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.08 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Wordmark({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-baseline gap-2" aria-label={`${BRAND} home`}>
      <span className={`font-serif text-2xl tracking-tight ${light ? "text-ivory" : "text-navy"}`}>Prime Travel</span>
      <span className="eyebrow !text-[0.6rem]">LTD</span>
    </Link>
  );
}

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const light = overlay && !scrolled && !open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${light ? "bg-transparent" : "bg-ivory/95 backdrop-blur border-b border-border"}`}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Wordmark light={light} />
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className={`link-underline pb-1 text-[0.8rem] font-medium tracking-wide ${light ? "text-ivory/90 hover:text-ivory" : "text-navy/80 hover:text-navy"}`}
              activeProps={{ className: "!bg-[length:100%_1px]" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-gold hidden !py-3 sm:inline-flex">Get Started</Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
            className={`p-2 lg:hidden ${light ? "text-ivory" : "text-navy"}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-ivory lg:hidden">
          <nav className="container-x flex flex-col py-6" aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-4 font-serif text-2xl text-navy">
                {n.label}
              </Link>
            ))}
            <Link to="/faqs" onClick={() => setOpen(false)} className="border-b border-border py-4 font-serif text-2xl text-navy">FAQs</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-gold mt-6">Get Started</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-ivory/70">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Wordmark light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">Professional visa guidance and travel arrangements, delivered with care and clarity.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light mt-8 !py-3">
            <WhatsAppIcon className="h-4 w-4" /> {WHATSAPP_DISPLAY}
          </a>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-ivory">{n.label}</Link></li>)}
            <li><Link to="/faqs" className="hover:text-ivory">FAQs</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow mb-5">Services</p>
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-ivory">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Legal</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-ivory">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-ivory">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-ivory">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-4 py-8 text-xs leading-relaxed md:flex-row md:justify-between">
          <p className="max-w-3xl">{DISCLAIMER}</p>
          <p className="shrink-0">© {new Date().getFullYear()} {BRAND}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-ivory shadow-lg transition-transform hover:scale-105">
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image?: string }) {
  const section = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const words = title.split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (layer.current) layer.current.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * 0.3}px, 0)`;
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  const move = (e: MouseEvent<HTMLElement>) => {
    const el = section.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={section} onMouseMove={move} className="relative isolate overflow-hidden bg-navy pb-20 pt-40 text-ivory md:pb-28 md:pt-48">
      {image && (
        <div ref={layer} className="absolute inset-x-0 -inset-y-24 will-change-transform">
          <img src={image} alt="" className="animate-hero-zoom h-full w-full object-cover opacity-35" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
      {/* faint grid, cursor glow, rising gold dust, grain */}
      <div aria-hidden="true" className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(color-mix(in oklab, var(--ivory) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--ivory) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: "84px 84px",
        maskImage: "radial-gradient(ellipse at 30% 60%, black 5%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 30% 60%, black 5%, transparent 70%)",
      }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(520px circle at var(--mx, 25%) var(--my, 60%), color-mix(in oklab, var(--gold) 20%, transparent), transparent 65%)" }} />
      <div aria-hidden="true" className="absolute inset-0">
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="pg-dot" style={{ left: `${(i * 41 + 9) % 100}%`, bottom: `${(i * 17) % 45}%`, animationDuration: `${9 + (i % 6) * 2}s`, animationDelay: `-${(i * 1.7) % 14}s`, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2 }} />
        ))}
      </div>
      <div className="grain absolute inset-0" />

      <div className="container-x relative">
        <p className="eyebrow animate-rise inline-flex items-center gap-4"><span className="pg-bar" />{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
          {words.map((w, i) => (
            <span key={i}>
              <span className="hero-word"><span style={{ animationDelay: `${120 + i * 70}ms` }}>{i === words.length - 1 ? <span className="cta-shimmer">{w}</span> : w}</span></span>{" "}
            </span>
          ))}
        </h1>
        {text && <p className="animate-rise mt-6 max-w-2xl text-lg text-ivory/75" style={{ animationDelay: `${300 + words.length * 70}ms` }}>{text}</p>}
      </div>
      <span aria-hidden="true" className="pg-sweep" />
    </section>
  );
}

const ctaWords = ["Let's", "Plan", "Your", "Next", "Step."];
// Destination nodes for the animated route map: position in a 1440x600 box and the curve's control point.
const ctaRoutes = [
  { name: "Canada", x: 180, y: 170, c: [440, 70] },
  { name: "USA", x: 300, y: 450, c: [420, 510] },
  { name: "Schengen", x: 1150, y: 150, c: [960, 60] },
  { name: "Turkey", x: 1270, y: 400, c: [1090, 490] },
  { name: "Morocco", x: 1020, y: 530, c: [880, 480] },
] as const;

const magnet = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.35}px)`;
};
const unmagnet = (e: MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; };

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) svg.current?.pauseAnimations();
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={ref} data-in={seen} onMouseMove={move} className="cta-section relative isolate overflow-hidden bg-navy py-28 text-ivory md:py-40">
      {/* drifting gold and blue glows */}
      <div aria-hidden="true" className="cta-orb cta-orb-a" />
      <div aria-hidden="true" className="cta-orb cta-orb-b" />
      {/* twinkling stars */}
      <div aria-hidden="true" className="absolute inset-0">
        {Array.from({ length: 36 }, (_, i) => (
          <span key={i} className="cta-star" style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, animationDelay: `${(i % 9) * 0.6}s`, animationDuration: `${3 + (i % 5)}s`, width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2 }} />
        ))}
      </div>
      {/* routes radiating to the five destinations, with travelling dots */}
      <div aria-hidden="true" className="absolute inset-0" style={{ maskImage: "radial-gradient(ellipse 44% 52% at 50% 50%, transparent 0%, transparent 55%, black 100%)", WebkitMaskImage: "radial-gradient(ellipse 44% 52% at 50% 50%, transparent 0%, transparent 55%, black 100%)" }}>
        <svg ref={svg} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full text-gold">
          {ctaRoutes.map((r, i) => {
            const d = `M 720 300 Q ${r.c[0]} ${r.c[1]} ${r.x} ${r.y}`;
            return (
              <g key={r.name}>
                <path d={d} fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.2" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <circle r="9" fill="currentColor" fillOpacity=".2"><animateMotion dur={`${6 + i * 1.3}s`} begin={`${i * 1.1}s`} repeatCount="indefinite" path={d} /></circle>
                <circle r="3.2" fill="currentColor"><animateMotion dur={`${6 + i * 1.3}s`} begin={`${i * 1.1}s`} repeatCount="indefinite" path={d} /></circle>
                <circle cx={r.x} cy={r.y} r="4" fill="currentColor" />
                <circle cx={r.x} cy={r.y} r="4" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <animate attributeName="r" values="4;22" dur="3.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".7;0" dur="3.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                </circle>
                <text x={r.x} y={r.y - 16} textAnchor="middle" fontSize="11" letterSpacing="4" fill="currentColor" fillOpacity=".55" fontWeight="600">{r.name.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {/* light that follows the cursor */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--gold) 16%, transparent), transparent 65%)" }} />
      <div className="grain absolute inset-0" />

      <div className="container-x relative text-center">
        <p className="eyebrow inline-flex items-center gap-4"><span className="eb-line origin-right" />Begin<span className="eb-line origin-left" /></p>
        <h2 className="mx-auto mt-6 max-w-3xl text-5xl md:text-7xl" style={{ perspective: "800px" }}>
          {ctaWords.map((w, i) => (
            <span key={w}><span className={`cta-word ${i >= 3 ? "cta-shimmer" : ""}`} style={{ "--i": i } as CSSProperties}>{w}</span>{" "}</span>
          ))}
        </h2>
        <p className="cta-rise mx-auto mt-6 max-w-xl text-ivory/70" style={{ "--r": "900ms" } as CSSProperties}>Tell us about your travel plans and let our team guide you through the process.</p>
        <div className="cta-rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ "--r": "1100ms" } as CSSProperties}>
          <Link to="/contact" onMouseMove={magnet} onMouseLeave={unmagnet} className="btn btn-gold cta-mag cta-pulse group relative overflow-hidden">
            Contact Our Team <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            <span className="cta-shine" aria-hidden="true" />
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onMouseMove={magnet} onMouseLeave={unmagnet} className="btn btn-ghost-light cta-mag"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: string; text?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight md:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}
