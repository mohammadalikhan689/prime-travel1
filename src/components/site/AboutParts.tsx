import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Big statement whose words light up one by one as you scroll through it. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    if (reducedMotion()) { setP(1); return; }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setP(clamp((window.innerHeight * 0.82 - r.top) / (r.height + window.innerHeight * 0.25)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const lit = clamp(p * (words.length + 3) - i);
        return (
          <span key={i} className="inline-block transition-[opacity,filter,transform] duration-500" style={{ opacity: 0.16 + 0.84 * lit, filter: `blur(${(1 - lit) * 2.5}px)`, transform: `translateY(${(1 - lit) * 6}px)` }}>
            {w}&nbsp;
          </span>
        );
      })}
    </p>
  );
}

/** Image that wipes in, drifts with scroll, with a drawn gold frame, spinning seal and floating chip. */
export function ParallaxFrame({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setY(((r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight) * -48);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute -inset-4 translate-x-5 translate-y-5 border border-gold/60" style={{ clipPath: seen ? "inset(0 0 0 0)" : "inset(0 100% 100% 0)", transition: "clip-path 1.6s cubic-bezier(.7,0,.2,1) .5s" }} />
      <div className="relative overflow-hidden" style={{ clipPath: seen ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", transition: "clip-path 1.4s cubic-bezier(.7,0,.2,1)" }}>
        <img src={src} alt={alt} loading="lazy" width={1280} height={1024} className="aspect-[5/4] w-full object-cover" style={{ transform: `translateY(${y}px) scale(1.18)`, transition: "transform .2s linear" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent" />
      </div>
      {/* spinning seal */}
      <div className="absolute -bottom-10 -left-6 z-10 h-28 w-28 md:-left-10" style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "scale(.4) rotate(-90deg)", transition: "opacity 1s ease 1.2s, transform 1.2s cubic-bezier(.2,.7,.2,1) 1.2s" }}>
        <span className="absolute inset-0 rounded-full bg-navy-deep" />
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-gold-soft" style={{ animation: "seal-spin 22s linear infinite" }} aria-hidden="true">
          <defs><path id="about-seal" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text fontSize="10" fontWeight="600" fill="currentColor"><textPath href="#about-seal" textLength="284" lengthAdjust="spacing">PRIME TRAVEL LTD • VISA GUIDANCE • </textPath></text>
        </svg>
        <span className="absolute inset-[34%] rounded-full bg-gold" />
      </div>
      {/* floating chip */}
      <div className="glass absolute -right-3 top-8 z-10 hidden items-center gap-3 px-5 py-4 text-sm text-ivory sm:flex" style={{ opacity: seen ? 1 : 0, transition: "opacity 1s ease 1.6s", animation: "float-y 6s ease-in-out infinite" }}>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-navy-deep"><Check className="h-3.5 w-3.5" /></span>
        Complete, easy-to-review files
      </div>
    </div>
  );
}
