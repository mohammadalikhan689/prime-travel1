import type { ReactNode } from "react";

const G = "var(--gold)";
const I = "var(--ivory)";

const art: Record<string, ReactNode> = {
  "visa-application-assistance": (<>
    <rect x="94" y="22" width="80" height="104" rx="4" opacity=".35" />
    <rect x="80" y="16" width="80" height="104" rx="4" fill={I} fillOpacity=".08" />
    <path d="M95 42h50M95 55h50M95 68h32" />
    <circle cx="138" cy="96" r="15" stroke={G} strokeWidth="2" />
    <path d="M131 96l5 5 10-11" stroke={G} strokeWidth="2.5" />
  </>),
  "visa-appointment-assistance": (<>
    <rect x="58" y="26" width="124" height="94" rx="5" fill={I} fillOpacity=".08" />
    <path d="M58 52h124M90 16v18M150 16v18" />
    {[80, 104, 128, 152].map((x) => <circle key={x} cx={x} cy="70" r="2.5" fill={I} stroke="none" />)}
    {[80, 104, 128].map((x) => <circle key={x} cx={x} cy="92" r="2.5" fill={I} stroke="none" />)}
    <rect x="142" y="82" width="22" height="20" rx="3" fill={G} stroke="none" />
    {[80, 104].map((x) => <circle key={x} cx={x} cy="110" r="2.5" fill={I} stroke="none" />)}
  </>),
  "application-form-completion": (<>
    <rect x="62" y="18" width="104" height="106" rx="4" fill={I} fillOpacity=".08" />
    <rect x="78" y="34" width="72" height="11" rx="2" />
    <rect x="78" y="54" width="72" height="11" rx="2" />
    <rect x="78" y="74" width="40" height="11" rx="2" />
    <path d="M78 106c8-12 12 8 20-2s12 6 20-2" stroke={G} strokeWidth="2" />
    <path d="M168 66l12 8-30 42-12 3 2-12z" fill={G} fillOpacity=".25" stroke={G} strokeWidth="2" />
  </>),
  "cover-letter-preparation": (<>
    <rect x="84" y="18" width="72" height="50" rx="2" fill={I} fillOpacity=".08" />
    <path d="M96 32h48M96 44h34" />
    <rect x="56" y="44" width="128" height="80" rx="5" fill="var(--navy)" />
    <path d="M56 50l64 46 64-46" stroke={G} strokeWidth="2" />
    <path d="M56 124l46-40M184 124l-46-40" opacity=".5" />
  </>),
  "supporting-document-guidance": (<>
    <rect x="68" y="22" width="52" height="46" rx="2" opacity=".4" />
    <rect x="94" y="14" width="52" height="50" rx="2" opacity=".6" fill={I} fillOpacity=".06" />
    <path d="M48 48a6 6 0 0 1 6-6h40l12 14h80a6 6 0 0 1 6 6v54a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6z" fill="var(--navy)" />
    <path d="M70 80h56M70 94h40M70 108h48" />
    <path d="M156 92l6 6 12-14" stroke={G} strokeWidth="2.5" />
  </>),
  "flight-bookings": (<>
    <path d="M26 112C70 20 150 6 208 52" strokeDasharray="3 6" stroke={G} />
    <circle cx="26" cy="112" r="5" fill={G} stroke="none" />
    <g transform="translate(210 52) rotate(38)"><path d="M-22 0L-4-14l4 6 18 8-18 8-4 6z" fill={G} stroke="none" /></g>
    <path d="M52 40h26M64 52h20M150 96h30" opacity=".4" />
  </>),
  "hotel-reservations": (<>
    <rect x="76" y="24" width="88" height="98" rx="3" fill={I} fillOpacity=".08" />
    {[92, 114, 136].flatMap((x) => [40, 62, 84].map((y) => (
      <rect key={`${x}${y}`} x={x} y={y} width="14" height="14" rx="1" fill={(x + y) % 3 === 0 ? G : "none"} />
    )))}
    <rect x="112" y="104" width="16" height="18" />
    <path d="M178 40l2.5 6 6 .5-4.5 4 1.5 6-5.5-3.5-5.5 3.5 1.5-6-4.5-4 6-.5z" fill={G} stroke="none" />
  </>),
  "travel-insurance": (<>
    <circle cx="120" cy="72" r="58" strokeDasharray="2 6" opacity=".4" />
    <path d="M120 20l46 17v32c0 28-19 44-46 54-27-10-46-26-46-54V37z" fill={I} fillOpacity=".08" />
    <path d="M100 72l14 14 26-30" stroke={G} strokeWidth="3" />
  </>),
  "business-visa-assistance": (<>
    <rect x="62" y="48" width="116" height="72" rx="6" fill={I} fillOpacity=".08" />
    <path d="M94 48V38a6 6 0 0 1 6-6h40a6 6 0 0 1 6 6v10M62 80h116" />
    <rect x="110" y="74" width="20" height="14" rx="2" fill={G} stroke="none" />
    <path d="M78 108l14-10 12 6 18-14" stroke={G} opacity=".8" />
  </>),
  "document-legalisation-apostille": (<>
    <circle cx="120" cy="30" r="12" fill={I} fillOpacity=".08" />
    <path d="M114 42h12v22h-12zM92 64h56a4 4 0 0 1 4 4v8H88v-8a4 4 0 0 1 4-4z" fill={I} fillOpacity=".08" />
    <path d="M66 112h108" />
    <ellipse cx="120" cy="100" rx="34" ry="8" stroke={G} strokeDasharray="3 4" strokeWidth="2" />
    <circle cx="120" cy="100" r="2.5" fill={G} stroke="none" />
  </>),
};

export function ServiceArt({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <div className={`art-draw relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep ${className}`}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(var(--ivory) .6px, transparent .7px)", backgroundSize: "18px 18px", maskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)" }} />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <svg viewBox="0 0 240 140" fill="none" stroke="var(--gold-soft)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        className="relative mx-auto h-full w-full max-w-[17rem] p-4 transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-110" aria-hidden="true">
        {art[slug]}
      </svg>
    </div>
  );
}
