import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal, SectionHead } from "@/components/site/Layout";
import { pillars } from "@/lib/site";

// Where each point sits on the photo (percent of its width/height).
const spots: [number, number][] = [
  [51, 43], // pen
  [29, 31], // letters
  [63, 58], // passport
  [30, 65], // folder clasp
  [87, 40], // documents on the right
];
const STEP_MS = 3800;

export function WhySection({ image }: { image: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [reduced, setReduced] = useState(false);
  const n = pillars.length;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [hx, hy] = spots[active] ?? [50, 50];

  return (
    <div ref={root} className="container-x grid items-center gap-20 lg:grid-cols-2" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      {/* photo with hotspots */}
      <div className="relative">
        <div aria-hidden="true" className="absolute -inset-4 -translate-x-5 translate-y-5 border border-gold/60" style={{ clipPath: seen ? "inset(0 0 0 0)" : "inset(100% 0 0 100%)", transition: "clip-path 1.6s cubic-bezier(.7,0,.2,1) .5s" }} />
        <div className="relative overflow-hidden" style={{ clipPath: seen ? "inset(0 0 0 0)" : "inset(0 0 0 100%)", transition: "clip-path 1.4s cubic-bezier(.7,0,.2,1)" }}>
          <img src={image} alt="Passport and neatly organised travel documents" loading="lazy" width={1280} height={1024} className="aspect-[5/4] w-full object-cover"
            style={{ transform: seen ? "scale(1)" : "scale(1.18)", transition: "transform 2.2s cubic-bezier(.2,.7,.2,1)" }} />
          {/* spotlight that glides to the active point */}
          <div className="why-spot absolute inset-0" style={{ "--hx": `${hx}%`, "--hy": `${hy}%` } as CSSProperties} />
          {spots.map(([x, y], i) => {
            const on = i === active;
            return (
              <button key={i} type="button" aria-label={pillars[i]?.title} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%`, opacity: seen ? 1 : 0, transform: `translate(-50%, -50%) scale(${seen ? 1 : 0})`, transition: `opacity .6s ease ${1.4 + i * 0.12}s, transform .7s cubic-bezier(.2,.7,.2,1) ${1.4 + i * 0.12}s` }}>
                <span className={`relative grid h-7 w-7 place-items-center rounded-full border transition-all duration-500 ${on ? "scale-110 border-gold bg-gold/30" : "border-ivory/70 bg-navy-deep/30"}`}>
                  {on && <span className="absolute inset-0 animate-ping rounded-full bg-gold/50" />}
                  <span className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-500 ${on ? "bg-gold" : "bg-ivory"}`} />
                </span>
              </button>
            );
          })}
          {/* caption for the active point */}
          <div key={active} className="glass animate-rise absolute bottom-4 left-4 z-10 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-ivory">
            <span className="text-gold-soft">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <span className="ml-3">{pillars[active]?.title}</span>
          </div>
        </div>
      </div>

      {/* the five points */}
      <div>
        <SectionHead eyebrow="Why Prime Travel LTD" title="Guidance that feels personal." />
        <ul className="mt-12">
          {pillars.map((p, i) => {
            const on = i === active;
            return (
              <Reveal key={p.title} delay={i * 60}>
                <li data-on={on} onMouseEnter={() => setActive(i)} className="why-row relative border-t border-border py-6">
                  <span
                    className="why-prog"
                    style={on && !reduced ? { animation: `hero-progress ${STEP_MS}ms linear forwards`, animationPlayState: hold ? "paused" : "running" } : on ? { transform: "scaleX(1)" } : undefined}
                    onAnimationEnd={on && !reduced ? () => setActive((a) => (a + 1) % n) : undefined}
                  />
                  <div className="grid grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="hairline why-hair mt-3" />
                    <div className="why-text">
                      <h3 className="text-xl">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
