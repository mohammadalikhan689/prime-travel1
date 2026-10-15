import { FileCheck2, CalendarClock, PenLine, Mail, FolderOpen, Plane, BedDouble, ShieldCheck, Briefcase, Stamp, type LucideProps } from "lucide-react";

const map = { FileCheck2, CalendarClock, PenLine, Mail, FolderOpen, Plane, BedDouble, ShieldCheck, Briefcase, Stamp };

export function ServiceIcon({ name, ...p }: { name: string } & LucideProps) {
  const I = map[name as keyof typeof map] ?? FileCheck2;
  return <I strokeWidth={1.25} {...p} />;
}
